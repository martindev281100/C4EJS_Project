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
showTable();

document.getElementById("select_topic").onchange = function () {
    let topic_title = document.getElementById("select_topic").value;
    currentTopic = topics[topic_title];
    showTable();
}

// Alert
let alert_warning = document.getElementById('alert_warning');
let alert_warning_content = document.getElementById('content_aWarning');
let alert_success = document.getElementById('alert_success');
let alert_success_content = document.getElementById('content_aSuccess');

// Add question
function addItem() {
    let data = {
        question: document.getElementById("input_question").value,
        correctAnswer: document.getElementById("input_correct").value,
        wrongAnswers: document.getElementById("input_wrong").value,
        hint: document.getElementById("input_hint").value,
    }
    if (data.question.trim() == '' || data.wrongAnswers.trim() == '' || data.correctAnswer.trim() == '') {
        alert_warning_content.innerHTML = 'Some field is missing!';
        alert_warning.hidden = false;
        setTimeout(function () {
            alert_warning.hidden = true;
        }, 2000)
    } else {
        $("#add-question").modal("hide");
        data.wrongAnswers = data.wrongAnswers.split(", ");
        currentTopic.push(data);
        let arr = [data.question, data.correctAnswer, data.wrongAnswers, data.hint];
        showItems(arr);
        alert_success_content.innerHTML = 'Item added successfully!';
        alert_success.hidden = false;
        setTimeout(function () {
            alert_success.hidden = true;
        }, 2000)
    }
}

function showItems(arr) {
    let tableBody = document.getElementById("table_body");
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
    if (newTopic.trim() == '') {
        alert_warning_content.innerHTML = 'Please enter topic name!';
        alert_warning.hidden = false;
        setTimeout(function () {
            alert_warning.hidden = true;
        }, 2000)
    } else {
        $("#add-topic").modal("hide");
        document.getElementById("new-topic").value = "";
        topics[newTopic] = [];
        let topicList = document.getElementById("select_topic");
        let newDropDown = document.createElement("option");
        newDropDown.value = newTopic;
        newDropDown.innerHTML = newTopic;
        topicList.appendChild(newDropDown);
        // document.getElementById("topic-list").insertAdjacentHTML("beforeend",

        // );
    }
}

// Status 
let authorized = false;
let logOut = false;
let logIn = false;

// Authorize
let user_authorized = function () {
    document.getElementById("col_action_title").hidden = true;
    document.getElementById('col_hint_title').hidden = true;
    for (let i = 0; i < document.getElementsByClassName('col_hint').length; i++) {
        document.getElementsByClassName('col_hint')[i].hidden = true;
        document.getElementsByClassName('col_action')[i].hidden = true;
    }
    document.getElementById("btn_add_question").hidden = true;
    document.getElementById("btn_add_topic").hidden = true;
    document.getElementById('login-button').hidden = true;
    document.getElementById('user-form').hidden = false;
    document.getElementById('form_greeting').hidden = false;
    document.getElementById('question-list').hidden = false;
}

let admin_authorized = function () {
    for (let i = 0; i < document.getElementsByClassName('col_hint').length; i++) {
        document.getElementsByClassName('col_hint')[i].hidden = false;
        document.getElementsByClassName('col_action')[i].hidden = false;
    }
    questionListPage.hidden = false;
    document.getElementById("btn_add_question").hidden = false;
    document.getElementById("btn_add_topic").hidden = false;
    document.getElementById('login-button').hidden = true;
    document.getElementById('user-form').hidden = false;
    document.getElementById('form_greeting').hidden = false;
    questionListNav.hidden = false;
}

let arr_account = [{
    'full_name': 'a',
    'email': 'a',
    'password': 'a',
    score: 10
}];

const btn_reg = document.getElementById('btn_reg');
btn_reg.addEventListener('click', function () {
    console.log(input_cPassword + ' - ' + input_regPassword + ' - ' + input_fName + ' - ' + input_email)
    console.log('clicked')
    validate_registration();
    console.log(arr_account);
})

