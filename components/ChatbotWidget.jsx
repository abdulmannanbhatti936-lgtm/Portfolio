'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 I'm Mannan Bot. I'm here to help you explore Mannan's portfolio. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  const handleSendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText) return

    setInput("")
    const newMessages = [...messages, { role: "user", content: userText }]
    setMessages(newMessages)

    setIsTyping(true)
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: newMessages })
      })
      
      const data = await res.json()
      
      if (res.ok && data.message) {
        setMessages([...newMessages, { role: "assistant", content: data.message }])
      } else {
        setMessages([...newMessages, { role: "assistant", content: "Sorry, I am having trouble connecting to my servers right now." }])
      }
    } catch (error) {
      console.error(error)
      setMessages([...newMessages, { role: "assistant", content: "Oops! Something went wrong. Please try again." }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4" role="region" aria-label="Chatbot assistant">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-white w-[380px] max-w-[calc(100vw-40px)] h-[550px] max-h-[calc(100vh-120px)] rounded-[32px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
          >
            {/* Header */}
            <div className="bg-sidebar p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 overflow-hidden" aria-hidden="true">
                   <div className="w-full h-full flex items-center justify-center text-xs font-bold">AI</div>
                </div>
                <div>
                  <h4 id="chatbot-title" className="font-space font-bold text-base leading-none text-white">Botmon</h4>
                  <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1">Smart Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chatbot"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[#F9FAFB]" role="log" aria-live="polite" aria-label="Chat messages">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-sidebar text-white rounded-br-none'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                    }`}
                    role="text"
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" aria-hidden="true" />
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" aria-hidden="true" />
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" aria-hidden="true" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>



            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 bg-gray-50 border-none focus:ring-0 text-sm p-3 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-sidebar"
                aria-label="Type your question"
                ref={inputRef}
              />
              <button
                onClick={() => handleSendMessage()}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sidebar ${
                  input.trim() ? 'bg-sidebar text-white shadow-lg' : 'bg-gray-100 text-gray-400'
                }`}
                aria-label="Send message"
                disabled={!input.trim()}
              >
                <FiSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-sidebar text-white rounded-full flex items-center justify-center shadow-2xl relative z-[101] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sidebar"
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <FiX size={28} />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <FiMessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
           <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" aria-hidden="true" />
        )}
      </motion.button>
    </div>
  )
}
