import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ChevronRight } from 'lucide-react';
import BackgroundVideo from './BackgroundVideo';

interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    options?: { label: string; action: string }[];
}

interface ChatBotProps {
    onNavigate: (page: any) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: '1',
                    sender: 'bot',
                    text: 'Hello 👋\nWelcome to VCAS.\nHow can I help you today?',
                    options: [
                        { label: 'Our Services', action: 'services' },
                        { label: 'Contact Us', action: 'contact' },
                        { label: 'Careers', action: 'career' },
                        { label: 'About VCAS', action: 'about' }
                    ]
                }
            ]);
        }
    }, []);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, isOpen]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: text
        };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const response = generateResponse(text);
            setMessages(prev => [...prev, response]);
            setIsTyping(false);
        }, 1000);
    };

    const handleOptionClick = (action: string, label: string) => {
        // Add user selection as message
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: label
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        setTimeout(() => {
            let response: ChatMessage;

            switch (action) {
                case 'services':
                    onNavigate('services');
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'Here are our key services:\n\n• IT Consulting\n• E-Commerce Planning\n• HR Consulting\n• Import & Export\n\nWould you like more details on a specific service?',
                        options: [
                            { label: 'IT Consulting', action: 'service_it' },
                            { label: 'HR Consulting', action: 'service_hr' },
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'contact':
                    onNavigate('contact');
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'You can reach us seamlessly via our Contact page. We are always ready to assist!',
                        options: [
                            { label: 'Send a Message', action: 'contact_form' }, // Placeholder for future interactivity
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'career':
                    onNavigate('career');
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'We are always looking for top talent! Check out our open positions on the Careers page.',
                        options: [
                            { label: 'View Openings', action: 'career_openings' }, // Placeholder
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'about':
                    onNavigate('about');
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'VCAS is a bridge between India and Japan, providing premier IT consulting and bilingual tech solutions.',
                        options: [
                            { label: 'Our Mission', action: 'about_mission' },
                            { label: 'Our Vision', action: 'about_vision' },
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'menu':
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'How else can I assist you?',
                        options: [
                            { label: 'Our Services', action: 'services' },
                            { label: 'Contact Us', action: 'contact' },
                            { label: 'Careers', action: 'career' },
                            { label: 'About VCAS', action: 'about' }
                        ]
                    };
                    break;
                default:
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        text: 'I can help you navigate our site. Please choose an option below.',
                        options: [
                            { label: 'Our Services', action: 'services' },
                            { label: 'Contact Us', action: 'contact' },
                            { label: 'Careers', action: 'career' },
                            { label: 'About VCAS', action: 'about' }
                        ]
                    };
            }
            setMessages(prev => [...prev, response]);
            setIsTyping(false);
        }, 800);
    };

    const generateResponse = (input: string): ChatMessage => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('service') || lowerInput.includes('offer')) {
            return {
                id: Date.now().toString(),
                sender: 'bot',
                text: 'We offer a range of services from IT Consulting to HR solutions. Would you like to see the full list?',
                options: [{ label: 'View Services', action: 'services' }]
            };
        }
        if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone')) {
            return {
                id: Date.now().toString(),
                sender: 'bot',
                text: 'You can find our contact details and a form on the Contact page.',
                options: [{ label: 'Go to Contact', action: 'contact' }]
            };
        }
        if (lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('work') || lowerInput.includes('hiring')) {
            return {
                id: Date.now().toString(),
                sender: 'bot',
                text: 'Yes, we are hiring! Please check our Careers page for open positions.',
                options: [{ label: 'View Careers', action: 'career' }]
            };
        }
        if (lowerInput.includes('about') || lowerInput.includes('who') || lowerInput.includes('company')) {
            return {
                id: Date.now().toString(),
                sender: 'bot',
                text: 'VCAS is a bilingual consulting firm bridging Japanese and Indian markets.',
                options: [{ label: 'Learn More', action: 'about' }]
            };
        }

        return {
            id: Date.now().toString(),
            sender: 'bot',
            text: "I'm an AI assistant for VCAS. How can I help you navigate our site?",
            options: [
                { label: 'Our Services', action: 'services' },
                { label: 'Contact Us', action: 'contact' },
                { label: 'Careers', action: 'career' },
                { label: 'About VCAS', action: 'about' }
            ]
        };
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-3 md:p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-red-500 rotate-90' : 'bg-[#114565] hover:bg-[#0d3650]'
                    }`}
            >
                {isOpen ? (
                    <X className="w-10 h-10 md:w-12 md:h-12 text-white" />
                ) : (
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative">
                        <BackgroundVideo
                            src="/aibot.mp4"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 w-[90vw] md:w-[380px] h-[500px] max-h-[70vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right transform ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="bg-[#114565] p-4 flex items-center gap-3 shadow-md">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative overflow-hidden">
                        <BackgroundVideo
                            src="/aibot.mp4"
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#114565] rounded-full z-10"></span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">VCAS Assistant</h3>
                        <p className="text-blue-200 text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/40 custom-scrollbar">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'
                                }`}
                        >
                            <div
                                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${msg.sender === 'user'
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-white text-gray-800 rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>

                            {/* Quick Options */}
                            {msg.options && (
                                <div className="flex flex-wrap gap-2 mt-3 max-w-[90%]">
                                    {msg.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionClick(opt.action, opt.label)}
                                            className="px-3 py-1.5 bg-white/10 hover:bg-primary border border-white/20 rounded-full text-xs text-white transition-colors flex items-center gap-1"
                                        >
                                            {opt.label} <ChevronRight className="w-3 h-3" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-start">
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none text-gray-800 shadow-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white/10 border-t border-white/20 backdrop-blur-sm">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage(inputText);
                        }}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-white/90 border border-gray-300 rounded-full px-4 py-2.5 text-black placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                            style={{ 
                                color: 'black',
                                WebkitTextFillColor: 'black',
                                WebkitAppearance: 'none'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isTyping}
                            className="p-2.5 rounded-full bg-primary text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatBot;
