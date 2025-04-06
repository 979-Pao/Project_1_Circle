window.addEventListener("load", async () => {
    try {
        const res = await fetch("https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects");
        const data = await res.json();

        const id = getQuerystringId();
        const index = data.findIndex(p => p.uuid === id);
        const [mainProject] = data.splice(index, 1); 

        addMainProject(mainProject);
        addOtherProjects(data.slice(0, 3).reverse());
    } catch (err) {
        toggleModal();
    }
});

function getQuerystringId() {
    return new Proxy(new URLSearchParams(location.search), {
        get: (params, prop) => params.get(prop)
    }).id;
}

function addMainProject(project) {
    if (!project) return;

    const { name, description, completed_on, image, content } = project;
    document.getElementById("project").innerHTML = `
        <h1 class="title">${name}</h1>
        <div class="subtitle">
            <span class="UI-design-title">${description}</span>
            <span class="completed-title">Completed on
                <span class="completed-title-data">${completed_on}</span>
            </span>
        </div>
        <div class="project-image-section">
            <img class="project-image" src="${image}" alt="${name} image" />
        </div>
        <article class="project-description">${content}</article>
    `;
}

function addOtherProjects(projects) {
    document.querySelector(".projects-container").innerHTML =
        projects.map(jsonProjectToOtherHtmlArticle).join("");
}

function jsonProjectToOtherHtmlArticle({ uuid, name, image, description }) {
    return `
        <article class="project-card">
            <a class="project-wrapper" href="projects.html?id=${uuid}">
                <img class="img-project" src="${image}" alt="${name} image" />
                <div class="project-inner-card">
                    <h4 class="project-title">${name}</h4>
                    <p class="project-description capitalize">${description}</p>
                    <a class="learn-more" href="projects.html?id=${uuid}">Learn more</a>
                </div>
            </a>
        </article>
    `;
}
