class Mic {
    constructor(){
        this.init = false;
        navigator.mediaDevices.getUserMedia({audio:true})
        .then((stream)=>{
            this.audioCtx = new AudioContext();
            this.mic = this.audioCtx.createMediaStreamSource(stream);
            this.analyzer = this.audioCtx.createAnalyser();
            this.analyzer.fftSize = 512;
            const bufferLen = this.analyzer.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLen);
            this.mic.connect(this.analyzer);
            this.init = true;
        }).catch((err)=>{
            console.log(err);
        })
    }
    getSamples = () => {
        this.analyzer.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e/128 -1);
        return normSamples;
    }
    getSamplesF = () => {
        this.analyzer.getByteFrequencyData(this.dataArray);
        // let normSamples = [...this.dataArray].map(e => e/128 -1);
        // let normSamples = [...this.dataArray].map(e => e/128);
        let normSamples = [...this.dataArray].map(e => e/128);
        // console.log(normSamples);
        return normSamples;
    }
    getVol = () =>{
        this.analyzer.getByteFrequencyData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e/128 -1);
        let sum = 0;
        for(let i=0; i<normSamples.length; i++){
            sum += normSamples[i] * normSamples[i];
        }
        let vol = Math.sqrt(sum/normSamples.length);
        // let vol = sum/normSamples.length;
        return vol;
    }
}

