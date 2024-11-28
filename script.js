// script.js
let mediaRecorder;
let audioChunks = [];

const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const playButton = document.getElementById('playButton');
const sendButton = document.getElementById('sendButton');
const audioPlayback = document.getElementById('audioPlayback');

recordButton.addEventListener('click', async () => {
    console.log("Iniciando grabación...");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
    mediaRecorder.onstop = () => {
        console.log("Grabación detenida.");
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        audioPlayback.src = URL.createObjectURL(audioBlob);
        audioChunks = [];
    };

    mediaRecorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;
    console.log("Grabando...");
});

stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
    playButton.disabled = false;
    sendButton.disabled = false;
    console.log("Grabación finalizada.");
});

playButton.addEventListener('click', () => {
    console.log("Reproduciendo audio...");
    audioPlayback.play();
});

sendButton.addEventListener('click', () => {
    alert('Audio enviado (simulado).');
    console.log("Audio enviado.");
});
