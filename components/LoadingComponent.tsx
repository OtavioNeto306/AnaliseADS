
import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
);

const LoadingComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white rounded-xl shadow-lg p-12 min-h-[400px]">
        <LoadingSpinner />
        <h2 className="text-2xl font-bold mt-6">Analisando seu criativo...</h2>
        <p className="text-brand-gray-500 mt-2">Nossa IA está avaliando clareza, proposta de valor, hierarquia visual e mais</p>
    </div>
  );
};

export default LoadingComponent;
