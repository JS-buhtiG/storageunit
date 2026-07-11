// Combination

const TARGET_CODE = [1, 9, 9];

// Dial colours

const DIAL_COLORS = [
    "gold",
    "silver",
    "silver",
    "silver",
    "silver",
    "silver",
    "silver"
];

const chosenColor =
    DIAL_COLORS[Math.floor(Math.random() * DIAL_COLORS.length)];

// Lock state

const digits = [0, 0, 0];

const dialEls = [0, 1, 2].map(i =>
    document.getElementById(`dial-${i}`)
);

const stripEls = dialEls.map(dial =>
    dial.querySelector(".dial-strip")
);

stripEls.forEach(strip => {
    strip.style.backgroundImage =
        `url('assets/comb_lock_strip_${chosenColor}.png')`;
});

function updateDial(i) {
    const percent = (digits[i] / 9) * 100;
    stripEls[i].style.backgroundPositionX = `${percent}%`;
}

digits.forEach((_, i) => updateDial(i));

// Interaction

document.querySelectorAll(".zone-up").forEach(zone => {
    zone.onclick = () => {
        const i = Number(zone.dataset.dial);
        digits[i] = (digits[i] + 9) % 10;
        updateDial(i);
        checkCombo();
    };
});

document.querySelectorAll(".zone-down").forEach(zone => {
    zone.onclick = () => {
        const i = Number(zone.dataset.dial);
        digits[i] = (digits[i] + 1) % 10;
        updateDial(i);
        checkCombo();
    };
});

function checkCombo() {
    if (digits.every((d, i) => d === TARGET_CODE[i])) {
        unlock();
    }
}