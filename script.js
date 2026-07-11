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
        digits[i] = (digits[i] + 9) % 10;   // was +1
        updateDial(i);
        checkCombo();
    });
});

document.querySelectorAll('.zone-down').forEach(zone => {
    zone.addEventListener('click', () => {
        const i = Number(zone.dataset.dial);
        digits[i] = (digits[i] + 1) % 10;   // was +9
        updateDial(i);
        checkCombo();
    });
});

function checkCombo() {
    if (digits.every((d, i) => d === TARGET_CODE[i])) unlock();
}

// door
function unlock() {
    const lockScreen = document.getElementById('lock-screen');
    const door = document.getElementById('garage-door');

    lockScreen.classList.add('hidden');
    setTimeout(() => door.classList.add('open'), 500);
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
            btn.addEventListener('click', () => {
                console.log(`Shelf ${s + 1}, button ${i + 1} clicked — hook up its behavior here.`);
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