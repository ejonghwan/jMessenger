import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';


const Home = ({ user }) => {

    const [jmessage, setjmessage] = useState('')
    const [messageArr, setMessageArr] = useState([]);



    // const getDbValue = async() => {
    //     const getData = await dbService.collection("jmessage").get()

    //     // forEach 방식
    //     getData.forEach(document => {
    //         const dataObj = {
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setMessageArr(prev => [dataObj, ...prev])
    //     })

    // }

    // useEffect(() => {
    //     getDbValue()
    //     // console.log(user.uid)
    // }, [])


    // const onSubmit = e => {
    //     e.preventDefault();
    //     dbService.collection("jmessage").add({
    //         text: jmessage,
    //         createdAt: Date.now(),
    //         uid: user.uid,
    //     })
    // }

    const onChange = e => {
        const { target: {value} } = e
        setjmessage(value)
    }

    return (
        <div>
            <form>
                <input 
                    type="text" 
                    // value={jmessage} 
                    onChange={onChange} 
                    // placeholder="what's on your mind" 
                    // maxLength={120} 
                    />
                <input type="submit" value="init" />
            </form>

            <ul>
                {messageArr.map(data => {
                    return <li key={data.id}>{data.text}</li>
                })}
            </ul>
          
        </div>
    );
};

export default Home;