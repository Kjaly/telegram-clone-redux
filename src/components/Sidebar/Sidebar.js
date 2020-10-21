import React, {useEffect, useState} from 'react';
import './Sidebar.scss'
import SearchIcon from '@material-ui/icons/Search';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import {Avatar, IconButton} from "@material-ui/core";
import SidebarThread from "./SidebarThread/SidebarThread";
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import db, {auth} from "../../firebase";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import Thread from "../Thread/Thread";

const Sidebar = () => {
    const user = useSelector(selectUser)
    const [threads, setThreads] = useState([])

    useEffect(() => {
        db.collection('threads')
            .onSnapshot(snapshot =>
                setThreads(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),

                }))))
    }, []);

    const addThread = () => {
        const threadName = prompt('Enter a thread name.');
        if (threadName) {
            db.collection('threads').add({
                threadName: threadName,
            })
        }
    };
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <div className="sidebar__search">
                    <SearchIcon className={'sidebar__searchIcon'}/>
                    <input type="text" placeholder={'search'} className='sidebar__input'/>
                </div>
                <IconButton onClick={addThread} variant='outlined' className='sidebar__button'>
                    <BorderColorOutlinedIcon />
                </IconButton>

            </div>
            <div className="sidebar__threads">
                {threads.map(({id,data:{threadName}})=>(
                    <SidebarThread key={id} id={id} threadName={threadName}/>
                ))}
            </div>
            <div className="sidebar__bottom">
                <Avatar className='sidebar__avatar' onClick={() => auth.signOut()}/>
                <IconButton>
                    <PhoneOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <QuestionAnswerOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <SettingsIcon/>
                </IconButton>
            </div>
        </div>
    );
};

export default Sidebar;
