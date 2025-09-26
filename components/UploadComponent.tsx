
import React, { useState, useCallback, useMemo } from 'react';
import { UploadIcon } from './Icons';

interface UploadComponentProps {
  onFileSelect: (file: File | null) => void;
  onAnalyze: () => void;
  error: string | null;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  onFileSelect,
  onAnalyze,
  error
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((selectedFile: File | undefined) => {
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('O arquivo excede o tamanho máximo de 10MB.');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(selectedFile.type)) {
        alert('Formato de arquivo inválido. Apenas JPG, PNG e WEBP são aceitos.');
        return;
      }
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  }, [onFileSelect]);

  const handleDragEvents = useCallback((e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [handleDragEvents, handleFileChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const filePreview = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
  };

  const isAnalyzeDisabled = !file;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full text-center border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Descubra o Potencial do Seu Criativo
        </h2>
        <p className="text-lg text-brand-gray-600 mb-2">
          Nossa IA especializada analisa <span className="font-semibold text-blue-600">6 dimensões críticas</span> para maximizar suas conversões
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm text-brand-gray-500 mt-4">
           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium whitespace-nowrap">✨ Análise instantânea</span>
           <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium whitespace-nowrap">🎯 Sugestões práticas</span>
           <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium whitespace-nowrap">📈 Mais conversões</span>
         </div>
      </div>
      
      {!file ? (
        <div
          onDragEnter={(e) => handleDragEvents(e, true)}
          onDragLeave={(e) => handleDragEvents(e, false)}
          onDragOver={(e) => handleDragEvents(e, true)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-12 transition-all duration-300 ${isDragging ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-opacity-80' : 'border-blue-400 border-opacity-60 hover:border-blue-500 hover:border-opacity-80 hover:bg-gradient-to-br hover:from-blue-25 hover:to-indigo-25'}`}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
            accept="image/jpeg,image/png,image/webp"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center group">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-full p-6 mb-6 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
              <UploadIcon className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p className="font-bold text-xl text-brand-dark mb-2">Faça Upload do Seu Criativo</p>
            <p className="text-brand-gray-600 text-base mb-3">Arraste e solte ou clique para selecionar</p>
            <div className="bg-gray-50 rounded-lg px-4 py-2">
              <p className="text-sm text-brand-gray-500">📁 JPG, PNG, WEBP • 📏 Máx. 10MB • ⚡ Análise em segundos</p>
            </div>
          </label>
        </div>
      ) : (
        <div className="bg-brand-gray-100 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {filePreview && <img src={filePreview} alt="Preview" className="w-16 h-16 rounded-md object-cover" />}
            <div>
              <p className="font-semibold text-left">{file.name}</p>
              <p className="text-sm text-brand-gray-500 text-left">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button onClick={removeFile} className="text-red-500 hover:text-red-700 font-bold text-2xl">&times;</button>
        </div>
      )}


      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      <button
        onClick={onAnalyze}
        disabled={isAnalyzeDisabled}
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform mt-6 ${
          isAnalyzeDisabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
        }`}
      >
        {isAnalyzeDisabled
          ? '📁 Selecione um arquivo para começar'
          : '🚀 Analisar Criativo com IA'
        }
      </button>
    </div>
  );
};

export default UploadComponent;
