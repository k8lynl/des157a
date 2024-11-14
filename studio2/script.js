(function () {
  "use strict";
  console.log("reading js");
  
  const catImages = document.querySelectorAll(".cats img");
  const cardImg = document.getElementById("cardimg");
  const imageDescription = document.getElementById("image-description");
  const backgroundContainer = document.getElementById("background-container");
  const map = document.getElementById("davismap");

  const zoomAreas = {
    cat1: "zoom-1",
    cat2: "zoom-2",
    cat3: "zoom-3",
    cat4: "zoom-4",
    cat5: "zoom-5",
  };

  // info for each cat
  const catInfo = [
    {
      id: "cat1",
      name: "Scaredy Cat, [official name unknown]",
      date: "2021-11-20",
      location: "UC Davis Silo Terminal",
      story: "Seen on a late night walk back to my Tercero dorm.",
      imgSrc: "images/cat1.JPG",
      backgroundImg: "images/cat1.jpg",
      hoverImgSrc: "images/cat6v2.jpg",
    },
    {
      id: "cat2",
      name: "Winnie",
      date: "2023-11-14",
      location: "2nd Street",
      story: "Gave me the cold shoulder. Passed away 5 months later—RIP.",
      imgSrc: "images/cat2.JPG",
      backgroundImg: "images/cat2.jpg",
      hoverImgSrc: "images/cat7.jpg",
    },
    {
      id: "cat3",
      name: "Fiesty Cat, [official name unknown]",
      date: "2023-03-10",
      location: "Aggie Square Apartments",
      story: "Bit me after I touched its belly.",
      imgSrc: "images/cat3.JPG",
      backgroundImg: "images/cat3.jpg",
      hoverImgSrc: "images/cat8.jpg",
    },
    {
      id: "cat4",
      name: "Bug",
      date: "2023-11-04",
      location: "Somewhere downtown",
      story: "Very friendly cat! Sniffed my phone.",
      imgSrc: "images/cat4.JPG",
      backgroundImg: "images/cat4.jpg",
      hoverImgSrc: "images/cat9.jpg",
    },
    {
      id: "cat5",
      name: "Model Cat, [official name unknown]",
      date: "2024-04-08",
      location: "2nd Street",
      story: "One of my favorite shots from DES 113.",
      imgSrc: "images/cat5.JPG",
      backgroundImg: "images/cat5.jpg",
      hoverImgSrc: "images/cat10.jpg",
    },
  ];

  // change cat card and map zoom based on cat clicked
  catImages.forEach(function (img) {
    img.addEventListener("click", function () {
      const catId = img.id;

      const zoomClass = zoomAreas[catId];
      map.className = "";
      map.classList.add(zoomClass);

      let cat;

      for (let i = 0; i < catInfo.length; i++) {
        if (catInfo[i].id === catId) {
          cat = catInfo[i];
          break;
        }
      }

      if (cat) {
        cardImg.id = cat.id;

        cardImg.src = cat.imgSrc;
        imageDescription.innerHTML = `
          <strong>Name:</strong> ${cat.name} <br />
          <strong>Date of sighting:</strong> ${cat.date} <br />
          <strong>Location:</strong> ${cat.location} <br />
          <strong>Story:</strong> ${cat.story} <br />
          
        `;

        backgroundContainer.style.backgroundImage = `url(${cat.backgroundImg})`;
      }
    });
  });

  // change cat image based on mouse position/hover
  cardImg.addEventListener("mousemove", function (event) {
    const xPos = event.clientX - cardImg.getBoundingClientRect().left;
    const catId = cardImg.id;
    let cat;

    for (let i = 0; i < catInfo.length; i++) {
      if (catInfo[i].id === catId) {
        cat = catInfo[i];
        break;
      }
    }

    if (cat) {
      if (xPos > cardImg.offsetWidth / 2) {
        cardImg.src = cat.hoverImgSrc;
      } else {
        cardImg.src = cat.imgSrc;
      }
    }
  });
})();
