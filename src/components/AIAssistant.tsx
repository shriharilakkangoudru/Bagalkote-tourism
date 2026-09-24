import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Mic, MicOff, Volume2, VolumeX, Sparkles, BrainCircuit, RefreshCw, MessageSquare, Globe } from 'lucide-react';
import { Monument, Language, ChatMessage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { findLocalHeritageAnswer } from '../data/aiAssistantKnowledge';
import { speakMultilingualText, stopAllSpeech, isTTSSupported, isMicSupported } from '../utils/speechUtils';

interface AIAssistantProps {
  language: Language;
  onSelectLanguage?: (lang: Language) => void;
  contextMonument?: Monument | null;
  onNavigateToMonument?: (monumentId: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  language,
  onSelectLanguage,
  contextMonument,
}) => {
  const t = TRANSLATIONS[language];
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const [inputQuery, setInputQuery] = useState('');
  const [voiceLang, setVoiceLang] = useState<Language>(language);

  const getWelcomeText = (lang: Language) =>
    lang === 'kn'
      ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಬಾಗಲಕೋಟೆ ಹೆರಿಟೇಜ್ ಎಐ ಸಹಾಯಕ. ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಯ ಚಾಲುಕ್ಯ ಪರಂಪರೆ, ಇತಿಹಾಸ, ಶಿಲ್ಪಕಲೆ ಮತ್ತು ಮಾರ್ಗಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ. ನೀವು ಧ್ವನಿ (ಮೈಕ್) ಮೂಲಕವೂ ಮಾತನಾಡಬಹುದು!'
      : lang === 'hi'
      ? 'नमस्ते! मैं आपका बागलकोट हेरिटेज एआई सहायक हूँ। बादामी, पट्टदकल और ऐहोले के इतिहास, वास्तुकला या पर्यटन योजना के बारे में मुझसे कोई भी प्रश्न पूछें। आप माइक द्वारा बोलकर भी प्रश्न पूछ सकते हैं!'
      : "Namaskara! I am your AI Heritage Assistant for Bagalkote. Ask me anything about Badami Cave Temples, Virupaksha Temple at Pattadakal, Aihole's architectural cradles, visiting timings, or travel itineraries. You can ask by typing or using your microphone!";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: getWelcomeText(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [highThinking, setHighThinking] = useState(false);

  // Sync voice language and update initial welcome message if no user messages yet
  useEffect(() => {
    setVoiceLang(language);
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: `welcome-${language}-${Date.now()}`,
            sender: 'ai',
            text: getWelcomeText(language),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  }, [language]);

  // Multilingual Suggested prompts
  const suggestedPrompts = {
    en: [
      'Tell me about Badami Cave Temples.',
      'Who built Virupaksha Temple at Pattadakal?',
      'What are the best places to visit near Aihole?',
      'Plan a one-day heritage tour from Badami.',
      'Where can I eat authentic North Karnataka Jolada Rotti?',
    ],
    kn: [
      'ಬಾದಾಮಿ ಗುಹೆಗಳ ಇತಿಹಾಸ ಮತ್ತು ಶಿಲ್ಪಕಲೆ ತಿಳಿಸಿ.',
      'ಪಟ್ಟದಕಲ್ಲಿನ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯವನ್ನು ಯಾರು ನಿರ್ಮಿಸಿದರು?',
      'ಐಹೊಳೆಯಲ್ಲಿ ನೋಡಬೇಕಾದ ಪ್ರಮುಖ ತಾಣಗಳು ಯಾವುವು?',
      'ಒಂದು ದಿನದ ಬಾಗಲಕೋಟೆ ಪರಂಪರೆ ಪ್ರವಾಸ ಯೋಜನೆ ನೀಡಿ.',
      'ಅಧಿಕೃತ ಉತ್ತರ ಕರ್ನಾಟಕದ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?',
    ],
    hi: [
      'बादामी गुफा मंदिरों के इतिहास और महत्व के बारे में बताएं।',
      'पट्टदकल के विरूपाक्ष मंदिर का निर्माण किसने करवाया था?',
      'ऐहोले के प्रमुख दर्शनीय स्थल कौन से हैं?',
      'बादामी से एक दिवसीय हेरिटेज टूर का प्लान बनाएं।',
      'प्रसिद्ध उत्तर कर्नाटक जोलद रोट्टी भोजन कहाँ मिलता है?',
    ],
  }[language] || [
    'Tell me about Badami Cave Temples.',
    'Who built Virupaksha Temple at Pattadakal?',
    'What are the best places to visit near Aihole?',
    'Plan a one-day heritage tour from Badami.',
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

  // Stop audio and recognition on unmount
  useEffect(() => {
    return () => {
      stopAllSpeech();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
        recognitionRef.current = null;
      }
    };
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
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
        recognitionRef.current = null;
      }
      setIsListening(false);
      return;
    }

    // Stop any active speech before listening
    stopAllSpeech();
    setCurrentlySpeakingId(null);

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      const langCode = voiceLang === 'kn' ? 'kn-IN' : voiceLang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.lang = langCode;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
        recognitionRef.current = null;
        if (transcript && transcript.trim()) {
          // Pass true for fromVoice to speak response aloud naturally
          handleSendMessage(transcript.trim(), true);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          alert('Microphone permission is blocked. Please allow microphone access in your browser to speak.');
        } else if (event.error !== 'no-speech') {
          console.warn('Speech recognition error:', event.error);
        }
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.start();
    } catch (e) {
      console.warn('Speech recognition exception:', e);
      setIsListening(false);
      recognitionRef.current = null;
    }
  };

  // Text-To-Speech using unified speechUtils
  const handleSpeakText = (messageId: string, text: string) => {
    if (!isTTSSupported()) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (currentlySpeakingId === messageId) {
      stopAllSpeech();
      setCurrentlySpeakingId(null);
      return;
    }

    // Determine target spoken language from text script
    const spokenLang: Language = /[\u0C80-\u0CFF]/.test(text)
      ? 'kn'
      : /[\u0900-\u097F]/.test(text)
      ? 'hi'
      : (voiceLang || language);

    setCurrentlySpeakingId(messageId);
    speakMultilingualText(text, spokenLang, {
      onStart: () => setCurrentlySpeakingId(messageId),
      onEnd: () => setCurrentlySpeakingId(null),
      onError: () => setCurrentlySpeakingId(null),
    });
  };

  const handleSendMessage = async (textToSend?: string, fromVoice: boolean = false) => {
    const query = (textToSend !== undefined ? textToSend : inputQuery).trim();
    if (!query) return;

    // Detect script of user query
    const queryLang: Language = /[\u0C80-\u0CFF]/.test(query)
      ? 'kn'
      : /[\u0900-\u097F]/.test(query)
      ? 'hi'
      : (voiceLang || language);

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
          language: queryLang,
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

    // If Gemini key is not configured or failed, use domain knowledge base with detected language
    if (!liveAiSuccess || !aiResponseText) {
      aiResponseText = findLocalHeritageAnswer(query, queryLang);
    }

    setTimeout(() => {
      const aiMsgId = `ai-${Date.now()}`;
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isHighThinking: highThinking,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // If user queried by microphone voice, automatically read response aloud
      if (fromVoice) {
        handleSpeakText(aiMsgId, aiResponseText);
      }
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
      <div className="bg-[#141b29] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[74vh] min-h-[460px] max-h-[640px] sm:h-[580px] md:h-[620px]">
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

          <div className="flex items-center space-x-2">
            {/* In-Chat Trilingual Language Switcher */}
            <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-xl border border-gray-700">
              <Globe className="w-3.5 h-3.5 text-amber-400 ml-1 hidden sm:inline" />
              {(['en', 'kn', 'hi'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setVoiceLang(l);
                    onSelectLanguage?.(l);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    language === l
                      ? 'bg-amber-500 text-gray-950 shadow-md font-extrabold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title={l === 'en' ? 'English' : l === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
                >
                  {l === 'en' ? 'EN' : l === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
                </button>
              ))}
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
                      <div className="flex items-center space-x-2">
                        {isSpeaking && (
                          <div className="flex items-end space-x-0.5 h-3 px-1 py-0.5 bg-black/40 rounded">
                            <span className="w-0.5 bg-amber-400 rounded-full animate-[audioEqualizer_0.8s_ease-in-out_infinite]" />
                            <span className="w-0.5 bg-amber-300 rounded-full animate-[audioEqualizer_0.6s_ease-in-out_0.2s_infinite]" />
                            <span className="w-0.5 bg-amber-500 rounded-full animate-[audioEqualizer_0.7s_ease-in-out_0.4s_infinite]" />
                          </div>
                        )}
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
                      </div>
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

        {/* Query Input Box & Voice Controls */}
        <div className="p-4 bg-[#0d121c] border-t border-gray-800 space-y-2">
          {/* Active Voice Listening Banner */}
          {isListening && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs animate-pulse">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-semibold">
                  🎙️ Listening in {voiceLang === 'kn' ? 'ಕನ್ನಡ (Kannada)' : voiceLang === 'hi' ? 'हिन्दी (Hindi)' : 'English'}... Speak now!
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsListening(false)}
                className="text-[10px] font-bold uppercase underline hover:text-white"
              >
                Cancel
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            {/* Microphone Voice Input with Language Badge */}
            <div className="relative flex items-center">
              <button
                type="button"
                id="chat-voice-input-btn"
                onClick={handleToggleVoiceInput}
                className={`relative p-2.5 rounded-xl border transition-all ${
                  isListening
                    ? 'bg-red-600 border-red-400 text-white animate-mic-pulse ring-4 ring-red-500/50 shadow-lg shadow-red-500/50'
                    : 'bg-white/5 border-gray-700 text-gray-300 hover:text-white hover:border-amber-400'
                }`}
                title={
                  isListening
                    ? 'Listening... Click to stop'
                    : `Click to speak in ${voiceLang === 'kn' ? 'Kannada' : voiceLang === 'hi' ? 'Hindi' : 'English'}`
                }
              >
                {isListening ? (
                  <MicOff className="w-5 h-5 animate-pulse text-white" />
                ) : (
                  <Mic className="w-5 h-5 text-amber-400" />
                )}
              </button>

              {/* Quick Voice Language Switcher Pill */}
              <button
                type="button"
                onClick={() => {
                  const nextLang = voiceLang === 'en' ? 'kn' : voiceLang === 'kn' ? 'hi' : 'en';
                  setVoiceLang(nextLang);
                  onSelectLanguage?.(nextLang);
                }}
                className="ml-1 px-1.5 py-1 rounded-md bg-stone-800/80 hover:bg-amber-500/20 text-[10px] font-bold text-amber-300 border border-gray-700 hover:border-amber-400 transition-colors"
                title="Tap to switch mic recognition language (English, Kannada, Hindi)"
              >
                {voiceLang === 'en' ? 'EN' : voiceLang === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
              </button>
            </div>

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
