const dogsURL = 'https://dog.ceo/api/breeds/list/all';

let score = 0;
let rounds = 0;
let dogs = [];
let dogOptions = [];

const dogContainer = document.querySelector('.container__img');
const playButton = document.createElement('button');

playButton.classList.add('container__form-btn');
playButton.innerText = 'Play Game?'
dogContainer.appendChild(playButton);

function playRound (event) {
    event.preventDefault();

    dogContainer.innerHTML = '';
    dogOptions = [];

    axios
    .get(dogsURL)
    .then((response) => {
        dogs = Object.keys(response.data.message);
        const randomDog = dogs[Math.floor(Math.random() * 96)];
        return randomDog;
    })
    .then((randomDog) => {
        axios 
            .get(`https://dog.ceo/api/breed/${randomDog}/images/random`)
            .then((response) => {

                const dogName = randomDog;
                const dogImage = response.data.message;

                const dogImageEl = document.createElement('img');
                dogImageEl.classList.add('container__img-actual');
                dogImageEl.setAttribute('src', dogImage);
                dogImageEl.setAttribute('alt', 'a random doggo')
                dogContainer.appendChild(dogImageEl);


                const formContainer = document.querySelector('.container__form');

                formContainer.innerHTML = '';
                
                const formEl = document.createElement('form');
                formEl.classList.add('container__form-actual');
                formContainer.appendChild(formEl);


                //option 1
                const label1 = document.createElement('label');
                label1.classList.add('option1');
                label1.setAttribute('for', 'option1');
                label1.innerText = dogName;

                const option1 = document.createElement('input');
                option1.setAttribute('type', 'radio');
                option1.setAttribute('name', 'answer');
                option1.setAttribute('value', dogName);
                label1.appendChild(option1);
               
                dogOptions.push(label1);

        
                //option 2
                let wrongOption2 = dogs[Math.floor(Math.random() * 96)];
                if (wrongOption2 === dogName) {
                    wrongOption2 = dogs[Math.floor(Math.random() * 96)];
                }
                const label2 = document.createElement('label');
                label2.classList.add('option2');
                label2.setAttribute('for', 'option2');
                label2.innerText = wrongOption2;

                const option2 = document.createElement('input');
                option2.setAttribute('type', 'radio');
                option2.setAttribute('name', 'answer');
                option2.setAttribute('value', wrongOption2);
                label2.appendChild(option2);

                dogOptions.push(label2);
      
                //option 3
                let wrongOption3 = dogs[Math.floor(Math.random() * 96)];
                if (wrongOption3 === dogName || wrongOption3 === wrongOption2) {
                    wrongOption3 = dogs[Math.floor(Math.random() * 96)];
                }
                const label3 = document.createElement('label');
                label3.classList.add('option3');
                label3.setAttribute('for', 'option3');
                label3.innerText = wrongOption3;

                const option3 = document.createElement('input');
                option3.setAttribute('type', 'radio');
                option3.setAttribute('name', 'answer');
                option3.setAttribute('value', wrongOption3);
                label3.appendChild(option3);

                dogOptions.push(label3);

                //option 4
                let wrongOption4 = dogs[Math.floor(Math.random() * 96)];
                if (wrongOption4 === dogName || wrongOption4 === wrongOption3 || wrongOption4 === wrongOption2) {
                    wrongOption4 = dogs[Math.floor(Math.random() * 96)];
                }
                const label4 = document.createElement('label');
                label4.classList.add('option4');
                label4.setAttribute('for', 'option4');
                label4.innerText = wrongOption4;

                const option4 = document.createElement('input');
                option4.setAttribute('type', 'radio');
                option4.setAttribute('name', 'answer');
                option4.setAttribute('value', wrongOption4);
                label4.appendChild(option4);

                dogOptions.push(label4);

                //shuffle options
                function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
                }

                const shuffledOptions = shuffle(dogOptions);
                shuffledOptions.forEach((shuffledOption) => {
                    formEl.appendChild(shuffledOption);
                });
                

                //button
                const submitButton = document.createElement('input');
                submitButton.setAttribute('type', 'submit');
                submitButton.setAttribute('value', 'Submit');
                submitButton.classList.add('container__form-btn');
                submitButton.innerText = "Submit"
                formEl.appendChild(submitButton);

                //reset button
                // const resetButton = document.createElement('input');
                // resetButton.setAttribute('type', 'reset');
                // resetButton.classList.add('container__form-btn');
                // // formContainer.removeChild(output);
                // formEl.appendChild(resetButton);

                //output status
                const output = document.createElement('p');
                output.classList.add('container__card-heading');
                formContainer.appendChild(output);


                //check for correct option
                const checkAnswer = ((event) => {
                    event.preventDefault();

                    const selectedAnswer = event.target.answer.value;

                    if (selectedAnswer === dogName) {
                        score += 1;
                        output.innerText = `Correct answer. \n The breed is ${dogName}`;
                        output.style.color = 'green';
                        formEl.classList.add("hidden");
                        formContainer.appendChild(nextButton);
                    } else {
                        output.innerText = 'Wrong answer. Try again!'
                        output.style.color = 'red';
                        score = 0; // we want to change the count back to zero if someone looses.
                    }
                });

                formEl.addEventListener('submit', checkAnswer);
            })   
    })
    .catch((error) => {
        console.log(error);
    });

    rounds += 1; 
}


const nextButton = document.createElement('button');
nextButton.classList.add('container__form-btn');
nextButton.innerText = 'Next';


nextButton.addEventListener('click', playRound);
playButton.addEventListener('click', playRound);
