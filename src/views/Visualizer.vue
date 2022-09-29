<template >
    <div>
        <canvas id="visualizer"></canvas>
        <button class="sideBarBTN fadedControls" type="button" @click="showSideBar = !showSideBar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="48" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/><path d="M197.4,80.7a73.6,73.6,0,0,1,6.3,10.9L229.6,106a102,102,0,0,1,.1,44l-26,14.4a73.6,73.6,0,0,1-6.3,10.9l.5,29.7a104,104,0,0,1-38.1,22.1l-25.5-15.3a88.3,88.3,0,0,1-12.6,0L96.3,227a102.6,102.6,0,0,1-38.2-22l.5-29.6a80.1,80.1,0,0,1-6.3-11L26.4,150a102,102,0,0,1-.1-44l26-14.4a73.6,73.6,0,0,1,6.3-10.9L58.1,51A104,104,0,0,1,96.2,28.9l25.5,15.3a88.3,88.3,0,0,1,12.6,0L159.7,29a102.6,102.6,0,0,1,38.2,22Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/></svg>
        </button>
        <div class="sideBar fadedControls" v-show="showSideBar">
            <select :value="this.mode" @change="this.modeSelect" class="appearance-dark block w-full px-3 py-1 text-base font-normal text-white-700 bg-grey-900 dark:bg-grey-900 bg-clip-padding bg-no-repeat border border-solid border-black-700 rounded transition ease-in-out m-0 focus:text-white-700 focus:bg-red focus:border-gray-300 focus:outline-none" aria-label="Select Wave Type">
                <option selected value="randomize">Randomize</option>
                <option value="mode1">Mode 1</option>
                <option value="mode2">Mode 2</option>
                <option value="mode3">Mode 3</option>
                <option value="mode4">Mode 4</option>
                <option value="mode5">Mode 5</option>
                <option value="mode6">Mode 6</option>
                <option value="mode7">Mode 7</option>
                <option value="mode8">Mode 8</option>
                <option value="mode9">Mode 9</option>
                <option value="mode10">Mode 10</option>
                <option value="mode11">Mode 11</option>
                <option value="mode12">Mode 12</option>
                <option value="mode13">Mode 13</option>
                <option value="mode14">Mode 14</option>
                <option value="mode15">Mode 15</option>
                <option value="mode16">Mode 16</option>
                <option value="mode17">Mode 17</option>
                <option value="mode18">Mode 18</option>
                <option value="mode19">Mode 19</option>
                <option value="mode20">Mode 20</option>
                <option value="mode21">Mode 21</option>
                <option value="mode22">Mode 22</option>
                <option value="mode23">Mode 23</option>
                <option value="mode24">Mode 24</option>
                <option value="mode25">Mode 25</option>
                <option value="mode26">Mode 26</option>
            </select>
        </div>
    </div>
</template>
<script>
import Visualizer from '../helpers/visualizer';

export default {
    data() {
        return {
            showSideBar: false,
            viz: null,
            mode: 'randomize',
            timeOuts: [],
        }
    },
    unmounted(){
        delete this.viz.deconstruct();
        // console.log('unmounted!');
    },
    mounted(){
        const canvas = document.getElementById("visualizer");
        this.viz = new Visualizer(canvas);
        this.randomize();
    },
    methods: {
        modeSelect(e){
            if(e.target.value !== 'randomize'){
                for(let i=0; i<this.timeOuts.length; i++){
                    clearTimeout(this.timeOuts[i]);
                }
                this.timeOuts = [];
                this.viz.vizOpts(e.target.value);
            } else {
                this.randomize();
            }
        },
        randomize(){
            if(this.mode === 'randomize'){
                this.timeOuts.push(setTimeout(()=>{
                    this.randomModeSelect();
                    this.randomize()
                },20000));
            }
        },
        randomModeSelect(){
            let no = Math.floor(Math.random() * (26-1+1) + 1);
            let mode = 'mode'+no;
            this.viz.vizOpts(mode);
        },
    },
}
</script>