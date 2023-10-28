export default function BotMessage(props) {
    return (
        <li className="is-ai animation">
            <div className="is-ai__profile-picture">
                <svg className="icon-avatar" viewBox="0 0 32 32">
                    <use xlinkHref="#avatar" />
                </svg>
            </div>
            <div className="d-grid gap-1" style={{ width: '60%' }}>
                {props.msg}
            </div>
        </li> 
    );
}
