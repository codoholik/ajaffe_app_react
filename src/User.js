

const UserMessage = (props) => {
    return(
        <li className='is-user animation'>
        <p className='chatbot__message'>
            {props.content}
        </p>
        <span className='chatbot__arrow chatbot__arrow--right'></span>
        </li>
    )
};

export default UserMessage;
    