const btn_updateAcc = document.getElementById('btn_updateAcc')
btn_updateAcc.addEventListener('click', function () {
    let password = prompt('Enter password: ');
    if (password == arr_account[iAcc].password) {
        console.log('confirm checked!')
        document.getElementById('input_pName').readOnly = false;
        document.getElementById('input_pEmail').readOnly = false;
        btn_editInfo.hidden = false;
        btn_updateAcc.hidden = true;
    } else {
        let alert_warning = document.getElementById('alert_warning');
        let content_aWarning = document.getElementById('content_aWarning')
        content_aWarning.innerHTML = 'Password is incorrect!';
        alert_warning.hidden = false;
        setTimeout(function () {
            alert_warning.hidden = true;
        }, 3000)
    }
})
const btn_editInfo = document.getElementById('btn_editInfo');
btn_editInfo.addEventListener('click', function () {
    arr_account[iAcc].full_name = document.getElementById('input_pName').value;
    arr_account[iAcc].email = document.getElementById('input_pEmail').value;
    arr_account[iAcc].password = document.getElementById('input_pPassword').value;
    document.getElementById('alert_success').hidden = false;
    document.getElementById('content_aSuccess').innerHTML = 'Your account has been changed!';
    setTimeout(function () {
        document.getElementById('alert_success').hidden = true;
        document.getElementById('content_aSuccess').innerHTML = '';
    }, 1000)
    console.log(arr_account)
})


const btn_formGreeting = document.getElementById('form_greeting')
btn_formGreeting.addEventListener('click', function () {
    if (document.getElementById('form_profile').hidden == false) {
        document.getElementById('form_profile').hidden = true
    } else {
        document.getElementById('form_profile').hidden = false
    }
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
        let alert_warning = document.getElementById('alert_warning');
        let content_aWarning = document.getElementById('content_aWarning')
        content_aWarning.innerHTML = 'All form must be filled out!';
        alert_warning.hidden = false;
        setTimeout(function () {
            alert_warning.hidden = true;
        }, 3000)
    } else if (input_regPassword != input_cPassword) {
        let alert_warning = document.getElementById('alert_warning');
        let content_aWarning = document.getElementById('content_aWarning')
        content_aWarning.innerHTML = 'Password must be match!';
        alert_warning.hidden = false;
        setTimeout(function () {
            alert_warning.hidden = true;
        }, 3000)
    } else {
        if (reg == true) {
            arr_account.push(newObj);
            console.log(arr_account)
            document.getElementById('alert_success').hidden = false;
            document.getElementById('content_aSuccess').innerHTML = 'Registration success !';
            setTimeout(function () {
                document.getElementById('alert_success').hidden = true;
                document.getElementById('content_aSuccess').innerHTML = '';
            }, 3000)
            document.getElementById('register-form').reset();
            document.getElementById("redirect-to-login").onclick();
        }
    }
}

chonchude = function () {
    document.getElementById("chude").style.display = 'block';
}
// playGame = function () {
//     document.getElementById("chude").style.display = 'block';
//     document.getElementById("play").style.display = 'none';
//     document.getElementById("formGame").style.display = 'none';
// }

var out = false;
let userscore = 0;
let login = false;
let iAcc;
let reg = false;
let checkReg = function () {
    let idRegister = document.getElementById("input_email").value;
    console.log(idRegister);
    console.log('arr_account length: ' + arr_account.length)
    for (let i in arr_account) {
        if (arr_account[i].email == idRegister) {
            let alert_warning = document.getElementById('alert_warning');
            document.getElementById('content_aWarning').innerHTML = 'Account has been existed !';
            alert_warning.hidden = false;
            setTimeout(function () {
                alert_warning.hidden = true;
            }, 3000)
            reg = false;
            break;
        } else {
            reg = true;
        }
    }
};

