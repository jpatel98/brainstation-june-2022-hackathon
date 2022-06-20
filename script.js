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

    let correctIndex = randomNumber();
    wrongOption1 = randomNumber();
    wrongOption2 = randomNumber();
    wrongOption3 = randomNumber();
    if (((correctIndex == wrongOption1) == wrongOption2) == wrongOption3) {
      correctIndex = randomNumber();
      wrongOption1 = randomNumber();
      wrongOption2 = randomNumber();
      wrongOption3 = randomNumber();
      console.log("options matched!!!!");
    } else {
      // console.log(correctIndex, wrongOption1, wrongOption2, wrongOption3);
      dogName = generateOptions(dogList, correctIndex);
      wrongOption1 = generateOptions(dogList, wrongOption1);
      wrongOption2 = generateOptions(dogList, wrongOption2);
      wrongOption3 = generateOptions(dogList, wrongOption3);
      options.push(dogName, wrongOption1, wrongOption2, wrongOption3);
      console.log(options);
    }

    return dogName;
  })
  .then((name) => {
    axios
      .get(`https://dog.ceo/api/breed/${name}/images/random`)
      .then((response) => {
        dog.name = name;
        dog.image = response.data.message;
        console.log(response);
        displayDog();
      });
  })
  .catch((err) => {
    console.log(
      "Cannot receive the Dog Information at this time, please try again!",
      err
    );
  });
const card = document.querySelector(".container__card");
const form = document.querySelector(".container__form-actual");

form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
  const radio = document.querySelectorAll(".container__form__radio");
  const title = document.querySelector(".container__title");
  console.log(radio);
  event.preventDefault();
  console.log("submit clicked");
  for (var i = 0, length = radio.length; i < length; i++) {
    if (radio[i].checked) {
      if (dog.name === radio[i].value) {
        console.log("Correct answer");
        title.innerHTML = "Correct answer! Well Done";
      } else {
        console.log("Wrong ansswer, try agian!");
        title.innerHTML = "Wrong Answer! Try Again!";
      }

      break;
    }
  }
}

function displayDog() {
  //Creating the image element for image
  const image = document.querySelector(".container__img-actual");

  image.setAttribute("src", dog.image);

  options.forEach((value) => {
    console.log(value);
    //div
    const container = document.createElement("div");
    container.classList.add("container__form__panel");
    form.appendChild(container);

    //Radio Button
    const radioButton = document.createElement("input");
    radioButton.setAttribute("type", "radio");
    radioButton.classList.add("container__form__radio");
    radioButton.value = value;
    radioButton.id = value;
    radioButton.name = "radio";
    container.appendChild(radioButton);

    //Label
    const label = document.createElement("label");
    label.setAttribute("for", value);
    label.classList.add("container__form__label");
    container.appendChild(label);
    label.innerHTML = value;
  });

  //Submit Button
  const submitButton = document.createElement("button");
  submitButton.classList.add("container__form-btn");
  submitButton.setAttribute("type", "submit");
  submitButton.innerHTML = "Submit";
  form.appendChild(submitButton);

  // Refresh Button
  const refreshButton = document.createElement("button");
  refreshButton.classList.add("container__form-btn");
  refreshButton.innerHTML = "Refresh";
  form.appendChild(refreshButton);
  console.log();
}

function randomNumber() {
  const index = Math.floor(Math.random() * 96);
  return index;
}
function generateOptions(list, index) {
  let name = Object.keys(list)[index];
  return name;
}
