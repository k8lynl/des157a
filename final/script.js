(function () {
  "use strict";
  console.log("Reading JS");

  // word arrays for randomize button
  const randomAdjectives = [
    "funny",
    "silly",
    "scary",
    "smart",
    "beautiful",
    "adorable",
  ];
  const randomNouns = [
    "books",
    "cartoons",
    "sandals",
    "lizards",
    "cups",
    "koalas",
    "guns",
    "keyboards",
  ];
  const randomFoods = [
    "pizza",
    "mochi",
    "ramen",
    "cheese",
    "milk",
    "bread",
    "gum",
    "peanuts",
  ];
  const randomBodyParts = [
    "toes",
    "elbow",
    "eyelashes",
    "belly",
    "foot",
    "nostril",
    "neck",
    "thigh",
  ];
  const randomVerbs = [
    "sneeze",
    "dance",
    "rap",
    "cheer",
    "eat",
    "type",
    "breathe",
  ];
  const randomLocations = [
    "Burger King",
    "McDonalds",
    "Davis",
    "London",
    "Singapore",
    "Walmart",
  ];
  const randomNames = [
    "Kanye",
    "Drake",
    "Norman",
    "Zendaya",
    "Aaron",
    "Stephanie",
  ];
  const randomTimeMeasurements = [
    "years",
    "months",
    "seconds",
    "minutes",
    "hours",
    "days",
  ];
  const randomNumbers = ["2", "1", "3", "56", "69", "80", "1001", "20003"];
  const randomAdverbs = [
    "scarily",
    "happily",
    "awkwardly",
    "cheerfully",
    "slowly",
    "begrudgingly",
    "heavily",
    "sadly",
  ];

  const form = document.querySelector("form");
  const madlib = document.querySelector("#overlay p");
  const letterImg = document.getElementById("letter");
  const overlay = document.getElementById("overlay");
  const overlayArticle = document.querySelector("#overlay article");
  const colorSelect = document.getElementById("color-select");
  const fontColorSelect = document.getElementById("font-color-select");
  const fontSelect = document.getElementById("font-select");
  const pages = document.querySelectorAll(".page");
  const playAgainBtn = document.getElementById("playagain");
  let currentPage = 0;

  // default customization
  let selectedBackgroundColor = "#ff6347";
  let selectedFontColor = "#332e74";
  let selectedFont = "IBM Plex Mono";

  // pages
  function showPage(pageIndex) {
    pages[currentPage].style.display = "none";
    pages[pageIndex].style.display = "block";
    currentPage = pageIndex;
  }

  pages[currentPage].style.display = "block";

  // customization choices
  colorSelect.addEventListener("input", function () {
    selectedBackgroundColor = colorSelect.value;
  });

  fontColorSelect.addEventListener("input", function () {
    selectedFontColor = fontColorSelect.value;
  });

  fontSelect.addEventListener("change", function () {
    selectedFont = fontSelect.value;
  });

  function applyFontChanges() {
    switch (selectedFont) {
      case "Helvetica":
        madlib.style.fontFamily = "'Helvetica', 'Arial', sans-serif"; // Fallbacks for Helvetica
        break;
      case "Times New Roman":
        madlib.style.fontFamily = "'Times New Roman', serif"; // Fallbacks for Times New Roman
        break;
      case "Josefin Sans":
        madlib.style.fontFamily = "'Josefin Sans', sans-serif";
        break;
      case "IBM Plex Mono":
        madlib.style.fontFamily = "'IBM Plex Mono', monospace";
        break;
      default:
        madlib.style.fontFamily = "'IBM Plex Mono', monospace"; // Fallback default
    }
  }

  // nav buttons
  const nextButtons = document.querySelectorAll(".next-btn");
  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (currentPage < pages.length - 1) {
        showPage(currentPage + 1); // Move to next page
      }
    });
  });

  const prevButtons = document.querySelectorAll(".prev-btn");
  prevButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (currentPage > 0) {
        showPage(currentPage - 1);
      }
    });
  });

  // submit button
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    processFormData();
  });

  function processFormData() {
    const words = [];
    const inputs = form.querySelectorAll("input[type='text']");

    inputs.forEach((input) => {
      words.push(input.value.trim());
    });

    if (words.length === inputs.length) {
      makeMadlib(words);
    } else {
      madlib.innerHTML = "Please fill out all fields.";
    }
  }

  // generate madlib
  function makeMadlib(words) {
    const story = `Dear <strong>${words[0]}</strong> <strong>${words[5]}</strong>,<br><br>
        
        You may not know me, but I noticed you from afar <strong>${words[7]}</strong> <strong>${words[8]}</strong> ago. 
        
        From the moment I first saw you at <strong>${words[10]}</strong>, I knew you were the one for me. 
        Your <strong>${words[15]}</strong> and <strong>${words[3]}</strong> smile really caught my eye.<br><br>
        Not to mention, I truly admire the way you <strong>${words[4]}</strong> <strong>${words[12]}</strong>.<br><br>
      
        Don’t hate me for it, but I was eavesdropping on your conversation about <strong>${words[13]}</strong> 
        with your partner earlier. To be honest, I think your partner is <strong>${words[2]}</strong>, 
        and I don’t like the way they <strong>${words[11]}</strong>. I think you should break up with them 
        and get with me instead.<br><br>
      
        We could have so much fun together! We could grab some
        <strong>${words[14]}</strong> while we get to know each other better.<br><br>
      
        If you’re curious about who I am, meet me at <strong>${words[9]}</strong> at midnight.
        I really hope to see you there.<br><br>
        
        Yours,<br>
        <strong>${words[1]}</strong> <strong>${words[6]}</strong>`;

    madlib.innerHTML = story;

    letterImg.src = "../images/openletter.png";
    letterImg.classList.add("no-shadow");

    overlayArticle.style.backgroundColor = selectedBackgroundColor;
    madlib.style.color = selectedFontColor;
    applyFontChanges();

    document.querySelector("main").style.display = "none";
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  // randomize button
  const autofillButtons = document.querySelectorAll(".autofill-btn");

  function getRandomWord(input) {
    if (input.id.includes("adj")) {
      return randomAdjectives[
        Math.floor(Math.random() * randomAdjectives.length)
      ];
    } else if (input.id.includes("noun")) {
      return randomNouns[Math.floor(Math.random() * randomNouns.length)];
    } else if (input.id.includes("verb")) {
      return randomVerbs[Math.floor(Math.random() * randomVerbs.length)];
    } else if (input.id.includes("name")) {
      return randomNames[Math.floor(Math.random() * randomNames.length)];
    } else if (input.id.includes("location")) {
      return randomLocations[
        Math.floor(Math.random() * randomLocations.length)
      ];
    } else if (input.id.includes("time")) {
      return randomTimeMeasurements[
        Math.floor(Math.random() * randomTimeMeasurements.length)
      ];
    } else if (input.id.includes("number")) {
      return randomNumbers[Math.floor(Math.random() * randomNumbers.length)];
    } else if (input.id.includes("adv")) {
      return randomAdverbs[Math.floor(Math.random() * randomAdverbs.length)];
    } else if (input.id.includes("bodypart")) {
      return randomBodyParts[
        Math.floor(Math.random() * randomBodyParts.length)
      ];
    } else if (input.id.includes("food")) {
      return randomFoods[Math.floor(Math.random() * randomFoods.length)];
    } else {
      return "random";
    }
  }

  autofillButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.parentElement;
      const inputs = page.querySelectorAll("input[type='text']");

      inputs.forEach((input) => {
        input.value = getRandomWord(input);
      });
    });
  });

  // play again
  playAgainBtn.addEventListener("click", function () {
    location.reload();
  });
})();
