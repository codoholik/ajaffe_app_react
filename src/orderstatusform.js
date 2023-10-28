export default function OrderStatusForm(props) {
    return (
        <li className="is-ai animation">
            <div className="is-ai__profile-picture">
                <svg className="icon-avatar" viewBox="0 0 32 32">
                    <use xlinkHref="#avatar"></use>
                </svg>
            </div>
            <div className="chatbot__message">
                <form id="order_status_form">
                    <div className="mb-3">
                        <label htmlFor="order_status_val" className="form-label">
                            Order Number
                        </label>
                        <input
                            type="text"
                            id="order_status_val"
                            className="form-control"
                            placeholder="Enter Order No"
                            aria-describedby="orderstatushelp"
                            required
                        />
                        <div id="orderstatushelp" className="form-text">
                            Please provide the order number.
                        </div>
                    </div>
                    <button
                    type="button"
                    className="btn btn-primary"
                    style={{ color: 'black' }}
                    onClick={props.handleSubmit}
                    >
                    Submit
                    </button>
                </form>
            </div>
        </li>
    );
}