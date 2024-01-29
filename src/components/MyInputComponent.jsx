import React, {useState} from 'react'

export default function MyInputComponent() {
    const [text, setText] = useState('hello');

    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <>
            <input value={text} onChange={handleChange} />
            <p>You typed: {text}</p>
            <button onClick={() => setText('hello')}>
                Reset
            </button>
        </>
    );
}
