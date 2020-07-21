let data = [
    {
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

function showItems(arr, arrLength) {
    let table = document.getElementById("table_body");
    let tableRow = document.createElement("tr");
    for(let j = 0; j < arrLength; j ++) {
        let tableDetail = document.createElement("td");
        tableDetail.innerHTML = arr[j];
        tableRow.appendChild(tableDetail);
    }

    let tableDetail = document.createElement("td");
    let buttonUpdate = document.createElement("button");
    buttonUpdate.innerHTML = "Update";
    buttonUpdate.classList.add("update");

    let buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "Delete";
    buttonDelete.classList.add("delete");

    tableDetail.appendChild(buttonUpdate);
    tableDetail.appendChild(buttonDelete);
    tableRow.appendChild(tableDetail);
    table.appendChild(tableRow);
}

for(let i = 0; i < data.length; i ++) {
    let arr = [data[i].question, data[i].correctAnswer, data[i].wrongAnswers, data[i].hint];
    showItems(arr, arr.length);
}

unauthorized_form = function () {
    document.getElementById("col_action").hidden = true;
    document.getElementById("col_action_title").hidden = true;
    document.getElementById("btn_add").style.display = 'none';
    document.getElementById('btn_logIn').style.display = 'block';
    document.getElementById('btn_logOut').style.display = 'none';
    document.getElementById('input_account').style.display = 'block';
    document.getElementById('input_password').style.display = 'block';
    document.getElementById('col_hint').hidden = true;
    document.getElementById('col_hint_title').hidden = true;
}
unauthorized_form();

authorized_form = function () {
    document.getElementById("col_action").hidden = false;
    document.getElementById("col_action_title").hidden = false;
    document.getElementById("btn_add").style.display = 'block';
    document.getElementById('btn_logOut').style.display = 'block';
    document.getElementById('btn_logIn').style.display = 'none';
    document.getElementById('input_account').style.display = 'none';
    document.getElementById('input_password').style.display = 'none';
    document.getElementById('col_hint').hidden = false;
    document.getElementById('col_hint_title').hidden = false;
}

unclicked_btn_add = function () {
    document.getElementById('form-add').style.display = 'none';
}
unclicked_btn_add();

clicked_btn_add = function () {
    document.getElementById('form-add').style.display = 'block';
}

const btn_add = document.getElementById('btn_add');
const btn_add_item = document.getElementById('btn_item_add');

btn_add.addEventListener('click', function () {
    clicked_btn_add();
    btn_add.style.display = 'none';
})

btn_add_item.addEventListener('click', function () {
    //Code Event khi click thêm câu h?i m?i
    unclicked_btn_add();
    btn_add.style.display = 'block';
})

const btn_logIn = document.getElementById('btn_logIn');
btn_logIn.addEventListener('click', function () {
    check();
})

check = function () {
    const account = document.getElementById("input_account").value;
    const password = document.getElementById("input_password").value;
    console.log(account + password);
    if (account == "admin" && password == "1234") {
        authorized_form();
    } else {
        unauthorized_form();
    }
};

const btn_logOut = document.getElementById('btn_logOut')
btn_logOut.addEventListener('click', function () {
    unauthorized_form();
})

function addItem() {
    let question = document.getElementById("input_question").value;
    let correctAnswer = document.getElementById("input_correct").value;
    let wrongAnswers = document.getElementById("input_wrong").value;
    let hint = document.getElementById("input_hint").value;
    let arr = [question, correctAnswer, wrongAnswers, hint];
    showItems(arr, arr.length);
}


// let deleteRow = document.getElementsByClassName("delete");
// console.log(deleteRow);
// for(let i = 0; i < deleteRow.length; i ++) {
//     deleteRow[i].onclick = document.getElementById("table_body").deleteRow(i);
// }
