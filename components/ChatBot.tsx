import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage, ChatSender } from '../types';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: "Hi! I'm an AI assistant trained on Dr. Woods' research. Ask me about her work on remote sensing or conservation AI.",
      sender: ChatSender.BOT,
      timestamp: Date.now()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: ChatSender.USER,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API (exclude error messages if any)
    const history = messages
        .filter(m => !m.isError)
        .map(m => ({
            role: m.sender === ChatSender.USER ? 'user' as const : 'model' as const,
            text: m.text
        }));

    try {
        const responseText = await generateChatResponse(history, userMessage.text);
        
        const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            sender: ChatSender.BOT,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, botMessage]);
    } catch (error) {
        const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, something went wrong. Please try again.",
            sender: ChatSender.BOT,
            timestamp: Date.now(),
            isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-emerald-700 hover:bg-emerald-800'}`}
      >
        {isOpen ? <X className="text-white" size={24} /> : <MessageSquare className="text-white" size={24} />}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-40 flex flex-col transition-all duration-300 border border-emerald-100 overflow-hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        style={{ maxHeight: 'calc(100vh - 150px)', height: '500px' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-700 p-4 flex items-center gap-2">
            <Sparkles className="text-yellow-300" size={20} />
            <div>
                <h3 className="text-white font-bold text-sm">Research Assistant</h3>
                <p className="text-emerald-100 text-xs">Powered by Gemini</p>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 bg-stone-50 space-y-4">
            {messages.map((msg) => (
                <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === ChatSender.USER ? 'justify-end' : 'justify-start'}`}
                >
                    <div 
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                            msg.sender === ChatSender.USER 
                                ? 'bg-emerald-700 text-white rounded-br-none' 
                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                        }`}
                    >
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                        <Loader2 className="animate-spin text-emerald-600" size={16} />
                        <span className="text-xs text-gray-500">Thinking...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about my research..."
                    className="flex-grow bg-gray-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="p-2 bg-emerald-700 text-white rounded-full hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
      </div>
    </>
  );
};