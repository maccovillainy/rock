let player;
window.onload = () => {
  let data1 = Date.now()
  let data2;
  setTimeout(()=>data2 = Date.now(),500);
let songs;
  class Player {
    constructor() {
      this.audio = document.getElementById('first');
      this.prog = document.querySelector('.prog');
      this.slide = document.querySelector('.slide');
      this.playButton = document.querySelector('.controls button:nth-child(2)');
      this.modal = document.querySelector('.modal');
      this.playlist = document.querySelector('.playlist ul');
      this.info = document.querySelector('.player__info');
      this.play = false;
      this.coordX = 0;
      this.writeCoordX = false;
      this.songs = [];
      this.curTrack = 0;
    }

    init() {
      this.songs = songs.map((item,i) => {
        item.id = i
        return item;
      });
      this.playlist.innerHTML = this.songs.map(item =>`<li onclick=player.playTrack(${item.id})>${item.name}</li>`).join('');
      this.audio.setAttribute('src', this.songs[0].link)
      this.updataInfo(this.songs[0].name)
      this.initEvents();

      window.onmousemove =  this.change.bind(this)


    }
    initEvents() {
      this.audio.addEventListener('timeupdate', () => {
        let fullTime = this.audio.duration;
        let curTime = this.audio.currentTime;
        let fullWidth = this.slide.offsetWidth;
        let curPer = curTime * 100 / fullTime;
        let nextW = curPer * fullWidth / 100;
        this.prog.style.width = nextW + 'px';
      });
      this.audio.addEventListener('pause', () => {
        this.playButton.innerHTML = 'play';
        this.play = false
      });
      this.audio.addEventListener('play', () => {
        this.playButton.innerHTML = 'pause';
        this.play = true
      });
      this.slide.addEventListener('mousedown',  (e)=>{
        this.writeCoordX = true
        this.change(e);
      });
      window.addEventListener('mouseup', ()=> {
        this.writeCoordX = false
        this.modal.classList.remove('visible');
      });
      this.audio.onended = () => {
        this.prog.style.width = '100%';
        this.playButton.innerHTML = 'play'
        this.audio.currentTime = 0;
      };
      this.playButton.addEventListener('click', this.pp.bind(this));
      this.audio.addEventListener('durationchange', ()=> console.log('changed!'))
    }
    change(e){
      if (this.writeCoordX){
        this.modal.className += ' visible';
        let fullWidth = this.slide.offsetWidth;
        let curWith = e.clientX - this.slide.getBoundingClientRect().left;
        this.audio.currentTime = this.audio.duration * (100 * curWith / fullWidth) / 100
      }
    }
    pp(){
      if (this.play) this.audio.pause();
      else {
        this.audio.play();
      }
    }
    playTrack(id){
      this.audio.setAttribute('src', songs.filter(item => {
        if(item.id == id){
          this.curTrack = id;
          return item;
        }
      })[0].link);
      this.audio.currentTime = 0;
      this.audio.play();
    }
    nextTrack(){
      let next = this.curTrack++;
      if (this.songs[next])
        this.playTrack(next)
    }
    prevTrack(){
      let prev = this.curTrack--;
      if (this.songs[prev])
        this.playTrack(prev)
    }
    updataInfo(name){
      this.info.innerHTML = name
    }
  }

  let promise = new Promise((res,rej) => {
    setTimeout(()=>{
      res([
        {
          _id: 42314,
          group: 'metallica',
          song: 'i disappear',
          name: 'metallica - i disappear',
          link: 'https://cs1-60v4.vk-cdn.net/p21/a68443fea522b9.mp3?extra=1VsVUj8VQSeaYaIgnYSAm-egY65Ostc705Q_1s786I0Ex_YIDOCLUmhYGMPkGD5gdw4bFQ-jur9zsIlzbPhYMUxteHlo30mJSELjtYdepQ0TIz4HVKO-g6KDes_L8hAfYy4dxFXiR5s',
          data: data1,
          like: 0,
          type: ['metal, rock']
        },
        {
          _id: 374259034789,
          group: 'linkin park',
          song: 'crowl back in',
          name: 'linkin park - crowl back in',
          link: 'https://cs1-60v4.vk-cdn.net/p21/a68443fea522b9.mp3?extra=1VsVUj8VQSeaYaIgnYSAm-egY65Ostc705Q_1s786I0Ex_YIDOCLUmhYGMPkGD5gdw4bFQ-jur9zsIlzbPhYMUxteHlo30mJSELjtYdepQ0TIz4HVKO-g6KDes_L8hAfYy4dxFXiR5s',
          data: data2,
          like: 0,
          type: ['alternative, rock']
        }
      ])
    },2000)
  });
  promise.then(res =>{
    songs = res;
    player = new Player();
    player.init();

  })

};
