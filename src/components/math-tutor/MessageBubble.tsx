'use client';

import React, { useState } from 'react';
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

// Parse and render inline content (bold, inline math)
function renderInlineContent(text: string, keyPrefix: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let index = 0;

  while (remaining.length > 0) {
    // Check for inline math $...$ (not $$)
    const inlineMathMatch = remaining.match(/^\$([^\$\n]+?)\$/);
    if (inlineMathMatch) {
      try {
        elements.push(<InlineMath key={`${keyPrefix}-${index}`} math={inlineMathMatch[1]} />);
      } catch {
        elements.push(<span key={`${keyPrefix}-${index}`}>{inlineMathMatch[0]}</span>);
      }
      remaining = remaining.slice(inlineMathMatch[0].length);
      index++;
      continue;
    }

    // Check for \(...\) inline math
    const inlineMathMatch2 = remaining.match(/^\\\(([^)]+?)\\\)/);
    if (inlineMathMatch2) {
      try {
        elements.push(<InlineMath key={`${keyPrefix}-${index}`} math={inlineMathMatch2[1]} />);
      } catch {
        elements.push(<span key={`${keyPrefix}-${index}`}>{inlineMathMatch2[0]}</span>);
      }
      remaining = remaining.slice(inlineMathMatch2[0].length);
      index++;
      continue;
    }

    // Check for bold **text**
    const boldMatch = remaining.match(/^\*\*([^*]+?)\*\*/);
    if (boldMatch) {
      elements.push(
        <strong key={`${keyPrefix}-${index}`} className="font-semibold text-white">
          {renderInlineContent(boldMatch[1], `${keyPrefix}-${index}-b`)}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      index++;
      continue;
    }

    // Check for checkmark ✓
    const checkMatch = remaining.match(/^✓/);
    if (checkMatch) {
      elements.push(
        <span key={`${keyPrefix}-${index}`} className="text-green-400 font-bold">✓</span>
      );
      remaining = remaining.slice(1);
      index++;
      continue;
    }

    // Regular text - find the next special character
    const nextSpecial = remaining.search(/(\$|\*\*|✓|\\[\(\[])/);
    if (nextSpecial === -1) {
      elements.push(<span key={`${keyPrefix}-${index}`}>{remaining}</span>);
      break;
    } else if (nextSpecial === 0) {
      // If we're here, we couldn't match any pattern, consume one character
      elements.push(<span key={`${keyPrefix}-${index}`}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
      index++;
    } else {
      elements.push(<span key={`${keyPrefix}-${index}`}>{remaining.slice(0, nextSpecial)}</span>);
      remaining = remaining.slice(nextSpecial);
      index++;
    }
  }

  return elements;
}

// Render a block of math ($$...$$ or \[...\])
function renderBlockMath(math: string, key: string): React.ReactNode {
  try {
    // Check if it contains \boxed
    const hasBoxed = math.includes('\\boxed');
    return (
      <div
        key={key}
        className={`my-4 py-3 px-4 rounded-lg overflow-x-auto ${
          hasBoxed
            ? 'bg-green-900/30 border border-green-600/50'
            : 'bg-neutral-900/60 border border-neutral-700/50'
        }`}
      >
        <BlockMath math={math} />
      </div>
    );
  } catch {
    return <div key={key} className="text-red-400 font-mono text-sm">{math}</div>;
  }
}

// Main markdown parser and renderer
function renderMarkdown(content: string): React.ReactNode {
  const elements: React.ReactNode[] = [];

  // Split content into lines for processing
  const lines = content.split('\n');
  let index = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Skip empty lines but add spacing
    if (!trimmedLine) {
      i++;
      continue;
    }

    // Check for block math $$...$$ (may span multiple lines)
    if (trimmedLine.startsWith('$$')) {
      let mathContent = trimmedLine.slice(2);
      let endIndex = i;

      // Check if it ends on the same line
      if (mathContent.endsWith('$$') && mathContent.length > 2) {
        mathContent = mathContent.slice(0, -2);
      } else {
        // Find the closing $$
        endIndex++;
        while (endIndex < lines.length && !lines[endIndex].trim().endsWith('$$')) {
          mathContent += '\n' + lines[endIndex];
          endIndex++;
        }
        if (endIndex < lines.length) {
          const lastLine = lines[endIndex].trim();
          mathContent += '\n' + lastLine.slice(0, -2);
        }
      }

      elements.push(renderBlockMath(mathContent.trim(), `block-${index}`));
      index++;
      i = endIndex + 1;
      continue;
    }

    // Check for \[...\] block math
    if (trimmedLine.startsWith('\\[')) {
      let mathContent = trimmedLine.slice(2);
      let endIndex = i;

      if (mathContent.endsWith('\\]')) {
        mathContent = mathContent.slice(0, -2);
      } else {
        endIndex++;
        while (endIndex < lines.length && !lines[endIndex].trim().endsWith('\\]')) {
          mathContent += '\n' + lines[endIndex];
          endIndex++;
        }
        if (endIndex < lines.length) {
          const lastLine = lines[endIndex].trim();
          mathContent += '\n' + lastLine.slice(0, -2);
        }
      }

      elements.push(renderBlockMath(mathContent.trim(), `block-${index}`));
      index++;
      i = endIndex + 1;
      continue;
    }

    // Horizontal rule ---
    if (/^[-*_]{3,}$/.test(trimmedLine)) {
      elements.push(
        <hr key={`hr-${index}`} className="my-6 border-neutral-600" />
      );
      index++;
      i++;
      continue;
    }

    // H1 header #
    if (trimmedLine.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${index}`} className="text-xl font-bold text-white mt-6 mb-3 pb-2 border-b border-neutral-600">
          {renderInlineContent(trimmedLine.slice(2), `h1-${index}`)}
        </h1>
      );
      index++;
      i++;
      continue;
    }

    // H2 header ##
    if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${index}`} className="text-lg font-bold text-blue-400 mt-5 mb-2">
          {renderInlineContent(trimmedLine.slice(3), `h2-${index}`)}
        </h2>
      );
      index++;
      i++;
      continue;
    }

    // H3 header ###
    if (trimmedLine.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${index}`} className="text-base font-semibold text-cyan-400 mt-4 mb-2">
          {renderInlineContent(trimmedLine.slice(4), `h3-${index}`)}
        </h3>
      );
      index++;
      i++;
      continue;
    }

    // H4 header ####
    if (trimmedLine.startsWith('#### ')) {
      elements.push(
        <h4 key={`h4-${index}`} className="text-sm font-semibold text-purple-400 mt-3 mb-1">
          {renderInlineContent(trimmedLine.slice(5), `h4-${index}`)}
        </h4>
      );
      index++;
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${index}`} className="my-2 leading-relaxed text-neutral-200">
        {renderInlineContent(trimmedLine, `p-${index}`)}
      </p>
    );
    index++;
    i++;
  }

  return <div className="space-y-1">{elements}</div>;
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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[90%] rounded-2xl px-5 py-4 ${
          isUser
            ? 'bg-neutral-700 text-white'
            : 'bg-neutral-800/90 text-neutral-100'
        }`}
      >
        {/* Image preview for user messages */}
        {imageUrl && isUser && (
          <div className="mb-3">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="max-w-full max-h-48 rounded-lg object-contain"
            />
          </div>
        )}

        {/* Message content */}
        <div className="text-sm md:text-base">
          {isUser ? content : (
            <pre className="whitespace-pre-wrap font-mono text-sm bg-neutral-900 p-4 rounded-lg overflow-x-auto">
              {content}
            </pre>
          )}
        </div>

        {/* Reasoning section (collapsible) */}
        {reasoning && (
          <div className="mt-4 pt-3 border-t border-neutral-700">
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
              <div className="mt-2 p-3 bg-neutral-900 rounded-lg text-xs text-neutral-300 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono">{reasoning}</pre>
              </div>
            )}
          </div>
        )}

        {/* Token usage and cost display */}
        {!isUser && (tokens || cost !== undefined) && (
          <div className="mt-4 pt-3 border-t border-neutral-700 flex items-center justify-between flex-wrap gap-2">
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
                <Check className="w-4 h-4 mr-1 text-green-400" />
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
