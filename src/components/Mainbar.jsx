import Chatarea from "./Chatarea"
import Inputbar from "./Inputbar"
import Topbar from "./topbar"

const Mainbar = (props) => {
    const { id, messages, handleSend } = props;

    return (
        <div className="mainBar">
            <Topbar />
            <Chatarea id={id} messages={messages}/>
            <Inputbar handleSend={handleSend}/>
        </div>
    )
}

export default Mainbar