let settings = {};

const DEFAULT_SETTINGS = {
    lock: { code: [1, 9, 9] },
    shelves: { min: 1, max: 3, default: 2 },
    links: { otherSites: [] },
    credits: { page: "credits" },
    anythingElse: "<p>Nothing here yet.</p>"
};

async function loadSettings() {
    try {
        const res = await fetch('settings.json');
        if (!res.ok) { // noinspection ExceptionCaughtLocallyJS
            throw new Error('Could not fetch settings.json');
        }
        settings = await res.json();
    } catch (err) {
        console.warn('Settings load failed, using defaults:', err);
        settings = DEFAULT_SETTINGS;
    }
    applySettings();
}

function applySettings() {
    // Lock code — TARGET_CODE is declared with const in lock.js, but its
    // *contents* are mutable, so we swap them in place.
    if (typeof TARGET_CODE !== 'undefined' && Array.isArray(settings.lock?.code)) {
        TARGET_CODE.length = 0;
        TARGET_CODE.push(...settings.lock.code);
    }

    // Shelf slider bounds/default
    const slider = document.getElementById('shelf-count');
    const label = document.getElementById('shelf-count-value');
    if (slider && settings.shelves) {
        if (settings.shelves.min != null) slider.min = settings.shelves.min;
        if (settings.shelves.max != null) slider.max = settings.shelves.max;
        if (settings.shelves.default != null) {
            slider.value = settings.shelves.default;
            if (label) label.textContent = settings.shelves.default;
        }
        if (typeof renderActiveShelves === 'function') {
            renderActiveShelves(Number(slider.value));
        }
    }

    wireHudPanels();
}

function wireHudPanels() {
    const otherBtn = document.getElementById('panel-c');
    const creditsBtn = document.getElementById('panel-d');
    const anythBtn = document.getElementById('panel-e');

    if (otherBtn) {
        otherBtn.onclick = () => {
            const links = settings.links?.otherSites || [];
            const list = document.createElement('div');

            if (links.length === 0) {
                const p = document.createElement('p');
                p.textContent = 'No links configured.';
                list.appendChild(p);
            } else {
                links.forEach(link => {
                    const a = document.createElement('button');
                    a.href = link.url;
                    a.textContent = link.title;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.className = 'menu-button';
                    list.appendChild(a);
                });
            }

            openWindow('OTHER SITES', list);
        };
    }

    if (creditsBtn) {
        creditsBtn.onclick = () => {
            openPage(settings.credits?.page || 'credits');
        };
    }

    if (anythBtn) {
        anythBtn.onclick = () => {
            openWindow('ANYTHING ELSE', settings.anythingElse || '<p>Nothing here yet.</p>');
        };
    }
}

loadSettings();
