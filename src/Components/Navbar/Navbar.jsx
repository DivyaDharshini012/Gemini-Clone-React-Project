import './Navbar.css';
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { Context } from '../../Context/context';
import PropTypes from 'prop-types';

export const Navbar = () => {

    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompt, setRecentPrompt,newChat } = useContext(Context); // Correctly using prevPrompt

    const loadPrompt = async(prompt) =>{
      setRecentPrompt(prompt)
      await onSent(prompt)
    }

    return (
        <div className="sidebar">
            {/* Top Components */}
            <div className="top">

                <img
                    src={assets.menu_icon}
                    alt="menu icon"
                    className="menu"
                    onClick={() => setExtended(prev => !prev)} />

                <div className="new-chat" onClick={()=>newChat()}>
                    <img src={assets.plus_icon} alt="new chat" className="newchat" />
                    {/* Using Ternary operator */}
                    {extended ? <p>New Chat</p> : null}
                </div>

                {/* To see the recent questions */}
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt?.map((item, index) => ( // Correctly using prevPrompt
                            <div className="recent-entry" key={index} onClick={()=>loadPrompt(item)}>
                                <img src={assets.message_icon} alt=" " />
                                <p>{item?.slice(0, 18)} ...</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>

            {/* Bottom Components */}
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="question" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Setting" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    onSent: PropTypes.func,
    prevPrompt: PropTypes.arrayOf(PropTypes.string),
    setRecentPrompt: PropTypes.func,
};
