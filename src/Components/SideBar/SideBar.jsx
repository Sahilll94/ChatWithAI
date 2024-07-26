import React, { useContext, useState } from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { context } from '../../Context/Context'

const SideBar = () => {

    const [extended,setExtended] = useState(false)

    const {onSent,previousPrompt,setRecentPrompt, newchat} = useContext(context)

    const loadPrompt = async(prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
    <div className='SideBar'>
        <div className="top">
            <img onClick={()=> setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
            <div onClick={()=> newchat()}className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {/* Ternery operator below is used */}
                {extended ? <p>New Chat</p> : null}
            </div>
            {/* Again ternery operators */}
            {extended 

            ?
            
            <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompt.map((item,index)=> {
                return (
                    <div onClick={()=> loadPrompt(item)} className="recent-entry">
                    <img src={assets.message_icon} alt=" " />
                    <p>{item.slice(0,18)} ...</p>
                </div>
                )
            })}
            
            </div>

            :

            null

            }
            
        </div>
        <a href='https://sahilportfolio.me/#Contact' target='_blank' >
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extended ? <p>Contact The Developer</p> : null}
            </div>
        </div>
        </a>

    </div>
    )
}

export default SideBar