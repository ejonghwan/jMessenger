import { dbService } from 'fbase';
import React, { useState } from 'react';

const Home = ({  }) => {

    const [jme, setJme] = useState('')
    const onSubmit = e => {
        e.preventDefault();
        dbService.collection("jme").add({
            jonghwan: 'goodman',
            createdAt: Date.now()
        })
        console.log('asdasd')
    }

    const onChange = e => {
        const { target: {value} } = e
        setJme(value)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    value={jme} 
                    onChange={onChange} 
                    placeholder="what's on your mind" 
                    maxLength={120} 
                    />
                <input type="submit" value="jmessegn" />
            </form>
          
        </div>
    );
};

export default Home;