/*
1. Render songs
2. Scroll top
3. Play/ pause/ sick
4. CD rotate
5. Next/ prev
6. Random
7. Next/ repeat when ended
8. Active song
9. Scroll active song into view
10. Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $('.cd');
const heading = $('.dashBoard > header > h1')
const cd_thumb = $('.cd-thumb');
const audio = $('#audio');
const play = $('.play');
const inputRange = $("input[type='range']");
const songList = $("#songList");
const randomSong = $(".control > i:nth-child(5)");
const repeatSong = $(".control > i:nth-child(1)");
const palyer_sotre_key = 'Nhac_cua_Tai';

const app = {
    currentIndex: 0,
    playing: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(palyer_sotre_key)) || {},
    songs: [
        {
            name: 'Cha',
            singer: 'Quách Beem',
            path: './assets/songs/Cha-QuachBeem-6283468.mp3',
            image: './assets/imageAuthor/quachBeem.jpg'
        },
        {
            name: 'Điếu thuốc tàn',
            singer: 'Lâm Chánh Khang',
            path: './assets/songs/DieuThuocTanNguoiTrongGiangHo6OST-LamChanKhang-5488925.mp3',
            image: './assets/imageAuthor/lamChanhKhang.jpg'
        },
        {
            name: 'Đời là thế thôi',
            singer: 'Quách Beem',
            path: './assets/songs/DoiLaTheThoi-QuachBeem_4cmjg.mp3',
            image: './assets/imageAuthor/quachBeem.jpg'
        },
        {
            name: 'Đơn giản anh yêu em',
            singer: 'Đức Phát',
            path: './assets/songs/DonGianAnhYeuEm-DucPhat-7857286.mp3',
            image: './assets/imageAuthor/ducPhat.jpg'
        },
        {
            name: 'Giả vờ thương anh',
            singer: 'Chu Bin',
            path: './assets/songs/GiaVoThuongAnhDuocKhong-ChuBin-4858628.mp3',
            image: './assets/imageAuthor/chuBin.jpg'
        },
        {
            name: 'Hà giang ơi',
            singer: 'Quách Beem',
            path: './assets/songs/HaGiangOi-QuachBeem-6260097.mp3',
            image: './assets/imageAuthor/quachBeem.jpg'
        },
        {
            name: 'Monsters',
            singer: 'Nightcore',
            path: './assets/songs/ISeeYourMonsters-Nightcore-5915569.mp3',
            image: './assets/imageAuthor/nightCore.jpg'
        },
        {
            name: 'Khi yêu nào đâu ai muốn',
            singer: 'Trịnh Thiên An',
            path: './assets/songs/KhiYeuNaoDauAiMuon-TrinhThienAn-7624200.mp3',
            image: './assets/imageAuthor/trinhThienAn.jpg'
        },
        {
            name: 'Khóc cho đấng sinh thành',
            singer: 'Hồ Quang Hiếu',
            path: './assets/songs/KhocChoDangSinhThanhThieuNienRaGiangHoOST-HoQuangHieu-5533643.mp3',
            image: './assets/imageAuthor/hoQuangHieu.jpg'
        },
        {
            name: 'Thay thế',
            singer: 'Hồ Gia Hùng',
            path: './assets/songs/ThayThe-HoGiaHungHKT-5308924.mp3',
            image: './assets/imageAuthor/hoGiaHung.jpg'
        },
        {
            name: 'Cô đơn trong nhà mình',
            singer: 'Hoài Lâm',
            path: './assets/songs/CÔ ĐƠN TRONG NHÀ MÌNH  HOÀI LÂM.mp3',
            image: './assets/imageAuthor/hoaiLam.jpg'
        },
        {
            name: 'Cô đơn trong nhà mình',
            singer: 'Hoài Lâm',
            path: './assets/songs/CÔ ĐƠN TRONG NHÀ MÌNH  HOÀI LÂM.mp3',
            image: './assets/imageAuthor/hoaiLam.jpg'
        },
        {
            name: 'Nước ngoài',
            singer: 'Dương Mạnh Quỳnh',
            path: './assets/songs/nuocNgoai.m4a',
            image: './assets/imageAuthor/phanManhQuynh.jpg'
        }
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(palyer_sotre_key, JSON.stringify(this.config));
    },
    render: function () {
        const songList = this.songs.map( (song, index) => {
            return `
                <div class="song ${index == this.currentIndex? 'active' : ''}" data-index="${index}">
                    <div class="img-auth" style = "background-image: url('${song.image}')">

                    </div>
                    <div class="content">
                        <h4>${song.name}</h4>
                        <h6>${song.singer}</h6>
                    </div>
                    <i class="more ti-more"></i>
                </div>
            `
        })
        $('#songList').innerHTML = songList.join('');
    },
    // Định nghĩa đối tượng bên trong một đối tượng khác
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
    })
    },
    handleEvents: function () {
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth < 0 ? 0 : newCdWidth + 'px';
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Khi click vào nút play
        play.onclick = () => {
            if (!this.playing){
                audio.play();
            } else {
                audio.pause();
                this.setConfig("currentTime", audio.currentTime);
            }
        }
        
        // Khi nhạc đang phát
        audio.onplay = () => {
            this.playing = true;
            $('.control').classList.add('playing');
            cdThumbAnimate.play();
        }

        // Khi nhạc dừng phát
        audio.onpause = () => {
            this.playing = false;
            $('.control').classList.remove('playing');
            cdThumbAnimate.pause();
        }
        
        // Khi tua
        inputRange.oninput = () => {
            audio.currentTime = inputRange.value/100 * audio.duration;
        }
        
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = () => {
            if(audio.duration){
                inputRange.value = audio.currentTime/audio.duration * 100;
            }
        }

        // Quay cd
        const cdThumbAnimate = $(".cd-thumb").animate(
            {transform: 'rotate(360deg)'},
            {
                duration: 100000,
                iterations: Infinity
            }
        )
        cdThumbAnimate.pause();

        // prev song
        $(".control > i:nth-child(2)").onclick = () => {
            if (this.isRandom){
                this.randomSong();
            }else {
                this.prevSong();
            }
            this.render();
            audio.play();
            this.scrolltoActiveSong();
            this.setConfig("currentIndex", this.currentIndex);
        }
        
        // next song
        $(".control > i:nth-child(4)").onclick = () => {
            if (this.isRandom){
                this.randomSong();
            }else {
                this.nextSong();
            }
            this.render();
            audio.play();
            this.scrolltoActiveSong();
            this.setConfig("currentIndex", this.currentIndex);
        }

        // Xử lý bật tắt random
        randomSong.onclick = () => {
            this.isRandom = !this.isRandom;
            this.setConfig("isRandom", this.isRandom);
            randomSong.classList.toggle("active", this.isRandom);
        }

        // Xử lý repeat song
        repeatSong.onclick = () => {
            this.isRepeat = !this.isRepeat;
            this.setConfig("isRepeat", this.isRepeat);
            repeatSong.classList.toggle("active", this.isRepeat);
        }

        audio.onended = () => {
            if (this.isRepeat) {
            }else if (this.isRandom){
                this.randomSong();
            }else {
                this.nextSong();
            }
            this.render();
            audio.play();
            this.scrolltoActiveSong();
            this.setConfig("currentIndex", this.currentIndex);
        }

        // Khi click vào bài hát
        songList.onclick = (e) => {
            const song = e.target.closest(".song");
            const more = e.target.closest(".more");
            if(song || more){
                if(song && !more && !(this.currentIndex == song.dataset.index)) {
                    this.currentIndex = song.dataset.index;
                    this.loadCurrentSong();
                    this.render();
                    audio.play();
                }
            }
            this.setConfig("currentIndex", this.currentIndex);
        }
    },
    scrolltoActiveSong: function() {
        $(".song.active").scrollIntoView(
            {
                behavior: "smooth",
                block: `${this.currentIndex == 1 || 2 || 3 ? "center" : "nearest"}`
            }
        )
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cd_thumb.style.backgroundImage = `url("${this.currentSong.image}")`;
        audio.src = this.currentSong.path;
    },
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random()*this.songs.length);
        } while (newIndex == this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function () {
        this.isRepeat = this.config["isRepeat"];
        this.isRandom = this.config["isRandom"];
        audio.currentTime = this.config["currentTime"] || 0;
        this.currentIndex = this.config["currentIndex"] || 0;
        randomSong.classList.toggle("active", this.isRandom);
        repeatSong.classList.toggle("active", this.isRepeat);
        // Định nghĩa thuộc tính cho object
        this.defineProperties();
        
        // Xử lý sự kiện (DOM events)
        this.handleEvents();
        
        // Tải thông tin bài hát đầu tiên khi loadpage
        this.loadCurrentSong();
        
        // Render songList ra màn hình
        this.render();
        
    }

}

app.start();