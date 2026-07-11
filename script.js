// Combination
const TARGET_CODE = [1, 9, 9];

// Racism
const DIAL_COLORS = ['gold', 'silver', 'silver', 'silver', 'silver', 'silver', 'silver'];
const chosenColor = DIAL_COLORS[Math.floor(Math.random() * DIAL_COLORS.length)];

// State
const digits = [0, 0, 0];
const dialEls = [0, 1, 2].map(i => document.getElementById(`dial-${i}`));
const stripEls = dialEls.map(dial => dial.querySelector('.dial-strip'));

stripEls.forEach(strip => {
    strip.style.backgroundImage = `url('assets/comb_lock_strip_${chosenColor}.png')`;
});

function updateDial(i) {
    const percent = (digits[i] / 9) * 100;
    stripEls[i].style.backgroundPositionX = `${percent}%`;
}
digits.forEach((_, i) => updateDial(i));


// Interaction
// top of dial scrolls up, bottom scrolls down

document.querySelectorAll('.zone-up').forEach(zone => {
    zone.addEventListener('click', () => {
        const i = Number(zone.dataset.dial);
        digits[i] = (digits[i] + 9) % 10; // was +1
        updateDial(i);
        checkCombo();
    });
});

document.querySelectorAll('.zone-down').forEach(zone => {
    zone.addEventListener('click', () => {
        const i = Number(zone.dataset.dial);
        digits[i] = (digits[i] + 1) % 10; // was +9
        updateDial(i);
        checkCombo();
    });
});

function checkCombo() {
    if (digits.every((d, i) => d === TARGET_CODE[i])) unlock();
}

// door
function unlock() {
    const openSound = new Audio('assets/sounds/open.mp3')
    openSound.play();
    const lockScreen = document.getElementById('lock-screen');
    const door = document.getElementById('garage-door');
    lockScreen.classList.add('hidden');
    setTimeout(() => door.classList.add('open'), 500);
}

// Storage Layout
const storageMap = {
    "1-1": "cabinet1",
    "1-2": "credits"
};

// shelving handler
function handleShelfClick(shelf, slot) {
    const key = `${shelf}-${slot}`;
    const page = storageMap[key];
    if (!page) {
        console.log("Empty slot.");
        return;
    }
    openPage(page);
}

// Shelf rendering + slider
const BUTTONS_PER_SHELF = 6;
const activeShelvesContainer = document.getElementById('active-shelves');
const shelfSlider = document.getElementById('shelf-count');
const shelfCountLabel = document.getElementById('shelf-count-value');

function renderActiveShelves(count) {
    activeShelvesContainer.innerHTML = '';

    for (let s = 0; s < count; s++) {
        const shelf = document.createElement('div');
        shelf.className = 'shelf-frame shelf-used';

        const midPost = document.createElement('div');
        midPost.className = 'shelf-mid-post';
        shelf.appendChild(midPost);

        const grid = document.createElement('div');
        grid.className = 'button-grid';

        for (let i = 0; i < BUTTONS_PER_SHELF; i++) {
            const btn = document.createElement('button');
            btn.className = 'empty-btn';
            const shelf = s + 1;
            const slot = i + 1;

            btn.dataset.shelf = shelf;
            btn.dataset.slot = slot;

            btn.addEventListener("click", () => {
                playCardboardSound();
                handleShelfClick(shelf, slot);
            });
            grid.appendChild(btn);
        }

        shelf.appendChild(grid);
        activeShelvesContainer.appendChild(shelf);
    }
}

renderActiveShelves(Number(shelfSlider.value));

shelfSlider.addEventListener('input', () => {
    shelfCountLabel.textContent = shelfSlider.value;
    renderActiveShelves(Number(shelfSlider.value));
});

const soundEffects = [
    'assets/sounds/oxidvideos-cardboard-box-close-182562.mp3',
    'assets/sounds/oxidvideos-cardboard-box-open-182560.mp3',
    'assets/sounds/oxidvideos-dropping-cardboard-box-453026.mp3'
];

function playCardboardSound() {
    const randomIndex = Math.floor(Math.random() * soundEffects.length);
    const selectedSound = soundEffects[randomIndex];
    const cardboardSound = new Audio(selectedSound);
    cardboardSound.play();
}

// widnow
const viewWindow = document.getElementById("view-window");
const windowTitle = document.getElementById("window-title");
const windowContent = document.getElementById("window-content");

function openWindow(title, content) {
    windowTitle.textContent = title;
    windowContent.innerHTML = "";
    if (typeof content === "string") {
        windowContent.innerHTML = content;
    } else {
        windowContent.appendChild(content);
    }
    viewWindow.classList.add("window-open");
}

function closeWindow() {
    viewWindow.classList.remove("window-open");
}

document
    .getElementById("window-close")
    .onclick = closeWindow;

// collect my pages ahh
const pages = {};

function registerPage(path, page) {
    pages[path] = page;
}

async function openPage(path) {
    const page = pages[path];

    if (!page) {
        openWindow("404", "<h2>Page not found.</h2>");
        return;
    }

    openWindow(page.title, page.html);
}

function makeMenu() {
    return document.createElement("div");
}

// credits window
registerPage("credits", {
    title: "Credits",
    html: `
<h2>Credits</h2>
<p>Programming: Cndtnl_Cognition</p>
`
});
document.getElementById("panel-d").onclick = () => {
    openPage("credits");
};

// buttons helprr
function makeMenuButton(text, onclick) {
    const button = document.createElement("button");

    button.className = "menu-button";
    button.textContent = text;
    button.onclick = onclick;

    return button;
}

// cabinet1
const cabinet1Menu = makeMenu();

cabinet1Menu.appendChild(
    makeMenuButton("ARTFIGHT", () => openPage("cabinet1/artfight"))
);

registerPage("cabinet1", {
    title: "CABINET 1",
    html: cabinet1Menu
});

// cabinet1/artfight
const artfightMenu = makeMenu();
artfightMenu.appendChild(
    makeMenuButton("← BACK", () => openPage("cabinet1"))
);
artfightMenu.appendChild(
    makeMenuButton("BLAZIER", () => openPage("cabinet1/artfight/blazier"))
);
registerPage("cabinet1/artfight", {
    title: "ARTFIGHT",
    html: artfightMenu
});

//
registerPage("cabinet1/artfight/blazier", {
    title:"BLAZIER CINDERHAND",
    html:
        makeMenuButton(
            "← BACK",
            "openPage('cabinet1/artfight')"
        )
        +
        makeMenuButton(
            "REFERENCE IMAGE",
            "alert('later')"
        )
        +
        makeMenuButton(
            "PERSONALITY",
            "alert('later')"
        )
});