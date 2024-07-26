import { createContext, useState } from "react";
import run from "../config/Gemini";

export const context = createContext();




const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [previousPrompt,setPreviousPrompt] = useState([]); 
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading]= useState(false);
    const [ResultData,setResultData]=useState("");

    const delayPara = (index,nextWord)  => {
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }

    const newchat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async(prompt) => {

        setResultData("")

        setLoading(true)

        setShowResult(true)

        let response;

        if(prompt !== undefined)
        {
            response= await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPreviousPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await run(input)
        }


        let responseArray=response.split("**");

        let newResponse = "";

        for(let i=0;i<responseArray.length;i++)
        {
            if(i==0 || i%2 !==1)
            {
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>" +responseArray[i]+"</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")


        let newReponseArray = newResponse2.split(" ");

        for(let i=0;i<newReponseArray.length;i++)
        {
            const nextWord = newReponseArray[i];
            delayPara(i,nextWord+" ");
        }

        setLoading(false)

        setInput("")
    }

    
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
        newchat
    }

    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider