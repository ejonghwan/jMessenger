import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'fbase';
import Massages from 'components/Messages'


const Home = ({ user }) => {

    const [jmessage, setjmessage] = useState('')
    const [messageArr, setMessageArr] = useState([]);
    const [imgFile, setImgFile] = useState()


    // get 방식
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
            const data = snap.docs.map( doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })
            setMessageArr(data)
        })
    }, [])

    const handleRandom = () => {
        return Math.random().toString(36).replace('.', '')
    }


    // *collection.add 보내기
    const onSubmit = async e => {
        e.preventDefault();
        let imgUrl = "";
        if(imgFile !== "") { //imgUrl ???만 넣어도 될까 ?
            const fileRef = storageService.ref().child(`${user.uid}/${handleRandom()}`)
            console.log(fileRef)
            const res =  await fileRef.putString(imgFile, "data_url")
            imgUrl = await res.ref.getDownloadURL()
        }
        
        const jmessages = {
            text: jmessage,
            createdAt: Date.now(),
            createId: user.uid,
            imgUrl: imgUrl, 
        }

        dbService.collection("jmessage").add(jmessages)

        // dbService.collection("jmessage").add({
        //     text: jmessage,
        //     createdAt: Date.now(),
        //     createId: user.uid,
        // })
        // dbService.collection("jmessage").orderBy("createdAt", "desc")
    }

    const onChange = e => {
        const { target: {value} } = e
        setjmessage(value)
    }

    const onFileChange = e => {
        const { target: { files } } = e
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setImgFile(result)
        }
        reader.readAsDataURL(theFile) //readAsDataUrl을 넣어야 위에 currentTarget에 result가 보임 
        // console.log(imgFile)
    }

    const handleClear = e => setImgFile(null)

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
                {imgFile && (
                    <div>
                        <img  src={imgFile} accept="image/*" width="50px" height="50px;" />
                        <button onClick={handleClear}>clear img</button>
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