// Credits

registerPage("credits", {
    title: "Credits",
    html: `
<h2>Credits</h2>
<p>Programming: Cndtnl_Cognition</p>
<p>Lock Textures: NumeiNano</p>
`
});

document.getElementById("panel-d").onclick = () =>
    openPage("credits");

// Cabinet 1

const cabinet1 = makeMenu();

cabinet1.appendChild(
    makeMenuButton(
        "ARTFIGHT",
        () => openPage("cabinet1/artfight")
    )
);

registerPage("cabinet1", {
    title: "CABINET 1",
    html: cabinet1
});

// ArtFight

const artfight = makeMenu();
artfight.appendChild(
    makeMenuButton(
        "<< BACK",
        () => openPage("cabinet1")
    )
);

artfight.appendChild(
    makeMenuButton(
        "BLAZIER",
        () => openPage("cabinet1/artfight/blazier")
    )
);

registerPage("cabinet1/artfight", {
    title: "ARTFIGHT",
    html: artfight
});

// Blazier

const blazier = makeMenu();

blazier.appendChild(
    makeMenuButton(
        "<< BACK",
        () => openPage("cabinet1/artfight")
    )
);

blazier.appendChild(
    makeMenuButton(
        "REFERENCE IMAGE",
        () => openPage("cabinet1/artfight/blazier/image")
    )
);

blazier.appendChild(
    makeMenuButton(
        "PERSONALITY",
        () => alert("later")
    )
);

registerPage("cabinet1/artfight/blazier", {
    title: "BLAZIER CINDERHAND",
    html: blazier
});

// Blazier's image

const blazier_img = makeMenu();

blazier_img.appendChild(
    makeMenuButton(
        "<< BACK",
        () => openPage("cabinet1/artfight/blazier")
    )
);

blazier_img.insertAdjacentHTML("beforeend",
    `
    <h2>Image Viewer: storage/artfight/blazier/img.png</h2>
    <img src="storage/artfight/blazier/img.png" alt="img.png">
    `
)

registerPage("cabinet1/artfight/blazier/image", {
    title: "BLAZIER CINDERHAND - img.png",
    html: blazier_img
});