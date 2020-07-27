let topic = general_topic;

document.getElementById("redirect-to-login").onclick = function () {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    }

    document.getElementById("redirect-to-register").onclick = function () {
    document.getElementById("register-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
}

function showTable() {
    let tableBody = document.getElementById("table_body");
    while(tableBody.childElementCount > 1) {
        tableBody.removeChild(tableBody.lastChild);
    }
    for (let i = 0; i < topic.length; i++) {
        let arr = [topic[i].question, topic[i].correctAnswer, topic[i].wrongAnswers, topic[i].hint];
        showItems(arr);
    }
}
showTable();

document.getElementById("select_topic").onchange = function () {
    let topic_title = document.getElementById("select_topic").value;
    switch (topic_title) {
        case "general": topic = general_topic; break;
        case "math": topic = math_topic; break;
        case "calculation": topic = calculation_topic; break;
        case "environment": topic = environment_topic; break;
        case "coding": topic = coding_topic; break;
    }
    showTable();
}
function addItem() {
    let data = {
        question: document.getElementById("input_question").value,
        correctAnswer: document.getElementById("input_correct").value,
        wrongAnswers: document.getElementById("input_wrong").value,
        hint: document.getElementById("input_hint").value,
    }
    data.wrongAnswers = data.wrongAnswers.split(", ");
    topic.push(data);
    let arr = [data.question, data.correctAnswer, data.wrongAnswers, data.hint];
    showItems(arr);
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

let login_hideForm = function(){
    document.getElementById('table_questions').hidden = true;
    document.getElementsByClassName("col_action").hidden = true;
    document.getElementById("col_action_title").hidden = true;
    document.getElementById('btn_logOut').hidden = true;
    document.getElementById('btn_Hidelogin').hidden=true;
    document.getElementsByClassName('col_hint').hidden = true;
    document.getElementById('col_hint_title').hidden = true;
    document.getElementById('btn_add').hidden = true;
    document.getElementById('login-page').hidden=true;
    document.getElementById('form-add').hidden = true;
    document.getElementById('form_quizz').hidden = true;
}
login_hideForm();

let unauthorized_form = function () {
    document.getElementById('table_questions').hidden = true;
    document.getElementsByClassName("col_action").hidden = true;
    document.getElementById("col_action_title").hidden = true;
    document.getElementById('btn_logOut').hidden = true;
    document.getElementById('btn_Hidelogin').hidden=false;
    document.getElementsByClassName('col_hint').hidden = true;
    document.getElementById('col_hint_title').hidden = true;
    document.getElementById('btn_add').hidden = true;
    document.getElementById('login-page').hidden=true;
    document.getElementById('form-add').hidden = true;
    document.getElementById('form_quizz').hidden = true;
}
unauthorized_form();

let user_authorized = function () {
    document.getElementById("col_action_title").hidden = true;
    document.getElementById("btn_add").hidden = true;
    document.getElementById('btn_Hidelogin').hidden=true;
    document.getElementById('btn_logOut').hidden = false;
    document.getElementsByClassName('col_hint').hidden = true;
    document.getElementsByClassName('col_action').hidden = true;
    document.getElementById('col_hint_title').hidden = true;
    document.getElementById('table_questions').hidden = true;
    document.getElementById('form_quizz').hidden = false;
}

let authorized_form = function () {
    document.getElementById('table_questions').hidden = false;
    document.getElementsByClassName("col_action").hidden = false;
    document.getElementById("col_action_title").hidden = false;
    document.getElementById("btn_add").hidden = false;
    document.getElementById('btn_Hidelogin').hidden=true;
    document.getElementById('btn_logOut').hidden = false;
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

let arr_account = [{
    'full_name': 'a',
    'email': 'a',
    'password': 'a',
    score: 10
}];

// check = function () {
//     let account = document.getElementById("input_account").value;
//     let password = document.getElementById("input_password").value;
//     console.log(account + password);
//     if (account == 'admin' && password == 1234) {
//         authorized_form();
//         console.log('Logged in')
//     }
//     for (let i = 0; i < arr_account.length; i++) {
//         if (account == arr_account[i]['email'] && password == arr_account[i]['password']) {
//             console.log('Logged in')
//             user_authorized();
//         } else {
//             unauthorized_form();
//         }
//     }
// };

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
        let alert_warning = document.getElementById('alert_warning');
        alert_warning.innerHTML = 'Password must be match!';
        alert_warning.hidden = false;
        setTimeout(function () {
            alert_warning.hidden = true;
        }, 3000)
    } else {
        if (reg == true) {
            arr_account.push(newObj);
            console.log(arr_account)
            document.getElementById('alert_success').hidden = false;
            document.getElementById('alert_success').innerHTML = 'Registration success!'
            setTimeout(function () {
                document.getElementById('alert_success').hidden = true;
            }, 3000)
        }
    }
}
let unclicked_btn_log = function () {
    document.getElementById('login-page').hidden = true;
}
unclicked_btn_log();
let clicked_btn_log = function () {
    document.getElementById('login-page').hidden = false;
}
const btn_Hidelogin = document.getElementById('btn_Hidelogin')
btn_Hidelogin.addEventListener('click', function () {
    login_hideForm();
    clicked_btn_log();
})

const btn_reg = document.getElementById('btn_reg')
btn_reg.addEventListener('click', function () {
    console.log(input_cPassword + ' - ' + input_regPassword + ' - ' + input_fName + ' - ' + input_email)
    console.log('clicked')
    validate_registration();
    console.log(arr_account);
})

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
            alert('tai khoan da dang ky');
            let alert_warning = document.getElementById('alert_warning');
            alert_warning.innerHTML = 'Account has been created!';
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

checkAcc = function () {
    let idAcc = document.getElementById("input_account").value;
    let passAcc = document.getElementById("input_password").value;
    console.log(arr_account[0].email + ' email');

    for (let i = 0; i < arr_account.length; i++) {
        if (idAcc == 'admin' && passAcc == 1234) {
            authorized_form();
            console.log('Logged in');
        } else if (idAcc == arr_account[i].email) {

            if (arr_account[i].password == passAcc) {
                login = true;
                iAcc = i;
                alert(iAcc);
                user_authorized();
            } else {
                alert('sai mat khau');
            }
            console.log(i);
            break;
        } else if (i == arr_account.length - 1) {
            alert("sai tai khoan");
        };
    }
};
start = function (chudeinput) {

    document.getElementById("chude").style.display = 'none';
    document.getElementById("formGame").style.display = 'block';
    

    let score = 0;

    var chuDe = chudeinput;
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
        alert('ok');
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
    let table_questions = document.getElementById('table_questions')
    if(table_questions.hidden == true)
    {
        table_questions.hidden = false;
    }
    else{
        table_questions.hidden = true;
        console.log('second condition')
    }
})

