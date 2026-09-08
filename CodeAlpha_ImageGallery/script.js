const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleItems = [];
let currentIndex = 0;

/* ========================= CREATE IMAGE OVERLAYS ========================= */
galleryItems.forEach((item) => {
    const image = item.querySelector("img");
    const overlay = document.createElement("div");
    overlay.classList.add("image-info");
    overlay.innerHTML = `
        <div class="image-title">
            ${image.alt}
        </div>

        <div class="image-category">
            ${item.dataset.category}
        </div>

        <div class="view-icon">
            ↗
        </div>
    `;
    item.appendChild(overlay);
});

/* ========================= UPDATE VISIBLE ITEMS ========================= */
function updateVisibleItems() {
    visibleItems = Array.from(galleryItems)
        .filter(item => item.style.display !== "none");
}


/* ========================= FILTER GALLERY ========================= */
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        const category = button.dataset.category;
        galleryItems.forEach(item => {
            if (
                category === "all" ||
                item.dataset.category === category
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
        updateVisibleItems();
    });
});

/* ========================= OPEN LIGHTBOX ========================= */
galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        updateVisibleItems();
        currentIndex = visibleItems.indexOf(item);
        showImage();
        lightbox.classList.add("show");
        document.body.style.overflow = "hidden";
    });
});

/* ========================= SHOW IMAGE ========================= */
function showImage() {
    const currentItem = visibleItems[currentIndex];
    if (!currentItem) return;
    const image = currentItem.querySelector("img");
    const title = image.alt;
    const category = currentItem.dataset.category;
    lightboxImage.src = image.src;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;
    const currentNumber = String(currentIndex + 1).padStart(2, "0");
    const totalNumber = String(visibleItems.length).padStart(2, "0");
    imageCounter.textContent =
        `${currentNumber} / ${totalNumber}`;
}

/* ========================= NEXT IMAGE ========================= */
nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    currentIndex++;
    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }
    showImage();
});

/* ========================= PREVIOUS IMAGE ========================= */
prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }
    showImage();
});

/* ========================= CLOSE LIGHTBOX ========================= */
function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    closeLightbox();
});

/* Close by clicking background */
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

/* ========================= KEYBOARD CONTROLS ======================== */
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("show")) return;
    if (event.key === "ArrowRight") {
        nextBtn.click();
    }
    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }
    if (event.key === "Escape") {
        closeLightbox();
    }
});