



const BotMessage = (props) => {
    return (
        <li className="is-ai animation">
            <div className="is-ai__profile-picture">
                <svg className="icon-avatar" viewBox="0 0 32 32">
                    <use xlinkHref="#avatar" />
                </svg>
                </div>
                <span className="chatbot__arrow chatbot__arrow--left"></span>
                <div className="chatbot__message">
                    {props.msg}
                </div>
        </li> 
    );
}


export default BotMessage;