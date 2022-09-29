<template>
    <canvas id="WaveFormCanvas"></canvas>
    <div class="container mx-auto">
        <div class="mt-5 mb-5 grid grid-cols-4 sm:grid-cols-4 gap-4 px-4 sm:px-0">
            <div class="col-span-4 sm:col-span-4">
                <div class="customCard">
                    <div class="p-4">
                        <ul class="flex flex-col px-3 py-2 mt-4 text-gray-100 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                            <li class='flex align-content-center gap-2'>
                                <button v-if="this.isRunning" @click="this.startGen(false)" class="block px-3 py-1 text-base font-normal bg-black-800 bg-clip-padding bg-no-repeat border border-solid border-black-700 rounded transition ease-in-out m-0 focus:bg-black focus:border-gray-300 focus:outline-none">Stop</button>
                                <button v-else @click="this.startGen(true)" class="block px-3 py-1 text-base font-normal bg-black-800 bg-clip-padding bg-no-repeat border border-solid border-black-700 rounded transition ease-in-out m-0 focus:bg-black focus:border-gray-300 focus:outline-none">Start</button>
                                <select :value="this.wavetype" @change="this.changeWaveType" class="appearance-dark block w-full px-3 py-1 text-base font-normal text-white-700 bg-transparent dark:bg-transparent bg-clip-padding bg-no-repeat border border-solid border-black-700 rounded transition ease-in-out m-0 focus:text-white-700 focus:bg-red focus:border-gray-300 focus:outline-none" aria-label="Select Wave Type">
                                    <option value="sine">Sine Wave</option>
                                    <option value="square">Square Wave</option>
                                    <option value="sawtooth">Sawtooth Wave</option>
                                    <option value="triangle">Triangle Wave</option>
                                </select>
                            </li>
                            <li>
                                <label htmlFor="frequency" class="form-label">Frequency: {{this.frequency}}</label>
                                <input type="range" @input="this.changeFrequency" class="form-range appearance-none w-full h-1 p-0 dark:bg-white-500 focus:outline-none focus:ring-0 focus:shadow-none" min="1" step="1" :value="this.frequency" max="24000" id="frequency" />
                            </li>
                            <li>
                                <label htmlFor="gain" class="form-label">Gain: {{this.gain}}</label>
                                <input type="range" @input="this.changeGain" class=" form-range appearance-none w-full h-1 p-0 dark:bg-white-500 focus:outline-none focus:ring-0 focus:shadow-none" min="0" step=".01" :value="this.gain" max="1" id="gain" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WaveForm from '../helpers/waveform';

export default {
    data() {
        return {
            isRunning: false,
            wavetype: 'sine',
            frequency: 100,
            gain: 0.25,
            wf: null,
        }
    },
    unmounted(){
        delete this.wf.deconstruct();
        // console.log('unmounted!');
    },
    mounted(){
        const canvas = document.getElementById("WaveFormCanvas");
        this.wf = new WaveForm(canvas,this.frequency, this.wavetype, this.gain);
    },
    methods: {
        changeWaveType(e) {
            if(this.isRunning){
                this.wavetype = e.target.value;
                this.wf.playSettings(this.frequency, this.wavetype, this.gain);
            } else {
                this.wavetype = e.target.value;
            }
        },
        changeFrequency(e) {
            if(this.isRunning){
                this.frequency = e.target.value;
                this.wf.playSettings(this.frequency, this.wavetype, this.gain);
            } else {
                this.frequency = e.target.value;
            }
        },
        changeGain(e) {
            if(this.isRunning){
                this.gain = e.target.value;
                this.wf.playSettings(this.frequency, this.wavetype, this.gain);
            } else {
                this.gain = e.target.value;
            }
        },
        startGen(sw){
            if(sw){
                this.isRunning = sw;
                this.wf.startAudio();
                this.wf.playSettings(this.frequency, this.wavetype, this.gain);
            } else {
                this.wf.stopAudio();
                this.isRunning = sw;
            }
        }
    },
}
</script>