import React, { useContext, useEffect } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { context } from '../../Context/Context'


const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        ResultData,
        setInput,
        input,
        chatHistory,
        currentChatId
    } = useContext(context)

    const suggestions = [
        {
            title: "How do you connect a Node.js application to a MongoDB database using Mongoose?",
            icon: assets.compass_icon
        },
        {
            title: "How would you implement a binary search algorithm in C++?",
            icon: assets.bulb_icon
        },
        {
            title: "How would you implement a linked list data structure in C++?",
            icon: assets.message_icon
        },
        {
            title: "What is the role of the Standard Template Library (STL) in C++?",
            icon: assets.code_icon
        },
        {
            title: "Explain the concept of React hooks and their importance in modern React development.",
            icon: assets.bulb_icon
        },
        {
            title: "What are the best practices for securing a Node.js REST API?",
            icon: assets.code_icon
        }
    ];

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion.title);
    };

    // Add dark mode detection
    useEffect(() => {
        const darkModePreference = localStorage.getItem('darkMode')
        if (darkModePreference === 'true') {
            document.documentElement.classList.add('dark-theme')
        }
    }, [])

    return (
    <div className='main'>
        <div className="nav">
            <p>Powered by Gemini</p>
            <img src={assets.pfp_icon} alt=''></img>
        </div>
        <div className="main-container">
            {!showResult 
            ? <>
            <div className="greet">
                <p><span>Hey, Geeks.</span></p>
                <p>How Can I help you today?</p>
            </div>
            <div className="cards">
                {suggestions.map((suggestion, index) => (
                    <div 
                        key={index} 
                        className="card"
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        <p>{suggestion.title}</p>
                        <img src={suggestion.icon} alt="" />
                    </div>
                ))}
            </div>
            </>

            : <div className='result'>
                {currentChatId && chatHistory[currentChatId]?.map((exchange, index) => (
                    <div key={index} className="chat-exchange">
                        <div className="result-title">
                            <img src={assets.chatpfp_icon} alt="" />
                            <p>{exchange.prompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            <p className="formatted-response" dangerouslySetInnerHTML={{__html: exchange.response}}></p>
                        </div>
                    </div>
                ))}                {loading && (
                    <div className='loader'>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                )}
            </div>
            }
            
            
            <div className="main-bottom">
                <div className="search-box">
                    <input 
                        onChange={(e)=>setInput(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && input) {
                                onSent();
                            }
                        }} 
                        value={input} 
                        type='text' 
                        placeholder='Enter your prompt here'
                    />
                    {input && <img onClick={()=> onSent()} src={assets.send_icon} alt="" />}
                </div>
                <p className='bottom-info'>
  We have used Gemini, it might display inaccurate information, so kindly double-check its response.
  <br />
  Made by <a href="https://sahilfolio.live" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Sahil</a>
</p>

                </div>
            </div>
        </div>
    // </div>
    )
}

export default Main