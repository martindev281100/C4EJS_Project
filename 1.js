let quizz_data = [
    [{
        title: 'Nơi nào con trai có thể sinh con?',
        0: 'trong nha ',
        1: 'rung ram',
        2: 'duoi nuoc',
        3: 'dap an khac',
        true: 'duoi nuoc',
        hint: 'nuoc'
    },
    {
        title: "Benh gi bac si bo tay ?",
        0: 'Nhuc dau',
        1: "dau chan",
        2: 'gay tay',
        3: 'ung thu',
        true: 'gay tay',
        hint: 'tay'
    },
    {
        title: 'con trai va dan ong co diem gi khac nhau ?',
        0: 'so tuoi',
        1: 'chieu cao',
        2: 'noi o',
        3: 'dia vi',
        true: 'noi o',
        hint: 'noi o'
    }
    ],
    [{
        title: 'bac ho ten that la gi : ',
        0: 'cung',
        1: 'a',
        2: 'b',
        3: 'c',
        true: 'cung'
    },
    {
        title: 'bac sinh nam nao?',
        0: 1890,
        1: 1900,
        2: 1901,
        3: 1001,
        true: 1890
    },
    {
        title: '1 + 1 = ?',
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        true: 2
    },
    {
        title: '2 + 2 = ?',
        0: 4,
        1: 5,
        2: 6,
        3: 7,
        true: 4
    }
    ]
];

reGame = function () {
    document.getElementById("chude").style.display = 'block';
    document.getElementById("reStart").style.display = 'none';
}
let i = 0;

let userscore = 0;
start = function (chudeinput) {
    document.getElementById("chude").style.display = 'none';
    document.getElementById("formGame").style.display = 'block';

    let score = 0;
    let timeRun = 3000;
    var isPaused = false;
    var chuDe = chudeinput;
    run = function () {
       // document.getElementsByClassName("ans").style.background = 'white';
        //console.log(quizz_data[chuDe][i].title);
        document.getElementById("cauHoi").innerHTML = quizz_data[chuDe][i].title;
        document.getElementById("c1").value = quizz_data[chuDe][i][0];
        document.getElementById("c2").value = quizz_data[chuDe][i][1];
        document.getElementById("c3").value = quizz_data[chuDe][i][2];
        document.getElementById("c4").value = quizz_data[chuDe][i][3];

        document.getElementById("score").innerHTML = score;
        document.getElementById("c1").style.background = 'white';
        document.getElementById("c2").style.background = 'white';
        document.getElementById("c3").style.background = 'white';
        document.getElementById("c4").style.background = 'white';

    }
    run();
    // doGame = setInterval(run,  3000);

    check = function (valuec, idtab) {
        //clearInterval(giuptimeout);

        
        let kq = valuec;
        let idthe = 'c' + idtab;
        let idtrue = 'c';
        console.log(idthe);
        for (let j in quizz_data[chuDe]) {
            if (kq == quizz_data[chuDe][j].true) {
                score++;
                
                xanh = setTimeout(() => {
                    document.getElementById("thongBaoKq").innerHTML = 'dung';
                    if (document.getElementById(idthe).value == quizz_data[chuDe][j].true) {
                        document.getElementById(idthe).style.background = "green";

                    }
                }, 500);

            } else {
                vang = setTimeout(() => {
                    document.getElementById("thongBaoKq").innerHTML = 'sai';
                    for(let i4 = 1;i4 < 5;i4++){
                        if(document.getElementById(idtrue+i4).value == quizz_data[chuDe][j].true){
                          document.getElementById(idtrue+i4).style.background = 'yellow';  
                        }
                    }  
                }, 499);

            }
        }
        let endGame = setTimeout(() => {
            if (i == quizz_data[chuDe].length) {
                console.log("end");
                document.getElementById("formGame").style.display = 'none';
                document.getElementById("reStart").style.display = 'block';
                stop();
                clearTimeout(reRun);
            }
        }, 800);

        toMau(idthe);
        i++;
        reRun = setTimeout(run, 1000);

    }

    stop = function () {
        userscore += score;
        document.getElementById("score").innerHTML = "Diem cua ban la : " + userscore;
        i = 0;

    }
    toMau = function (kq) {
        document.getElementById(kq).style.background = "red";
        a = setTimeout(() => {
            document.getElementById(kq).style.background = "white";
        }, 1000);
    }
    hint = function () {
        alert(quizz_data[chuDe][i - 1].hint);
    }
    doihint = () => {
        console.log(score + ' ' + userscore)
        if (score > 0) {
            alert(quizz_data[chuDe][i].hint);
            score--;

        } else if (score < 1 && userscore < 1) {
            alert("ban khong du diem ");
        }
        else if (userscore > 0) {
            alert(quizz_data[chuDe][i].hint);
            score--;
        }

    };
    trogiup = function () {

        let cc = 'c';


        let arr = [];
        for (let i3 = 1; i3 < 5; i3++) {
            //let rand = Math.ceil(Math.random()*4);
            if (document.getElementById(cc + i3).value == quizz_data[chuDe][i].true) {
                arr.push(i3);
                for (let i4 = 1; i4 < 5; i4++) {
                    let rand = Math.ceil(Math.random() * 4);
                    if (rand != i3) {
                        arr.push(rand);
                        break;
                    }
                }

            }
        } console.log(arr);
        for (let i5 = 1; i5 < 5; i5++) {
            if (i5 != arr[0] && i5 != arr[1]) {
                document.getElementById(cc + i5).value = "";
            }
        }
    }

}
quay= function () {
    document.getElementById("inscore").style.display = 'block';
    document.getElementById("quay").style.display = 'block';
    let diemcuoc = document.getElementById("inscore").value ;
    console.log(diemcuoc);
}
quayso = function () {
    let diemdoi = document.getElementById("inscore").value;
    let ran =  Math.floor(Math.random() * ((diemdoi*2)+1));

    
    if(userscore >= diemdoi){
        userscore -= diemdoi;
     console.log("ban nhan duoc " + ran + " diem");
     userscore+=ran;
     console.log(userscore + " D");
    }
    else{
        console.log("ban khong du diem");
    }
}
