export default function CustomerServiceForm(props) {

    return (
        <li className="is-ai animation" id="customerservice">
            <div className="is-ai__profile-picture">
                <svg className="icon-avatar" viewBox="0 0 32 32">
                    <use xlinkHref="#avatar"></use>
                </svg>
            </div>
            <div className="chatbot__message">
                <form id="customer_service_form">
                    <div className="mb-3">
                        <label htmlFor="customer_service_name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="customer_service_name"
                            className="form-control"
                            placeholder="Enter your name"
                            aria-describedby="orderstatushelp"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customer_service_email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="customer_service_email"
                            className="form-control"
                            placeholder="Enter your email"
                            aria-describedby="orderstatushelp"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customer_service_message" className="form-label">
                            Message
                        </label>
                        <textarea
                            className="form-control"
                            id="customer_service_message"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <button
                    type="button"
                    className="btn btn-primary"
                    style={{ color: 'black' }}
                    onClick={props.submitCustomerService}
                    >
                    Send
                    </button>
                </form>
            </div>
      </li>        
    );
}
