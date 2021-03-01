import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import Massages from 'components/Messages'


const Home = ({ user }) => {

    const [jmessage, setjmessage] = useState('')
    const [messageArr, setMessageArr] = useState([]);
    const [img, setImg] = useState()


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

    // collection.onSnapshot은 조심해서 사용 실시간으로 관찰해서 돈많이나올수도있음 
    useEffect(() => {
        // getDbValue()
        dbService.collection("jmessage").onSnapshot(snap => {
            // console.log(snap)
            const data = snap.docs.map( doc => {
                console.log(doc)
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })
            setMessageArr(data)
        })
    }, [])


    // *collection.add 보내기
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

    const onFileChange = e => {
        const { target: { files } } = e
        const theFile = files[0]
        const reader = new FileReader()
        reader.readAsDataURL(theFile)
        reader.onloadend = finishedEvent => {
            console.log(finishedEvent)
            setImg(finishedEvent.target.result)
        } 
    }

    const handleImageClear = e => setImg(null)

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
                <input type="file" accept="image/*" onChange={onFileChange}/>    
                <input type="submit" value="init" />
                {img && (
                    <div>
                        <img src={img} width="50px" height="50px;" />
                        <button onClick={handleImageClear}>clear img</button>
                    </div>
                )}
                
            </form>
            <ul>
                {messageArr.map(data =>  <Massages key={data.id} data={data} isOwner={data.createId === user.uid} />)}
            </ul>
        </div>
    );
};

export default Home;