let unauthorized_form = function () {
    document.getElementById('table_questions').hidden = true;
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

let user_authorized = function () {
    document.getElementById("col_action").hidden = true;
    document.getElementById("col_action_title").hidden = true;
    document.getElementById("btn_add").style.display = 'none';
    document.getElementById('btn_logIn').style.display = 'block';
    document.getElementById('btn_logOut').style.display = 'none';
    document.getElementById('input_account').style.display = 'block';
    document.getElementById('input_password').style.display = 'block';
    document.getElementById('col_hint').hidden = true;
    document.getElementById('col_hint_title').hidden = true;
    document.getElementById('table_questions').hidden = false;

}

let authorized_form = function () {
    document.getElementById('table_questions').hidden = false;
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
    //Code Event khi click thêm câu hỏi mới
    unclicked_btn_add();
    btn_add.style.display = 'block';
})

const btn_logIn = document.getElementById('btn_logIn');
btn_logIn.addEventListener('click', function () {
    check();
})

let arr_account = [{
    'username': 'martin',
    'password': 2,
}, {
    'username': 'user',
    'password': 1,
}, {
    'username': 'user2',
    'password': 1,
}]

check = function () {
    const account = document.getElementById("input_account").value;
    const password = document.getElementById("input_password").value;
    console.log(account + password);
    for (let i = 0; i < arr_account.length; i++) {
        if (account == 'admin' && password == 1234) {
            authorized_form();
        } else if (account == arr_account[i]['username'] && password == arr_account[i]['password']) {
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