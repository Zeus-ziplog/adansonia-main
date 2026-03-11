import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Bot, User, RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGES = 5; // maximum number of messages (user + assistant) before forcing reset

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your Adansonia Advocate assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset messages when panel is closed
  useEffect(() => {
    if (!isOpen) {
      setMessages([
        { role: 'assistant', content: "Hi! I'm your Adansonia Advocate assistant. How can I help you today?" }
      ]);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error('Failed to get response');

      const data = await res.json();

      if (data.action === 'navigate' && data.path) {
        // Execute navigation
        navigate(data.path);
        setMessages(prev => [...prev, { role: 'assistant', content: `Taking you to ${data.path}...` }]);
        // Close the assistant after a short delay
        setTimeout(() => setIsOpen(false), 1000);
      } else {
        // Regular answer
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      }
    } catch (error) {
      toast.error('Assistant unavailable');
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([
      { role: 'assistant', content: "Hi! I'm your legal assistant. How can I help you today?" }
    ]);
  };

  // Calculate total message count (excluding the initial greeting)
  const messageCount = messages.length - 1; // subtract the initial greeting
  const shouldShowReset = messageCount >= MAX_MESSAGES;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-jade hover:bg-pistachio dark:bg-pistachio dark:hover:bg-jade rounded-full shadow-xl flex items-center justify-center text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
            style={{ maxHeight: '500px' }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-jade to-pistachio dark:from-gray-700 dark:to-gray-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="text-white" size={24} />
                <h3 className="font-serif text-lg font-bold text-white">Legal Assistant</h3>
              </div>
              {shouldShowReset && (
                <button
                  onClick={resetConversation}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  title="Start new conversation"
                >
                  <RefreshCw size={18} className="text-white" />
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      msg.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-full ${msg.role === 'user' ? 'bg-jade' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-gray-700 dark:text-gray-300" />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-jade text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Reset reminder if limit reached */}
            {shouldShowReset && (
              <div className="px-4 pb-2">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Conversation limit reached. Start a new one.
                </p>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-jade dark:focus:ring-pistachio bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  disabled={loading || shouldShowReset}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim() || shouldShowReset}
                  className="p-2 bg-jade text-white rounded-full hover:bg-pistachio transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}