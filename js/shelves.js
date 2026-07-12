const BUTTONS_PER_SHELF = 6;
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

            const key = `${shelfNum}-${slotNum}`;
            const meta = slotMeta[key];

            btn.style.backgroundSize = '100% auto';
            btn.style.backgroundPosition = 'bottom center';
            btn.style.backgroundRepeat = 'no-repeat';

            if (meta && meta.texture) {
                // Specific override texture, assigned via layout.json + stored in assets/textures/special/
                btn.style.backgroundImage = `url('assets/textures/special/${meta.texture}')`;
            } else {
                // No specific texture assigned — pick a random one from the generic pool.
                const randomTexture = BOX_TEXTURES[Math.floor(Math.random() * BOX_TEXTURES.length)];
                btn.style.backgroundImage = `url('assets/textures/${randomTexture}')`;
            }

            if (storageMap[key]) {
                btn.classList.add("occupied-btn");

                if (meta && meta.colour) {
                    btn.style.borderColor = meta.colour;
                    btn.style.boxShadow = `0 3px 0 rgba(0,0,0,0.5), 0 0 10px ${meta.colour}66`;
                }
                if (meta && meta.name) {
                    btn.title = meta.name;
                }
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