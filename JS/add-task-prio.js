let btnUrgent = document.getElementById("btn-urgent-overlay");
let imgUrgent = document.getElementById("urgent-img-overlay");
let btnMedium = document.getElementById("btn-medium-overlay");
let imgMedium = document.getElementById("medium-img-overlay");
let btnLow = document.getElementById("btn-low-overlay");
let imgLow = document.getElementById("low-img-overlay");

function changeColorPrioBtnOverlay(priority) {
    let imgSourcesOverlay = {
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
  
    let bgColorsOverlay = { urgent: "#FF3B30", medium: "#FFA800", low: "#4CD964" };
  
    resetButtonStylesOverlay();
    selectedPriorityOverlay = priority;
    setButtonStylesOverlay(priority, bgColorsOverlay[priority]);
    setImageSourcesOverlay(imgSourcesOverlay[priority]);
  }
  
  function resetButtonStylesOverlay() {
    btnUrgent.style.backgroundColor =
      btnMedium.style.backgroundColor =
      btnLow.style.backgroundColor =
        "#ffffff";
  }
  
  function setButtonStylesOverlay(priority, bgColorOverlay) {
    if (priority === "urgent") btnUrgent.style.backgroundColor = bgColorOverlay;
    else if (priority === "medium") btnMedium.style.backgroundColor = bgColorOverlay;
    else if (priority === "low") btnLow.style.backgroundColor = bgColorOverlay;
  }
  
  function setImageSourcesOverlay([urgentImgSrc, mediumImgSrc, lowImgSrc]) {
    imgUrgent.src = urgentImgSrc;
    imgMedium.src = mediumImgSrc;
    imgLow.src = lowImgSrc;
  }