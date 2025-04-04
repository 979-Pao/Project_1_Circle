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