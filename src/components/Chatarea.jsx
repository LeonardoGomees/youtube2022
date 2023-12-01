import React, { useRef, useEffect } from "react";
import Messages from "./Messages";

const Chatarea = (props) => {
    const { messages } = props;
    const chatAreaRef = useRef(null);

    // Função para rolar a área de rolagem para o final
    const scrollToBottom = () => {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    };

    // Rola para o final quando o componente é montado e sempre que o conteúdo for atualizado
    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div className="chatArea" ref={chatAreaRef}>
            {messages && messages.map(x => {
                return (
                    <Messages isUser={x.role == "user"} message={x.content} url={x.file}/>
                )
            })}
            <div className="bottomBar"></div>
        </div>
    );
}

export default Chatarea;