let checkAcc = function () {
    let idAcc = document.getElementById("input_account").value;
    let passAcc = document.getElementById("input_password").value;
    console.log(arr_account[0].email + ' email');
    for (let i = 0; i < arr_account.length; i++) {
        if (idAcc == 'admin' && passAcc == 1234) {
            admin_authorized();
            console.log('Logged in');
            document.getElementById('greeting_user').innerHTML = 'Admin';
            document.getElementById('login-page').hidden = true;
            document.getElementById('input_account').value = '';
            document.getElementById('input_password').value = '';
            document.getElementById('alert_success').hidden = false;
            document.getElementById('content_aSuccess').innerHTML = 'Login Successful!';

            setTimeout(function () {
                document.getElementById('alert_success').hidden = true;
                document.getElementById('content_aSuccess').innerHTML = '';
            }, 3000)
        } else if (idAcc == arr_account[i].email) {
            if (arr_account[i].password == passAcc) {
                login = true;
                iAcc = i;
                console.log('loginn');
                user_authorized();
                document.getElementById('greeting_user').innerHTML = arr_account[i]['full_name'];
                document.getElementById('alert_success').hidden = false;
                document.getElementById('content_aSuccess').innerHTML = 'Login Successful!';
                document.getElementById('login-page').hidden = true;
                document.getElementById('input_pName').value = arr_account[i]['full_name'];
                document.getElementById('input_pEmail').value = arr_account[i]['email'];
                // document.getElementById("chude").style.display = 'block';
                // document.getElementById("formGame").style.display = 'none';
                setTimeout(function () {
                    document.getElementById('alert_success').hidden = true;
                    document.getElementById('content_aSuccess').innerHTML = '';
                }, 3000)
            } else {
                document.getElementById('alert_warning').hidden = false;
                document.getElementById('content_aWarning').innerHTML = 'Password is in correct!';
                setTimeout(function () {
                    document.getElementById('alert_warning').hidden = true;
                }, 3000)
            }
            console.log('iAcc' + iAcc);
            break;
        } else if (i == arr_account.length - 1) {
            document.getElementById('alert_warning').hidden = false;
            document.getElementById('content_aWarning').innerHTML = 'Account is in correct!';
            setTimeout(function () {
                document.getElementById('alert_warning').hidden = true;
            }, 3000)
        };
    }
};

function logOutFunction() {
    login = false;
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
    console.log('topic[0]: ' + topic);
    console.log('topics.calculation[0]: ' + topics.calculation_topic[0])
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
        console.log('index topic: ' + i)
        console.log('topic i: ' + topic[i])
        let kq = valuec;
        console.log(valuec)
        console.log('valuec: ' + kq)
        console.log('topic length: ' + topic.length)
        let idthe = 'answer' + idtab;
        let idtrue = 'answer';

        if (kq == topic[i].correctAnswer) {
            score++;
            arr_account[iAcc].score++;
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
                // document.getElementById("formGame").style.display = 'none';

                stop();
                clearTimeout(reRun);
                if (login == true) {
                    console.log(arr_account);
                }
            }
        }, 800);


        i++;
        console.log('i++ = ' + i)
        reRun = setTimeout(run, 1000);
    }
    stop = function () {
        console.log("Diem cua ban la : " + arr_account[iAcc].score);
        i = 0;
        document.getElementById('answer').hidden = true;
        document.getElementById('result').hidden = false;
        document.getElementById('result').innerHTML = "Diem cua ban la : " + arr_account[iAcc].score;
        document.getElementById('question').innerHTML = "Result"
    };
    doihint = () => {
        document.getElementById("score").innerHTML = "Diem cua ban la : " + arr_account[iAcc].score;
        console.log(score + ' ' + arr_account[iAcc].score);
        if (topic[i].hint) {
            if (score > 0) {
                alert(topic[i].hint);
                score -= 0.5;

            } else if (score < 0.5 && arr_account[iAcc].score < 0.5) {
                alert("ban khong du diem ");
            } else if (arr_account[iAcc].score > 0) {
                alert(topic[i].hint);
                score -= 0.5;
            }
        } else {
            alert("not hint");
        }
    };
}