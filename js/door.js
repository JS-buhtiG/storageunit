function unlock() {
    const openSound = new Audio("assets/sounds/open.mp3");
    openSound.play();

    document
        .getElementById("lock-screen")
        .classList.add("hidden");

    setTimeout(() => {
        document
            .getElementById("garage-door")
            .classList.add("open");
    }, 500);
}