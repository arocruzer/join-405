// DOM-Elemente für die Prioritätsbuttons und Bilder
let btnUrgent = document.getElementById("btn-urgent");
let imgUrgent = document.getElementById("urgent-img");
let btnMedium = document.getElementById("btn-medium");
let imgMedium = document.getElementById("medium-img");
let btnLow = document.getElementById("btn-low");
let imgLow = document.getElementById("low-img");

// Bildquellen für die Prioritäten
const imgSourcesOverlay = {
  urgent: [
    "../Assets/prio_arrow_white.png",
    "../Assets/prio_line_orange.png",
    "../Assets/prio_low.png",
  ],
  medium: [
    "../Assets/prio_urgent.png",
    "../Assets/prio_medium.png",
    "../Assets/prio_low.png",
  ],
  low: [
    "../Assets/prio_urgent.png",
    "../Assets/prio_line_orange.png",
    "../Assets/prio_arrowDown_white.png",
  ],
};
renderPrioBtns("medium");

/**
 * Fügt die Prioritätsbuttons in das HTML ein.
 * @param {string} currentPriority - Die aktuelle Priorität, die gesetzt werden soll ("urgent", "medium", "low").
 */
function renderPrioBtns(currentPriority) {
  let prioContainer = document.getElementById("prio-container");
  prioContainer.innerHTML = generatePriorityButtons(currentPriority);
}

/**
 * Ändert die Farbe und Icons der Prioritätsbuttons basierend auf der ausgewählten Priorität.
 * @param {string} priority - Die gewählte Prioritätsstufe ("urgent", "medium" oder "low").
 */
function changeColorPrioBtn(priority) {
  const bgColorsOverlay = {
    urgent: "#FF3B30",
    medium: "#FFA800",
    low: "#4CD964",
  };

  // Zurücksetzen der Stile
/*   resetButtonStyles(); */
  // Setzen der Stile und Bilder basierend auf der ausgewählten Priorität
  setButtonStyles(priority, bgColorsOverlay[priority]);
  setImageSources(imgSourcesOverlay[priority]);
}

/**
 * Setzt die Hintergrundfarben aller Prioritätsbuttons auf Weiß zurück.
 */
/* function resetButtonStyles() {
  btnUrgent.style.backgroundColor = btnMedium.style.backgroundColor = btnLow.style.backgroundColor = "#ffffff";
} */

/**
 * Setzt die Hintergrundfarbe des ausgewählten Prioritätsbuttons.
 * @param {string} priority - Die gewählte Prioritätsstufe ("urgent", "medium" oder "low").
 * @param {string} bgColorOverlay - Die zu setzende Hintergrundfarbe.
 */
function setButtonStyles(priority, bgColorOverlay) {
  if (priority === "urgent") btnUrgent.style.backgroundColor = bgColorOverlay;
  else if (priority === "medium") btnMedium.style.backgroundColor = bgColorOverlay;
  else if (priority === "low") btnLow.style.backgroundColor = bgColorOverlay;
}

/**
 * Setzt die Icons der Prioritätsbuttons basierend auf der gewählten Priorität.
 * @param {string[]} imgSources - Array mit den Bildpfaden für die Icons in der Reihenfolge [urgent, medium, low].
 */
function setImageSources([urgentImgSrc, mediumImgSrc, lowImgSrc]) {
  imgUrgent.src = urgentImgSrc;
  imgMedium.src = mediumImgSrc;
  imgLow.src = lowImgSrc;
}
