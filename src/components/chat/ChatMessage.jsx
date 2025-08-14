import { useEffect, useState } from 'react';

const ChatMessage = ({ message }) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(message.sender === 'bot');
    const [typingIndex, setTypingIndex] = useState(0);

    // Bot mesajları için yazma animasyonu
    useEffect(() => {
        if (message.sender === 'bot' && typingIndex < message.text.length) {
            const typingSpeed = 20; // ms başına karakter

            const typingTimeout = setTimeout(() => {
                setDisplayText(prev => prev + message.text[typingIndex]);
                setTypingIndex(prevIndex => prevIndex + 1);
            }, typingSpeed);

            return () => clearTimeout(typingTimeout);
        } else if (typingIndex >= message.text.length && isTyping) {
            setIsTyping(false);
        }
    }, [message, typingIndex, isTyping]);

    // Kullanıcı mesajları doğrudan gösterilir
    useEffect(() => {
        if (message.sender === 'user') {
            setDisplayText(message.text);
            setIsTyping(false);
        }
    }, [message]);

    // Saati formatlama
    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`chat-message ${message.sender}`}>
            <div className="chat-bubble">
                {message.sender === 'bot' ? displayText : message.text}
                <span className="chat-time">{formatTime(message.timestamp)}</span>
            </div>
        </div>
    );
};

export default ChatMessage;