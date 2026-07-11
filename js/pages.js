const pages = {};

function registerPage(path, page) {
    pages[path] = page;
}

function makeMenu() {
    return document.createElement("div");
}

function makeMenuButton(text, onclick) {
    const button = document.createElement("button");

    button.className = "menu-button";
    button.textContent = text;
    button.onclick = onclick;

    return button;
}

async function openPage(path) {
    const page = pages[path];

    if (!page) {
        openWindow("404", "<h2>Page not found.</h2>");
        return;
    }

    openWindow(page.title, page.html);
}