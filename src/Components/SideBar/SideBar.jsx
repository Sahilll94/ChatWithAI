import React, { useContext, useState } from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { context } from '../../Context/Context'

const SideBar = () => {
    const [extended, setExtended] = useState(false)
    const [isDark, setIsDark] = useState(false)
    
    const {
        chatHistory,
        currentChatId,
        createNewChat,
        loadChat,
        deleteChat
    } = useContext(context)

    const handleDeleteChat = (e, chatId) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Add confirmation dialog
        if (window.confirm('Are you sure you want to delete this chat?')) {
            deleteChat(chatId);
            
            // If we're deleting the current chat, create a new one
            if (currentChatId === chatId) {
                createNewChat();
            }
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getFirstMessage = (messages) => {
        if (messages && messages.length > 0) {
            const firstMsg = messages[0].prompt;
            return firstMsg.length > 30 ? firstMsg.substring(0, 30) + '...' : firstMsg;
        }
        return 'New Chat';
    };

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark-theme');
        localStorage.setItem('darkMode', !isDark);
    };

    return (
        <div className={`SideBar ${extended ? 'expanded' : 'collapsed'}`}>
            <div className="top">
                <img 
                    onClick={() => setExtended(prev => !prev)} 
                    className='menu' 
                    src={assets.menu_icon} 
                    alt="Menu" 
                />
                
                <div onClick={createNewChat} className="new-chat">
                    <img src={assets.plus_icon} alt="New Chat" />
                    {extended && <p>New Chat</p>}
                </div>

                {extended && Object.keys(chatHistory).length > 0 && (
                    <div className="recent">
                        <div className="recent-title">
                            <p>Chat History</p>
                        </div>
                        
                        {Object.entries(chatHistory)
                            .sort(([,a], [,b]) => {
                                const aTime = a[a.length - 1]?.timestamp;
                                const bTime = b[b.length - 1]?.timestamp;
                                return new Date(bTime) - new Date(aTime);
                            })
                            .map(([chatId, messages]) => (
                                <div 
                                    key={chatId} 
                                    className={`recent-entry ${currentChatId === chatId ? 'active' : ''}`}
                                    onClick={() => loadChat(chatId)}
                                >
                                    <img src={assets.message_icon} alt="Chat" />
                                    <div className="chat-info">
                                        <p>{getFirstMessage(messages)}</p>
                                        {messages.length > 0 && (
                                            <span className="timestamp">
                                                {formatDate(messages[messages.length - 1].timestamp)}
                                            </span>
                                        )}
                                    </div>
                                    <button 
                                        className="delete-entry"
                                        onClick={(e) => handleDeleteChat(e, chatId)}
                                        aria-label="Delete chat"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="theme-toggle" onClick={toggleTheme}>
                    <img 
                        src={isDark ? assets.sun_icon : assets.moon_icon} 
                        alt="Theme" 
                    />
                    {extended && <p>{isDark ? 'Light Mode' : 'Dark Mode'}</p>}
                </div>
                
                <a href='https://sahilfolio.live/#contact' target='_blank'>
                    <div className="bottom-item">
                        <img src={assets.question_icon} alt="Help" />
                        {extended && <p>Contact Developer</p>}
                    </div>
                </a>
                
                <div className="bottom-item">
                    <img src={assets.settings_icon} alt="Settings" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    )
}

export default SideBar