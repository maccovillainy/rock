window.onload = () => {

  class Player {
    constructor() {
      this.audio = document.getElementById('first');
      this.prog = document.querySelector('.prog');
      this.slide = document.querySelector('.slide');
      this.play = false;
      this.playButton = document.querySelector('.controls button:nth-child(2)');
      this.coordX = 0;
      this.writeCoordX = false
    }

    init() {
      this.audio.addEventListener('timeupdate', () => {
        let width = this.prog.offsetWidth;
        let fullTime = this.audio.duration;
        let curTime = this.audio.currentTime;
        let fullWidth = this.slide.offsetWidth;
        let curPer = curTime * 100 / fullTime;
        let nextW = curPer * fullWidth / 100;
        width = nextW;
        this.prog.style.width = width + 'px';
      });

      this.audio.addEventListener('pause', () => {
        this.playButton.innerHTML = 'pause';
        this.play = false
      });
      this.audio.addEventListener('play', () => {
        this.playButton.innerHTML = 'play';
        this.play = true
      });

      window.onmousemove =  (e)=>{
        console.log(this.writeCoordX )
        if (this.writeCoordX){
          console.log(e.clientX)
        }/*else{
          //console.log('b')
        }*/
      }
      this.slide.addEventListener('mousedown', ()=> {
        this.writeCoordX = true
      });

      window.addEventListener('mouseup', ()=> {
        this.writeCoordX = false
      });

      this.audio.onended = () => {
        this.prog.style.width = '100%';
      };


    }

    change(e){
      console.log('a')
      console.log(e.clientX)
    }

    pp(){
        if (this.play) this.audio.pause();
        else this.audio.play();
    }

  }


  let player = new Player();
  player.init();

};
