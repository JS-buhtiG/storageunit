const soundEffects = [
    "assets/sounds/oxidvideos-cardboard-box-close-182562.mp3",
    "assets/sounds/oxidvideos-cardboard-box-open-182560.mp3",
    "assets/sounds/oxidvideos-dropping-cardboard-box-453026.mp3"
];

function playCardboardSound() {
    const sound =
        soundEffects[Math.floor(Math.random() * soundEffects.length)];

    new Audio(sound).play();
}