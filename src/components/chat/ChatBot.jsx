import { useState, useRef, useEffect } from 'react';
import { generateBotResponse } from '../../utils/chatUtils';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Merhaba! Cokelek Film Asistanı'na hoş geldiniz. Size nasıl yardımcı olabilirim?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Chat açıldığında mesajları kaydır ve inputa odaklan
    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            inputRef.current?.focus();
        }
    }, [isOpen]);

    // Yeni mesaj geldiğinde veya bot yazıyorken kaydır
    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleChat = () => {
        setIsOpen(prev => !prev);
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    // Sohbeti sıfırlama fonksiyonu
    const resetChat = () => {
        setMessages([
            {
                id: Date.now(),
                text: "Merhaba! Cokelek Film Asistanı'na hoş geldiniz. Size nasıl yardımcı olabilirim?",
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputText.trim()) return;

        // Kullanıcı mesajını ekle
        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        const currentInput = inputText.trim(); // Kullanıcı mesajını sakla
        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Bot yazıyor animasyonu
        setIsTyping(true);

        // Mock cevap için gecikme
        setTimeout(() => {
            const botResponse = generateBotResponse(currentInput);
            setIsTyping(false);

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            }]);
        }, 1000 + Math.random() * 1000); // 1-2 saniye arası rastgele gecikme
    };

    return (
        <>
            {/* Chat Bot Toggle Button */}
            <button
                className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
                onClick={toggleChat}
                aria-label="Toggle chat assistant"
            >
                {!isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            <div className={`chat-container ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <div className="chat-title">
                        <div className="chat-avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
                            </svg>
                        </div>
                        <h3>Cokelek Film Asistanı</h3>
                    </div>
                    <div className="chat-header-buttons">
                        {/* Sıfırlama Butonu */}
                        <button className="chat-reset-btn" onClick={resetChat} title="Sohbeti sıfırla">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                            </svg>
                        </button>
                        {/* Kapatma Butonu */}
                        <button className="chat-close-btn" onClick={toggleChat}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            className={`chat-message ${msg.sender}`}
                        >
                            <div className="chat-bubble">
                                {msg.text}
                                <span className="chat-time">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="chat-message bot">
                            <div className="chat-bubble typing">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-input-form" onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Film hakkında bir soru sorun..."
                        className="chat-input"
                    />
                    <button
                        type="submit"
                        className="chat-send-btn"
                        disabled={!inputText.trim()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </form>
            </div>

            <style>{`
        /* Chat Bot Container */
        .chat-container {
          position: fixed;
          bottom: 85px;
          right: 20px;
          width: 350px;
          height: 500px;
          background-color: var(--card-bg);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(83, 209, 255, 0.3);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
          transform: translateY(20px) scale(0.95);
          opacity: 0;
          pointer-events: none;
          border: 1px solid rgba(83, 209, 255, 0.2);
        }
        
        .chat-container.open {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: all;
        }
        
        /* Chat Header */
        .chat-header {
          background: var(--gradient-1);
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }
        
        .chat-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .chat-avatar {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .chat-title h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .chat-header-buttons {
          display: flex;
          gap: 10px;
        }
        
        .chat-close-btn, .chat-reset-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.3s, transform 0.2s;
        }
        
        .chat-close-btn:hover, .chat-reset-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .chat-reset-btn:hover {
          transform: rotate(45deg);
        }
        
        /* Chat Messages Area */
        .chat-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: var(--primary-color) rgba(255, 255, 255, 0.1);
        }
        
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
          background-color: var(--primary-color);
          border-radius: 3px;
        }
        
        /* Message Bubbles */
        .chat-message {
          display: flex;
          margin-bottom: 8px;
        }
        
        .chat-message.user {
          justify-content: flex-end;
        }
        
        .chat-bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          word-wrap: break-word;
          line-height: 1.4;
        }
        
        .chat-message.bot .chat-bubble {
          background-color: rgba(83, 24, 250, 0.15);
          border: 1px solid rgba(83, 24, 250, 0.3);
          border-bottom-left-radius: 5px;
          color: var(--text);
        }
        
        .chat-message.user .chat-bubble {
          background: var(--gradient-1);
          color: white;
          border-bottom-right-radius: 5px;
        }
        
        .chat-time {
          font-size: 10px;
          opacity: 0.7;
          margin-top: 5px;
          display: block;
          text-align: right;
        }
        
        /* Typing Animation */
        .chat-bubble.typing {
          display: flex;
          align-items: center;
          min-height: 24px;
          min-width: 60px;
          padding: 12px;
        }
        
        .chat-bubble.typing .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.7);
          margin: 0 4px;
          animation: typingAnimation 1.4s infinite ease-in-out;
        }
        
        .chat-bubble.typing .dot:nth-child(1) {
          animation-delay: 0s;
        }
        
        .chat-bubble.typing .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .chat-bubble.typing .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typingAnimation {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          30% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }
        
        /* Chat Input Area */
        .chat-input-form {
          display: flex;
          padding: 12px;
          background-color: rgba(22, 22, 29, 0.5);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .chat-input {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid rgba(83, 24, 250, 0.3);
          background-color: rgba(22, 22, 29, 0.8);
          border-radius: 20px;
          outline: none;
          color: white;
          font-size: 14px;
          transition: border-color 0.3s;
        }
        
        .chat-input:focus {
          border-color: var(--secondary-color);
          box-shadow: 0 0 0 2px rgba(0, 209, 255, 0.25);
        }
        
        .chat-send-btn {
          background: none;
          border: none;
          color: var(--secondary-color);
          padding: 0 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        
        .chat-send-btn:hover {
          transform: scale(1.1);
        }
        
        .chat-send-btn:disabled {
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
          transform: none;
        }
        
        /* Chat Toggle Button */
        .chat-toggle-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          background: var(--gradient-1);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 0 15px rgba(83, 209, 255, 0.3);
          z-index: 1000;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s;
        }
        
        .chat-toggle-btn:hover {
          transform: scale(1.1);
        }
        
        .chat-toggle-btn.open {
          transform: rotate(90deg);
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
          .chat-container {
            width: calc(100% - 40px);
            height: 60vh;
            bottom: 80px;
          }
        }
      `}</style>
        </>
    );
};

export default ChatBot;