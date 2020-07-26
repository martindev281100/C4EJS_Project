let data = [{
        question: "What causes ocean tides?",
        correctAnswer: "The pull of gravity from the Moon and the Sun",
        wrongAnswers: [
            "The pull of gravity from the Sun",
            "The pull of gravity from the Moon",
            "The Earth spin around its axis",
        ],
        hint: "Not only one cause",
    },
    {
        question: "What is the biggest animal that ever lived?",
        correctAnswer: "Blue whale",
        wrongAnswers: [
            "King Kong",
            "Tyrannosaurus rex",
            "Sperm whale",
        ],
        hint: "Fish",
    },
    {
        question: "What is culture?",
        correctAnswer: "The features of everyday life shared by a group",
        wrongAnswers: [
            "A person's individual traits",
            "Something different that one person does in their daily life",
            "Having respect and acceptance for people different than you",
        ],
        hint: "Stem from more than one person",
    },
    {
        question: "Who sets the standards that create a culture?",
        correctAnswer: "All People",
        wrongAnswers: [
            "Family Elders",
            "Artists",
            "Governments",
        ],
        hint: "Something that is normal",
    },
    {
        question: "Which is not a danger to explorers searching for the lost city?",
        correctAnswer: "Rabid monkeys",
        wrongAnswers: [
            "Deadly snakes",
            "Hungry jaguars",
            "Poisonous insects",
        ],
        hint: "Animals contain non-contagious disease",
    },
    {
        question: "What is a property that leads to electromagnetic interactions between particles of matter?",
        correctAnswer: "Electric charge",
        wrongAnswers: [
            "Static electricity",
            "Electric conduction",
            "Semi-conduction",
        ],
        hint: "Intake of electricity",
    },
    {
        question: "Which of the following is not an element of which color is composed?",
        correctAnswer: "Detail (definition)",
        wrongAnswers: [
            "Value (hue)",
            "Intensity (saturation)",
            "Tonality (luminance)",
        ],
        hint: "HSL",
    },
    {
        question: "What is the measurement of Earth's gravity?",
        correctAnswer: "9.8 m/s2",
        wrongAnswers: [
            "8.2 m/s2",
            "6.9 m/s2",
            "3.5 m/s2",
        ],
        hint: "Can be rounded up to 10 m/s2",
    },
    {
        question: "BarmBrack, a fruitcake, is a Halloween Irish tradition. This cake contains:",
        correctAnswer: "Objects baked into the bread used as a fortune-telling game",
        wrongAnswers: [
            "Special powers that will make you see ghosts",
            "Chili and different spices",
            "Meat",
        ],
        hint: "Something for prophecy",
    },
    {
        question: "Which of the following is NOT a major component of Cell Theory?",
        correctAnswer: "All organisms contain eukaryotic cells",
        wrongAnswers: [
            "All organisms are made of 1 or more cells",
            "The cell is the basic unit of life",
            "All cells come from pre-existing cells",
        ],
        hint: "Not the fundamental root of an organism",
    }
];

let question = document.getElementById('question_content');

let random_question = data[Math.floor(Math.random() * data.length)];

question.innerHTML = random_question.question;
let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');
let answer4 = document.getElementById('answer4');

let arr_answer = [answer1, answer2, answer3, answer4];

let random_canswer = arr_answer[Math.floor(Math.random() * arr_answer.length)];

random_canswer.innerHTML = random_question.correctAnswer;
let index_canswer = arr_answer.indexOf(random_canswer);
console.log('index canswer: ' + arr_answer.indexOf(random_canswer));
arr_answer.splice(index_canswer, 1);
console.log('arr_answer: ' + arr_answer);

for (let i = 0; i < arr_answer.length; i++) {
    console.log('length'+arr_answer.length)
    let random_wanswer = arr_answer[Math.floor(Math.random() * arr_answer.length)];
    console.log(random_wanswer);
    random_wanswer.innerHTML = random_question.wrongAnswers[i];
    let index_wanswer = arr_answer.indexOf(random_wanswer);
    arr_answer.splice(index_wanswer, 1);
}

