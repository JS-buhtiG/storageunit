const storageMap = {};
const slotMeta = {};

function handleShelfClick(shelf, slot) {
    const key = `${shelf}-${slot}`;
    const page = storageMap[key];

    if (!page) {
        console.log("Empty slot.");
        return;
    }

    openPage(page);
}