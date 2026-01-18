'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Trash2, Brain, Plus, MessageSquare, X } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { FileUpload } from './FileUpload';
import { LoadingSpinner } from './LoadingSpinner';

interface Message {
  id: string;
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

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  mode: 'regular' | 'speciale';
  createdAt: number;
  updatedAt: number;
}

interface ChatBoxProps {
  mode: 'regular' | 'speciale';
}

const STORAGE_KEY = 'math-tutor-sessions';

export function ChatBox({ mode }: ChatBoxProps) {
  const t = useTranslations('mathTutor');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingMode, setThinkingMode] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevMessageCountRef = useRef<number>(0);

  // Load sessions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChatSession[];
        setSessions(parsed);
        // Find the most recent session for current mode
        const modeSession = parsed
          .filter(s => s.mode === mode)
          .sort((a, b) => b.updatedAt - a.updatedAt)[0];
        if (modeSession) {
          setCurrentSessionId(modeSession.id);
        }
      } catch {
        console.error('Failed to parse stored sessions');
      }
    }
  }, [mode]);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];
  const modeSessions = sessions.filter(s => s.mode === mode).sort((a, b) => b.updatedAt - a.updatedAt);

  // Only scroll when new messages are added
  useEffect(() => {
    if (messages.length > prevMessageCountRef.current && shouldScrollToBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevMessageCountRef.current = messages.length;
  }, [messages.length, shouldScrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: t('newChat'),
      messages: [],
      mode,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setShowSidebar(false);
    prevMessageCountRef.current = 0;
  };

  const updateSessionMessages = (sessionId: string, newMessages: Message[]) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        // Update title based on first user message
        const firstUserMsg = newMessages.find(m => m.role === 'user');
        const title = firstUserMsg
          ? firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? '...' : '')
          : t('newChat');
        return { ...s, messages: newMessages, title, updatedAt: Date.now() };
      }
      return s;
    }));
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      const remaining = sessions.filter(s => s.id !== sessionId && s.mode === mode);
      setCurrentSessionId(remaining[0]?.id || null);
    }
  };

  const switchSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      prevMessageCountRef.current = session.messages.length;
    }
    setCurrentSessionId(sessionId);
    setShowSidebar(false);
  };

  const handleSend = async () => {
    if (!input.trim() && !imageBase64 && !pdfText) return;
    if (isLoading) return;

    setShouldScrollToBottom(true);

    // Create session if none exists
    let sessionId = currentSessionId;
    if (!sessionId) {
      const newSession: ChatSession = {
        id: `session-${Date.now()}`,
        title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
        messages: [],
        mode,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setSessions(prev => [newSession, ...prev]);
      sessionId = newSession.id;
      setCurrentSessionId(sessionId);
      prevMessageCountRef.current = 0;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input || (imageBase64 ? t('imageSent') : t('pdfSent')),
      imageUrl: imageBase64 || undefined,
    };

    const currentMessages = sessions.find(s => s.id === sessionId)?.messages || [];
    const updatedMessages = [...currentMessages, userMessage];
    updateSessionMessages(sessionId, updatedMessages);

    setInput('');
    setIsLoading(true);

    // Build history for API
    const history = currentMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    try {
      const endpoint = mode === 'regular' ? '/api/solve-regular' : '/api/solve-speciale';

      const requestBody: Record<string, unknown> = {
        message: input,
        history,
      };

      if (mode === 'regular') {
        requestBody.thinkingMode = thinkingMode;
        if (imageBase64) requestBody.imageBase64 = imageBase64;
        if (pdfText) requestBody.pdfText = pdfText;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.solution,
        reasoning: data.reasoning,
        tokens: data.tokens,
        cost: data.cost,
      };

      updateSessionMessages(sessionId, [...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: t('error') + ': ' + (error instanceof Error ? error.message : 'Unknown error'),
      };
      updateSessionMessages(sessionId, [...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setImageBase64(null);
      setPdfText(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearCurrent = () => {
    if (currentSessionId) {
      updateSessionMessages(currentSessionId, []);
      prevMessageCountRef.current = 0;
    }
  };

  const isRegular = mode === 'regular';

  return (
    <div className="flex h-full bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
      {/* Sidebar */}
      <div className={`${showSidebar ? 'w-64' : 'w-0'} transition-all duration-200 overflow-hidden border-r border-neutral-800 bg-neutral-950 flex flex-col flex-shrink-0`}>
        <div className="p-3 border-b border-neutral-800">
          <button
            onClick={createNewSession}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t('newChat')}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {modeSessions.map(session => (
            <div
              key={session.id}
              className={`group flex items-center px-3 py-2 cursor-pointer hover:bg-neutral-800 ${
                session.id === currentSessionId ? 'bg-neutral-800' : ''
              }`}
              onClick={() => switchSession(session.id)}
            >
              <MessageSquare className="w-4 h-4 text-neutral-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-neutral-400 truncate flex-1">{session.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(session.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-700 rounded transition-opacity"
              >
                <X className="w-3 h-3 text-neutral-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-2 border-b border-neutral-800 bg-neutral-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-neutral-400" />
              </button>
              <div>
                <h3 className="font-medium text-neutral-200 text-sm">
                  {isRegular ? t('regular.title') : t('speciale.title')}
                </h3>
                <span className="text-xs text-neutral-500">
                  {isRegular ? t('regular.badge') : t('speciale.badge')}
                </span>
              </div>
            </div>

            <button
              onClick={handleClearCurrent}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              title={t('clearChat')}
            >
              <Trash2 className="w-4 h-4 text-neutral-500" />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-neutral-900">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-500">
              <p className="text-center text-sm">
                {isRegular ? t('regular.placeholder') : t('speciale.placeholder')}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
                reasoning={message.reasoning}
                tokens={message.tokens}
                cost={message.cost}
                imageUrl={message.imageUrl}
              />
            ))
          )}

          {isLoading && <LoadingSpinner mode={mode} />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="flex-shrink-0 border-t border-neutral-800 p-4 bg-neutral-900">
          {/* File upload for regular mode only */}
          {isRegular && (
            <FileUpload
              onImageSelect={setImageBase64}
              onPdfTextExtract={setPdfText}
              onClear={() => {
                setImageBase64(null);
                setPdfText(null);
              }}
              disabled={isLoading}
            />
          )}

          {/* Text-only notice for speciale mode */}
          {!isRegular && (
            <div className="mb-3 p-2 bg-neutral-800 border border-neutral-700 rounded-lg">
              <p className="text-xs text-neutral-500 flex items-center">
                <span className="mr-2">📝</span>
                {t('speciale.textOnly')}
              </p>
            </div>
          )}

          {/* Thinking mode toggle for regular mode */}
          {isRegular && (
            <div className="flex items-center mb-3">
              <button
                onClick={() => setThinkingMode(!thinkingMode)}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  thinkingMode
                    ? 'bg-neutral-700 text-neutral-200 border border-neutral-600'
                    : 'bg-neutral-800 text-neutral-500 hover:text-neutral-400 border border-neutral-700'
                }`}
              >
                <Brain className="w-4 h-4 mr-2" />
                {t('thinkingMode')}
                <span className={`ml-2 w-2 h-2 rounded-full ${thinkingMode ? 'bg-white' : 'bg-neutral-600'}`} />
              </button>
            </div>
          )}

          {/* Input field and send button */}
          <div className="flex items-end space-x-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('inputPlaceholder')}
              disabled={isLoading}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-neutral-700 bg-neutral-800 text-neutral-200 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:border-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm placeholder-neutral-500"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !imageBase64 && !pdfText)}
              className={`p-3 rounded-xl transition-colors ${
                isLoading || (!input.trim() && !imageBase64 && !pdfText)
                  ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                  : 'bg-white text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
