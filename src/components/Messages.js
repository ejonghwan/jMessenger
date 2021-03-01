import React, { useState } from 'react';
import { dbService } from 'fbase'


const Messages = ({ data, isOwner }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [edit, setEdit] = useState(data.text); 

    // console.log(data.id)
    // console.log(isOwner)

    // *doc.delete
    const handleDelete = async () => {
        const ok = window.confirm('Are you sure you want to delete this nweet?');
        if(ok) {
            await dbService.doc(`jmessage/${data.id}`).delete()
        };
    } ;

    const handleToggle = () => {
        setIsEditing(prev => !prev);
    };

    const handleChange = e => {
        const { target: { value } } = e;
        setEdit(value);
    };

    // *doc.update는 반드시 이전에 있는 데이터와 일치해야됨
    const handleEditSubmit = async e => {
        e.preventDefault();
        await dbService.doc(`jmessage/${data.id}`).update({
            text: edit,
        });
        setIsEditing(false);
    };


    return (
        <li key={data.id} >
            {data.text}
            {isOwner && (
                <>
                    {isEditing ? (
                        <>
                            <form onSubmit={handleEditSubmit}>
                                <input type="text" placeholder={data.text} onChange={handleChange} /> 
                                <button type="submit">ok</button>
                            </form>
                        </>
                    ) : (
                        <button onClick={handleToggle}>edit</button>
                    )}
                    <button onClick={handleDelete}>delete</button>
                </>
            )}
           
        </li>
    );
};

export default Messages;