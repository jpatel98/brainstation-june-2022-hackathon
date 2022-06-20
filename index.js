let dogList = [];
let dogName = "";
const dog = {
  name: "",
  image: "",
};
let options = [];

axios
  .get("https://dog.ceo/api/breeds/list/all")
  .then((response) => {
    dogList = response.data.message;

    //Wrong options should not be equal to correct ones.
    //Options should not be same.

    // let correctIndex = randomNumber();
    // wrongOption1 = randomNumber();
    // wrongOption2 = randomNumber();
    // wrongOption3 = randomNumber();
    // if (((correctIndex == wrongOption1) == wrongOption2) == wrongOption3) {
    //   correctIndex = randomNumber();
    //   wrongOption1 = randomNumber();
    //   wrongOption2 = randomNumber();
    //   wrongOption3 = randomNumber();
    // }

    console.log(correctIndex, wrongOption1, wrongOption2, wrongOption3);
    dogName = Object.keys(dogList)[correctIndex];

    return dogName;
  })
  .then((name) => {
    axios
      .get(`https://dog.ceo/api/breed/${name}/images/random`)
      .then((response) => {
        dog.name = name;
        dog.image = response.data.message;
        displayDog();
      });
  })
  .catch((err) => {
    console.log(
      "Cannot receive the Dog Information at this time, please try again!",
      err
    );
  });
const card = document.querySelector(".card");

function displayDog() {
  //Creating the image element for image
  const image = document.createElement("img");
  console.log("Dog image", dog.image);
  image.setAttribute("src", dog.image);
  card.appendChild(image);

  const name = document.createElement("h1");
  name.innerHTML = dog.name;
  card.appendChild(name);
}

function randomNumber() {
  const index = Math.floor(Math.random() * 96);
  return index;
}
