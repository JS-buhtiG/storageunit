// noinspection ExceptionCaughtLocallyJS

function wrapWithBack(pageId, content) {
    const wrapper = document.createElement('div');

    const backBtn = makeMenuButton("<< BACK", () => {
        openPage(pageId);
    });
    backBtn.style.color = "#ffffff";
    backBtn.style.borderColor = "#ffffff";
    wrapper.appendChild(backBtn);

    if (typeof content === 'string') {
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = content;
        wrapper.appendChild(contentDiv);
    } else {
        wrapper.appendChild(content);
    }

    return wrapper;
}

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
            backBtn.style.color = "#ffffff";
            backBtn.style.borderColor = "#ffffff";
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
                        img.className = 'character_img';
                    }
                    openWindow(entry.title, wrapWithBack(pageId, img));
                } else if (/\.html$/i.test(entry.target)) {
                    try {
                        const res = await fetch(targetUrl);
                        if (res.ok) {
                            const html = await res.text();
                            openWindow(entry.title, wrapWithBack(pageId, html));
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
        for (const key in slotMeta) {
            delete slotMeta[key];
        }

        const layoutRes = await fetch('storage/layout.json');
        if (!layoutRes.ok) throw new Error("Could not fetch layout.json");

        const layoutData = await layoutRes.json();

        for (const item of layoutData) {
            const key = `${item.shelf}-${item.slot}`;
            storageMap[key] = item.page;

            const meta = { texture: item.texture || null, colour: null, icon: null, name: null };

            try {
                const cabinetRes = await fetch(`storage/${item.page}/cabinet.json`);
                if (cabinetRes.ok) {
                    const cabinet = await cabinetRes.json();
                    meta.colour = cabinet.colour || null;
                    meta.icon = cabinet.icon || null;
                    meta.name = cabinet.name || null;
                }
            } catch (err) {
                // No cabinet.json for this page — that's fine, it's optional.
            }

            slotMeta[key] = meta;

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