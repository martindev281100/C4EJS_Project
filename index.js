// Redirect
console.log(topics.calculation_topic[0].question)
document.getElementById("redirect-to-login").onclick = function () {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

document.getElementById("redirect-to-register").onclick = function () {
    document.getElementById("register-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
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

// Add question
let clicked_btn_add_question = function () {
    document.getElementById('form-add-question').hidden = false;
}

function addItem() {
    let data = {
        question: document.getElementById("input_question").value,
        correctAnswer: document.getElementById("input_correct").value,
        wrongAnswers: document.getElementById("input_wrong").value,
        hint: document.getElementById("input_hint").value,
    }
    if (data.question == '' || data.wrongAnswers == '' || data.correctAnswer == '') {
        let alert_warning = document.getElementById('alert_warning');
        let content_aWarning = document.getElementById('content_aWarning')
        content_aWarning.innerHTML = 'Some field is missing!';
        alert_warning.hidden = false;
        setTimeout(function () {
            alert_warning.hidden = true;
        }, 1000)
    } else {
        document.getElementById('form-add-question').hidden = true;
        data.wrongAnswers = data.wrongAnswers.split(", ");
        currentTopic.push(data);
        let arr = [data.question, data.correctAnswer, data.wrongAnswers, data.hint];
        showItems(arr);
        document.getElementById('alert_success').hidden = false;
        document.getElementById('alert_success').innerHTML = 'Item is successfully added!';
        setTimeout(function () {
            document.getElementById('alert_success').hidden = true;
        }, 1000)
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

// Add topic
let clicked_btn_add_topic = function () {
    document.getElementById('form-add-topic').hidden = false;
}

function addItemTopic() {
    let newTopic = document.getElementById("new-topic").value;
    document.getElementById("new-topic").value = "";
    topics[newTopic] = [];
    let topicList = document.getElementById("select_topic");
    let newDropDown = document.createElement("option");
    newDropDown.value = newTopic;
    newDropDown.innerHTML = newTopic;
    topicList.appendChild(newDropDown);
    document.getElementById('chude').insertAdjacentHTML('beforeend', '<input class="btn btn-outline-dark" type="button" value="moi truong"onclick="start(environment_topic)">')
}

// Authorize
let unauthorized_form = function () {
    document.getElementById('btn_ls_question').hidden = true;
    document.getElementById('question-list').hidden = true;
    document.getElementById('btn_logOut').hidden = true;
    document.getElementById('btn_add_question').hidden = true;
    document.getElementById("btn_add_topic").hidden = true;
    document.getElementById('form-add-question').hidden = true;
    document.getElementById('form-add-topic').hidden = true;
    document.getElementById('ls_action').hidden = true;
    document.getElementById('form_greeting').hidden = true;
    document.getElementById('form_qTopic').hidden = true;
}
unauthorized_form();

let user_authorized = function () {
    document.getElementById("col_action_title").hidden = true;
    document.getElementById('col_hint_title').hidden = true;
    for (let i = 0; i < document.getElementsByClassName('col_hint').length; i++) {
        document.getElementsByClassName('col_hint')[i].hidden = true;
        document.getElementsByClassName('col_action')[i].hidden = true;
    }
    document.getElementById("col_action_title").hidden = true;
    document.getElementById("btn_add_question").hidden = true;
    document.getElementById("btn_add_topic").hidden = true;
    document.getElementById('btn_logIn').hidden = true;
    document.getElementById('btn_logOut').hidden = false;
    document.getElementsByClassName('col_hint').hidden = true;
    document.getElementsByClassName('col_action').hidden = true;
    document.getElementById('col_hint_title').hidden = true;
    document.getElementById('question-list').hidden = true;
    document.getElementById('form_greeting').hidden = false;
    document.getElementById('form_qTopic').hidden = false;
    document.getElementById('btn_ls_question').hidden = false;
}

let admin_authorized = function () {
    document.getElementById('question-list').hidden = false;
    document.getElementById("btn_add_question").hidden = false;
    document.getElementById("btn_add_topic").hidden = false;
    document.getElementById('btn_logIn').hidden = true;
    document.getElementById('btn_logOut').hidden = false;
    document.getElementById('ls_action').hidden = false;
    document.getElementById('form_greeting').hidden = false;
    document.getElementById('btn_ls_question').hidden = false;
}

let arr_account = [{
    'full_name': 'a',
    'email': 'a',
    'password': 'a',
    score: 10
}];

const btn_logOut = document.getElementById('btn_logOut')
btn_logOut.addEventListener('click', function () {
    unauthorized_form();
    stop();
})

let clicked_btn_logIn = function () {
    document.getElementById('login-page').hidden = false;
    document.getElementById('homepage').hidden = true;
}

const btn_logIn = document.getElementById('btn_logIn')
btn_logIn.addEventListener('click', function () {
    if (document.getElementById('login-page').hidden == true) {
        clicked_btn_logIn();
    } else {
        document.getElementById('login-page').hidden = true;
        document.getElementById('homepage').hidden = false;
    }
})

const btn_reg = document.getElementById('btn_reg');
btn_reg.addEventListener('click', function () {
    console.log(input_cPassword + ' - ' + input_regPassword + ' - ' + input_fName + ' - ' + input_email)
    console.log('clicked')
    validate_registration();
    console.log(arr_account);
})
const btn_try = document.getElementById('btn_try');
btn_try.addEventListener('click', function () {
    clicked_btn_logIn();
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
playGame = function () {
    document.getElementById("chude").style.display = 'block';
    document.getElementById("play").style.display = 'none';
    document.getElementById("formGame").style.display = 'none';
}
let i = 0;
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
                user_authorized();
                document.getElementById('greeting_user').innerHTML = arr_account[i]['full_name'];
                document.getElementById('alert_success').hidden = false;
                document.getElementById('content_aSuccess').innerHTML = 'Login Successful!';
                document.getElementById('login-page').hidden = true;
                document.getElementById('input_pName').value = arr_account[i]['full_name'];
                document.getElementById('input_pEmail').value = arr_account[i]['email'];
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

start = function (chudeinput) {

    document.getElementById("chude").style.display = 'none';
    document.getElementById("formGame").style.display = 'block';

    let score = 0;

    var chuDe = chudeinput;
    console.log('chudeinput: ' + chuDe[0])
    let c = [];
    run = function () {

        c.push(chuDe[i].wrongAnswers[0]);
        c.push(chuDe[i].wrongAnswers[1]);
        c.push(chuDe[i].wrongAnswers[2]);
        c.push(chuDe[i].correctAnswer);

        document.getElementById("cauHoi").innerHTML = chuDe[i].question;
        document.getElementById("score").innerHTML = "Diem hien tai cua ban : " + score;
        for (let i1 = 1; i1 < 5; i1++) {
            rand = Math.floor(Math.random() * c.length);
            document.getElementById('c' + i1).value = c[rand];
            document.getElementById("c" + i1).style.background = 'rgb(64, 204, 8)';
            c.splice(rand, 1);
        };
    }
    run();
    logout = function () {
        i = 0;
        score = 0;
        userscore = 0;
        login = false;
        stop();
        chonchude();
        alert("logout");
        document.getElementById("account").innerHTML = "";
    };

    if (login == true) {
        userscore = arr_account[iAcc].score;
    };
    check = function (valuec, idtab) {
        let kq = valuec;
        let idthe = 'c' + idtab;
        let idtrue = 'c';

        for (let j in chuDe) {
            if (kq == chuDe[j].correctAnswer) {
                score++;

                xanh = setTimeout(() => {
                    document.getElementById("thongBaoKq").innerHTML = 'dung';
                    if (document.getElementById(idthe).value == chuDe[j].correctAnswer) {
                        document.getElementById(idthe).style.background = "green";

                    }
                }, 500);

            } else {
                vang = setTimeout(() => {
                    document.getElementById("thongBaoKq").innerHTML = 'sai';
                    for (let i4 = 1; i4 < 5; i4++) {
                        if (document.getElementById(idtrue + i4).value == chuDe[j].correctAnswer) {
                            document.getElementById(idtrue + i4).style.background = 'yellow';
                        }
                    }
                }, 499);

            }
        }
        let endGame = setTimeout(() => {
            if (i == chuDe.length) {
                console.log("end");
                document.getElementById("formGame").style.display = 'none';
                document.getElementById("play").style.display = 'block';
                stop();
                clearTimeout(reRun);
                if (login == true) {
                    console.log(arr_account);
                }
            }
        }, 800);

        // toMau(idthe);
        i++;
        reRun = setTimeout(run, 1000);

    }

    stop = function () {
        if (login == true) {
            arr_account[iAcc].score += score;
        };

        userscore += score;
        document.getElementById("score").innerHTML = "Diem cua ban la : " + userscore;
        i = 0;

    }
    doihint = () => {
        document.getElementById("score").innerHTML = "Diem cua ban la : " + userscore;
        console.log(score + ' ' + userscore);
        if (chuDe[i].hint) {
            if (score > 0) {
                alert(chuDe[i].hint);
                score -= 0.5;

            } else if (score < 0.5 && userscore < 0.5) {
                alert("ban khong du diem ");
            } else if (userscore > 0) {
                alert(chuDe[i].hint);
                score -= 0.5;
            }
        } else {
            alert("not hint");
        }


    };
    trogiup = function () {
        score -= 0.5;
        console.log(score);
        let cc = 'c';
        let arr = [];
        for (let i3 = 1; i3 < 5; i3++) {
            //let rand = Math.ceil(Math.random()*4);
            if (document.getElementById(cc + i3).value == chuDe[i].correctAnswer) {
                arr.push(i3);
                for (let i4 = 1; i4 < 5; i4++) {
                    let rand = Math.ceil(Math.random() * 4);
                    if (rand != i3) {
                        arr.push(rand);
                        break;
                    }
                }

            }
        }
        console.log(arr);
        for (let i5 = 1; i5 < 5; i5++) {
            if (i5 != arr[0] && i5 != arr[1]) {
                document.getElementById(cc + i5).value = "x";
            }
        }
    }

    quay = function () {
        document.getElementById("inscore").style.display = 'block';
        document.getElementById("quay").style.display = 'block';
        let diemcuoc = document.getElementById("inscore").value;
        console.log(diemcuoc);
    };
    quayso = function () {
        let diemdoi = document.getElementById("inscore").value;
        let ran = Math.floor(Math.random() * ((diemdoi * 2) + 1));
        if (userscore >= diemdoi) {
            userscore -= diemdoi;
            console.log("ban nhan duoc " + ran + " diem");
            userscore += ran;
            console.log(userscore + " D");
        } else {
            console.log("ban khong du diem");
        }
    }
};

let btn_ls_question = document.getElementById('btn_ls_question');

btn_ls_question.addEventListener('click', function () {
    console.log('click')
    let question_list = document.getElementById('question-list')
    if (question_list.hidden == true) {
        question_list.hidden = false;
    } else {
        question_list.hidden = true;
        console.log('second condition')
    }
})