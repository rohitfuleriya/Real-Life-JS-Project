// select all filterable button

const filterButtons = document.querySelectorAll(".filter_bottons button");
const filterableCards = document.querySelectorAll(".filterable_cards .card");

// Define the filterCards function
const filterCards = (e) => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  // Iterate over each filterable card
  filterableCards.forEach((card) => {
    card.classList.add("hide");

    if (
      card.dataset.name === e.target.dataset.name ||
      e.target.dataset.name === "all"
    ) {
      card.classList.remove("hide");
    }
  });
};

// Add click event listern to each filter button
filterButtons.forEach((button) =>
  button.addEventListener("click", filterCards)
);
