import Plus from "../assets/icons/plus.svg";

const Newchat = (props) => {
    const { handleNewChat, id, messages } = props;

    return (
        <a href="#" className="newchatWrapper" onClick={() => handleNewChat(id, messages)}>
            <img src={Plus} alt="plus-icon" />
            <span>Nova Conversa</span>
        </a>
    )
}

export default Newchat