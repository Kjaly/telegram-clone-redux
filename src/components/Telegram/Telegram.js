import React from 'react';
import './Telegram.scss'
import Sidebar from "../Sidebar/Sidebar";
import Thread from "../Thread/Thread";

const Telegram = () => {
    return (
        <div className='telegram'>
            <Sidebar/>
            <Thread/>
        </div>
    );
};

export default Telegram;
