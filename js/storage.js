const storageMap = {
    "1-1": "cabinet1",
    "1-2": "credits"
};

function handleShelfClick(shelf, slot) {
    const key = `${shelf}-${slot}`;
    const page = storageMap[key];

    if (!page) {
        console.log("Empty slot.");
        return;
    }

    openPage(page);
}