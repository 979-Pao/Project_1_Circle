window.addEventListener("load", async () => {
    try {
        const response = await fetch("https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects");
        const data = await response.json();

        const mainProjectId = getQuerystringId();
        const mainProjectIndex = data.findIndex(project => project.uuid === mainProjectId);

        const mainProject = data[mainProjectIndex];
        addMainProject(mainProject);

        data.splice(mainProjectIndex, 1);
        const otherProjects = data.slice(0, 3).reverse();
        addOtherProjects(otherProjects);
    } 
    catch (error) {
        toggleModal();
    }
});

function getQuerystringId() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id;
}

function addMainProject(project) {
    if (!project) return;

    const { name, description, completed_on, image, content } = project;
    const projectHTML = `
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

    document.getElementById("project").innerHTML = projectHTML;
}

function addOtherProjects(projects) {
    const container = document.querySelector("div.projects-container");
    container.innerHTML = projects.map(jsonProjectToOtherHtmlArticle).join("");
}

function jsonProjectToOtherHtmlArticle({ uuid, name, image, description }) {
    if (!uuid || !name || !image || !description) return "";
    
    return `
        <article class="project-card">
            <a class="project-wrapper" href="../pages/projects.html?id=${uuid}">
                <img class="img-project" src="${image}" alt="${name} image" />
                <div class="project-inner-card">
                    <h4 class="project-title">${name}</h4>
                    <p class="project-description capitalize">${description}</p>
                    <a class="learn-more" href="../pages/projects.html?id=${uuid}">Learn more</a>
                </div>
            </a>
        </article>
    `;
}