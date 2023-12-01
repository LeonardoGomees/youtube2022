import Chat from "../assets/icons/chat.svg";
import Trash from "../assets/icons/trash.svg";

const Historyarea = (props) => {
    const { conversations, handleOpenChat, handleDeleteChat } = props;

    return (
        <div className="historyArea">
            {conversations && conversations.map(x => {
                return (
                    <div className="chatWrapper" key={x.id}>
                        <a href="#" onClick={() => handleOpenChat(x.id)}>
                            <img src={Chat} alt="plus-icon" />
                            <span>{x.title}</span>
                        </a>

                        <a href="#" onClick={() => handleDeleteChat(x.id)}>
                            <img src={Trash} alt="plus-icon" />
                        </a>
                    </div>
                )
            })}
        </div>
    )
}

export default Historyarea