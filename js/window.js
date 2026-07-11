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

document.getElementById("window-close").onclick = closeWindow;