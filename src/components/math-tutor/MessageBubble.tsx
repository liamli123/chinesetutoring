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

// Helper function to render a single line/paragraph with LaTeX
function renderLineWithMath(line: string, lineIndex: number) {
  // Check if this is a step header
  const stepMatch = line.match(/^(Step\s*\d+\s*:?)/i);
  const finalAnswerMatch = line.match(/^(Final\s*Answer\s*:?)/i);

  // Math patterns to handle
  const mathPatterns = [
    { regex: /\$\$([\s\S]*?)\$\$/g, type: 'block-math' as const },
    { regex: /\\\[([\s\S]*?)\\\]/g, type: 'block-math' as const },
    { regex: /\\\(([\s\S]*?)\\\)/g, type: 'inline-math' as const },
    { regex: /\$([^\$\n]+?)\$/g, type: 'inline-math' as const },
    { regex: /\\boxed\{([^}]+)\}/g, type: 'boxed' as const },
  ];

  let processedLine = line;
  const replacements: { placeholder: string; type: string; content: string }[] = [];
  let counter = 0;

  // Replace all math expressions with placeholders
  for (const { regex, type } of mathPatterns) {
    processedLine = processedLine.replace(regex, (match, captured) => {
      const placeholder = `__MATH_${lineIndex}_${counter}__`;
      replacements.push({ placeholder, type, content: captured });
      counter++;
      return placeholder;
    });
  }

  // Split by placeholders and rebuild
  const segments = processedLine.split(/(__MATH_\d+_\d+__)/g);

  const renderedSegments = segments.map((segment, index) => {
    const replacement = replacements.find(r => r.placeholder === segment);

    if (replacement) {
      try {
        if (replacement.type === 'block-math') {
          return (
            <div key={index} className="my-3 py-2 overflow-x-auto bg-neutral-900/50 rounded px-3">
              <BlockMath math={replacement.content} />
            </div>
          );
        } else if (replacement.type === 'inline-math') {
          return <InlineMath key={index} math={replacement.content} />;
        } else if (replacement.type === 'boxed') {
          return (
            <span
              key={index}
              className="inline-block px-3 py-1 mx-1 bg-green-900/50 border border-green-600 rounded-md font-bold text-green-300"
            >
              <InlineMath math={replacement.content} />
            </span>
          );
        }
      } catch (e) {
        return <span key={index}>{segment}</span>;
      }
    }

    // Handle step header styling
    if (index === 0 && stepMatch) {
      const restOfText = segment.replace(stepMatch[0], '');
      return (
        <span key={index}>
          <span className="font-bold text-blue-400">{stepMatch[0]}</span>
          {restOfText}
        </span>
      );
    }

    // Handle final answer styling
    if (index === 0 && finalAnswerMatch) {
      const restOfText = segment.replace(finalAnswerMatch[0], '');
      return (
        <span key={index}>
          <span className="font-bold text-green-400">{finalAnswerMatch[0]}</span>
          {restOfText}
        </span>
      );
    }

    return <span key={index}>{segment}</span>;
  });

  return <>{renderedSegments}</>;
}

// Main render function for message content
function renderMathContent(content: string) {
  // Split content into paragraphs (double newlines) and lines
  const paragraphs = content.split(/\n\n+/);

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, pIndex) => {
        // Check if paragraph is primarily a block equation
        const trimmed = paragraph.trim();
        if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
          const mathContent = trimmed.slice(2, -2);
          try {
            return (
              <div key={pIndex} className="my-3 py-2 overflow-x-auto bg-neutral-900/50 rounded px-3">
                <BlockMath math={mathContent} />
              </div>
            );
          } catch (e) {
            return <p key={pIndex} className="leading-relaxed">{paragraph}</p>;
          }
        }

        // Split paragraph into lines and render each
        const lines = paragraph.split(/\n/);

        return (
          <div key={pIndex} className="leading-relaxed">
            {lines.map((line, lIndex) => {
              if (!line.trim()) return null;

              // Check if this line is a step header (give it more prominence)
              const isStepHeader = /^Step\s*\d+/i.test(line.trim());
              const isFinalAnswer = /^Final\s*Answer/i.test(line.trim());

              return (
                <div
                  key={lIndex}
                  className={`${isStepHeader ? 'mt-4 mb-2' : ''} ${isFinalAnswer ? 'mt-6 mb-2 p-3 bg-green-900/20 border-l-4 border-green-500 rounded-r' : ''}`}
                >
                  {renderLineWithMath(line, pIndex * 1000 + lIndex)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
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
