
import React, { useState, useCallback, useMemo } from 'react';
import type { AppState, AnalysisResult } from './types';
import UploadComponent from './components/UploadComponent';
import LoadingComponent from './components/LoadingComponent';
import ResultsDashboard from './components/ResultsDashboard';
import Modal from './components/Modal';
import { InfoIcon } from './components/Icons';
import { analyzeCreative } from './services/geminiService';

const Header: React.FC = () => (
  <header className="text-center py-16 md:py-20">
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-6 tracking-tight">
          Analise ADS
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-4 leading-tight">
          Transforme seus criativos em <span className="text-blue-600">máquinas de conversão</span>
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Análise inteligente com IA avançada para maximizar o desempenho dos seus anúncios
        </p>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Análise instantânea</span>
        </div>
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">IA especializada</span>
        </div>
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Resultados comprovados</span>
        </div>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('initial');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const resetState = useCallback(() => {
    setAppState('initial');
    setUploadedFile(null);
    setAnalysisResult(null);
    setError(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!uploadedFile) {
      setError('Por favor, selecione um arquivo para analisar.');
      return;
    }

    setAppState('loading');
    setError(null);

    try {
      const result = await analyzeCreative(uploadedFile);
      setAnalysisResult(result);
      setAppState('result');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(`Falha na análise: ${errorMessage}`);
      setAppState('initial');
    }
  }, [uploadedFile]);

  const renderContent = useMemo(() => {
    switch (appState) {
      case 'loading':
        return <LoadingComponent />;
      case 'result':
        return analysisResult && uploadedFile && (
          <ResultsDashboard
            result={analysisResult}
            imageFile={uploadedFile}
            onReset={resetState}
            onShowModal={() => setIsModalOpen(true)}
          />
        );
      case 'initial':
      default:
        return (
          <UploadComponent
            onFileSelect={setUploadedFile}
            onAnalyze={handleAnalyze}
            error={error}
          />
        );
    }
  }, [appState, analysisResult, uploadedFile, resetState, handleAnalyze, error]);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen font-sans text-brand-dark">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        <main>
          {renderContent}
        </main>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Como Funciona</h2>
        <div className="space-y-3 text-brand-gray-600">
          <p>O sistema utiliza inteligência artificial para analisar sua peça de criativo em categorias específicas relacionadas à performance de anúncios em campanhas na internet.</p>
          <p>A análise é otimizada para campanhas de performance e conversão, sendo de pouca utilidade para campanhas de branding.</p>
          <p>As categorias avaliadas incluem clareza da mensagem, proposta de valor, hierarquia visual, e outros elementos essenciais para maximizar o resultado em campanhas digitais.</p>
        </div>
      </Modal>
      <footer className="text-center py-8">
        <button
            onClick={() => setIsModalOpen(true)}
            className="text-brand-gray-600 hover:text-blue-600 flex items-center gap-3 mx-auto font-medium transition-all duration-300 hover:scale-105"
        >
            <InfoIcon className="w-6 h-6" />
            💡 Como Funciona Nossa IA
        </button>
        <p className="text-sm text-brand-gray-500 mt-3">
          Desenvolvido com ❤️ para maximizar suas conversões
        </p>
      </footer>
    </div>
  );
};

export default App;
