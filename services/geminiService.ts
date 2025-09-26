
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve('');
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: { type: Type.INTEGER, description: "A score from 0 to 100 representing the overall effectiveness of the ad creative." },
        metrics: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of the metric being evaluated (e.g., 'Clareza da Mensagem')." },
                    score: { type: Type.INTEGER, description: "A score from 0 to 10 for this specific metric." },
                    diagnostic: { type: Type.STRING, description: "A brief, objective diagnosis of why this score was given." },
                    improvement: { type: Type.STRING, description: "A concrete, actionable suggestion for how to improve this metric." },
                },
                required: ["name", "score", "diagnostic", "improvement"],
            },
        },
        aiSuggestion: { type: Type.STRING, description: "A comprehensive summary of the analysis, written in a helpful and constructive tone." },
        suggestedTitle: { type: Type.STRING, description: "A suggested, improved headline for the ad." },
        suggestedSubtitle: { type: Type.STRING, description: "A suggested, improved subtitle or body text for the ad." },
        suggestedCTA: { type: Type.STRING, description: "A suggested, improved Call to Action for the ad." },
        finalObservations: { type: Type.STRING, description: "Final thoughts or strategic observations about the creative's potential and how to unlock it." },
    },
    required: ["overallScore", "metrics", "aiSuggestion", "suggestedTitle", "suggestedSubtitle", "suggestedCTA", "finalObservations"],
};


const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY não está configurada. Verifique suas variáveis de ambiente.');
}

export const analyzeCreative = async (file: File): Promise<AnalysisResult> => {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  
    const imagePart = await fileToGenerativePart(file);

    const prompt = `
    Analise esta imagem de um criativo de anúncio. Aja como um especialista em marketing de performance e Growth Marketing. 
    Sua análise deve ser crítica, objetiva e focada em otimizar a conversão. Avalie o criativo em 5 dimensões essenciais, fornecendo uma nota de 0 a 10 para cada uma, um diagnóstico e uma sugestão de melhoria.
    As 5 dimensões são:
    1.  **Clareza da Mensagem**: A proposta de valor é entendida em menos de 3 segundos?
    2.  **Proposta de Valor**: O benefício para o cliente está claro e é convincente?
    3.  **Hierarquia Visual**: O design guia o olhar para os elementos mais importantes (oferta, CTA)?
    4.  **CTA (Call to Action)**: Existe uma chamada para ação clara e instigante?
    5.  **Copy e Linguagem**: O texto é persuasivo, relevante para a audiência e livre de jargões?

    Além das métricas, forneça uma pontuação geral de 0 a 100, um resumo da sua análise (Sugestão da IA), e sugestões específicas para Título, Subtítulo, CTA e Observações Finais.
    Retorne sua análise estritamente no formato JSON solicitado. Não inclua markdown ou qualquer texto fora do JSON.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: analysisSchema,
                temperature: 0.3,
            }
        });

        const text = response.text;
        if (!text) {
          throw new Error("A API retornou uma resposta vazia.");
        }
        
        // Gemini can sometimes wrap the JSON in markdown backticks.
        const cleanedText = text.replace(/^```json\s*|```\s*$/g, '').trim();

        const result = JSON.parse(cleanedText);
        
        // Basic validation
        if (!result.overallScore || !result.metrics || result.metrics.length !== 5) {
            throw new Error("Formato de resposta da API inválido.");
        }

        return result as AnalysisResult;

    } catch (error) {
        console.error("Gemini API error:", error);
        if (error instanceof Error && error.message.includes('API key')) {
          throw new Error('A sua Gemini API Key é inválida ou expirou.');
        }
        throw new Error("Não foi possível processar a análise. Tente novamente.");
    }
};
