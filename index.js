// Redirect
document.getElementById("redirect-to-login").onclick = function () {
    document.getElementById("register-form").hidden = true;
    document.getElementById("login-form").hidden = false;
}

document.getElementById("redirect-to-register").onclick = function () {
    document.getElementById("register-form").hidden = false;
    document.getElementById("login-form").hidden = true;
}

// Display topic
let currentTopic = topics["general_topic"];

function showTable() {
    let tableBody = document.getElementById("table_body");

    while (tableBody.childElementCount > 1) {
        tableBody.removeChild(tableBody.lastChild);
    }
    for (let i = 0; i < currentTopic.length; i++) {
        let arr = [currentTopic[i].question, currentTopic[i].correctAnswer, currentTopic[i].wrongAnswers, currentTopic[i].hint];
        showItems(arr);
    }
}

document.getElementById("select_topic").onchange = function () {
    let topic_title = document.getElementById("select_topic").value;
    currentTopic = topics[topic_title];
    showTable();
}

// Alert
function alertWarning(message) {
    let alert_warning = document.getElementById('alert-warning');
    alert_warning.hidden = false;
    alert_warning.children[0].innerHTML = message;
    setTimeout(function () {
        alert_warning.hidden = true;
    }, 2000);
}

function alertSuccess(message) {
    let alert_success = document.getElementById('alert-success');
    alert_success.hidden = false;
    alert_success.children[0].innerHTML = message;
    setTimeout(function () {
        alert_success.hidden = true;
    }, 2000);
}

// Add question
function addItem() {
    let data = {
        question: document.getElementById("input_question").value,
        correctAnswer: document.getElementById("input_correct").value,
        wrongAnswers: document.getElementById("input_wrong").value,
        hint: document.getElementById("input_hint").value,
    }
    if (data.question.trim() == '' || data.wrongAnswers.trim() == '' || data.correctAnswer.trim() == '') {
        alertWarning('Some field is missing!');
    } else {
        $("#add-question").modal("hide");
        data.wrongAnswers = data.wrongAnswers.split(", ");
        currentTopic.push(data);
        let arr = [data.question, data.correctAnswer, data.wrongAnswers, data.hint];
        showItems(arr);
        alertSuccess('Item added successfully!');
    }
}

