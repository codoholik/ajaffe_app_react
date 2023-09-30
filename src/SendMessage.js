

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


const otp_form = () =>{
    const otp = `<form id="otp_form">
            <div class="mb-3">
            <label for="otp_val" class="form-label">OTP</label>
            <input type="text" id="otp_val" class="form-control" placeholder="Enter your OTP" aria-describedby="otphelp" required>
            <div id="otphelp" class="form-text">Please give us OTP number.</div>
            </div>
            <button type="button" class="btn btn-primary" style="color: black;" onclick="otp_message();">Submit</button>
        </form>`
    return otp
} 