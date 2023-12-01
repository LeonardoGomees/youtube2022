import React, { useState, useEffect } from "react";
import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'

const Messages = (props) => {
    const { isUser, message, url } = props;
    const [wavesurfer, setWaveSurfer] = useState(null);

    useEffect(() => {
        if (url != null) {
            if (wavesurfer == null) {
                const ws = WaveSurfer.create({
                    container: '#wave',
                    waveColor: '#dedee5',
                    autoCenter: true,
                    width: 600,
                    height: 30,
                    barWidth: 1,
                    url: url
                });

                setWaveSurfer(ws);

                return () => {
                    ws.destroy();
                };
            }
        }
    }, [url, wavesurfer]);

    return (
        <div className={isUser ? "message userMessage" : "message"}>
            {url && (
                <div className="messageWrapper">
                    <div className="messageAvatar">{isUser ? "" : "Bot"}</div>
                    <div className="message-audio">
                        <div id="wave" className="waveform"></div>
                        <h6>Transcrição</h6>
                        <span>{message}</span>
                    </div>
                </div>
            )}
            {!url && (
                <div className="messageWrapper">
                    <div className="messageAvatar">{isUser ? "" : "Bot"}</div>
                    <span>{message}</span>
                </div>
            )}
        </div>
    );
}

export default Messages;
