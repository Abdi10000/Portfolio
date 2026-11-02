const filterButtons = document.querySelectorAll(".filter-button");
const writeupCards = document.querySelectorAll(".writeup-card");
const searchInput = document.getElementById("writeup-search-input");
const noWriteupsMessage = document.getElementById("no-writeups-message");

let selectedCategory = "all";

function filterWriteups() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleCards = 0;

    writeupCards.forEach(function(card) {
        const categories = card.dataset.categories.split(" ");
        const machineName = card.querySelector("h3").textContent.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            categories.includes(selectedCategory);

        const matchesSearch = machineName.includes(searchTerm);

        card.hidden = !(matchesCategory && matchesSearch);

        if (!card.hidden) {
            visibleCards++;
        }
    });

    noWriteupsMessage.hidden = visibleCards > 0;
}

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        selectedCategory = button.dataset.category;

        filterButtons.forEach(function(filterButton) {
            const isActive =
                filterButton.dataset.category === selectedCategory;

            filterButton.classList.toggle("active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        filterWriteups();
    });
});

searchInput.addEventListener("input", filterWriteups);