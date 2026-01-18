'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  tokens?: {
    input: number;
    output: number;
  };
  cost?: number;
  imageUrl?: string;
}

// Helper function to render content with LaTeX and \boxed{} highlighting
function renderMathContent(content: string) {
  // Split content by LaTeX delimiters
  // Handle: $...$ (inline), $$...$$ (block), \[...\] (block), \(...\) (inline), \boxed{...}

  const parts: { type: 'text' | 'inline-math' | 'block-math' | 'boxed'; content: string }[] = [];
  let remaining = content;

  // Process the content to extract math expressions
  const mathPatterns = [
    { regex: /\$\$([\s\S]*?)\$\$/g, type: 'block-math' as const },
    { regex: /\\\[([\s\S]*?)\\\]/g, type: 'block-math' as const },
    { regex: /\\\(([\s\S]*?)\\\)/g, type: 'inline-math' as const },
    { regex: /\$([^\$\n]+?)\$/g, type: 'inline-math' as const },
    { regex: /\\boxed\{([^}]+)\}/g, type: 'boxed' as const },
  ];

  // Simple approach: split by patterns and reassemble
  let processedContent = content;
  const replacements: { placeholder: string; type: string; content: string }[] = [];
  let counter = 0;

  // Replace all math expressions with placeholders
  for (const { regex, type } of mathPatterns) {
    processedContent = processedContent.replace(regex, (match, captured) => {
      const placeholder = `__MATH_${counter}__`;
      replacements.push({ placeholder, type, content: captured });
      counter++;
      return placeholder;
    });
  }

  // Split by placeholders and rebuild
  const segments = processedContent.split(/(__MATH_\d+__)/g);

  return (
    <span className="whitespace-pre-wrap">
      {segments.map((segment, index) => {
        const replacement = replacements.find(r => r.placeholder === segment);

        if (replacement) {
          try {
            if (replacement.type === 'block-math') {
              return (
                <div key={index} className="my-2 overflow-x-auto">
                  <BlockMath math={replacement.content} />
                </div>
              );
            } else if (replacement.type === 'inline-math') {
              return <InlineMath key={index} math={replacement.content} />;
            } else if (replacement.type === 'boxed') {
              return (
                <span
                  key={index}
                  className="inline-block px-3 py-1 mx-1 bg-neutral-800 border border-neutral-600 rounded-md font-bold text-white"
                >
                  <InlineMath math={replacement.content} />
                </span>
              );
            }
          } catch (e) {
            // If LaTeX parsing fails, return as text
            return <span key={index}>{segment}</span>;
          }
        }

        return <span key={index}>{segment}</span>;
      })}
    </span>
  );
}

export function MessageBubble({
  role,
  content,
  reasoning,
  tokens,
  cost,
  imageUrl,
}: MessageBubbleProps) {
  const t = useTranslations('mathTutor');
  const [showReasoning, setShowReasoning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = role === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-neutral-700 text-white'
            : 'bg-neutral-800 text-neutral-100'
        }`}
      >
        {/* Image preview for user messages */}
        {imageUrl && isUser && (
          <div className="mb-2">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="max-w-full max-h-48 rounded-lg object-contain"
            />
          </div>
        )}

        {/* Message content */}
        <div className="text-sm md:text-base">
          {isUser ? content : renderMathContent(content)}
        </div>

        {/* Reasoning section (collapsible) */}
        {reasoning && (
          <div className="mt-3 pt-3 border-t border-neutral-700">
            <button
              onClick={() => setShowReasoning(!showReasoning)}
              className="flex items-center text-xs text-neutral-400 hover:text-neutral-300 transition-colors"
            >
              {showReasoning ? (
                <ChevronUp className="w-4 h-4 mr-1" />
              ) : (
                <ChevronDown className="w-4 h-4 mr-1" />
              )}
              {t('reasoning')}
            </button>
            {showReasoning && (
              <div className="mt-2 p-2 bg-neutral-900 rounded-lg text-xs text-neutral-300 max-h-48 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono">{reasoning}</pre>
              </div>
            )}
          </div>
        )}

        {/* Token usage and cost display */}
        {!isUser && (tokens || cost !== undefined) && (
          <div className="mt-3 pt-3 border-t border-neutral-700 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-3 text-xs text-neutral-500">
              {tokens && (
                <span>
                  {t('tokens')}: {tokens.input + tokens.output}
                </span>
              )}
              {cost !== undefined && (
                <span className="text-neutral-400">
                  ${cost.toFixed(6)}
                </span>
              )}
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="flex items-center text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-1 text-white" />
              ) : (
                <Copy className="w-4 h-4 mr-1" />
              )}
              {copied ? t('copied') : t('copy')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
