window.addEventListener("load", async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects");
      const data = await response.json();
      
      const container = document.querySelector("div.projects-list");
      container.innerHTML = "";
  
      data.reverse().slice(0, 3).forEach(project => {
        const article = createProjectArticle(project);
        container.appendChild(article);
      });
  
    } catch (error) {
      console.error(error);
    } finally {
      document.querySelector("section.projects").removeAttribute("hidden");
    }
  });
  
  function createProjectArticle(project) {
    const article = document.createElement("article");
    article.className = "project-item";
    
    const link = document.createElement("a");
    link.href = `./pages/projects.html?id=${project.uuid}`;
  
    const img = document.createElement("img");
    img.className = "project-img";
    img.src = project.image;
    img.alt = project.name;
  
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "project-details";
  
    const title = document.createElement("h4");
    title.className = "project-title";
    title.textContent = project.name;
  
    const description = document.createElement("p");
    description.className = "project-desc";
    description.textContent = project.description;
  
    const learnMoreLink = document.createElement("a");
    learnMoreLink.className = "project-link";
    learnMoreLink.textContent = "Learn more";
    learnMoreLink.href = `./pages/projects.html?id=${project.uuid}`;
  
    detailsDiv.appendChild(title);
    detailsDiv.appendChild(description);
    detailsDiv.appendChild(learnMoreLink);
    link.appendChild(img);
    link.appendChild(detailsDiv);
  
    article.appendChild(link);
  
    return article;
  }
  
  const btnTop = document.getElementById("btnTop");

window.onscroll = function() {
    if (document.documentElement.scrollTop > 300) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
};

btnTop.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});