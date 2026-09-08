// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(
    ".section, .project-card, .skill-card, .info-box, .resume-box, .contact-item"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
});


// =========================
// ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});


// =========================
// RESUME BUTTON
// =========================

const resumeButton = document.getElementById("resume-btn");

resumeButton.addEventListener("click", (event) => {
    event.preventDefault();

    alert(
        "Resume will be available here soon. Thank you for visiting my portfolio!"
    );
});


// =========================
// CURRENT YEAR
// =========================

const footerText = document.querySelector("footer p");

const currentYear = new Date().getFullYear();

footerText.innerHTML =
    `© ${currentYear} Muhammad Tahir Ali. All rights reserved.`;