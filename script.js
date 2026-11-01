// 1. Select Carousel Elements
const previousButton = document.getElementById("previous-slide");
const nextButton = document.getElementById("next-slide");

const slideTitle = document.getElementById("slide-title");
const slideDescription = document.getElementById("slide-description");
const slideLink = document.getElementById("slide-link");

const carouselContent = document.querySelector(".carousel-content");

// 2. Carousel Slide Data
const slides = [
    {
        title: "Projects",
        description: "Explore my cybersecurity projects and practical work.",
        link: "projects.html",
        linkText: "See My Projects"
    },
    {
        title: "HTB Writeups",
        description: "Explore my Hack The Box writeups and technical walkthroughs.",
        link: "writeups/",
        linkText: "See My Writeups"
    },
    {
        title: "Certifications",
        description: "View my cybersecurity certifications and completed training.",
        link: "certifications.html",
        linkText: "See My Certifications"
    }
];

// 3. Track the Current Slide
let currentSlide = 0;

// 4. Update Carousel Content
function showSlide() {
    const slide = slides[currentSlide];

    slideTitle.textContent = slide.title;
    slideDescription.textContent = slide.description;
    slideLink.textContent = slide.linkText;
    slideLink.href = slide.link;
}

// 4.1. Animate Carousel Transition
function transitionSlide() {
    carouselContent.classList.add("fade-out");

    setTimeout(function() {
        showSlide();
        carouselContent.classList.remove("fade-out");
    }, 800);
}

// 5. Next Slide Button
nextButton.addEventListener("click", function() {
    currentSlide = (currentSlide + 1) % slides.length;
    transitionSlide();
});

// 6. Previous Slide Button
previousButton.addEventListener("click", function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    transitionSlide();
});

// 7. Initialize Carousel
showSlide();

// 8. Automatic Carousel Transition
setInterval(function() {
    currentSlide = (currentSlide + 1) % slides.length;
    transitionSlide();
}, 5000);


// 9. Select Theme Toggle Elements
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// 10. Load Saved Theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || savedTheme === "light") {
    htmlElement.setAttribute("data-theme", savedTheme);
}

// 11. Update Theme Button
function updateThemeButton() {
    const activeTheme = htmlElement.getAttribute("data-theme");

    if (activeTheme === "dark") {
        themeToggle.textContent = "Light Mode";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeToggle.textContent = "Dark Mode";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
}

// Initialize Theme Button
updateThemeButton();

// 12. Theme Toggle Functionality
themeToggle.addEventListener("click", function() {
    const currentTheme = htmlElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        htmlElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    } else {
        htmlElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }

    updateThemeButton();
});