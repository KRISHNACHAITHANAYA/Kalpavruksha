import React, { useRef } from 'react';
import { ModelSource } from '../types';

interface ImageUploaderProps {
  onImageChange: (file: File) => void;
  previewUrl: string | null;
  onAnalyze: () => void;
  isLoading: boolean;
  onReset: () => void;
  modelSource: ModelSource;
  onModelChange: (source: ModelSource) => void;
  t: (key: string) => string;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const ModelSelector: React.FC<{
    selected: ModelSource,
    onChange: (source: ModelSource) => void,
    t: (key: string) => string;
}> = ({ selected, onChange, t }) => {
    const baseClasses = "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500";
    const activeClasses = "bg-green-600 text-white shadow";
    const inactiveClasses = "bg-white/10 text-gray-100 hover:bg-white/20";

    return (
        <div className="flex justify-center p-1 bg-black/20 rounded-lg mb-4">
            <button
                onClick={() => onChange(ModelSource.GEMINI)}
                className={`${baseClasses} ${selected === ModelSource.GEMINI ? activeClasses : inactiveClasses}`}
            >
                {t('geminiModel')}
            </button>
            <button
                onClick={() => onChange(ModelSource.CUSTOM)}
                className={`${baseClasses} ${selected === ModelSource.CUSTOM ? activeClasses : inactiveClasses}`}
            >
                {t('customModel')}
            </button>
        </div>
    );
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
    onImageChange, 
    previewUrl, 
    onAnalyze, 
    isLoading, 
    onReset,
    modelSource,
    onModelChange,
    t
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageChange(event.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="glass-card p-6 text-center">
      <h2 className="text-xl font-semibold mb-2 text-gray-100">{t('imageUploaderTitle')}</h2>
      <ModelSelector selected={modelSource} onChange={onModelChange} t={t} />

      {modelSource === ModelSource.CUSTOM && (
        <div className="text-sm text-left text-blue-200 bg-blue-900/40 p-3 rounded-md mb-4 border border-blue-500/50">
            <h4 className="font-bold">{t('customModelNoteTitle')}</h4>
            <p className="mt-1">
                {t('customModelNoteBody')}
            </p>
        </div>
      )}

      <div 
        className="border-2 border-dashed border-gray-400 rounded-lg p-8 mt-4 cursor-pointer hover:border-green-400 transition-colors bg-black/10"
        onClick={triggerFileInput}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          aria-label={t('imageUploaderAriaLabel')}
        />
        {previewUrl ? (
          <img src={previewUrl} alt={t('imagePreviewAlt')} className="mx-auto max-h-64 rounded-md shadow-sm" />
        ) : (
          <div className="flex flex-col items-center">
            <UploadIcon />
            <p className="mt-2 text-gray-300">{t('uploadPrompt')}</p>
            <p className="text-xs text-gray-400">{t('uploadHint')}</p>
          </div>
        )}
      </div>

      {previewUrl && (
        <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={onReset}
              className="px-6 py-2 bg-gray-600/80 text-white rounded-lg hover:bg-gray-500/80 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {t('clearImageButton')}
            </button>
            <button
              onClick={onAnalyze}
              className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !previewUrl}
            >
              {isLoading ? t('analyzingButton') : t('analyzeButton')}
            </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;