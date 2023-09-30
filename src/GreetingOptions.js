

const GreetingOptions = () => {
    
    return(
        <li classNameName="is-ai animation">
        <div classNameName="is-ai__profile-picture">
            <svg className="icon-avatar" viewBox="0 0 32 32">
            <use xlinkHref="#avatar"></use>
            </svg>
        </div>
        <span className="chatbot__arrow chatbot__arrow--left"></span>
        <div className="chatbot__message">
        <button className="chatbot-button" onclick="handleButtonClick('Search Item')">Search Item</button>
        <button className="chatbot-button" onclick="handleButtonClick('Search Price')">Search Price</button>
        <button className="chatbot-button" onclick="handleButtonClick('Help')">Help</button>
        <button className="chatbot-button" onclick="handleButtonClick('Send Questions to Customer Service')">Ask Customer Service</button>
    </div>
    </li>
    )

}

export default GreetingOptions; 
