import React, {useEffect, useState} from 'react';
import './Thread.scss'
import {Avatar, IconButton} from "@material-ui/core";
import {MicNoneOutlined, MoreHoriz, SendRounded, TimerOutlined} from "@material-ui/icons";
import db from "../../firebase";
import firebase, {onLog} from "firebase";
import {useSelector} from "react-redux";
import {selectThreadId, selectThreadName} from "../../features/threadSlice";
import {selectUser} from "../../features/userSlice";
import Message from "../Message/Message";

const Thread = () => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const threadId = useSelector(selectThreadId)
    const threadName = useSelector(selectThreadName)
    const user = useSelector(selectUser)

    useEffect(() => {
        if (threadId) {
            db.collection('threads')
                .doc(threadId)
                .collection('messages')
                .orderBy('timestamp', "asc")
                .onSnapshot(snapshot =>
                    setMessages(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                )
        }
    }, [threadId])

    console.log(messages)

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('threads').doc(threadId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        }).then(()=>{
            setInput('');
        })

    }
    return (
        <div className='thread'>
            <div className="thread__header">
                <div className="thread__contents">
                    <Avatar/>
                    <div className="thread__info">
                        <h4 className="thread__name">{threadName}</h4>
                        <h5 className='thread__seen'>last seen</h5>
                    </div>
                </div>
                <IconButton>
                    <MoreHoriz className='thread__details'/>
                </IconButton>
            </div>
            <div className="thread__messages">
                {messages.map(({id, data}) => (
                    <Message key={id} data={data}/>
                ))}
            </div>
            <div className="thread__input">
                <form onSubmit={sendMessage}>
                    <input value={input}
                           onChange={e => setInput(e.target.value)}
                           type="text"
                           placeholder={'Write message...'}/>
                    <IconButton><TimerOutlined/></IconButton>
                    <IconButton onClick={sendMessage}><SendRounded/></IconButton>
                    <IconButton><MicNoneOutlined/></IconButton>
                </form>
            </div>

        </div>
    );
};

export default Thread;
