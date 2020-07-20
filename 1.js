let quizz_data = [
    [{
        title: 'Nơi nào con trai có thể sinh con?',
        0: 'trong nha ',
        1: 'rung ram',
        2: 'duoi nuoc',
        3: 'dap an khac',
        true: 'duoi nuoc',
        hint:'nuoc'
    },
    {
        title: "Benh gi bac si bo tay ?",
        0: 'Nhuc dau',
        1: "dau chan",
        2: 'gay tay',
        3: 'ung thu',
        true: 'gay tay',
        hint:'tay'
    },
    {
        title: 'con trai va dan ong co diem gi khac nhau ?',
        0: 'so tuoi',
        1: 'chieu cao',
        2: 'noi o',
        3: 'dia vi',
        true: 'noi o',
        hint:'noi o'
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
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        true: 4
    }
    ]
];

reGame = function() {
    document.getElementById("chude").style.display = 'block';
    document.getElementById("reStart").style.display = 'none';
}
start = function (chudeinput) {
    document.getElementById("chude").style.display = 'none';
    document.getElementById("formGame").style.display = 'block';

    let i = 0;
    let score = 0;
    let timeRun = 3000;
    var isPaused = false;
    document.getElementById("score").innerHTML = score;
    var chuDe = chudeinput;
    run = function () {
        //console.log(quizz_data[chuDe][i].title);
        document.getElementById("cauHoi").innerHTML = quizz_data[chuDe][i].title;
        document.getElementById("c1").value = quizz_data[chuDe][i][0];
        document.getElementById("c2").value = quizz_data[chuDe][i][1];
        document.getElementById("c3").value = quizz_data[chuDe][i][2];
        document.getElementById("c4").value = quizz_data[chuDe][i][3];
              
        i++;
    }
    run();
    // doGame = setInterval(run, 3000);
    
    check = function (valuec,idtab) {
        document.getElementById("thongBaoKq").innerHTML = 'sai';
        let kq = valuec;
        let idthe = 'c' + idtab;
        let idtrue;
        console.log(idthe);
        for (let j in quizz_data[chuDe]) {
            if (kq == quizz_data[chuDe][j].true) {
                score++;
                document.getElementById("thongBaoKq").innerHTML = 'dung';         
            }
        }
        xanh = setTimeout(() => {
            for(let k in quizz_data[chuDe]){
                if(document.getElementById(idthe).value == quizz_data[chuDe][k].true){
                    document.getElementById(idthe).style.background = "green";  
                }
            }  
        }, 500);

        let endGame = setTimeout(() => {
            if (i == quizz_data[chuDe].length) {
                console.log("end");
                document.getElementById("formGame").style.display = 'none';
                document.getElementById("reStart").style.display = 'block';
                stop();
            }
        }, 800);
  
        toMau(idthe);
       reRun = setTimeout (run,2000);
    }
    
    stop = function () {
        document.getElementById("score").innerHTML = "Diem cua ban la : " + score;
        score = 0;
        i = 0;
    }
    toMau = function(kq) {
       document.getElementById(kq).style.background = "red";
       
        a = setTimeout(() => {
            document.getElementById(kq).style.background = "white";
        }, 1000);
    }
    hint = function() {

        alert(quizz_data[chuDe][i-1].hint);
        
    }
}
