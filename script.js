document.addEventListener("DOMContentLoaded", async () => {
    const cardContainer = document.getElementById("cardContainer");
    const cardCountDisplay = document.getElementById("cardCountDisplay");

    // Function to fetch Pokemon data and create cards
    const fetchDataAndCreateCards = async () => {
        try {
            // Loop through Pokemon IDs
            for (let i = 1; i <= 1100; i++) {
                // Fetch Pokemon data from PokeAPI
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const data = await response.json();
                // Extract types
                const types = data.types.map(type => type.type.name);
                // Create card with Pokemon data
                createCard({
                    name: data.name,
                    avatar: data.sprites.front_default,
                    details: data.stats,
                    types: types,
                    number: i
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Function to create a card for a Pokemon
    const createCard = (data) => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Create and append avatar image
        const avatar = document.createElement("img");
        avatar.src = data.avatar;
        avatar.alt = "Avatar";
        card.appendChild(avatar);

        // Create and append Pokemon name
        const name = document.createElement("h3");
        name.textContent = capitalizeFirstLetter(data.name);
        card.appendChild(name);

        // Create and append Pokemon types
        const types = document.createElement("p");
        types.textContent = "Type(s): ";
        types.style.fontSize = "small";
        data.types.forEach((type, index) => {
            types.textContent += type;
            if (index < data.types.length - 1) {
                types.textContent += ", ";
            }
        });
        card.appendChild(types);

        // Create and append Pokemon details
        const detailsList = document.createElement("ul");
        data.details.forEach(detail => {
            const detailItem = document.createElement("li");
            const label = document.createElement("span");
            label.textContent = `${capitalizeFirstLetter(detail.stat.name)}: `;
            label.style.fontWeight = "bold";
            detailItem.appendChild(label);
            detailItem.textContent += detail.base_stat;
            detailsList.appendChild(detailItem);
        });
        card.appendChild(detailsList);

        // Create and append card number
        const number = document.createElement("span");
        number.textContent = `#${data.number}`;
        number.classList.add("card-number");
        card.appendChild(number);

        // Append card to container
        cardContainer.appendChild(card);

        // Update card count
        updateCardCount();
    };

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Function to update card count display
    const updateCardCount = () => {
        const cardCount = cardContainer.children.length;
        cardCountDisplay.textContent = `Number of cards: ${cardCount}`;
    };

    fetchDataAndCreateCards();
});
