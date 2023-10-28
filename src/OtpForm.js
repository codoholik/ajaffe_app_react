export default function OtpForm(props) {
    return (
        <li className="is-ai animation" id="otpform">
            <div className="is-ai__profile-picture">
                <svg className="icon-avatar" viewBox="0 0 32 32">
                    <use xlinkHref="#avatar" />
                </svg>
                </div>
                <span className="chatbot__arrow chatbot__arrow--left"></span>
                <div className="chatbot__message">
                <form id="otp_form">
                    <div className="mb-3">
                    <label htmlFor="otp_val" className="form-label">OTP</label>
                    <input type="text" id="otp_val" className="form-control" placeholder="Enter your OTP" aria-describedby="otphelp" required />
                    <div id="otphelp" className="form-text">Please give us OTP number.</div>
                    </div>
                    <button type="button" className="btn btn-primary" style={{color: 'black'}} onClick={() => props.validate_otpfunc('otp_val')}>Submit</button>
                </form>                    
                </div>
        </li>        
    );
}