import React, {  } from 'react';

const Messages = ({ data }) => {
    return (
        <li key={data.id} >
            {data.text}
            <button>edit</button>
            <button>delete</button>
        </li>
    );
};

export default Messages;