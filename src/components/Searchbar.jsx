import React, { useContext, useState } from 'react'
import { collection, query, where, getDoc, setDoc, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "../context/AuthContext";

const Searchbar = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {

    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (err) {
      setErr(true);
    }

  };
  const handleKey = e => {

    e.code === "Enter" && handleSearch();

  };

  const handleSelect = async () => {

    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

    } catch (err) {
      setErr(true);
    }
    setUser(null);
    setUsername("");
  }

  return (
    <div className='searchbar'>
      <div className="searchform">
        <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} value={username}/>
        
      </div>
      {err && <span>User not found!!</span>}
      {user && (<div className="userchat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userchatinfo">
          <span>{user.displayName}</span>
        </div>
      </div>
      )}
    </div>
  );
};

export default Searchbar