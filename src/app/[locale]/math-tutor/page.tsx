'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/navbar';
import { ChatBox } from '@/components/math-tutor/ChatBox';
import { Zap, Brain } from 'lucide-react';

export default function MathTutorPage() {
  const t = useTranslations('mathTutor');
  const [mode, setMode] = useState<'regular' | 'speciale'>('regular');

  return (
    <div className="fixed inset-0 flex flex-col bg-neutral-950">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center py-4 px-4 min-h-0">
        {/* Mode Toggle */}
        <div className="flex-shrink-0 mb-4">
          <div className="inline-flex bg-neutral-800 rounded-lg p-1">
            <button
              onClick={() => setMode('regular')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'regular'
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Zap className="w-4 h-4 mr-2" />
              {t('regular.title')}
            </button>
            <button
              onClick={() => setMode('speciale')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'speciale'
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Brain className="w-4 h-4 mr-2" />
              {t('speciale.title')}
            </button>
          </div>
        </div>

        {/* Chat Window */}
        <div className="w-full max-w-5xl flex-1 min-h-0">
          <ChatBox mode={mode} />
        </div>
      </div>
    </div>
  );
}