class Shape {
    constructor(x, y, width, height, color, idx){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.index = idx;
    }
    update = (micInput, mode) => {
        const vol = micInput;
        switch(mode){
            case 1:
                if(vol > this.height){
                    this.height = vol;
                } else {
                    this.height -= this.height * 0.080;
                }
                break;
            case 2:
                if(vol > this.height){
                    this.height = vol;
                } else {
                    this.height -= this.height * 0.0480;
                }
                break;
            default:
                break;
        }
    }
    draw = (ctx, mode, vol, ch, cw, fftSizeVal) => {
        switch(mode){
            case 'mode1':
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case 'mode2':
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.height);
                ctx.stroke();
                break;
            case 'mode3':
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.y, this.height);
                ctx.stroke();
                break;
            case 'mode4':
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x, this.height);
                ctx.lineTo(this.y, this.height);
                ctx.stroke();
                break;
            case 'mode5':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index);
                ctx.beginPath();
                ctx.moveTo(this.x, this.height);
                ctx.lineTo(this.x, this.y);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode6':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(10, this.height);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode7':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index);
                ctx.beginPath();
                ctx.moveTo(100, 100);
                ctx.lineTo(10, this.height);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode8':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index * 0.05);
                ctx.beginPath();
                ctx.moveTo(50, 50);
                ctx.lineTo(20, this.height);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode9':
            case 'mode10':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index * 0.05);
                ctx.beginPath();
                ctx.moveTo(this.y, this.x);
                ctx.lineTo(20, this.height);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode11':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index * 0.05);
                ctx.beginPath();
                ctx.moveTo(this.y, this.x);
                ctx.lineTo(this.y, this.height);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode12':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index * 0.05);
                ctx.beginPath();
                ctx.moveTo(this.y, this.x);
                ctx.lineTo(this.y, this.height);
                ctx.stroke();
                ctx.strokeRect(this.x, this.y, this.height, this.width);
                ctx.restore();
                break;
            case 'mode13':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index * 0.05);
                ctx.scale(1+vol*0.5,1+vol*0.5);
                ctx.beginPath();
                ctx.moveTo(this.y, this.x);
                ctx.lineTo(this.y, this.height);
                ctx.stroke();
                ctx.strokeRect(this.x, this.y, this.height, this.width);
                ctx.restore();
                break;
            case 'mode13':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index * 0.05);
                ctx.scale(1+vol*0.5,1+vol*0.5);
                ctx.beginPath();
                ctx.moveTo(this.y, this.x);
                ctx.lineTo(this.y, this.height);
                ctx.stroke();
                ctx.strokeRect(this.x, this.y, this.height, this.width);
                ctx.restore();
                break;
            case 'mode14':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index);
                ctx.scale(1+vol*0.5,1+vol*0.5);
                ctx.beginPath();
                ctx.moveTo(100, 100);
                ctx.lineTo(10, this.height);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode15':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index * 0.05);
                ctx.scale(1+vol*0.5,1+vol*0.5);
                ctx.beginPath();
                ctx.moveTo(50, 50);
                ctx.lineTo(20, this.height);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode16':
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index*Math.PI*8/(fftSizeVal/2));
                ctx.scale(1+vol*0.5,1+vol*0.5);
                ctx.fillRect(20, 20, this.width, this.height);
                ctx.restore();
                break;
            case 'mode17':
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index+Math.PI*8/(fftSizeVal/2));
                ctx.scale(1+vol*0.5,1+vol*0.5);
                ctx.fillRect(10, 10, this.width, this.height);
                ctx.restore();
                break;
            case 'mode18':
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index*Math.PI*2/(fftSizeVal/2));
                ctx.scale(1+vol*0.8,1+vol*0.8);
                ctx.fillRect(100, 10, this.width, this.height);
                ctx.restore();
                break;
            case 'mode19':
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index*120/(fftSizeVal/2));
                ctx.scale(1+vol*0.8,1+vol*0.8);
                ctx.fillRect(10, 100, this.width, this.height);
                ctx.restore();
                break;
            case 'mode20':
                let img641 = "data:image/png;base64,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";
                let sprite1 = new Image();
                sprite1.src = img641;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index*6/(fftSizeVal/2));
                ctx.drawImage(sprite1, 0, this.index+((this.height/2)/3), this.height/2.5, this.height/2.5);
                ctx.restore();
                ctx.drawImage(sprite1, (cw/2)-85, (ch/2)-85, this.height/3+170, this.height/3+170);
                break;
            case 'mode21':
                let img642 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAASwAgMAAACWT1tcAAAADFBMVEVHcEz/6zsAAAD///82mT7yAAAAAXRSTlMAQObYZgAABOxJREFUeNrt3dENwyAMQEGW7JJZsp2ACuS6wc69AQy+f8QYkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJUnJXIFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQtWD5RXoLaIsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULViOsX6FEEGHBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYzwEqCQcLFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGA1wroKBgsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMGCBQsWLFiwYMHKw5o9jHxP2l1yd85xDzVhwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWMtA2XNgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWP/Bml10ZbGMObBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxase7FOCBYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYLVFe77iccBwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLA2l49/IQkLFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBqg4X5x5VggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsGDBggULFixYsJpizeAyEMsDwYIFCxYsWLBgwYIFCxasMBAsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxasfogrjacFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZJ0Tx/krxLp9CkFVwAAAABJRU5ErkJggg==';
                let sprite2 = new Image();
                sprite2.src = img642;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index*8/(fftSizeVal/2));
                ctx.drawImage(sprite2, 0, this.index+((this.height/2)/3), this.height/2.5, this.height/2.5);
                ctx.restore();
                ctx.drawImage(sprite2, (cw/2)-85, (ch/2)-85, this.height/5+170, this.height/5+170);
                break;
            case 'mode22':
                let img643 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAAAXNSR0IArs4c6QAAE95JREFUeF7tndtyHEd2RTcJhqgnMuSwZuynkb/DEgF9lMWLJJO0KJCUP2oAUv4Oa57sGU1YIT6JCoJwJJotNXHdOxuZyOpaFYHAiHOqKmudszq7G3m5Jg4IQGDjCVzb+CfkASEAASE6RQCBGRBA9BkkmUeEAKJTAxCYAQFEn0GSeUQIIDo1AIEZEED0GSSZR4QAolMDEJgBAUSfQZJ5RAggOjUAgRkQQPQZJJlHhMCoou9I2h4sPQeSnkoqvzmunsCWpPuSyu+Rjn1JeyM1qLRlVNEfSno0GKxfJd2S9Hqwds21OTclvZL0wWAASt0+HqxNiB4kBNEDWB1CET2ATI/uwyo9+W16dB9Y48gi+s+Syu+RDnr0IBu8dQ9gzTSUHj1IPD26D4u37j6rHpGIHlBGdB8WovusekQiekAZ0X1YiO6z6hGJ6AFlRPdhIbrPqkckogeUEd2Hheg+qx6RiB5QRnQfFqL7rHpEInpAGdF9WIjus+oRiegB5Y0R/YY+DB5beqs3Rz/BUUT/w4ADZspDRA8SPPMy9Iak8jPSUUT/WzIE9rpuqPwkxxv9koSXWAbMBMSiATNbuqkv9FfdCAZJ7euJXujboElHoXHW0xtUxD+R8gcJ7/OlpK/Cc3qER6/ud/SltoPHeKPX+k5/1EE2vQHRg8zHoj/QK20F8xv29Fh7w82bCQj9HtqjsKJ8VD1Fh5N29FA7Qc4P9Kt2dQvRG+YmKqzSoyN6w2xIUT6atmSNixfJi+zugeguqfq4qLAQvfm0yCgf9Wlveyait+Vbc/WosBAd0Z0iQ3SHUt+YDqI/UvmcvgEHn9HNJPIZ3QTVMayD6HwZF+Qzykdw3a6hiN4Vt3WzqLDq3rrTo1uZWARF+Qiu2zUU0bvitm4WFVad6PToViY2SnS+dQ9y3iW0g+j06EEmo3wE1+0aypdxXXFbN4sKq65HR3QrExvVozNgJsh5l9AK0X9WEd49GBnnkprzZ/TX2tVtRsaZpVJmEdwNJ0WUDRzKj3Vc15Y+0wOV3+7x39rTD43X2f8X7ehPwT4Uh3qjl3qeTrYZ7s9rZeLIZ7qra8EEkr9oXyUnLY9PtKOSE/d4qwO91K7K7+AoD5E8SJmQ9Lz1xKQes9fKxIOfpHB6WUB21NDP9Ujb0ZDLX/RUHymcMTWc6GUm4X39pK0g5ft6rD8H49BHzXlFu8pEqY9aT5hC9IrMuKcguj+5DNHbzoxEdNfaijhER3SjbOjRDUhDhyA6ohsFiugGpKFDEB3RjQJFdAPS0CGIjuhGgSK6AWnoEERHdKNAEd2ANHQIoiO6UaCIbkAaOgTREd0oUEQ3IA0dguiIbhQoohuQhg5BdEQ3CnS+opex0teCcesGzBMhZVx5OIY5vk0n0cu67uWn5VHWdLfXdR91CGyZC5GMv68BeqiDdK7CfEUvi+zf0dcXcD6U5A7sOxm7r2/0orEfnUQvMy7OmnWxHqTfM1BmC9kzhkYV/Y6+0vaJurosRAtYL/SNyuYgwTFf0dMlfwKov4WWzRtaLw7ZSfSax296zqiiD1pXiN6yGnvMR0f0sT6jpyvM1NRfRQeC6DWg3XMqEuJe+rc4REd0o2gQ3YBUHUKPXo3uwhPHfeueLQ554YOeElDRgSB6DWj3HER3SeVx44qerRmXP3lZWib+7gfRa0C75yC6SyqPG1d0evQ8m/4Z8VJSfb4dbb+uO5/R+YxuaEKPbkCqDqFHr0Z34Yn06NGefoh+YUWtEVDxWSq+Gz36aD06n9HjIg5O4K27CetAVavAmlfvFzZuj47oLasA0U26iF5Wrm53zH3AzCrd5cDf8rscq4PJj//b6n+vnrc8Z/lvZYz0vWQDh/TLuDKR4KWenjJJ5awmSj9oP9rAYbFJxP13k22OP2JBdRzBocqGAeXHPd7qjb7Xs3fPcdoY7LOf5/R0lXYuz1m2YrXtq/+2er/j5yxLYfXfl9c++buw+lT3VCYnuUfZTKPkZHEcb8vJeyw2uzgt52ffcZGP7XdlfV7JLv6/93PuPUnFR8KygcOzd/MVzkv6cR9XG3T8vBNJP60SvCdqGJWKfqCydc4tHejXZq3a0gd6oFfRtk/NGsOFj7ZJGjHnFaJ3ySaim5gR3QTVKQzRM9CIbvJCdBNUpzBEz0AjuskL0U1QncIQPQO9QaLH29tGpBZ7sGdbM0c3IDgisBB9vJzzGT1II1/GBbBmGkqPniV+g3p0vnXPUj/taETP8ofoJi8+o5ugOoUhegYa0U1eiG6C6hSG6BloRDd5IboJqlMYomegEd3khegmqE5hiJ6BjkVfLIK/XOLbOz0dmpqu616S/lz/GA2Bff85ltDOfp4buqkv9CNDYLP6ahZdcv6dPtYbvT7jHidzudhc4awl8E9epry439XfV3J+8RrwFeu6q9zn4uP350mfo1zbM3WlFQsJ7U07VGZkfad/0huV+fXeUbNTS0l8cqTPUa5d/pbOMQ6BNOdlw45wc4U45+lOLWVK7xf6X23Jn7tf8xyx6J/robblTyccdepl+rf6ccqbltQSGHEwS93c/Uf6s6JVbPIeHdFry4zzrpoAogcZ2BzR268IGmAltAOBHusEpo9Bj54SC+N56x4C24BwevQgifToASxChyJAjx6kA9EDWIQORQDRg3QgegCL0KEIIHqQjs0Rvf3SvwFWQjsQQPQAMqIHsAgdigBfxgXpQPQAFqFDEUD0IB2IHsAidCgCiB6kY0TRFwvtPzhacN89/qTtaHMF97rEjUugbBLxl982ibi4nWUCzEvtRhNhLr7q+xEMmAmIsXBjAItQm0CPBSgR3U7HYlbZYhcVZ7pfcGFCZ02gTK9e7AaTzYxMoCF6QAvRA1iE2gQQfbBpqohu1y6BAQFER/SgXAidKgFER/Sp1i7tDgggOqIH5ULoVAkgOqJPtXZpd0AA0RE9KBdCp0oA0RF9qrVLuwMCiI7oQbkQOlUCiD5T0cvS1a2PZH3v1m1Z5/qbwArRZyh6Sfp3+kPz4ZD/pv+JFvNfR8ZW5xbJ/1P/HG3akbalDJL6Qn9rOuwZ0Wcq+ojjnlNBesT32LSjx2hIREf0Jr7UTHBo0pA1L4roPsCanO9rpju1zPnV3S+pfpGI7rNGdJ9Vl2mqo76NCzB1C0V0HzWi+6wQPWDVIxTRfcqI7rNC9IBVj1BE9ykjus8K0QNWPUIR3aeM6D4rRA9Y9QhFdJ8yovus3on+89HvVseoCwW2et51rttP9HnmnD+vNVwckm/dffX7id52QdBRc47oiO7b2DAS0X24vHX3WfEZPWDVIxTRfcqI7rNC9IBVj1BE9ykjus8K0QNWPUIR3aeM6D4rRA9Y9QhFdJ8yovusED1g1SMU0X3KiO6zQvSAVY9QRPcpI7rPCtEDVj1CEd2njOg+K0bGBax6hPYTnZFxbj6vSTp0g0vc53qobVaYSZDZsTWv7vbFOwb2E52RcW5aEd0kNepwSLP5XcMQ3cdd8+LOEFiGwPoV1jAS0X24iO6z4su4gFWPUET3KQ8r+o6+1h39u/0kvdb4vqf/m+Ua33YiOgZukujP9A/DreX/Qv+hPX0TZTT+jH5N11V+3KO8YvXYlOC6brhNqorjM7qPbVNEL0/8Vm/8B6+IrOkID/VW5Sc5YtGTi5fYmrcm6T16xCO6T3mTRPefui6yB6vSMkQ384PoJihJPYq3x1r+/hPXR/ZghehBfhDdh9WjeBHdzweiB6wQ3YeF6GOxQnQ/H0ffvO7qdvNvYO/rp43YTfWpPmq+m+oDtR0CG5RHdWiPF0VED9JDj+7D6lG8vHX384HoAStE92Eh+lisEN3PhxDdh4XoY7FCdD8fiB6x+kV9PqO3nb0WPHJ1aI8XRUQP0kOP7sPqUbx8RvfzgegBK0T3YSH6WKyWoj/ym3UUuS1pxz2njEH/VPfUciz6NW3pM93XdW25zYrj3upA32tXhzqIz3VPuNaBlduWdeLK+PDv9UyHDceJl5x/qgfNc/5ST5vmfMkqHFO/J2k/yVEZApseD6VgiZn06hXxm/I2ruLROaUhgR7v4iqbXzrnx8m5iJ7QInZWBBB9yB59+qOkZmXRBB62x2jISgz06JXgOA0CJwjQow/Zo0//b6q4NhYBREf0sSqS1jQhgOiI3qSwuOhYBBAd0ceqSFrThACiI3qTwuKiYxFAdEQfqyJpTRMCiI7oTQqLi45FYO6ifynpq8YpKYu02wu1MwS2cTZmevlK0ctC8G0Xg5eeSPo2SUvNENhIwqQxK7HRiwmiV1LmtHMJVIoeS1iRhvjFpEb0inbFp0QTZxA95ssJBoFK0ePhqUZT1g5B9LURcoFNJYDo7TNLj96eMXe4gACity8RRG/PmDsg+pXXAKJfeQpoAD16+xpA9PaMuQM9+pXXAKJfeQpoAD16+xpA9PaMuQM9+pXXAKJfeQpoAD16+xpA9PaMuQM9+pXXQIXoLA555VnbsAZULg7JyLigDiLRy8YNnzVezH+5SUT53eooi/j/l54rXMy/VXOqr1s26/hX3W26aUfZSKP95grlHrsqm3cEB6IHsCLRg+tWh27pAz1QWYDyZvU1Ljqxx1ZGF7XhMv7/G/pQ9/WTtvThZVzu1GssettbR5tfDnYgepAQRA9gjRaK6NkuKj3ytxGTWnqAokf3KSM6orvVQo/ukhowDtER3S1LRHdJDRiH6IjuliWiu6QGjEN0RHfLEtFdUgPGITqiu2WJ6C6pAeMQHdHdshxQ9Jt6oLaj7/g7ulseUuWoNf8G9ZH8HT1gN6DoDJhx80ePTo/u1gqiu6QGjEN0RHfLsmwQ0WOTCHvg+sADZsoa39FgbDcJK3GFk72hxsCiF049Nlcoa7sPdYw6Mq4U1kUSlrYfmjRPi/06eTEZWPRvtNi547RjXUbLa5YX3cLLOgYWvXAqvFaPy2K0vGZ5MWn9wmvl4fhDxidtyAnRx4OBRe/x5U/EamDRe7AaUo9Re/QesKLiRXQVSawD0S1MXYPmLHop3CK7dSA6oluFMmgQopuJQfSNEP2xBtvy2yy/tcMQ3USI6IhulsqQYYhupgXREd0slSHDEN1My2Jr5iGHwPb4Jjn64rLfl3G3j4bCBkcPVkFz+oUiusmaHp0e3SyVIcPmLHrUSyH6RohOjz7ky1DbRiG6zzdi1e+te7wKLN+6+znfmEj+ju6nEtF9VkNGjvrWfUdS+VmOZV+OR162t/z76v9ewj3+PKtxy5jlNZf3sBKz2CTivhYbOJzWjOOXL/+92pzjTVn+9++PWDZu+F7P0g0cerwdjUQvGzh8qnvHNnA4L5WrrFa5nMZvcZ3lBg7h5gp7ksrPaj0dr6XjNz3euOV/n1Zb5f9b3sOqq15Bo4oeFVYvWIPeZzjRB+XUq1k98hE/C6LHyIY7oUdh8cLrp71HPvzWvItE9BjZcCf0KCxE99PeIx9+axA9ZjXqCT0KC9H97PfIh98aRI9ZjXpCj8JCdD/7PfLhtwbRY1ajntCjsBDdz36PfPitQfSY1agn9CgsRPez3yMffmsQPWY16gk9CgvR/ez3yIffGkSPWY16Qo/CQnQ/+z3y4bcG0WNWo57Qo7AQ3c9+j3z4rUH0mNWoJ/QoLET3s98jH35rNk30Mo307OPk0t1lrHQ4Trpc/teVe5w11vl4M9y4JHmr1zxvXffkmufFrq7r3vp5zmvH8Xufl/QT1ynzFRZzFVaP85d1P3gv5RZORLcwLYKiHqSs/nJXP+p82d+/+ws90f6Z+x6c2tIi+cdStqRJ8My1ocPt1FL7IOF5NyX9KJ37Cv/eJbf1le4EGwAVyZ/r441YxWYjhsAulnl6FYm+p0fay7bIKqLfGlD00I+NCS+iv0pE39Ej7fgrfKuIvqsy5336y1XNWPTHKrIHB6IHsDqEInoAeYNEzxZuLL15KHp5Wb9Njx5UV9vQIvrPkspv68h79Nfa1WYsQLlBovPW3ar2zQmq6NEfqsjuHrx1d0nVx8VfxuWf0eMenbfu9flscWaF6HxGb5GIda7ZQXS+jFsnQQOci+hBEmb81p0ePaiTEUMRPcjKjEWnRw/qZMTQCtH5jD5aIju8dadHHy3pYXsqROczesi4eTiiN0c8+RsgepDCGb91p0cP6mTEUEQPsrIRor+/uYL39D9oXz8crbVvH/x5zUbVJTAW/RPt6BNt242r3CSCSS024XBSS3DddUIZGbcOvcs/Nx4Zd/lNOPWKiB6Ajj6jB9ddJ5QefR16l39u3KNffhMQfV2miL4uwc0/H9GDHG/EZ/TgedcJpUdfh97ln4voAVNE92Ehus+qRySiB5QR3YeF6D6rHpGIHlBGdB8WovusekQiekAZ0X1YiO6z6hGJ6AFlRPdhIbrPqkckogeUEd2Hheg+qx6RiB5QRnQfFqL7rHpEInpAeVTRv5SCBbiDB14jtAyB/SOLQ65B8HJPLaL/NVkc8nJvf+bVnkj6ttO97NuMKvoNSeVntOOX0Ro08/Z8OODzlw01ys9Qx6iiDwWJxkBg6gQQfeoZpP0QMAggugGJEAhMnQCiTz2DtB8CBgFENyARAoGpE0D0qWeQ9kPAIIDoBiRCIDB1Aog+9QzSfggYBBDdgEQIBKZOANGnnkHaDwGDAKIbkAiBwNQJIPrUM0j7IWAQQHQDEiEQmDoBRJ96Bmk/BAwCiG5AIgQCUyeA6FPPIO2HgEEA0Q1IhEBg6gQQfeoZpP0QMAggugGJEAhMnQCiTz2DtB8CBgFENyARAoGpE0D0qWeQ9kPAIIDoBiRCIDB1Aog+9QzSfggYBP4fsfAmdOux5TYAAAAASUVORK5CYII=';
                let sprite3 = new Image();
                sprite3.src = img643;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index*12/(fftSizeVal/2));
                ctx.drawImage(sprite3, 0, this.index+((this.height/2)/3), this.height/2.5, this.height/2.5);
                ctx.restore();
                ctx.drawImage(sprite3, (cw/2)-85, (ch/2)-85, this.height/4+170, this.height/4+170);
                break;
            case 'mode23':
                ctx.save();
                ctx.strokeStyle = this.color;
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index*(fftSizeVal/2)/1.2);
                ctx.lineWidth = this.height/7;
                ctx.beginPath();
                ctx.moveTo(0,this.height/1.1);
                ctx.lineTo(this.height/1.1, this.height);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode24':
                ctx.save();
                ctx.strokeStyle = this.color;
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index*(fftSizeVal/2)/2);
                ctx.lineWidth = this.height/7;
                ctx.lineCap = 'round';
                // ctx.shadowOffsetX = 0;
                // ctx.shadowOffsetY = 0;
                // ctx.shadowBlur = 7;
                // ctx.shadowColor = 'white';
                ctx.beginPath();
                ctx.moveTo(0,this.height/1.1);
                ctx.lineTo(this.height/1.1, this.height);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode25':
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index * 0.05);
                // ctx.scale(1+vol*0.5,1+vol*0.5);
                ctx.lineWidth = 2;
                ctx.beginPath();
                // ctx.moveTo(this.y, this.x);
                // ctx.lineTo(this.y, this.height);
                ctx.stroke();
                ctx.arc(0, this.height, this.height/3, 0, Math.PI*2);
                ctx.stroke();
                ctx.restore();
                break;
            case 'mode26':
                ctx.fillStyle = this.color;
                ctx.save();
                ctx.translate(cw/2,ch/2);
                ctx.rotate(this.index * 0.05);
                // ctx.scale(1+vol*0.5,1+vol*0.5);
                ctx.lineWidth = 1;
                ctx.beginPath();
                // ctx.moveTo(this.y, this.x);
                // ctx.lineTo(this.y, this.height);
                ctx.stroke();
                ctx.arc(0, this.height, this.height/3, 0, Math.PI*2);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                break;
            default:
                break;
        }
    }

}
export default class Visualizer {
    constructor(cnvs){
        this.mic = new Mic();
        this.canvas = cnvs;
        this.fftSizeVal = 512;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.shapeWidth = this.canvas.width/(this.fftSizeVal/2);
        this.shapeWidthPass = this.canvas.width/(this.fftSizeVal/2);
        this.shapes = [];
        this.boost = 1000;
        this.extBoost = 0;
        this.vizMode = 'mode1';
        this.startPos = this.canvas.height/2;
        this.running = true;
        this.updateMode = 1;
        this.createShapes(1);
        this.animate();
        // this.vizOpts('mode15');
    }
    deconstruct = () => {
        delete this.mic;
    }
    vizOpts = (mode) => {
        this.shapes = [];
        switch(mode){
            case 'mode1':
                this.vizMode = 'mode1';
                this.startPos = this.canvas.height/2;
                this.boost = 1000;
                this.createShapes(5);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode2':
                this.vizMode = 'mode2';
                this.startPos = this.canvas.height;
                this.boost = 1000;
                this.createShapes(1);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode3':
                this.vizMode = 'mode3';
                this.startPos = this.canvas.height;
                this.boost = 1000;
                this.createShapes(1);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode4':
                this.vizMode = 'mode4';
                this.startPos = this.canvas.height;
                this.boost = 2000;
                this.createShapes(1);
                this.updateMode = 1;
                // this.animate();
            case 'mode5':
                this.vizMode = 'mode5';
                this.startPos = this.canvas.height;
                this.boost = 1500;
                this.createShapes(1);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode6':
                this.vizMode = 'mode6';
                this.startPos = this.canvas.height;
                this.boost = 2000;
                this.createShapes(1);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode7':
                this.vizMode = 'mode7';
                this.startPos = this.canvas.height;
                this.boost = 1500;
                this.createShapes(1);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode8':
                this.vizMode = 'mode8';
                this.startPos = this.canvas.height;
                this.boost = 1800;
                this.createShapes(1);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode9':
                this.vizMode = 'mode9';
                this.startPos = this.canvas.height;
                this.boost = 1800;
                this.createShapes(1);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode10':
                this.vizMode = 'mode10';
                this.startPos = this.canvas.height;
                this.boost = 1800;
                this.createShapes(2);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode11':
                this.vizMode = 'mode11';
                this.startPos = this.canvas.height;
                this.boost = 1800;
                this.createShapes(2);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode12':
                this.vizMode = 'mode12';
                this.startPos = this.canvas.height;
                this.boost = 1800;
                this.createShapes(2);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode13':
                this.vizMode = 'mode13';
                this.startPos = this.canvas.height;
                this.boost = 1800;
                this.createShapes(2);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode14':
                this.vizMode = 'mode14';
                this.startPos = this.canvas.height;
                this.boost = 1500;
                this.createShapes(1);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode15':
                this.vizMode = 'mode15';
                this.startPos = this.canvas.height;
                this.boost = 1800;
                this.createShapes(1);
                this.updateMode = 1;
                // this.animate();
                break;
            case 'mode16':
                this.vizMode = 'mode16';
                this.startPos = this.canvas.height;
                this.boost = 1500;
                this.createShapes(1);
                this.updateMode = 1;
                break;
            case 'mode17':
                this.vizMode = 'mode17';
                this.startPos = this.canvas.height;
                this.boost = 1500;
                this.createShapes(1);
                this.updateMode = 1;
                break;
            case 'mode18':
                this.vizMode = 'mode18';
                this.startPos = this.canvas.height;
                this.boost = 1500;
                this.createShapes(1);
                this.updateMode = 1;
                break;
            case 'mode19':
                this.vizMode = 'mode19';
                this.startPos = this.canvas.height;
                this.boost = 1500;
                this.createShapes(1);
                this.updateMode = 1;
                break;
            case 'mode20':
                this.vizMode = 'mode20';
                this.startPos = this.canvas.height;
                this.boost = 1000;
                this.createShapes(4);
                this.updateMode = 2;
                break;
            case 'mode21':
                this.vizMode = 'mode21';
                this.startPos = this.canvas.height;
                this.boost = 1000;
                this.createShapes(4);
                this.updateMode = 2;
                break;
            case 'mode22':
                this.vizMode = 'mode22';
                this.startPos = this.canvas.height;
                this.boost = 1000;
                this.createShapes(4);
                this.updateMode = 2;
                break;
            case 'mode23':
                this.vizMode = 'mode23';
                this.startPos = this.canvas.height;
                this.boost = 1000;
                this.createShapes(4);
                this.updateMode = 2;
                break;
            case 'mode24':
                this.vizMode = 'mode24';
                this.startPos = this.canvas.height;
                this.boost = 1000;
                this.createShapes(4);
                this.updateMode = 2;
                break;
            case 'mode25':
                this.vizMode = 'mode25';
                this.startPos = this.canvas.height;
                this.boost = 1000;
                this.createShapes(4);
                this.updateMode = 2;
                break;
            case 'mode26':
                this.vizMode = 'mode26';
                this.startPos = this.canvas.height;
                this.boost = 1000;
                this.createShapes(4);
                this.updateMode = 2;
                break;
            default:
                break;
        }
    }
    createShapes = (m) => {
        for(let i=0; i<(this.fftSizeVal/2); i++){
            // let color = 'hsl('+ i*2 +', 100%, 50%)';
            let color = 'hsl('+ i +', 100%, 50%)';
            switch(m){
                case 1:
                    this.shapes.push(new Shape(i * this.shapeWidth, this.startPos, this.shapeWidthPass, 100, color, i));
                    break;
                case 2: 
                    this.shapes.push(new Shape(0, i*2, this.shapeWidthPass, 100, color, i));
                    break;
                case 3:
                    // this.shapes.push(new Shape(i * this.shapeWidth, this.startPos, this.shapeWidthPass, 100, color, i));
                    this.shapes.push(new Shape(0, i*2, this.shapeWidthPass, 100, color, i));
                    i+=3;
                    break;
                case 4:
                    // this.shapes.push(new Shape(i * this.shapeWidth, this.startPos, this.shapeWidthPass, 100, color, i));
                    this.shapes.push(new Shape(0, i*2, this.shapeWidthPass, 100, color, i));
                    i+=2;
                    break;
                case 5:
                    this.shapes.push(new Shape(i * this.shapeWidth, this.startPos, this.shapeWidthPass, 100, color, i));
                    i+=2;
                    break;
                default:
                    break;
            }
        }
    }
    animate = () => {
        if(this.running){
            if(this.mic){
                if(this.mic.init){
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    const samples = this.mic.getSamplesF();
                    const vol = this.mic.getVol();
                    this.shapes.forEach((shape, i)=>{
                        // if(i<40){
                        //     shape.update((samples[i]-0.8) * (this.boost+this.extBoost),this.updateMode);
                        //     shape.draw(this.ctx, this.vizMode, vol, this.canvas.height, this.canvas.width,this.fftSizeVal);
                        // }else{
                            shape.update((samples[i] + i/256-1) * (this.boost+this.extBoost),this.updateMode);
                            shape.draw(this.ctx, this.vizMode, vol, this.canvas.height, this.canvas.width,this.fftSizeVal);
                        // }
                    });
        
                }
                requestAnimationFrame(this.animate);
            }
        }
    }
}