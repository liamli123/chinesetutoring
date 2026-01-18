'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onImageSelect: (base64: string) => void;
  onPdfTextExtract: (text: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

type UploadedFile = {
  type: 'image' | 'pdf';
  name: string;
  preview?: string;
  pdfText?: string;
};

export function FileUpload({
  onImageSelect,
  onPdfTextExtract,
  onClear,
  disabled = false,
}: FileUploadProps) {
  const t = useTranslations('mathTutor');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfjsRef = useRef<typeof import('pdfjs-dist') | null>(null);

  const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const acceptedFileTypes = [...acceptedImageTypes, 'application/pdf'];

  // Dynamically load PDF.js on client side only
  useEffect(() => {
    const loadPdfJs = async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
        pdfjsRef.current = pdfjs;
        setPdfReady(true);
      } catch (error) {
        console.error('Failed to load PDF.js:', error);
      }
    };
    loadPdfJs();
  }, []);

  const extractTextFromPdf = async (file: File): Promise<string> => {
    if (!pdfjsRef.current) {
      throw new Error('PDF.js not loaded');
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsRef.current.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  };

  const processFile = useCallback(
    async (file: File) => {
      if (!acceptedFileTypes.includes(file.type)) {
        alert(t('invalidFileType'));
        return;
      }

      setIsProcessing(true);

      try {
        if (file.type === 'application/pdf') {
          if (!pdfReady) {
            alert('PDF processing is still loading. Please try again.');
            setIsProcessing(false);
            return;
          }
          // Process PDF
          const pdfText = await extractTextFromPdf(file);
          setUploadedFile({
            type: 'pdf',
            name: file.name,
            pdfText,
          });
          onPdfTextExtract(pdfText);
        } else {
          // Process image
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target?.result as string;
            setUploadedFile({
              type: 'image',
              name: file.name,
              preview: base64,
            });
            onImageSelect(base64);
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error('Error processing file:', error);
        alert(t('fileProcessError'));
      } finally {
        setIsProcessing(false);
      }
    },
    [onImageSelect, onPdfTextExtract, t, pdfReady]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled || isProcessing) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        processFile(file);
      }
    },
    [disabled, isProcessing, processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const handleClear = () => {
    setUploadedFile(null);
    onClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-3">
      {uploadedFile ? (
        <div className="relative border border-neutral-700 rounded-lg p-3 bg-neutral-800">
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 hover:bg-neutral-700 rounded-full transition-colors"
            disabled={disabled}
          >
            <X className="w-4 h-4 text-neutral-500" />
          </button>

          <div className="flex items-center space-x-3">
            {uploadedFile.type === 'image' && uploadedFile.preview ? (
              <>
                <img
                  src={uploadedFile.preview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex items-center text-sm text-neutral-400">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {uploadedFile.name}
                </div>
              </>
            ) : (
              <div className="flex items-center text-sm text-neutral-400">
                <FileText className="w-8 h-8 mr-2 text-neutral-500" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-xs text-neutral-500">
                    {t('pdfExtracted')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && !isProcessing && fileInputRef.current?.click()}
          className={`
            border border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-neutral-500 bg-neutral-800' : 'border-neutral-700 hover:border-neutral-600'}
            ${disabled || isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border-2 border-neutral-600 border-t-neutral-400 rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-neutral-500">{t('processing')}</p>
            </div>
          ) : (
            <>
              <Upload className="w-5 h-5 mx-auto mb-1 text-neutral-500" />
              <p className="text-sm text-neutral-400">{t('dropZone')}</p>
              <p className="text-xs text-neutral-600 mt-1">
                {t('supportedFormats')}
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isProcessing}
      />
    </div>
  );
}
