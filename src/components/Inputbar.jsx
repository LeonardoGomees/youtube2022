import { useState } from "react";
import Attach from "../assets/icons/attach.svg";
import Send from "../assets/icons/send.svg";
import Record from "./Record";
import Wave from "./Wave";

const Inputbar = (props) => {
  const { handleSend } = props;
  const [input, setInput] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    handleSend(input);
    setInput("");
  };

  return (
    <div className="inputBar">
      <form className="inputWrapper" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Envie uma mensagem..."
          value={input}
          onChange={(x) => setInput(x.target.value)}
        />
        <div className="send">
          <Record setInput={setInput} handleSend={handleSend} />
          <label htmlFor="attachInput">
            <img src={Attach} alt="Attach Icon"  />
            <input type="file" style={{ display: "none" }} id="attachInput" />
          </label>
          <img src={Send} alt="Send Icon" onClick={sendMessage} />
        </div>
      </form>
    </div>
  );
};

export default Inputbar;
