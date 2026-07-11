// noinspection ExceptionCaughtLocallyJS

async function buildDirectory(pageId, fetchPath) {
    try {
        const response = await fetch(`${fetchPath}/order.json`);
        if (!response.ok) {
            console.warn(`Missing or inaccessible: ${fetchPath}/order.json`);
            return;
        }

        const data = await response.json();
        const menu = makeMenu();

        if (pageId.includes('/')) {
            const parentId = pageId.substring(0, pageId.lastIndexOf('/'));
            const backBtn = makeMenuButton("<< BACK", () => {
                openPage(parentId);
            });
            backBtn.style.color = "#888";
            backBtn.style.borderColor = "#888";
            menu.appendChild(backBtn);
        }
        // --------------------------------------

        for (const entry of data.entries) {
            const targetId = `${pageId}/${entry.target}`;
            const targetUrl = `${fetchPath}/${entry.target}`;

            const btn = makeMenuButton(entry.title, async () => {
                if (/\.(png|jpe?g|gif)$/i.test(entry.target)) {
                    const img = document.createElement('img');
                    img.src = targetUrl;
                    if (entry.target === 'img.png') {
                        img.className = 'blazier_img';
                    }
                    openWindow(entry.title, img);
                } else if (/\.html$/i.test(entry.target)) {
                    try {
                        const res = await fetch(targetUrl);
                        if (res.ok) {
                            const html = await res.text();
                            openWindow(entry.title, html);
                        }
                    } catch (err) {
                        console.error(`Failed to load HTML: ${targetUrl}`, err);
                    }
                } else {
                    if (!pages[targetId]) {
                        await buildDirectory(targetId, targetUrl);
                    }
                    openPage(targetId);
                }
            });

            menu.appendChild(btn);
        }

        registerPage(pageId, { title: data.title, html: menu });
    } catch (err) {
        console.error(`Error building directory for ${pageId}:`, err);
    }
}

async function initRegistry() {
    try {
        for (const key in storageMap) {
            delete storageMap[key];
        }

        const layoutRes = await fetch('storage/layout.json');
        if (!layoutRes.ok) throw new Error("Could not fetch layout.json");

        const layoutData = await layoutRes.json();

        for (const item of layoutData) {
            storageMap[`${item.shelf}-${item.slot}`] = item.page;
            await buildDirectory(item.page, `storage/${item.page}`);
        }

    } catch (err) {
        console.error("Critical Registry Error:", err);
    } finally {
        if (typeof shelfSlider !== 'undefined') {
            renderActiveShelves(Number(shelfSlider.value));
        }
    }
}

initRegistry();