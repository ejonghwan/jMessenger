import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import Massages from 'components/Messages'


const Home = ({ user }) => {

    const [jmessage, setjmessage] = useState('')
    const [messageArr, setMessageArr] = useState([]);


    // forEach 방식
    // const getDbValue = async() => {
    //     const getData = await dbService.collection("jmessage").get()
        // getData.forEach(document => {
        //     const dataObj = {
        //         ...document.data(),
        //         id: document.id,
        //     }
        //     setMessageArr(prev => [dataObj, ...prev])
        // })
    // }

    useEffect(() => {
        // getDbValue()
        dbService.collection("jmessage").onSnapshot(snap => {
            // console.log(snap)
            const data = snap.docs.map( doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })
            setMessageArr(data)
        })
    }, [])


    const onSubmit = e => {
        e.preventDefault();
        dbService.collection("jmessage").add({
            text: jmessage,
            createdAt: Date.now(),
            createId: user.uid,
        })
        // dbService.collection("jmessage").orderBy("createdAt", "desc")
    }

    const onChange = e => {
        const { target: {value} } = e
        setjmessage(value)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    value={jmessage} 
                    onChange={onChange} 
                    placeholder="what's on your mind" 
                    maxLength={120} 
                    />
                <input type="submit" value="init" />
            </form>
            <ul>
                {messageArr.map(data =>  <Massages key={data.id} data={data} />)}
            </ul>
        </div>
    );
};

export default Home;