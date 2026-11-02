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