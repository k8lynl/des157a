(function () {
    "use strict";
    console.log("Reading JS");
  
    // Define an array of random words to autofill
    const randomWords = [
      "apple", "banana", "cat", "dog", "elephant", "flower", "guitar", "harmony", "igloo", "jungle",
      "kangaroo", "laptop", "mountain", "notebook", "ocean", "piano", "quilt", "rocket", "sunshine",
      "tiger", "universe", "volcano", "whale", "xylophone", "yarn", "zebra"
    ];
  
    // Select all form elements
    const form = document.querySelector("form");
    const madlib = document.querySelector("#overlay p");
    const letterImg = document.getElementById("letter");
    const overlay = document.getElementById("overlay");
    const overlayArticle = document.querySelector("#overlay article");  // Select the white part (article)
    const colorSelect = document.getElementById("color-select");  // Color input for background
    const fontColorSelect = document.getElementById("font-color-select");  // Color input for font color
    const fontSelect = document.getElementById("font-select");  // Font selection dropdown
    const pages = document.querySelectorAll(".page"); // All form pages
    let currentPage = 0; // Tracks which page the user is on
  
    let selectedBackgroundColor = "#ff6347";  // Default background color
    let selectedFontColor = "#332e74";  // Default font color
    let selectedFont = "IBM Plex Mono";  // Default font
  
    // Function to show the current page and hide others
    function showPage(pageIndex) {
      pages.forEach((page, index) => {
        if (index === pageIndex) {
          page.style.display = "block"; // Show the current page
        } else {
          page.style.display = "none"; // Hide all other pages
        }
      });
    }
  
    // Show the first page initially
    showPage(currentPage);
  
    // Listen for color changes and store the selected colors
    colorSelect.addEventListener("input", function () {
      selectedBackgroundColor = colorSelect.value;
    });
  
    fontColorSelect.addEventListener("input", function () {
      selectedFontColor = fontColorSelect.value;
    });
  
    fontSelect.addEventListener("change", function () {
      selectedFont = fontSelect.value;  // Update the selected font
      applyFontChanges(); // Apply the font changes immediately
    });
  
    // Function to apply font changes to the Mad Lib text
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
  
    // Next button functionality for page navigation
    const nextButtons = document.querySelectorAll(".next-btn");
    nextButtons.forEach((button) => {
      button.addEventListener("click", function () {
        if (currentPage < pages.length - 1) {
          currentPage++; // Move to next page
          showPage(currentPage);
        }
      });
    });
  
    // Handle form submission (last page with "Submit" button)
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      processFormData();
    });
  
    // Collect form data and generate the Mad Lib
    function processFormData() {
      const words = [];
      const inputs = form.querySelectorAll("input[type='text']");
  
      // Collect all the words from the form
      inputs.forEach((input) => {
        words.push(input.value.trim());
      });
  
      // Make sure we have all the words before generating the Mad Lib
      if (words.length === inputs.length) {
        makeMadlib(words);
      } else {
        madlib.innerHTML = "Please fill out all fields.";
      }
    }
  
    // Generate and display the Mad Lib
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
  
      madlib.innerHTML = story;  // Insert the Mad Lib into the overlay
  
      letterImg.src = "../images/openletter.png";  // Change the letter image
      letterImg.classList.add("no-shadow");
  
      // Apply the selected background color to the overlay and text
      overlayArticle.style.backgroundColor = selectedBackgroundColor;  // Change the background color of the article (the white box)
      madlib.style.color = selectedFontColor;  // Apply the font color to the Mad Lib text
      applyFontChanges();  // Apply the font changes
  
      // Hide the form
      document.querySelector("main").style.display = "none"; 
  
      // Show the overlay
      overlay.classList.remove("hidden");
  
      // Disable body scrolling while overlay is open
      document.body.style.overflow = "hidden";
    }
  
    // Autofill functionality - fill text inputs with random words on the current page
    const autofillButtons = document.querySelectorAll(".autofill-btn");
    autofillButtons.forEach(button => {
      button.addEventListener("click", function () {
        // Find the closest page to the clicked autofill button
        const currentPageElement = button.closest(".page");
  
        // Select all text input fields within the current page
        const inputs = currentPageElement.querySelectorAll("input[type='text']");
  
        // Autofill each input field with a random word
        inputs.forEach(input => {
          const randomIndex = Math.floor(Math.random() * randomWords.length); // Generate random index
          input.value = randomWords[randomIndex]; // Fill input with random word
        });
      });
    });
  
    // Close overlay functionality
    document.querySelector(".close").addEventListener("click", () => {
      overlay.classList.add("hidden");
      document.body.style.overflow = "auto";
      letterImg.src = "../images/letter.png";  // Reset the letter image
      letterImg.classList.remove("no-shadow");
  
      // Reset form and show the first page again
      form.reset();
      currentPage = 0;
      showPage(currentPage);
      document.querySelector("main").style.display = "block";  // Show the form again
    });
  
    // Close the overlay if "Escape" is pressed
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        overlay.classList.add("hidden");
        document.body.style.overflow = "auto";
        letterImg.src = "../images/letter.png";  // Reset the letter image
        letterImg.classList.remove("no-shadow");
  
        // Reset form and show the first page again
        form.reset();
        currentPage = 0;
        showPage(currentPage);
        document.querySelector("main").style.display = "block";  // Show the form again
      }
    });
  })();
  