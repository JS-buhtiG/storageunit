const BUTTONS_PER_SHELF = 6;
// Define the texture classes we will create in CSS
const BOX_TEXTURES = ['cabinet_drawer.png'];

const activeShelvesContainer = document.getElementById("active-shelves");
const shelfSlider = document.getElementById("shelf-count");
const shelfCountLabel = document.getElementById("shelf-count-value");

function renderActiveShelves(count) {
    activeShelvesContainer.innerHTML = "";

    for (let s = 0; s < count; s++) {
        const shelf = document.createElement("div");
        shelf.className = "shelf-frame shelf-used";

        const post = document.createElement("div");
        post.className = "shelf-mid-post";
        shelf.appendChild(post);

        const grid = document.createElement("div");
        grid.className = "button-grid";

        for (let i = 0; i < BUTTONS_PER_SHELF; i++) {
            const shelfNum = s + 1;
            const slotNum = i + 1;

            const btn = document.createElement("button");
            btn.className = "empty-btn";

            // --- Apply a random texture class to EVERY button ---
            const randomTexture = BOX_TEXTURES[Math.floor(Math.random() * BOX_TEXTURES.length)];
            btn.classList.add(randomTexture);
            // ----------------------------------------------------

            const key = `${shelfNum}-${slotNum}`;

            if (storageMap[key]) {
                btn.classList.add("occupied-btn");
            }

            btn.onclick = () => {
                // Optional: You could wrap this in an if(storageMap[key])
                // so empty buttons don't play sounds, but I left it as is for now!
                playCardboardSound();
                handleShelfClick(shelfNum, slotNum);
            };

            grid.appendChild(btn);
        }

        shelf.appendChild(grid);
        activeShelvesContainer.appendChild(shelf);
    }
}

renderActiveShelves(Number(shelfSlider.value));

shelfSlider.oninput = () => {
    shelfCountLabel.textContent = shelfSlider.value;
    renderActiveShelves(Number(shelfSlider.value));
};