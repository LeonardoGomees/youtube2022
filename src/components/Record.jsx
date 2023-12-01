import React, { useState, useEffect } from "react";
import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'
import RecordPlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/record.esm.js'

import Microphone from "../assets/icons/microphone.svg";
import Stop from "../assets/icons/stop.svg";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "pt-br";

const Record = ({ setInput, handleSend }) => {
  const [wavesurfer, setWaveSurfer] = useState(null);
  const [record, setRecorder] = useState(null);

  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");

  let silenceTimer;

  useEffect(() => {
    initializeWave();

    handleListen();
  }, [isListening]);

  const initializeWave = () => {
    if (!wavesurfer) {
      // Create an instance of WaveSurfer
      const ws = WaveSurfer.create({
        container: '#wave',
        waveColor: '#dedee5',
        barWidth: 1,
        barHeight: 1,
        width: 50,
        height: 30
      });

      const record = ws.registerPlugin(RecordPlugin.create())

      setWaveSurfer(ws);
      setRecorder(record);
    }
  };

  const handleListen = () => {
    if (isListening) {
      mic.start();

      if (record)
        record.startRecording();
    } else {
      mic.stop();

      if (record)
        record.stopRecording();
    }
  };

  mic.onresult = (event) => {
    clearTimeout(silenceTimer); // Limpa o temporizador de inatividade

    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    setTranscription(transcript); // Atualiza o input em Inputbar

    mic.onerror = (event) => {
      console.log(event.error);
    };
    silenceTimer = setTimeout(() => {
      setIsListening(false); // Para a gravação após 1 segundo de inatividade
    }, 1000);
  };

  record && record.on('record-end', (blob) => {
    const recordedUrl = URL.createObjectURL(blob)
    handleSend(transcription, recordedUrl);
  })

  return (
    <>
      <div className="recordContainer">
        {isListening ? (
          <div className="recordStop">
            <img
              src={Stop}
              alt="Stop Icon"
              onClick={() => setIsListening((prevState) => !prevState)}
            />{" "}
          </div>
        ) : (
          <img
            src={Microphone}
            alt="Microphone Icon"
            onClick={() => setIsListening((prevState) => !prevState)}
          />
        )}
        <div id="wave" className="waveform" style={{ display: isListening ? '' : 'none' }}></div>
      </div>
    </>
  );
};

export default Record;