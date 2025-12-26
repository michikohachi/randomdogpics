const barkSounds = [
  "sounds/bark1.m4a",
  "sounds/bark2.m4a",
  "sounds/bark3.m4a"
];

let barkAudio = null;

function playRandomBark() {
  // Stop any previous bark
  if (barkAudio) {
    barkAudio.pause();
    barkAudio.currentTime = 0;
  }

  Pick a random bark and play
  const randomIndex = Math.floor(Math.random() * barkSounds.length);
  barkAudio = new Audio(barkSounds[randomIndex]);
  barkAudio.volume = 0.4;
  barkAudio.play();
}
function getDog() {
  //Stop previous bark instantly
  if (barkAudio) {
    barkAudio.pause();
    barkAudio.currentTime = 0;
  }

  const img = document.getElementById("dogImage");
  const breedText = document.getElementById("breed");
  const loader = document.getElementById("loader");

  img.style.display = "none";
  loader.style.display = "block";
  breedText.textContent = "";

  fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => {
      img.src = data.message;

      const parts = data.message.split("/");
      const breed = parts[parts.indexOf("breeds") + 1]
        .replace("-", " ")
        .toUpperCase();

      img.onload = () => {
        loader.style.display = "none";
        img.style.display = "block";
        breedText.textContent = `Breed: ${breed}`;

        // Play a NEW random bark for the new dog
        playRandomBark();
      };
    })
    .catch(error => {
      loader.style.display = "none";
      console.error(error);
    });

}

// Load dog on start
getDog();

