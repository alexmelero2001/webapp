// script.js
let mediaRecorder;
let audioChunks = [];

const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const playButton = document.getElementById('playButton');
const sendButton = document.getElementById('sendButton');
const audioPlayback = document.getElementById('audioPlayback');

recordButton.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        audioPlayback.src = URL.createObjectURL(audioBlob);
        audioChunks = [];
    };

    mediaRecorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;
    playButton.disabled = true;
    sendButton.disabled = true;
});

stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
    playButton.disabled = false;
    sendButton.disabled = false;
});

playButton.addEventListener('click', () => {
    audioPlayback.play();
});

sendButton.addEventListener('click', () => {
    alert('Audio enviado (simulado).');
});
