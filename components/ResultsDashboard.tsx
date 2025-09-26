
import React from 'react';
import type { AnalysisResult } from '../types';
import ScoreMetric from './ScoreMetric';
import Accordion from './Accordion';

interface ResultsDashboardProps {
  result: AnalysisResult;
  imageFile: File;
  onReset: () => void;
  onShowModal: () => void;
}

const OverallScore: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 54; // 2 * pi * r
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = (s: number) => {
    if (s < 50) return 'stroke-red-500';
    if (s < 80) return 'stroke-yellow-500';
    return 'stroke-green-500';
  };

  return (
    <div className="relative w-56 h-56 mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full"></div>
      <svg className="w-full h-full relative z-10" viewBox="0 0 120 120">
        <circle
          className="stroke-gray-200"
          strokeWidth="8"
          fill="transparent"
          r="54"
          cx="60"
          cy="60"
        />
        <circle
          className={`${getScoreColor(score)} transition-all duration-1000 ease-out drop-shadow-lg`}
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          r="54"
          cx="60"
          cy="60"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{score}</span>
        <span className="text-sm font-semibold text-gray-600 mt-1">SCORE GERAL</span>
      </div>
    </div>
  );
};

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, imageFile, onReset }) => {
  const imageUrl = React.useMemo(() => URL.createObjectURL(imageFile), [imageFile]);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full border border-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={imageUrl} alt="Creative Preview" className="w-20 h-20 rounded-xl object-cover shadow-lg" />
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ✓ Analisado
                </div>
              </div>
              <div>
                <p className="font-bold text-lg text-gray-800">{imageFile.name}</p>
                <p className="text-sm text-brand-gray-500">{(imageFile.size / 1024 / 1024).toFixed(2)} MB • Análise concluída</p>
              </div>
            </div>
            <button onClick={onReset} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg w-full md:w-auto">
               🚀 Novo Criativo
             </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Análise Completa do Seu Criativo
          </h2>
          <div className="my-10">
            <OverallScore score={result.overallScore} />
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <p className="text-lg text-brand-gray-700 font-medium">
              🎯 Seu criativo foi analisado em <span className="font-bold text-blue-600">{result.metrics.length} dimensões críticas</span> para maximizar conversões
            </p>
            <p className="text-sm text-brand-gray-600 mt-2">
              Cada métrica foi avaliada por nossa IA especializada em performance de anúncios
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.metrics.map(metric => (
            <ScoreMetric key={metric.name} metric={metric} />
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full border border-gray-100">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🤖 Recomendações da IA
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <p className="text-lg text-brand-gray-700 leading-relaxed">{result.aiSuggestion}</p>
          </div>
        </div>
        
        <div className="space-y-4">
            <Accordion title="Título Sugerido">
                <p className="text-brand-gray-600 p-4">{result.suggestedTitle}</p>
            </Accordion>
            <Accordion title="Subtítulo Sugerido">
                <p className="text-brand-gray-600 p-4">{result.suggestedSubtitle}</p>
            </Accordion>
            <Accordion title="CTA Sugerido">
                <p className="text-brand-gray-600 p-4">{result.suggestedCTA}</p>
            </Accordion>
            <Accordion title="Observações Finais">
                <p className="text-brand-gray-600 p-4">{result.finalObservations}</p>
            </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
