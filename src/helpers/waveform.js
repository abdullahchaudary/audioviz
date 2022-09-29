export default class WaveForm {
    constructor(canvasEl, freq, form, gain){
        this.playing = false;
        this.freqVal = freq;
        this.formVal = form;
        this.gainVal = gain;
        this.audioCtx = new AudioContext();
        this.analyserNode = new AnalyserNode(this.audioCtx, {smoothingTimeConstant: 1,fftSize: 2048});
        this.gainNode = new GainNode(this.audioCtx, {gain: this.gainVal});
        this.dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
        this.oscillator = new OscillatorNode(this.audioCtx,{type:this.formVal,frequency:this.freqVal});
        this.canvas = canvasEl;
        this.c = this.canvas.getContext("2d");
        this.generateCanvasWave();
    }
    deconstruct = () => {
        if(this.playing){
            this.stopAudio();
        }
        // this.playing = false;
        // this.oscillator.stop();
        delete this.audioCtx;
        delete this.gainNode;
        delete this.oscillator;
    }

    playSettings = (freq, form, gain) => {
        if(this.playing){
            this.gainNode.gain.value = gain;
            this.oscillator.type = form;
            this.oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
        }
    }
    startAudio = () => {
        if(!this.playing){
            this.oscillator = new OscillatorNode(this.audioCtx,{type:this.formVal,frequency:this.freqVal});
            this.oscillator.connect(this.audioCtx.destination);
            this.oscillator.connect(this.gainNode);
            this.gainNode.connect(this.analyserNode);
            this.analyserNode.connect(this.audioCtx.destination);
            this.oscillator.start();
            this.draw();
            this.playing = true;
        }
    }
    stopAudio = () => {
        this.oscillator.stop();
        this.oscillator = null;
        this.playing = false;
    }
    generateCanvasWave = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        const pixelRatio = window.devicePixelRatio;
        const sizeOnScreen = this.canvas.getBoundingClientRect();
        this.canvas.width = sizeOnScreen.width * pixelRatio;
        this.canvas.height = sizeOnScreen.height * pixelRatio;
        this.canvas.style.width = this.canvas.width / pixelRatio + "px";
        this.canvas.style.height = this.canvas.height / pixelRatio + "px";
        this.c.fillStyle = "#000000";
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.c.strokeStyle = "#ffffff";
        this.c.beginPath();
        this.c.moveTo(0, this.canvas.height / 2);
        this.c.lineTo(this.canvas.width, this.canvas.height / 2);
        this.c.stroke();
    }
    draw = () => {
        this.analyserNode.getByteTimeDomainData(this.dataArray);
        var segmentWidth = this.canvas.width / this.analyserNode.frequencyBinCount;
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.c.beginPath();
        this.c.moveTo(-100, this.canvas.height / 2);
        for (let i = 1; i < this.analyserNode.frequencyBinCount; i += 1) {
            let x = i * segmentWidth;
            let v = this.dataArray[i] / 128.0;
            let y = (v * this.canvas.height) / 2;
            this.c.lineTo(x, y);
        }
        this.c.lineTo(this.canvas.width + 100, this.canvas.height / 2);
        this.c.stroke();
        requestAnimationFrame(this.draw);
    };
}