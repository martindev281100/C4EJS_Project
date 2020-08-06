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
        document.getElementById("add-question-form").reset();
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
    if (currentUser.id == "admin") {
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
let addQuestionButton = document.getElementById("btn_add_question");
let addTopicButton = document.getElementById("btn_add_topic");
let table_ranking = document.getElementById('table_ranking')
loginButton.onclick = function () {
    loginPage.hidden = false;
    quizzPage.hidden = true;
    homePage.hidden = true;
    table_ranking.hidden = true;

};
quizzNav.onclick = function () {
    quizzNav.classList.add("active");
    questionListNav.classList.remove("active");
    homeNav.classList.remove("active");
    quizzPage.hidden = false;
    questionListPage.hidden = true;
    homePage.hidden = true;
    loginPage.hidden = true;
    addQuestionButton.hidden = true;
    addTopicButton.hidden = true;
    table_ranking.hidden = true;
};
questionListNav.onclick = function () {
    quizzNav.classList.remove("active");
    questionListNav.classList.add("active");
    homeNav.classList.remove("active");
    quizzPage.hidden = true;
    questionListPage.hidden = false;
    homePage.hidden = true;
    if (currentUser.id == "admin") {
        addQuestionButton.hidden = false;
        addTopicButton.hidden = false;
    }
    table_ranking.hidden = true;

};
homeNav.onclick = function () {
    quizzNav.classList.remove("active");
    questionListNav.classList.remove("active");
    homeNav.classList.add("active");
    quizzPage.hidden = true;
    questionListPage.hidden = true;
    homePage.hidden = false;
    loginPage.hidden = true;
    addQuestionButton.hidden = true;
    addTopicButton.hidden = true;
    table_ranking.hidden = true;

};

// Add topic
function addItemTopic() {
    let newTopic = document.getElementById("new-topic").value;
    let newTopicDescription = document.getElementById("new-topic-description").value;
    if (newTopic.trim() == '') alertWarning('Please enter topic name!');
    else {
        document.getElementById("add-topic-form").reset();
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

// Log in
function logInFunction() {
    let id = document.getElementById("input-id").value;
    let password = document.getElementById("input-password").value;
    for (let i = 0; i < accounts.length; i++) {
        if (id == 'admin' && password == "1234") {
            document.getElementById("col_action_title").hidden = false;
            document.getElementById('col_hint_title').hidden = false;
            logIn = true;
            logOut = false;
            currentUser = accounts[0];
            break;
        } else if (id == accounts[i].id && password == accounts[i].password) {
            document.getElementById("col_action_title").hidden = true;
            document.getElementById('col_hint_title').hidden = true;
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
        homeNav.onclick();
        showTable();
        loginPage.hidden = true;
        document.getElementById('login-form').reset();
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
let registerFunction = function () {
    let newId = document.getElementById('input-register-name').value;
    let newEmail = document.getElementById('input-register-email').value;
    let password = document.getElementById('input-register-password').value;
    let confirm_password = document.getElementById('input-register-confirm-password').value;
    if (newId.trim() == "" || newEmail.trim() == "" || password.trim() == "" || confirm_password.trim() == "") {
        alertWarning('All form must be filled out!');
        return;
    }
    for (let i in accounts) {
        if (accounts[i].id == newId) {
            alertWarning('This id has been used!');
            return;
        }
        if (accounts[i].email == newEmail) {
            alertWarning('This email has been used!');
            return;
        }
    }
    if (confirm_password != password) {
        alertWarning("Password doesn't match!");
        return
    }
    let newAccount = {
        id: newId,
        email: newEmail,
        password: password,
        score: 0
    }
    accounts.push(newAccount);
    alertSuccess('Register successfully!');
    document.getElementById('register-form').reset();
    document.getElementById("redirect-to-login").onclick();
};

// Edit profile
function confirmEditProfile() {
    let password = prompt('Enter password: ');
    if (password == currentUser.password) {
        document.getElementById("input-edit-id").value = currentUser.id;
        document.getElementById("input-edit-email").value = currentUser.email;
        document.getElementById("input-edit-password").value = currentUser.password;
        $("#edit-profile").modal("show");
    } else alertWarning('Password is incorrect!');
}
document.getElementById("input-edit-password").onfocus = function () {
    document.getElementById("confirm-edit-password").hidden = false;
}

function editProfile() {
    let newId = document.getElementById('input-edit-id').value;
    let newEmail = document.getElementById('input-edit-email').value;
    for (let i in accounts) {
        if (accounts[i].id == newId && newId != currentUser.id) {
            alertWarning('This id has been used!');
            return;
        }
        if (accounts[i].email == newEmail && newEmail != currentUser.email) {
            alertWarning('This email has been used!');
            return;
        }
    }
    let password = document.getElementById("input-edit-password").value;
    let confirm_password = document.getElementById("input-edit-confirm-password").value;
    if (password != confirm_password && !document.getElementById("confirm-edit-password").hidden) {
        alertWarning("Password doesn't match");
        return;
    }
    currentUser.id = newId;
    currentUser.email = newEmail;
    currentUser.password = password;
    alertSuccess('Your account has been changed!');
    document.getElementById('edit-profile-form').reset();
    document.getElementById("confirm-edit-password").hidden = true;
    $("#edit-profile").modal("hide");
}

// Log out
function logOutFunction() {
    logIn = false;
    logOut = true;
    currentUser = undefined;
    homeNav.onclick();
    loginButton.hidden = false;
    questionListNav.hidden = true;
    questionListPage.hidden = true;
    document.getElementById("user-form").hidden = true;
    document.getElementById("form_greeting").hidden = true;
};

// Play quizz
// let currentQuestion = 0;
// function check(answer) {

// }
// function play(topic) {

// }

function play(topic) {
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
    quizzPage.hidden = true;
    homePage.hidden = true;
    table_ranking.hidden = false
    for (let i = 0; i < accounts.length; i++) {
        document.getElementById('tbody_ranking').insertAdjacentHTML('beforeend',
            '<tr><td>' + (i + 1) + '</td><td>' + accounts[i].email + '</td><td>' + accounts[i].score + '</td></tr>')
    }

})