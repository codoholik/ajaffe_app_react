
// import { useState } from "react";
import axios from 'axios'


export default function SendMessage(props){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // const [email, setEmail] = useState(null);
    // const [error, setError] = useState(null);
    const handleKeyDown = (event) =>{
        if (event.key === 'Enter'){
            if (!emailRegex.test(event.target.value)){
                console.log('please enter valid email id');
            }
            else{
                const value = event.target.value;
                props.right_side(value)
                event.target.value = ''
                axios.post('locahost:8000/opt_generator', {'email': value})
                .then(response => {
                    props.left_side(response.data.message);
                });
            }
        }
    }
    return(
        <div className="chatbot__entry">
                <input
                className="chatbot__input"
                type="text"
                placeholder="Type your message..."
                onKeyDown={handleKeyDown}
                />
                <svg
                className="chatbot__submit icon-send"
                viewBox="0 0 36 32"
                >
                <use xlinkHref="#send" />
                </svg>
            </div>
    )

}
