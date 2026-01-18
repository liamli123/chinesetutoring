'use client';

import { useTranslations } from 'next-intl';

interface LoadingSpinnerProps {
  mode: 'regular' | 'speciale';
}

export function LoadingSpinner({ mode }: LoadingSpinnerProps) {
  const t = useTranslations('mathTutor');

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <div className="w-8 h-8 border-2 border-neutral-700 border-t-neutral-300 rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-neutral-500">
          {mode === 'regular' ? t('loading.regular') : t('loading.speciale')}
        </p>
      </div>
    </div>
  );
}
