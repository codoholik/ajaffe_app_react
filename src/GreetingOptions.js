export default function GreetingOptions(props) {
    return (
    <li className="is-ai animation">
        <div className="is-ai__profile-picture">
            <svg className="icon-avatar" viewBox="0 0 32 32">
            <use xlinkHref="#avatar"></use>
            </svg>
        </div>
        <div className="d-grid gap-1" style={{ width: '60%' }}>
            <button className="btn btn-outline-primary" onClick={_ => props.handler('Search Item')}>Search Item</button>
            <button className="btn btn-outline-primary" onClick={_ => props.handler('Search Price')}>Search Price</button>
            <button className="btn btn-outline-primary" onClick={_ => props.handler('Order Status')}>Order Status</button>
            <button className="btn btn-outline-primary" onClick={_ => props.handler('Help')}>Help</button>
            <button className="btn btn-outline-primary" onClick={_ => props.handler('Send Questions to Customer Service')}>Ask Customer Service</button>
        </div>
    </li>
    )
}