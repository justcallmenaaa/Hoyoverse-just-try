// Link gambar diganti menggunakan wallpaper langsung beresolusi tinggi (bukan Google Encrypted Thumbnail)
const banner = [
    {
        game: "Genshin Impact",
        title: "Latest updates on 7.0<br>'Everwinter Without Mercy'",
        bgImage: "https://i.ytimg.com/vi/Z-q-IR8PZ5g/maxresdefault.jpg",
        thumbImages: "https://i.ytimg.com/vi/Z-q-IR8PZ5g/maxresdefault.jpg"
    },
    {
        game: "Honkai Star Rail",
        title: "Version 4.5<br>'Is Now Available'",
        bgImage: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc5/Honkai-Star-Rail-4.4.jpg",
        thumbImages: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc5/Honkai-Star-Rail-4.4.jpg"
    },
    {
        game: "Zenless Zone Zero",
        title: "Version 3.2<br>'Their Secret Histories' Is now live!",
        bgImage: "https://www.gameskinny.com/wp-content/uploads/2024/09/zenless-zone-zero-zenless-youtube-thumbnail.jpg?w=1200",
        thumbImages: "https://www.gameskinny.com/wp-content/uploads/2024/09/zenless-zone-zero-zenless-youtube-thumbnail.jpg?w=1200"
    },
    {
        game: "Honkai Impact 3rd",
        title: "v9.0 [The light at dream's end]<br>Available now!",
        bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo3QIl268L_9hD8BpMgyfQdDBjkq0mbWC0BdHn1KyogA&s=10",
        thumbImages: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo3QIl268L_9hD8BpMgyfQdDBjkq0mbWC0BdHn1KyogA&s=10"
    }
];

const herobg = document.getElementById("hero-bg");
const gameTitle = document.getElementById("game-name");
const bannerTitle = document.getElementById("banner");
const carousel = document.getElementById("carousel");

let currentindex = 0;
let autoSlideTimer = null;

function gantibanner(index) {
    currentindex = index;
    const data = banner[index];
    if (!data) return;

    // Perbaikan sintaks Template Literals JS untuk Background Image:
    herobg.style.backgroundImage = `url("${data.bgImage}")`;
    
    gameTitle.innerText = data.game;
    bannerTitle.innerHTML = data.title;

    // Tandai thumbnail aktif dengan border putih
    const allThumb = document.querySelectorAll(".thumb-item");
    allThumb.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add("active");
        } else {
            thumb.classList.remove("active");
        }
    });
}
//fungsinya untuk pindah ke gambar berikutnya
function nextBanner() {
    let nextindex = (currentindex + 1) % banner.length;
    gantibanner(nextindex);
}
//untuk memulai berganti timer secara otomatis
function startAutoSlide() {
    stopAutoSlide();//agar saat pindah lama waktu tidak berantakan
    autoSlideTimer = setInterval(nextBanner, 4000) //pindah setiap 4 detik
}

function stopAutoSlide() {
    if(autoSlideTimer) {
        clearInterval(autoSlideTimer);
    }
}

// Fungsi merender thumbnail secara dinamis
function renderThumbnails() {
    carousel.innerHTML = ""; // Bersihkan kontainer

    banner.forEach((item, index) => {
        const thumbDiv = document.createElement("div");
        thumbDiv.className = "thumb-item";
        thumbDiv.innerHTML = `<img src="${item.thumbImages}" class="thumb-img" alt="${item.game}" />`;

        thumbDiv.addEventListener("click", () => {
            gantibanner(index);
            startAutoSlide();
        });

        carousel.appendChild(thumbDiv);
    });
}

// Jalankan saat pertama kali halaman dimuat
renderThumbnails();
gantibanner(0);
startAutoSlide()