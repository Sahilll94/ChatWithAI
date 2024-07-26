import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import ContextProvider, { context } from '../../Context/Context'


const Main = () => {

    const{onSent,recentPrompt,showResult,loading,ResultData,setInput,input} = useContext(context)

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
                <div className="card">
                    <p>How do you connect a Node.js application to a MongoDB database using Mongoose?</p>
                    <img src={assets.compass_icon}></img>
                </div>

                <div className="card">
                    <p>How would you implement a binary search algorithm in C++?</p>
                    <img src={assets.bulb_icon}></img>
                </div>

                <div className="card">
                    <p>How would you implement a linked list data structure in C++?</p>
                    <img src={assets.message_icon}></img>
                </div>

                <div className="card">
                    <p>What is the role of the Standard Template Library (STL) in C++?</p>
                    <img src={assets.code_icon}></img>
                </div>
            </div>
            </>

            :<div className='result'>
                <div className="result-title">
                <img src={assets.chatpfp_icon} alt="" />
                <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:ResultData}}></p>
                    }
                </div>
            </div>
            }
            
            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter' && input) {
                    onSent();
                }
            }} value={input} type='text' placeholder='Enter your prompt here' />
                    {input ? <img onClick={()=> onSent()} src={assets.send_icon} alt="" /> : null}
                </div>
                <p className='bottom-info'>We have used Gemini, It might display inaccurate information, so kindly double-check its response.</p>
            </div>
        </div>
    </div>
    )
}

export default Main