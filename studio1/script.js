(function () {
  "use strict";
  console.log("Reading JS");

  const myForm = document.querySelector("form");
  const madlib = document.querySelector("#overlay p");
  const formData = document.querySelectorAll("input[type=text]");
  const letterImg = document.getElementById("letter");

  myForm.addEventListener("submit", function (event) {
    event.preventDefault();
    processFormData(formData);
  });

  function processFormData(formData) {
    const words = [];
    const emptyfields = [];
    let counter = 0;

    for (const eachWord of formData) {
      if (eachWord.value) {
        words.push(eachWord.value.trim());
      } else {
        emptyfields.push(counter);
      }
      counter++;
    }

    if (emptyfields.length > 0) {
      showErrors(formData, emptyfields);
    } else {
      makeMadlib(words);
    }
  }

  function showErrors(formData, emptyfields) {
    const errorId = formData[emptyfields[0]].id;
    const errorText = `Please fill out this field: ${errorId}`;
    madlib.innerHTML = errorText;
    document.querySelector(`#${errorId}`).focus();
  }

  function makeMadlib(words) {
    const story = `Dear <strong>${words[0]}</strong> <strong>${words[4]}</strong>,<br><br>

    You may not know me, but I noticed you from afar <strong>${words[6]}</strong> <strong>${words[7]}</strong> ago. 

    From the moment I first saw you at <strong>${words[9]}</strong>, I knew you were the one for me. 
    Your <strong>${words[10]}</strong> and <strong>${words[2]}</strong> smile really caught my eye.<br><br>
    Not to mention, I truly admire the way you <strong>${words[15]}</strong> <strong>${words[11]}</strong>.<br><br>

    Don’t hate me for it, but I was eavesdropping on your conversation about <strong>${words[13]}</strong> 
    with your partner earlier. To be honest, I think your partner is <strong>${words[3]}</strong>, 
    and I don’t like the way they <strong>${words[12]}</strong>. I think you should break up with them 
    and get with me instead.<br><br>

    We could have so much fun together! We could grab some
    <strong>${words[14]}</strong> while we get to know each other better.<br><br>

    If you’re curious about who I am, meet me at <strong>${words[8]}</strong> at midnight.
    I really hope to see you there.<br><br>
    
    Yours,<br>
    <strong>${words[1]}</strong> <strong>${words[5]}</strong>`;

    madlib.innerHTML = story;
    letterImg.src = "../images/openletter.png";
    letterImg.classList.add("no-shadow");

    for (const eachField of formData) {
      eachField.value = "";
    }

    document.getElementById("overlay").classList.remove("hidden");

    document.body.style.overflow = "hidden";

    window.scrollTo(0, 0);
  }

  document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("overlay").classList.add("hidden");
    document.body.style.overflow = "auto";
    letterImg.src = "../images/letter.png";
    letterImg.classList.remove("no-shadow");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.getElementById("overlay").className = "hidden";
      document.body.style.overflow = "auto";
      letterImg.src = "../images/letter.png";
      letterImg.classList.remove("no-shadow");
    }
  });

  let pageTop;
  const bodyTag = document.querySelector("body");

  window.addEventListener("scroll", function () {
    pageTop = window.pageYOffset;

    if (pageTop < 700) {
      bodyTag.classList.remove("colorchange");
    } else {
      bodyTag.classList.add("colorchange");
    }
  });
})();
