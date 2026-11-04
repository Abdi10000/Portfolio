// 9. Select Theme Elements
const themeSelector = document.getElementById("theme-selector");
const htmlElement = document.documentElement;

// 10. Load Saved Theme
const savedTheme = localStorage.getItem("theme");

// List of Available Themes
const availableThemes = ["dark", "light", "cyber"];

if (availableThemes.includes(savedTheme)) {
    htmlElement.setAttribute("data-theme", savedTheme);
}

// 11. Initialize Theme Selector
if (themeSelector) {
    themeSelector.value = htmlElement.getAttribute("data-theme");

    // 12. Theme Selection Functionality
    themeSelector.addEventListener("change", function() {
        const selectedTheme = themeSelector.value;

        htmlElement.setAttribute("data-theme", selectedTheme);
        localStorage.setItem("theme", selectedTheme);
    });
}