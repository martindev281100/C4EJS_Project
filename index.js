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
        hint: "Animal that contains non-contagious disease",
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

let math = [{
        question: "1 + 1 = ?",
        correctAnswer: "2",
        wrongAnswers: [
            "3",
            "4",
            "5",
        ],
    },
    {
        question: "1 x 10 = ?",
        correctAnswer: "10",
        wrongAnswers: [
            "30",
            "40",
            "50",
        ],
    },
    {
        question: "11 x 12 = ?",
        correctAnswer: "132",
        wrongAnswers: [
            "69",
            "145",
            "213",
        ],
    },
    {
        question: "99 - 72 = ?",
        correctAnswer: "27",
        wrongAnswers: [
            "34",
            "49",
            "52",
        ],
    },
    {
        question: "3 x 2 = ?",
        correctAnswer: "6",
        wrongAnswers: [
            "9",
            "10",
            "5",
        ],
    },
    {
        question: "0 / 1 = ?",
        correctAnswer: "0",
        wrongAnswers: [
            "1",
            "100",
            "10",
        ],
    },
    {
        question: "99 / 3 = ?",
        correctAnswer: "33",
        wrongAnswers: [
            "66",
            "49",
            "11",
        ],
    },
    {
        question: "3! = ?",
        correctAnswer: "6",
        wrongAnswers: [
            "7",
            "9",
            "10",
        ],
    },
    {
        question: "9 ^ 2 = ?",
        correctAnswer: "81",
        wrongAnswers: [
            "67",
            "63",
            "72",
        ],
    },
    {
        question: "sin(0) = ?",
        correctAnswer: "0",
        wrongAnswers: [
            "1",
            "0.3",
            "0.6",
        ],
    },
];

for (let i = 0; i < data.length; i++) {
    let arr = [data[i].question, data[i].correctAnswer, data[i].wrongAnswers, data[i].hint];
    showItems(arr);
}

function addItem() {
    let newData = {
        question: document.getElementById("input_question").value,
        correctAnswer: document.getElementById("input_correct").value,
        wrongAnswers: document.getElementById("input_wrong").value,
        hint: document.getElementById("input_hint").value,
    }
    newData.wrongAnswers = newData.wrongAnswers.split(", ");
    data.push(newData);
    let arr = [newData.question, newData.correctAnswer, newData.wrongAnswers, newData.hint];
    showItems(arr);
}

function showItems(arr) {
    let table = document.getElementById("table_questions");
    let tableRow = document.createElement("tr");
    for (let i = 0; i < 4; i++) {
        let tableDetail = document.createElement("td");
        if (i == 2) tableDetail.innerHTML = arr[i].join(", ");
        else tableDetail.innerHTML = arr[i];
        switch (i) {
            case 0:
                tableDetail.classList.add("question_content");
                break;
            case 1:
                tableDetail.classList.add("correct_answer");
                break;
            case 2:
                tableDetail.classList.add("wrong_answer");
                break;
            case 3:
                tableDetail.classList.add("col_hint");
                break;
        }
        tableRow.appendChild(tableDetail);
    }

    let tableDetail = document.createElement("td");
    tableDetail.classList.add("col_action");

    let buttonUpdate = document.createElement("button");
    buttonUpdate.innerHTML = "Update";
    buttonUpdate.onclick = function () {
        let i = buttonUpdate.parentNode.parentNode.rowIndex;
        table.rows[i].contentEditable = "true";
        table.rows[i].onfocusout = function () {
            table.rows[i].contentEditable = "false";
            data[i - 2].question = table.rows[i].cells[0].innerHTML;
            data[i - 2].correctAnswer = table.rows[i].cells[1].innerHTML;
            data[i - 2].wrongAnswers = table.rows[i].cells[2].innerHTML;
            data[i - 2].hint = table.rows[i].cells[3].innerHTML;
        }
    }
    buttonUpdate.classList.add("btn-warning");
    buttonUpdate.classList.add("btn");
    buttonUpdate.classList.add("btn_update");

    let buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "Delete";
    buttonDelete.onclick = function () {
        let i = buttonDelete.parentNode.parentNode.rowIndex;
        document.getElementById("table_questions").deleteRow(i);
        data.splice(i - 2, 1);
    };
    buttonDelete.classList.add("btn-danger");
    buttonDelete.classList.add("btn");
    buttonDelete.classList.add("btn_delete");

    tableDetail.appendChild(buttonUpdate);
    tableDetail.appendChild(buttonDelete);
    tableRow.appendChild(tableDetail);
    table.appendChild(tableRow);
}

