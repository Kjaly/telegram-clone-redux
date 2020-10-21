import React, {useEffect, useState} from 'react';
import './SidebarThread.scss'
import {Avatar} from "@material-ui/core";
import {useDispatch} from "react-redux";
import db from "../../../firebase";
import {setThread} from "../../../features/threadSlice";

const SidebarThread = ({id,threadName}) => {
    const dispatch = useDispatch()
    const [threadInfo, setThreadInfo] = useState([])

    useEffect(()=>{
        db.collection('threads')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot =>
            setThreadInfo(snapshot.docs.map(doc=>doc.data())))
    },[id])

    return (
        <div className='SidebarThread' onClick={()=>
        dispatch(
            setThread({
                threadId:id,
                threadName:threadName,
            })
        )}>
            <Avatar src={threadInfo[0]?.photo}/>
            <div className='SidebarThread__details'>
            <h3 className='SidebarThread__name'>{threadName}</h3>
            <p className='SidebarThread__info'>{threadInfo[0]?.message}</p>
            <small className='SidebarThread__timestamp'>
                {new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleString()}
            </small>
            </div>
        </div>
    );
};

export default SidebarThread;
