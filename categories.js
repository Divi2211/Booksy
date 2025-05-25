// Placeholder logic for Recommended category
document.addEventListener("DOMContentLoaded", () => {
    const recommendedCategory = document.querySelector(".category-item h3:contains('Recommended for You')");
    if (recommendedCategory) {
        recommendedCategory.innerHTML = "Staff Picks for You";
        recommendedCategory.nextElementSibling.innerText = "Curated selections based on popular demand!";
    }
});
document.querySelectorAll('.explore-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
