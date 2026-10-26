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

const heroSlider = document.getElementById("hero-slider");
const gameTitle = document.getElementById("game-name");
const bannerTitle = document.getElementById("banner");
const carousel = document.getElementById("carousel");
const heroContent = document.getElementById("hero-content");

let currentindex = 0;
let autoSlideTimer = null;

// Fungsi merender gambar slide ke dalam kontainer horizontal
function renderSlides() {
    heroSlider.innerHTML = "";
    banner.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "slide-item";
        slide.style.backgroundImage = `url("${item.bgImage}")`;
        heroSlider.appendChild(slide);
    });
}

function gantibanner(index) {
    currentindex = index;
    const data = banner[index];
    if (!data) return;

    // 1. Geser background slider secara horizontal
    heroSlider.style.transform = `translateX(-${index * 100}%)`;

    // 2. Transisi teks masuk/keluar dengan mulus
    heroContent.classList.add("text-out");
    setTimeout(() => {
        gameTitle.innerText = data.game;
        bannerTitle.innerHTML = data.title;
        heroContent.classList.remove("text-out");
    }, 250);

    // 3. Update border putih pada thumbnail aktif di bawah
    const allThumb = document.querySelectorAll(".thumb-item");
    allThumb.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add("active");
        } else {
            thumb.classList.remove("active");
        }
    });
}

function nextBanner() {
    let nextindex = (currentindex + 1) % banner.length;
    gantibanner(nextindex);
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextBanner, 4000); // Ganti setiap 4 detik
}

function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
    }
}

// Fungsi merender thumbnail kecil di bawah
function renderThumbnails() {
    if (!carousel) return;
    carousel.innerHTML = ""; // Bersihkan kontainer

    banner.forEach((item, index) => {
        const thumbDiv = document.createElement("div");
        thumbDiv.className = "thumb-item";
        thumbDiv.innerHTML = `<img src="${item.thumbImages}" class="thumb-img" alt="${item.game}" />`;

        // Saat thumbnail diklik, pindah slide & reset timer
        thumbDiv.addEventListener("click", () => {
            gantibanner(index);
            startAutoSlide();
        });

        carousel.appendChild(thumbDiv);
    });
}

// Inisialisasi awal saat halaman dimuat
renderSlides();
renderThumbnails();
gantibanner(0);
startAutoSlide();