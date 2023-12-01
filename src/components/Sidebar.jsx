import Historyarea from "./Historyarea"
import Newchat from "./Newchat"
import Profilearea from "./Profilearea";


const Sidebar = (props) => {
    const {
        messages,
        conversations,
        handleNewChat,
        handleOpenChat,
        handleDeleteChat,
        toggleLogin,
        isLogged
    } = props;

    return (
        <div className="sideBar">
            <Newchat handleNewChat={handleNewChat} messages={messages}/>
            <Historyarea conversations={conversations} handleOpenChat={handleOpenChat} handleDeleteChat={handleDeleteChat}/>
            <Profilearea toggleLogin={toggleLogin} isLogged={isLogged}/>
        </div>
    )
}

export default Sidebar