function showItems(arr) {
    let tableBody = document.getElementById("table_body");
    let tableRow = document.createElement("tr");
    for (let i = 0; i < 4; i++) {
        if (i == 3 && currentUser.id != "admin") break;
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
    if(currentUser.id == "admin") {
        let tableDetail = document.createElement("td");
        tableDetail.classList.add("col_action");
    
        let buttonUpdate = document.createElement("button");
        buttonUpdate.innerHTML = "Update";
        buttonUpdate.onclick = function () {
            let i = buttonUpdate.parentNode.parentNode.rowIndex;
            tableBody.rows[i - 1].contentEditable = "true";
            tableBody.rows[i - 1].onfocusout = function () {
                tableBody.rows[i - 1].contentEditable = "false";
                topic[i - 2].question = tableBody.rows[i - 1].cells[0].innerHTML;
                topic[i - 2].correctAnswer = tableBody.rows[i - 1].cells[1].innerHTML;
                topic[i - 2].wrongAnswers = tableBody.rows[i - 1].cells[2].innerHTML;
                topic[i - 2].hint = tableBody.rows[i - 1].cells[3].innerHTML;
            }
        }
        buttonUpdate.classList.add("btn-warning");
        buttonUpdate.classList.add("btn");
        buttonUpdate.classList.add("btn_update");
    
        let buttonDelete = document.createElement("button");
        buttonDelete.innerHTML = "Delete";
        buttonDelete.onclick = function () {
            let i = buttonDelete.parentNode.parentNode.rowIndex;
            tableBody.deleteRow(i - 1);
            topic.splice(i - 2, 1);
        };
        buttonDelete.classList.add("btn-danger");
        buttonDelete.classList.add("btn");
        buttonDelete.classList.add("btn_delete");
    
        tableDetail.appendChild(buttonUpdate);
        tableDetail.appendChild(buttonDelete);
        tableRow.appendChild(tableDetail);
    }

    tableBody.appendChild(tableRow);
}

// Change page
let loginPage = document.getElementById("login-page");
let quizzPage = document.getElementById("quizz-page");
let questionListPage = document.getElementById("question-list-page");
let homePage = document.getElementById("home-page");
let quizzNav = document.getElementById("quizz");
let questionListNav = document.getElementById("question-list");
let homeNav = document.getElementById("home");
let loginButton = document.getElementById("login-button");

loginButton.onclick = function () {
    loginPage.hidden = false;
    quizzPage.hidden = true;
    homePage.hidden = true;
};
quizzNav.onclick = function () {
    quizzNav.classList.add("active");
    questionListNav.classList.remove("active");
    homeNav.classList.remove("active");
    quizzPage.hidden = false;
    questionListPage.hidden = true;
    homePage.hidden = true;
    loginPage.hidden = true;
};
questionListNav.onclick = function () {
    quizzNav.classList.remove("active");
    questionListNav.classList.add("active");
    homeNav.classList.remove("active");
    quizzPage.hidden = true;
    questionListPage.hidden = false;
    homePage.hidden = true;
    loginPage.hidden = true;
};
homeNav.onclick = function () {
    quizzNav.classList.remove("active");
    questionListNav.classList.remove("active");
    homeNav.classList.add("active");
    quizzPage.hidden = true;
    questionListPage.hidden = true;
    homePage.hidden = false;
    loginPage.hidden = true;
};

// Add topic
function addItemTopic() {
    let newTopic = document.getElementById("new-topic").value;
    let newTopicDescription = document.getElementById("new-topic-description").value;
    if (newTopic.trim() == '') alertWarning('Please enter topic name!');
    else {
        $("#add-topic").modal("hide");
        document.getElementById("new-topic").value = "";
        topics[newTopic] = [];
        let topicList = document.getElementById("select_topic");
        let newDropDown = document.createElement("option");
        newDropDown.value = newTopic;
        newDropDown.innerHTML = newTopic;
        topicList.appendChild(newDropDown);
        document.getElementById("topic-list").insertAdjacentHTML("beforeend",
            `<div class="col-lg-3 col-md-6 mb-4">
                <div class="card h-50 topic-card">
                    <img class="card-img-top" width="300" height="300" src="images/new-topic.gif" alt="New topic">
                    <div class="card-body">
                        <h4 class="card-title">${newTopic}</h4>
                        <p class="card-text">${newTopicDescription}</p>
                        <button class="btn btn-primary" onclick="play(topics.${newTopic})" data-toggle="modal" data-target="#quizz-modal">Go!</button>
                    </div>
                </div>
            </div>`
        );
    }
}

// Status 
let logOut = true;
let logIn = false;
let currentUser;

// Login
function logInFunction() {
    let id = document.getElementById("input-id").value;
    let password = document.getElementById("input-password").value;
    for (let i = 0; i < accounts.length; i++) {
        if (id == 'admin' && password == "1234") {
            document.getElementById("btn_add_question").hidden = false;
            document.getElementById("btn_add_topic").hidden = false;
            logIn = true;
            logOut = false;
            currentUser = accounts[0];
            break;
        } else if (id == accounts[i].id && password == accounts[i].password) {
            document.getElementById("col_action_title").style.display = "none";
            document.getElementById('col_hint_title').style.display = "none";
            document.getElementById("btn_add_question").hidden = true;
            document.getElementById("btn_add_topic").hidden = true;
            logIn = true;
            logOut = false;
            currentUser = accounts[i];
            break;
        } else if (id == accounts[i].id && password != accounts[i].password) {
            alertWarning('Password is incorrect!');
            return;
        }
    }
    if (logIn) {
        showTable();
        id.value = "";
        password.value = "";
        document.getElementById('user-form').hidden = false;
        document.getElementById('form_greeting').hidden = false;
        document.getElementById('form_greeting').children[0].innerHTML = id;
        loginPage.hidden = true;
        loginButton.hidden = true;
        alertSuccess('Login Successfully!');
        questionListNav.hidden = false;
    } else alertWarning('Account is incorrect!');
}

// Accounts
let accounts = [{
        id: 'admin',
        email: 'admin@gmail.com',
        password: '1234',
        score: 0
    },
    {
        id: 'a',
        email: 'a@gmail.com',
        password: 'a',
        score: 0
    }
];

// Register
let reg = false;
let registerFunction = function () {
    let idRegister = document.getElementById("input_email").value;
    for (let i in accounts) {
        if (accounts[i].email == idRegister) {
            alertWarning('This email has been used!');
            reg = false;
            break;
        } else {
            reg = true;
        }
    }
    var input_fName = document.getElementById('input_fName').value;
    var input_email = document.getElementById('input_email').value;
    var input_regPassword = document.getElementById('input_regPassword').value;
    var input_cPassword = document.getElementById('input_cPassword').value;

    const newObj = {
        'id': input_fName,
        'email': input_email,
        'password': input_cPassword,
    }
    if (input_email.trim() == "" || input_fName.trim() == "" || input_cPassword.trim() == "" || input_regPassword.trim() == "") {
        alertWarning('All form must be filled out!');
    } else if (input_regPassword != input_cPassword) {
        alertWarning("Password doesn't match!");
    } else {
        if (reg == true) {
            accounts.push(newObj);
            alertSuccess('Register successfully!');
            document.getElementById('register-form').reset();
            document.getElementById("redirect-to-login").onclick();
        }
    }
};

function editProfile() {
    // document.getElementById("input-name").value = ;
}


// const btn_updateAcc = document.getElementById('btn_updateAcc')
// btn_updateAcc.addEventListener('click', function () {
//     let password = prompt('Enter password: ');
//     if (password == currentUser.password) {
//         document.getElementById('input_pName').readOnly = false;
//         document.getElementById('input_pEmail').readOnly = false;
//         btn_editInfo.hidden = false;
//         btn_updateAcc.hidden = true;
//     } else {
//         let alert_warning = document.getElementById('alert_warning');
//         let content_aWarning = document.getElementById('content_aWarning')
//         content_aWarning.innerHTML = 'Password is incorrect!';
//         alert_warning.hidden = false;
//         setTimeout(function () {
//             alert_warning.hidden = true;
//         }, 3000)
//     }
// })
// const btn_editInfo = document.getElementById('btn_editInfo');
// btn_editInfo.addEventListener('click', function () {
//     currentUser.id = document.getElementById('input_pName').value;
//     currentUser.email = document.getElementById('input_pEmail').value;
//     currentUser.password = document.getElementById('input_pPassword').value;
//     document.getElementById('alert_success').hidden = false;
//     document.getElementById('content_aSuccess').innerHTML = 'Your account has been changed!';
//     setTimeout(function () {
//         document.getElementById('alert_success').hidden = true;
//         document.getElementById('content_aSuccess').innerHTML = '';
//     }, 1000)
// })

chonchude = function () {
    document.getElementById("chude").style.display = 'block';
}
// playGame = function () {
//     document.getElementById("chude").style.display = 'block';
//     document.getElementById("play").style.display = 'none';
//     document.getElementById("formGame").style.display = 'none';
// }



function logOutFunction() {
    logIn = false;
    stop();
    document.getElementById("login-button").hidden = false;
    document.getElementById('logout-button').hidden = true;
    document.getElementById('quizz-page').hidden = true;
};

// Play quizz
function play(topic) {
    document.getElementById('answer').hidden = false;
    document.getElementById('result').hidden = true;
    let score = 0;
    let i = 0;
    let answers = [];
    run = function () {
        answers = [topic[i].wrongAnswers[0], topic[i].wrongAnswers[1], topic[i].wrongAnswers[2], topic[i].correctAnswer];
        document.getElementById("question").innerHTML = topic[i].question;
        document.getElementById("score").innerHTML = score;
        for (let j = 0; j < 4; j++) {
            let rand = Math.floor(Math.random() * answers.length);
            document.getElementById("answer" + j).value = answers[rand];
            answers.splice(rand, 1);
        }
    }
    run();
    check = function (valuec, idtab) {
        let kq = valuec;
        let idthe = 'answer' + idtab;
        let idtrue = 'answer';

        if (kq == topic[i].correctAnswer) {
            score++;
            currentUser.score++;
            document.getElementById("recent_result").hidden = false;
            document.getElementById("recent_result").innerHTML = 'Correct';
            document.getElementById("correct_answer").hidden = true;
            setTimeout(() => {
                document.getElementById("recent_result").hidden = true;
                document.getElementById("correct_answer").hidden = false;
            }, 1000);

        } else {
            document.getElementById("recent_result").hidden = false;
            document.getElementById("recent_result").innerHTML = 'Wrong';
            document.getElementById("correct_answer").hidden = true;

            setTimeout(() => {
                document.getElementById("recent_result").hidden = true;
                document.getElementById("correct_answer").hidden = false;

            }, 1000);

        }
        let endGame = setTimeout(() => {
            if (i == topic.length) {

                stop();
                clearTimeout(reRun);
            }
        }, 800);


        i++;
        reRun = setTimeout(run, 1000);
    }
    stop = function () {
        i = 0;
        document.getElementById('answer').hidden = true;
        document.getElementById('result').hidden = false;
        document.getElementById('result').innerHTML = "Diem cua ban la : " + currentUser.score;
        document.getElementById('question').innerHTML = "Result"
    };
    doihint = () => {
        document.getElementById("score").innerHTML = "Diem cua ban la : " + currentUser.score;
        if (topic[i].hint) {
            if (score > 0) {
                alert(topic[i].hint);
                score -= 0.5;

            } else if (score < 0.5 && currentUser.score < 0.5) {
                alert("ban khong du diem ");
            } else if (currentUser.score > 0) {
                alert(topic[i].hint);
                score -= 0.5;
            }
        } else {
            alert("not hint");
        }
    };
}
btn_rank = document.getElementById('btn_rank');
btn_rank.addEventListener('click', function () {
    for (let i = 0; i < accounts.length; i++) {
        document.getElementById('tbody_ranking').insertAdjacentHTML('beforeend',
            '<tr><td>' + accounts[i].email + '</td><td>' + accounts[i].score + '</td></tr>')
    }
})
