import { createContext, useState, useEffect } from "react";
import run from "../config/Gemini";

export const context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]); 
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ResultData, setResultData] = useState("");
    const [chatHistory, setChatHistory] = useState({});
    const [currentChatId, setCurrentChatId] = useState(null);

    // Load chat history from localStorage on initial load
    useEffect(() => {
        const savedChats = localStorage.getItem('chatHistory');
        if (savedChats) {
            setChatHistory(JSON.parse(savedChats));
        }
    }, []);

    // Save chat history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }, [chatHistory]);

    const formatResponse = (text) => {
        // Format code blocks
        text = text.replace(/```([\s\S]*?)```/g, (match, code) => {
            const [language, ...codeLines] = code.trim().split('\n');
            return `<pre class="code-block"><code class="language-${language}">${codeLines.join('\n')}</code></pre>`;
        });

        // Format inline code
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Format bold text
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // Format lists
        text = text.replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>');
        text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // Format headers
        text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');

        // Format links
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

        return text;
    };

    const createNewChat = () => {
        const chatId = Date.now().toString();
        setChatHistory(prev => ({
            ...prev,
            [chatId]: []
        }));
        setCurrentChatId(chatId);
        setShowResult(false);
        setResultData("");
        setInput("");
        setRecentPrompt("");
    };

    const loadChat = (chatId) => {
        setCurrentChatId(chatId);
        if (chatHistory[chatId] && chatHistory[chatId].length > 0) {
            setShowResult(true);
            const lastMessage = chatHistory[chatId][chatHistory[chatId].length - 1];
            setRecentPrompt(lastMessage.prompt);
            setResultData(lastMessage.response);
        }
    };

    const deleteChat = (chatId) => {
        const newChatHistory = { ...chatHistory };
        delete newChatHistory[chatId];
        setChatHistory(newChatHistory);
        if (currentChatId === chatId) {
            setCurrentChatId(null);
            setShowResult(false);
            setResultData("");
            setInput("");
            setRecentPrompt("");
        }
    };

    const onSent = async(prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let userPrompt;
        if(prompt !== undefined) {
            userPrompt = prompt;
            setRecentPrompt(prompt);
        } else {
            userPrompt = input;
            setRecentPrompt(input);
        }

        // Create new chat if none exists
        if (!currentChatId) {
            createNewChat();
        }

        try {
            const response = await run(userPrompt);
            const formattedResponse = formatResponse(response);
            
            // Save the chat exchange to history
            setChatHistory(prev => ({
                ...prev,
                [currentChatId]: [
                    ...(prev[currentChatId] || []),
                    {
                        prompt: userPrompt,
                        response: formattedResponse,
                        timestamp: new Date().toISOString()
                    }
                ]
            }));

            setResultData(formattedResponse);
        } catch (error) {
            console.error('Error getting response:', error);
            setResultData("Sorry, there was an error processing your request.");
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        ResultData,
        input,
        setInput,
        createNewChat,
        loadChat,
        deleteChat,
        chatHistory,
        currentChatId
    };

    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    );
}

export default ContextProvider;