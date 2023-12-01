import React, { useEffect, useState } from 'react';
import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'
import RecordPlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/record.esm.js'

function Wave() {
  const [wavesurfer, setWaveSurfer] = useState(null);

  useEffect(() => {
    // Create an instance of WaveSurfer
    const ws = WaveSurfer.create({
      container: '#mic',
      waveColor: '#202123',
      progressColor: '',
      width: '100%',
      height: '100%'
    });
    setWaveSurfer(ws);

    // Initialize the Record plugin
    const record = ws.registerPlugin(RecordPlugin.create());

    // Render recorded audio
    record.on('record-end', (blob) => {
      const container = document.querySelector('#recordings');
      const recordedUrl = URL.createObjectURL(blob);

      // Create wavesurfer from the recorded audio
      const recordedWaveSurfer = WaveSurfer.create({
        container,
        waveColor: '#DEDEE5',
        progressColor: '#202123',
        url: recordedUrl,
      });

      // Play button
      const button = container.appendChild(document.createElement('button'));
      button.textContent = 'Play';
      button.onclick = () => recordedWaveSurfer.playPause();
      recordedWaveSurfer.on('pause', () => (button.textContent = 'Play'));
      recordedWaveSurfer.on('play', () => (button.textContent = 'Pause'));
    });

    const micSelect = document.querySelector('#mic-select');
    
    // Mic selection
    RecordPlugin.getAvailableAudioDevices().then((devices) => {
      devices.forEach((device) => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || device.deviceId;
        micSelect.appendChild(option);
      });
    });

    // Record button
    const recButton = document.querySelector('#record');
    const pauseButton = document.querySelector('#pause');

    recButton.onclick = () => {
      if (record.isRecording()) {
        record.stopRecording();
        recButton.textContent = 'Record';
        pauseButton.style.display = 'none';
        return;
      }

      recButton.disabled = true;
      // get selected device
      const deviceId = micSelect.value;
      record.startRecording({ deviceId }).then(() => {
        recButton.textContent = 'Stop';
        recButton.disabled = false;
        pauseButton.style.display = 'inline';
      });
    };

    
  }, []);

  return (
    <div>

      <button id="record">Record</button>
      
      <select hidden id="mic-select">
        <option value="" hidden>
          Select mic
        </option>
      </select>
      <div hidden id="mic" style={{ border: '1px solid #ddd', borderRadius: '4px', marginTop: '1rem' }}></div>
      <div id="recordings" style={{ }}></div>
      
    </div>
  );
}

export default Wave;
