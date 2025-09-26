# Analise ADS - Análise de Criativos com IA

> Seu criativo vende? Descubra em segundos.

Uma aplicação web moderna que utiliza inteligência artificial para analisar criativos publicitários, fornecendo pontuações detalhadas e sugestões acionáveis para maximizar a performance em campanhas digitais.

## 🚀 Funcionalidades

- **Análise por IA**: Integração com Google Gemini AI para análise profunda de criativos
- **Upload Intuitivo**: Interface drag & drop para upload de imagens (JPG, PNG, WEBP)
- **Métricas Detalhadas**: Avaliação em 5 dimensões essenciais de marketing
- **Sugestões Acionáveis**: Diagnósticos específicos e melhorias para cada métrica
- **Análise Instantânea**: Resultados imediatos com IA integrada
- **Interface Responsiva**: Design moderno e otimizado para todos os dispositivos

## 📊 Métricas Avaliadas

A aplicação analisa criativos publicitários em 5 dimensões críticas:

1. **Clareza da Mensagem** (0-10)
   - A proposta de valor é compreensível em menos de 3 segundos?

2. **Proposta de Valor** (0-10)
   - O benefício para o cliente está claro e é convincente?

3. **Hierarquia Visual** (0-10)
   - O design guia o olhar para os elementos mais importantes?

4. **CTA (Call to Action)** (0-10)
   - Existe uma chamada para ação clara e instigante?

5. **Copy e Linguagem** (0-10)
   - O texto é persuasivo e relevante para a audiência?

**Score Geral**: 0-100 pontos baseado na média ponderada das métricas

## 🛠️ Tecnologias

- **Frontend**: React 19.1.1 + TypeScript
- **Build Tool**: Vite
- **Estilização**: Tailwind CSS
- **IA**: Google Gemini AI
- **Linguagem**: TypeScript

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Gemini API Key ([obtenha aqui](https://aistudio.google.com/app/apikey))

### Configuração da API Key

**⚠️ IMPORTANTE**: Para usar a aplicação, você deve configurar sua Gemini API Key diretamente no código:

1. **Arquivo**: `services/geminiService.ts`
2. **Linha**: 49
3. **Altere a constante**:
   ```typescript
   const GEMINI_API_KEY = 'SUA_API_KEY_AQUI';
   ```

### Passos de Instalação

1. **Configure sua API Key** (veja seção acima)
2. **Instale as dependências**
   ```bash
   npm install
   ```
3. **Execute o projeto**
   ```bash
   npm run dev
   ```
4. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

## 🎯 Como Usar

1. **Configure sua API Key** (veja seção de instalação)
2. **Faça upload** da imagem do seu criativo (JPG, PNG, WEBP)
3. **Clique em "Analisar Criativo"**
4. **Aguarde a análise** (processamento em tempo real pela IA)
5. **Visualize os resultados** detalhados com métricas e sugestões

## 📁 Estrutura do Projeto

```
FixMyAd-main/
├── components/              # Componentes React reutilizáveis
│   ├── Accordion.tsx       # Componente expansível
│   ├── Icons.tsx           # Ícones SVG customizados
│   ├── LoadingComponent.tsx # Tela de carregamento
│   ├── Modal.tsx           # Modal para informações
│   ├── ResultsDashboard.tsx # Dashboard de resultados
│   ├── ScoreMetric.tsx     # Exibição de métricas individuais
│   └── UploadComponent.tsx # Interface de upload
├── services/               # Serviços e integrações
│   └── geminiService.ts    # Integração com Gemini AI
├── App.tsx                 # Componente principal
├── types.ts                # Definições de tipos TypeScript
├── constants.ts            # Dados mock e constantes
├── index.tsx               # Ponto de entrada da aplicação
├── index.html              # Template HTML
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração do Vite
└── README.md               # Este arquivo
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎨 Personalização

### Cores do Tema

O projeto utiliza um sistema de cores customizado via Tailwind:

- `brand-blue`: #2E5BFF
- `brand-dark`: #0F172A
- `brand-gray`: Escala de cinzas (100-600)

### Modificando Métricas

Para alterar as métricas avaliadas, edite:

1. **Prompt da IA**: `services/geminiService.ts`
2. **Schema de resposta**: `analysisSchema` no mesmo arquivo

---

**Desenvolvido com ❤️ para otimizar suas campanhas publicitárias**