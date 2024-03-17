import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { db } from '../Firebase';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
      return () => {
        unsub();
      };
    };


    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log(Object.entries(chats));

  const handleSelect = (u)=>{
    dispatch({type:"CHANGE_USER", playload:u});
  };
  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat) => (
        <div className="userchat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}> 
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userchatinfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastmessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats