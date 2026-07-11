// Credits

registerPage("credits", {
    title: "Credits",
    html: `
<h2>Credits</h2>
<p>Programming: Cndtnl_Cognition</p>
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
        "REFERENCE IMAGE",
        () => alert("later")
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