export default function SendMessage(props){
    return(
        <div className="chatbot__entry">
                <input
                className="chatbot__input"
                type="text"
                placeholder="Type your message..."
                onKeyDown={props.key_down}
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
