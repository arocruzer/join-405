// Funktion zum Hinzufügen von Hover-Effekten
function hoverButton(page) {
    const img = document.getElementById(page + "-img");
    const button = document.getElementById(page + "-button");

    button.addEventListener("mouseenter", () => {
        img.src = "../Assets/img/" + page + "_w_L.png"; // Bild bei Hover
    });

    button.addEventListener("mouseleave", () => {
        img.src = "../Assets/img/" + page + "_g_L.png"; // Standardbild
    });

    console.log(page);
}


function bgMenuButton() {
    console.log(page);

}