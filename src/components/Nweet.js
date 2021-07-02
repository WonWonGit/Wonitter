import React, { useState } from "react";
import { dbService } from "../fbInstance";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this wonweet?");
    if (ok) {
      dbService.doc(`wonweets/${nweetObj.id}`).delete();
    } else {
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(nweetObj, newNweet);
    dbService.doc(`wonweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your wonweet"
                  value={newNweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update wonweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="pic"/>}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Button</button>
              <button onClick={toggleEditing}>Edit Button</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
