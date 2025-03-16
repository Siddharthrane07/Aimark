import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { generateBrandingResponse } from '../lib/openai';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

const AIAssistantPage = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI branding assistant. I can help you with:\n\n• Brand Strategy\n• Logo Design Concepts\n• Color Palette Suggestions\n• Marketing Messages\n• Brand Voice Development\n• Visual Identity Guidelines\n\nWhat would you like to explore?"
    }
  ]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  // Load previous conversations if user is logged in
  useEffect(() => {
    const loadConversations = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('ai_conversations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(50);

        if (error) throw error;

        if (data && data.length > 0) {
          const formattedChat = data.flatMap(conv => [
            { role: 'user' as const, content: conv.message },
            { role: 'assistant' as const, content: conv.response }
          ]);
          setChat(prev => [...prev, ...formattedChat]);
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    };

    loadConversations();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage('');
    setLoading(true);

    // Add user message to chat immediately
    setChat(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Generate AI response
      const response = await generateBrandingResponse(userMessage);

      // Save conversation to database if user is logged in
      if (user) {
        await supabase.from('ai_conversations').insert([
          {
            user_id: user.id,
            message: userMessage,
            response: response || 'Failed to generate response'
          }
        ]);
      }

      // Add AI response to chat
      setChat(prev => [...prev, { role: 'assistant', content: response || 'Failed to generate response' }]);
    } catch (error) {
      console.error('Error:', error);
      setChat(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-secondary rounded-2xl p-4 h-[calc(100vh-8rem)]">
          <div className="flex items-center space-x-2 mb-6">
            <Bot className="h-6 w-6 text-blue-400" />
            <h1 className="text-2xl font-bold">AI Branding Assistant</h1>
          </div>

          <div 
            ref={chatContainerRef}
            className="h-[calc(100%-8rem)] overflow-y-auto space-y-4 mb-4 pr-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            {chat.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-background'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium">AI Assistant</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-background p-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                    <span className="text-sm">Generating response...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about branding, colors, or messaging..."
              className="w-full pr-12 py-3 px-4 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !message.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;