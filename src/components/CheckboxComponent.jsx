import React, {useState} from 'react'

export default function CheckboxComponent() {
    const [liked, setLiked] = useState(true);

    function handleChange(e) {
        setLiked(e.target.checked);
    }

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={liked}
                    onChange={handleChange}
                />
                I liked this
            </label>
            <p>
                You {liked ? 'liked' : 'did not like'} this.
            </p>
        </>
    );
}
