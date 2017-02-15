let player;
document.addEventListener('DOMContentLoaded', () => {

  let data1 = Date.now();
  let data2;
  let data3;
  setTimeout(()=>data2 = Date.now(), 50);
  setTimeout(()=>data3 = Date.now(), 60);
  let songs;

  class Player {
    constructor() {
      this.audio = document.getElementById('first');
      this.prog = document.querySelectorAll('.prog')[1];
      this.slide = document.querySelectorAll('.slide')[1];
      this.progVolume = document.querySelectorAll('.prog')[0];
      this.slideVolume = document.querySelectorAll('.slide')[0];
      this.playButton = document.querySelector('.controls button:nth-child(2)');
      this.modal = document.querySelector('.modal');
      this.playlist = document.querySelector('.playlist ul');
      this.info = document.querySelector('.player__info');
      this.play = false;
      this.writeCoordX = false;
      this.writeCoordXVolume = false;
      this.songs = [];
      this.curTrack = 0;
      this.activeId = 0;
    }

    init() {
      this.audio.volume = 1;
      this.songs = songs.map((item, i) => {
        item.id = i;
        return item;
      });
      this.playlist.innerHTML = this.songs.map(item =>`<li class="fa playlist__li" onclick=player.playTrack(${item.id})>${item.name}</li>`).join('');
      this.audio.setAttribute('src', this.songs[0].link);
      this.updataInfo(this.songs[0].group, this.songs[0].song);
      this.initEvents();

      window.onmousemove = (e) => {
        this.writeCoordXVolume && this.change(e, this.writeCoordXVolume, this.slideVolume, 'volume');
        this.writeCoordX && this.change(e, this.writeCoordX, this.slide, 'time')
      }


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
        this.playButton.classList.remove('blue');
        this.playButton.classList.remove('fa-pause');
        if (!this.playButton.classList.contains('fa-play'))
          this.playButton.className += ' fa-play';
        this.play = false
      });
      this.audio.addEventListener('play', () => {
        this.playButton.classList.remove('fa-play');
        if (!this.playButton.classList.contains('blue'))
          this.playButton.className += ' blue';
        if (!this.playButton.classList.contains('fa-pause'))
          this.playButton.className += ' fa-pause';
        this.play = true
      });
      this.slide.addEventListener('mousedown', (e)=> {
        if (e.which === 1) {
          this.writeCoordX = true;
          this.change(e, this.writeCoordX, this.slide, 'time');
        }
      });
      this.slideVolume.addEventListener('mousedown', (e)=> {
        if (e.which === 1) {
          this.writeCoordXVolume = true;
          this.change(e, this.writeCoordXVolume, this.slideVolume, 'volume');
        }
      });
      window.addEventListener('mouseup', ()=> {
        this.writeCoordX = false;
        this.writeCoordXVolume = false;
        this.modal.classList.remove('visible');
      });
      this.audio.onended = () => {
        this.prog.style.width = '100%';
        this.playButton.innerHTML = 'play';
        this.audio.currentTime = 0;
        this.nextTrack();
      };
      this.playButton.addEventListener('click', this.pp.bind(this));
      this.audio.addEventListener('durationchange', ()=> console.log('changed!'))
    }

    change(e, x, container, type) {
      if (x) {
        if (!this.modal.classList.contains('visible'))
          this.modal.className += ' visible';
        let fullWidth = container.offsetWidth;
        let curWith = e.clientX - container.getBoundingClientRect().left;
        if (type === 'time') {
          this.audio.currentTime = this.audio.duration * (curWith / fullWidth)
        } else {
          let volume = curWith / fullWidth;
          this.progVolume.style.width = curWith + 'px';
          this.audio.volume = volume >= 1 ? 1 : (volume <= 0 ? 0 : volume);
        }

      }
    }

    pp() {
      this.play ? this.audio.pause() : this.audio.play();
    }

    playTrack(id) {
      const tracks = document.querySelectorAll('.playlist__li');
      tracks[this.activeId].classList.remove('fa-play');
      tracks[this.activeId].classList.remove('blue');
      tracks[this.activeId].classList.remove('blue-border');
      tracks[id].className += ' fa-play blue blue-border';
      this.activeId = id;
      this.audio.setAttribute('src', this.songs.filter(item => {
        if (item.id == id) {
          this.curTrack = id;
          this.updataInfo(item.group, item.song);
          return item;
        }
      })[0].link);
      this.audio.currentTime = 0;
      this.audio.play();
    }

    nextTrack() {

      let next = ++this.curTrack;
      if (this.songs[next]) {
        this.playTrack(next)
      } else {
        this.curTrack = 0;
        this.playTrack(this.curTrack)
      }
    }

    prevTrack() {
      let prev = --this.curTrack;
      if (this.songs[prev]) {
        this.playTrack(prev)
      } else {
        this.curTrack = this.songs.length - 1;
        this.playTrack(this.curTrack)
      }
    }

    updataInfo(group, song) {
      this.info.innerHTML = `${group}<span class="player__info_song">${song}</span>`
    }
  }

  let promise = new Promise((res, rej) => {
    setTimeout(()=> {
      res([
        {
          _id: 42314,
          group: 'metallica',
          song: 'i disappear',
          name: 'metallica - i disappear',
          link: 'https://cs1-44v4.vk-cdn.net/p18/8ac3076b5a96bc.mp3?extra=lG8h3oVim82MfHxaQcPnoCvpYkaIlhecdXlfpMcp6P8RxB12l5xFIiZ-otYqMepYN5uQMDyVgI5bCB10aFnRAIqu_-xYwHTFKAVjQxN12N5gKWNpjrATICQGI3cfOOQ927zUCNI0g0s',
          data: data1,
          like: 0,
          type: ['metal, rock']
        },
        {
          _id: 374259034789,
          group: 'linkin park',
          song: 'crowl back in',
          name: 'linkin park - crowl back in',
          link: 'https://cs1-66v4.vk-cdn.net/p10/424bad4970c2b7.mp3?extra=yBwPp7RwqHgoHrID1XRVAwMo5vmfT5Jy3i-yf2ZMOfQEEu3m88lvgZQkyEFG-Cta2pvEcVM_nB4Kp6URtb3A_zr0mG4-acuuqmdinJGWtI3kj-bXwG0ygnZk8EpMHbedgTtu5qDcf7A',
          data: data2,
          like: 0,
          type: ['alternative, rock']
        },
        {
          _id: 374252344789,
          group: 'Skillet',
          song: 'monster',
          name: 'Skillet - monster',
          link: 'https://cs1-42v4.vk-cdn.net/p17/9eb03e5b1fc857.mp3?extra=abAtsnYwF8VIgLDOHq2plr1LlPOtdPHCEbCCljMdjieeFz_sW5zBGHORDkvRLBZIpTi_9pmAsk2KlRgv5G1OpEM0yV5LMsqETDNqS1vYbIFXCiWPsj1UWKAtIC65HeGX0bkHeyK9meY',
          data: data3,
          like: 0,
          type: ['alternative, metal']
        }
      ])
    }, 2000)
  });
  promise.then(res => {
    songs = res;
    player = new Player();
    player.init();

  })

});
