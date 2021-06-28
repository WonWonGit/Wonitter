import React, { useEffect, useState } from "react";
import { dbService } from "../fbInstance";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(()=>{
        dbService.collection("wonweets").onSnapshot(snapshot=>{
            const nweetArray = snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    },[])
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("wonweets").add({
            text:nweet,
            creatAt:Date.now(),
            creatorId : userObj.uid,
        });
        setNweet("");
    };
    const onChange = (event) => {
        const {target : {value}} = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const {target:{files},} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
        };
        reader.readAsDataURL(theFile);
    };
    console.log(nweets);
    return ( 
    <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Nweet" />
        </form>
        <div>
            {nweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
    </div>);
};
export default Home; 