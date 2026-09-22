import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Mic, MicOff, Volume2, VolumeX, Sparkles, BrainCircuit, RefreshCw, MessageSquare } from 'lucide-react';
import { Monument, Language, ChatMessage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { findLocalHeritageAnswer } from '../data/aiAssistantKnowledge';

interface AIAssistantProps {
  language: Language;
  contextMonument?: Monument | null;
  onNavigateToMonument?: (monumentId: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  language,
  contextMonument,
}) => {
  const t = TRANSLATIONS[language];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text:
        language === 'kn'
          ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಬಾಗಲಕೋಟೆ ಹೆರಿಟೇಜ್ ಎಐ ಸಹಾಯಕ. ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಯ ಚಾಲುಕ್ಯ ಪರಂಪರೆ, ಇತಿಹಾಸ, ಶಿಲ್ಪಕಲೆ ಮತ್ತು ಮಾರ್ಗಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.'
          : language === 'hi'
          ? 'नमस्ते! मैं आपका बागलकोट हेरिटेज एआई सहायक हूँ। बादामी, पट्टदकल और ऐहोले के इतिहास, वास्तुकला या पर्यटन योजना के बारे में मुझसे कोई भी प्रश्न पूछें।'
          : "Namaskara! I am your AI Heritage Assistant for Bagalkote. Ask me anything about Badami Cave Temples, Virupaksha Temple at Pattadakal, Aihole's architectural cradles, visiting timings, or travel itineraries.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [highThinking, setHighThinking] = useState(false);

  // Suggested prompts as mandated
  const suggestedPrompts = [
    'Tell me about Badami Caves.',
    'Who built Virupaksha Temple?',
    'What should I visit near Pattadakal?',
    'Plan a one-day heritage trip.',
    'Explain this monument in Kannada.',
  ];

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Check speech recognition support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Voice Input handler
  const handleToggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by this browser. Please type your query.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.warn('Speech recognition exception:', e);
      setIsListening(false);
    }
  };

  // Text-To-Speech SpeechSynthesis
  const handleSpeakText = (messageId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (currentlySpeakingId === messageId) {
      window.speechSynthesis.cancel();
      setCurrentlySpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setCurrentlySpeakingId(null);
    };

    utterance.onerror = () => {
      setCurrentlySpeakingId(null);
    };

    setCurrentlySpeakingId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    let aiResponseText = '';
    let liveAiSuccess = false;

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          monumentContext: contextMonument ? contextMonument.name : undefined,
          language: language,
          highThinking: highThinking,
        }),
      });

      const data = await response.json();
      if (data && data.isLiveAI && data.response) {
        aiResponseText = data.response;
        liveAiSuccess = true;
      }
    } catch (e) {
      console.warn('Backend chat API failed or offline:', e);
    }

    // If Gemini key is not configured or failed, use domain knowledge base
    if (!liveAiSuccess || !aiResponseText) {
      aiResponseText = findLocalHeritageAnswer(query, language);
    }

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isHighThinking: highThinking,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title & Subtitle */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Bot className="w-4 h-4 text-purple-400" />
          <span>Multilingual Conversational Assistant</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          {t.assistantTitle}
        </h2>
        <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
          {t.assistantSubtitle}
        </p>

        {contextMonument && (
          <div className="inline-block mt-1 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium">
            Active Monument Context: <span className="font-bold text-white">{contextMonument.name}</span>
          </div>
        )}
      </div>

      {/* Main Chat Container */}
      <div className="bg-[#141b29] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[560px]">
        {/* Chat Header Controls */}
        <div className="px-6 py-3.5 bg-[#101520] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">AI Assistant</p>
              <p className="text-[10px] text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ready • English, ಕನ್ನಡ, हिन्दी</span>
              </p>
            </div>
          </div>

          {/* High Thinking Mode Toggle */}
          <button
            id="chat-toggle-thinking"
            onClick={() => setHighThinking(!highThinking)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border flex items-center space-x-1.5 transition-all ${
              highThinking
                ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                : 'bg-black/30 border-gray-700 text-gray-400 hover:text-white'
            }`}
            title="Enable in-depth architectural reasoning"
          >
            <BrainCircuit className={`w-3.5 h-3.5 ${highThinking ? 'text-purple-300' : 'text-gray-400'}`} />
            <span className="hidden sm:inline">{t.thinkingMode}</span>
            <span className="sm:hidden">Thinking</span>
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            const isSpeaking = currentlySpeakingId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                    isAi
                      ? 'bg-[#1b2333] text-gray-100 border border-gray-700/70'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-medium'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  <div
                    className={`mt-2 pt-2 flex items-center justify-between text-[10px] ${
                      isAi ? 'border-t border-gray-700/50 text-gray-400' : 'border-t border-amber-600 text-gray-900'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {/* Audio read-aloud button for AI messages */}
                    {isAi && (
                      <button
                        id={`chat-speak-${msg.id}`}
                        onClick={() => handleSpeakText(msg.id, msg.text)}
                        className="flex items-center space-x-1 hover:text-amber-300 transition-colors"
                        title={isSpeaking ? t.stopAudio : t.readAloud}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3 h-3 text-red-400 animate-pulse" />
                            <span className="text-red-400 font-bold">{t.stopAudio}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-amber-400" />
                            <span>{t.readAloud}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {!isAi && (
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-gray-950 font-bold flex items-center justify-center flex-shrink-0 mt-1 shadow">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-[#1b2333] px-3.5 py-2 rounded-xl border border-gray-700/60 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-gray-300 ml-1">AI Assistant is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions Carousel */}
        <div className="px-4 py-2 bg-[#101622] border-t border-gray-800/80 overflow-x-auto scrollbar-none flex items-center space-x-2">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider whitespace-nowrap pl-1">
            {t.suggestedQuestions}:
          </span>
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              id={`suggested-prompt-${idx}`}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-amber-500/20 border border-gray-700/80 hover:border-amber-400/50 text-gray-300 hover:text-white text-xs whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Query Input Box */}
        <div className="p-4 bg-[#0d121c] border-t border-gray-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            {/* Microphone Voice Input */}
            <button
              type="button"
              id="chat-voice-input-btn"
              onClick={handleToggleVoiceInput}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-red-600 border-red-400 text-white animate-pulse'
                  : 'bg-white/5 border-gray-700 text-gray-300 hover:text-white hover:border-amber-400'
              }`}
              title={isListening ? 'Listening... click to stop' : t.voiceInput}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-amber-400" />}
            </button>

            {/* Input field */}
            <input
              type="text"
              id="chat-query-input"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="flex-1 bg-[#161d2b] border border-gray-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />

            {/* Send Button */}
            <button
              type="submit"
              id="chat-send-btn"
              disabled={!inputQuery.trim() || isTyping}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-gray-950 font-bold text-xs sm:text-sm shadow-md flex items-center space-x-1.5 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t.sendButton}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