let unauthorized_form = function () {
    document.getElementById('table_questions').hidden = true;
    document.getElementsByClassName("col_action").hidden = true;
    document.getElementById("col_action_title").hidden = true;
    document.getElementById('btn_logIn').hidden = false;
    document.getElementById('btn_register').hidden = false;
    document.getElementById('btn_logOut').hidden = true;
    document.getElementById('input_account').style.display = 'block';
    document.getElementById('input_password').style.display = 'block';
    document.getElementsByClassName('col_hint').hidden = true;
    document.getElementById('col_hint_title').hidden = true;
    document.getElementById('btn_add').hidden = true;
    document.getElementById('form-add').hidden = true;
}
unauthorized_form();

let user_authorized = function () {
    document.getElementsByClassName("col_action").hidden = true;
    document.getElementById("col_action_title").hidden = true;
    document.getElementById("btn_add").hidden = false;
    document.getElementById('btn_logIn').hidden = true;
    document.getElementById('btn_logOut').hidden = false;
    document.getElementById('btn_register').hidden = true;
    document.getElementById('input_account').style.display = 'block';
    document.getElementById('input_password').style.display = 'block';
    document.getElementsByClassName('col_hint').hidden = true;
    document.getElementById('col_hint_title').hidden = true;
    document.getElementById('table_questions').hidden = false;
    document.getElementById('form_register').hidden = true;
}

let authorized_form = function () {
    document.getElementById('table_questions').hidden = false;
    document.getElementsByClassName("col_action").hidden = false;
    document.getElementById("col_action_title").hidden = false;
    document.getElementById("btn_add").hidden = false;
    document.getElementById('btn_logOut').hidden = false;
    document.getElementById('btn_logIn').hidden = true;
    document.getElementById('btn_register').hidden = true;
    document.getElementById('input_account').style.display = 'none';
    document.getElementById('input_password').style.display = 'none';
    document.getElementsByClassName('col_hint').hidden = false;
    document.getElementById('col_hint_title').hidden = false;
}

let unclicked_btn_add = function () {
    document.getElementById('form-add').hidden = true;
}
unclicked_btn_add();

let clicked_btn_add = function () {
    document.getElementById('form-add').hidden = false;
}

const btn_add = document.getElementById('btn_add');
const btn_add_item = document.getElementById('btn_item_add');

btn_add.addEventListener('click', function () {
    clicked_btn_add();
    btn_add.style.display = 'none';
})
btn_add_item.addEventListener('click', function () {
    //Code Event khi click thêm câu hỏi mới
    unclicked_btn_add();
    btn_add.style.display = 'block';
})

const btn_logIn = document.getElementById('btn_logIn');
btn_logIn.addEventListener('click', function () {
    check();
})

let arr_account = [];

check = function () {
    const account = document.getElementById("input_account").value;
    const password = document.getElementById("input_password").value;
    console.log(account + password);
    if (account == 'admin' && password == 1234) {
        authorized_form();
        console.log('Logged in')
    }
    for (let i = 0; i < arr_account.length; i++) {
        if (account == arr_account[i]['email'] && password == arr_account[i]['password']) {
            console.log('Logged in')
            user_authorized();
        } else {
            unauthorized_form();
        }
    }
};

const btn_logOut = document.getElementById('btn_logOut')
btn_logOut.addEventListener('click', function () {
    unauthorized_form();
})

let validate_registration = function () {
    var input_fName = document.getElementById('input_fName').value;
    var input_email = document.getElementById('input_email').value;
    var input_regPassword = document.getElementById('input_regPassword').value;
    var input_cPassword = document.getElementById('input_cPassword').value;

    const newObj = {
        'full_name': input_fName,
        'email': input_email,
        'password': input_cPassword,
    }
    if (input_email == "" || input_fName == "" || input_cPassword == "" || input_regPassword == "") {
        alert('All form must be filled out');
    } else if (input_regPassword != input_cPassword) {
        alert('Password must be match!');
    } else {
        arr_account.push(newObj);
    }
}
let unclicked_btn_reg = function () {
    document.getElementById('form_register').hidden = true;
}
unclicked_btn_reg();
let clicked_btn_reg = function () {
    document.getElementById('form_register').hidden = false;
}
const btn_register = document.getElementById('btn_register')
btn_register.addEventListener('click', function () {
    clicked_btn_reg();
})

const btn_reg = document.getElementById('btn_reg')
btn_reg.addEventListener('click', function () {
    console.log(input_cPassword + ' - ' + input_regPassword + ' - ' + input_fName + ' - ' + input_email)
    console.log('clicked')
    validate_registration();
    console.log(arr_account);
})