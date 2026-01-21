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

// Strip markdown formatting
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // **bold** -> bold
    .replace(/\*([^*]+)\*/g, '$1')       // *italic* -> italic
    .replace(/^#{1,6}\s*/gm, '')         // ## headers -> text
    .replace(/^[-*_]{3,}\s*$/gm, '')     // --- or *** -> nothing
    .replace(/`([^`]+)`/g, '$1');        // `code` -> code
}

// Helper function to render a single line/paragraph with LaTeX
function renderLineWithMath(line: string, lineIndex: number) {
  // Strip markdown first
  line = stripMarkdown(line);

  // Check if this is a step header
  const stepMatch = line.match(/^(Step\s*\d+\s*:?)/i);
  const finalAnswerMatch = line.match(/^(Final\s*Answer\s*:?)/i);

  // Check for section labels (Given:, Using:, Result:)
  const givenMatch = line.match(/^(Given\s*:)/i);
  const usingMatch = line.match(/^(Using\s*:)/i);
  const resultMatch = line.match(/^(Result\s*:)/i);

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

    // Handle section labels (Given:, Using:, Result:)
    if (index === 0 && givenMatch) {
      const restOfText = segment.replace(givenMatch[0], '');
      return (
        <span key={index}>
          <span className="font-semibold text-yellow-400">{givenMatch[0]}</span>
          {restOfText}
        </span>
      );
    }
    if (index === 0 && usingMatch) {
      const restOfText = segment.replace(usingMatch[0], '');
      return (
        <span key={index}>
          <span className="font-semibold text-cyan-400">{usingMatch[0]}</span>
          {restOfText}
        </span>
      );
    }
    if (index === 0 && resultMatch) {
      const restOfText = segment.replace(resultMatch[0], '');
      return (
        <span key={index}>
          <span className="font-semibold text-purple-400">{resultMatch[0]}</span>
          {restOfText}
        </span>
      );
    }

    return <span key={index}>{segment}</span>;
  });

  return <>{renderedSegments}</>;
}

// Parse content into structured blocks (equations, text, steps)
function parseIntoBlocks(content: string): Array<{ type: 'step' | 'equation' | 'text' | 'final'; content: string }> {
  const blocks: Array<{ type: 'step' | 'equation' | 'text' | 'final'; content: string }> = [];

  // First, extract all block equations and replace with placeholders
  let processed = content;
  const equations: string[] = [];

  // Extract $$...$$ equations
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (_, eq) => {
    equations.push(eq.trim());
    return `__EQ_${equations.length - 1}__`;
  });

  // Extract \[...\] equations
  processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (_, eq) => {
    equations.push(eq.trim());
    return `__EQ_${equations.length - 1}__`;
  });

  // Split by Step headers and Final Answer
  const parts = processed.split(/(Step\s*\d+\s*:?|Final\s*Answer\s*:?)/i);

  let currentType: 'step' | 'text' | 'final' = 'text';
  let stepNum = 0;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue;

    // Check if this is a header
    if (/^Step\s*\d+/i.test(part)) {
      currentType = 'step';
      stepNum++;
      continue;
    }
    if (/^Final\s*Answer/i.test(part)) {
      currentType = 'final';
      continue;
    }

    // Process the content - split by equation placeholders
    const segments = part.split(/(__EQ_\d+__)/g);

    for (const segment of segments) {
      const trimmed = segment.trim();
      if (!trimmed) continue;

      // Check if it's an equation placeholder
      const eqMatch = trimmed.match(/__EQ_(\d+)__/);
      if (eqMatch) {
        const eqIndex = parseInt(eqMatch[1]);
        blocks.push({ type: 'equation', content: equations[eqIndex] });
      } else {
        // It's text - split into sentences for better readability
        const sentences = trimmed.split(/(?<=[.!?])\s+/);
        const textContent = sentences.join('\n');
        blocks.push({ type: currentType === 'final' ? 'final' : currentType, content: textContent });
      }
    }
  }

  return blocks;
}

// Render a single block
function renderBlock(block: { type: string; content: string }, index: number) {
  if (block.type === 'equation') {
    try {
      return (
        <div key={index} className="my-4 py-3 px-4 bg-neutral-900/60 rounded-lg border-l-3 border-blue-400 overflow-x-auto">
          <BlockMath math={block.content} />
        </div>
      );
    } catch {
      return <div key={index} className="text-red-400">{block.content}</div>;
    }
  }

  if (block.type === 'step') {
    return (
      <div key={index} className="bg-neutral-800/40 rounded-lg p-4 border-l-4 border-blue-500">
        <div className="space-y-2">
          {block.content.split('\n').map((line, i) => (
            <div key={i} className="leading-relaxed">
              {renderLineWithMath(line, index * 100 + i)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'final') {
    return (
      <div key={index} className="bg-green-900/30 rounded-lg p-4 border-l-4 border-green-500">
        <div className="font-semibold text-green-400 mb-2">Final Answer</div>
        <div className="space-y-2">
          {block.content.split('\n').map((line, i) => (
            <div key={i}>
              {renderLineWithMath(line, index * 100 + i)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Regular text
  return (
    <div key={index} className="leading-relaxed text-neutral-300">
      {block.content.split('\n').map((line, i) => (
        <div key={i} className="py-1">
          {renderLineWithMath(line, index * 100 + i)}
        </div>
      ))}
    </div>
  );
}

// Main render function for message content
function renderMathContent(content: string) {
  const blocks = parseIntoBlocks(content);

  // Group consecutive step blocks with their equations
  const groupedContent: React.ReactElement[] = [];
  let currentStepContent: Array<{ type: string; content: string }> = [];
  let stepCounter = 0;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    if (block.type === 'step') {
      // If we have accumulated content, flush it
      if (currentStepContent.length > 0) {
        stepCounter++;
        groupedContent.push(
          <div key={`step-${stepCounter}`} className="bg-neutral-800/40 rounded-lg p-4 border-l-4 border-blue-500 space-y-3">
            <div className="font-semibold text-blue-400 pb-2 border-b border-neutral-700">Step {stepCounter}</div>
            {currentStepContent.map((b, j) => {
              if (b.type === 'equation') {
                try {
                  return (
                    <div key={j} className="py-2 px-3 bg-neutral-900/50 rounded overflow-x-auto">
                      <BlockMath math={b.content} />
                    </div>
                  );
                } catch {
                  return <div key={j}>{b.content}</div>;
                }
              }
              return (
                <div key={j} className="text-neutral-300 leading-relaxed">
                  {b.content.split('\n').map((line, k) => (
                    <div key={k}>{renderLineWithMath(line, j * 100 + k)}</div>
                  ))}
                </div>
              );
            })}
          </div>
        );
        currentStepContent = [];
      }
      currentStepContent.push(block);
    } else if (block.type === 'equation' && currentStepContent.length > 0) {
      currentStepContent.push(block);
    } else if (block.type === 'final') {
      // Flush any remaining step content
      if (currentStepContent.length > 0) {
        stepCounter++;
        groupedContent.push(
          <div key={`step-${stepCounter}`} className="bg-neutral-800/40 rounded-lg p-4 border-l-4 border-blue-500 space-y-3">
            <div className="font-semibold text-blue-400 pb-2 border-b border-neutral-700">Step {stepCounter}</div>
            {currentStepContent.map((b, j) => {
              if (b.type === 'equation') {
                try {
                  return (
                    <div key={j} className="py-2 px-3 bg-neutral-900/50 rounded overflow-x-auto">
                      <BlockMath math={b.content} />
                    </div>
                  );
                } catch {
                  return <div key={j}>{b.content}</div>;
                }
              }
              return (
                <div key={j} className="text-neutral-300 leading-relaxed">
                  {b.content.split('\n').map((line, k) => (
                    <div key={k}>{renderLineWithMath(line, j * 100 + k)}</div>
                  ))}
                </div>
              );
            })}
          </div>
        );
        currentStepContent = [];
      }

      // Render final answer
      groupedContent.push(
        <div key={`final-${i}`} className="bg-green-900/30 rounded-lg p-4 border-l-4 border-green-500">
          <div className="font-semibold text-green-400 mb-3">Final Answer</div>
          <div className="space-y-2">
            {block.content.split('\n').map((line, k) => (
              <div key={k}>{renderLineWithMath(line, i * 100 + k)}</div>
            ))}
          </div>
        </div>
      );
    } else {
      // Standalone content
      if (currentStepContent.length > 0) {
        currentStepContent.push(block);
      } else {
        groupedContent.push(renderBlock(block, i));
      }
    }
  }

  // Flush any remaining content
  if (currentStepContent.length > 0) {
    stepCounter++;
    groupedContent.push(
      <div key={`step-final-${stepCounter}`} className="bg-neutral-800/40 rounded-lg p-4 border-l-4 border-blue-500 space-y-3">
        <div className="font-semibold text-blue-400 pb-2 border-b border-neutral-700">Step {stepCounter}</div>
        {currentStepContent.map((b, j) => {
          if (b.type === 'equation') {
            try {
              return (
                <div key={j} className="py-2 px-3 bg-neutral-900/50 rounded overflow-x-auto">
                  <BlockMath math={b.content} />
                </div>
              );
            } catch {
              return <div key={j}>{b.content}</div>;
            }
          }
          return (
            <div key={j} className="text-neutral-300 leading-relaxed">
              {b.content.split('\n').map((line, k) => (
                <div key={k}>{renderLineWithMath(line, j * 100 + k)}</div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  return <div className="space-y-4">{groupedContent}</div>;
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
