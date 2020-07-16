check = function () {
    const ider = document.getElementById("id").value;
    const passw = document.getElementById("pass").value;
    if (ider == "admin" && passw == "1234") {

        document.getElementById("content").style.display = 'block';
    } else {
        document.getElementById("content").style.display = 'none';
    }

};
function start() {
    let cauhoi = [
        {
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
    ];
    // document.getElementById("cauhoi").innerHTML = cauhoi[0].title;
    // document.getElementById("trl1").value = cauhoi[0][0];
    // document.getElementById("trl2").value = cauhoi[0][1];
    // document.getElementById("trl3").value = cauhoi[0][2];
    // document.getElementById("trl4").value = cauhoi[0][3];
    let i = 0;
    let score = 0;
    let isPaused = false;
    let tim = 3000;
    myf = function () {
        if (!isPaused) {
            if (i == cauhoi.length) {

                clearInterval(doquizz);
                document.getElementById("end").innerHTML = 'ket thuc';
                document.getElementById("diem").innerHTML = 'Diem cua ban : ' + score;
            }
            document.getElementById("question").innerHTML = cauhoi[i].title;
            document.getElementById("answer1").value = cauhoi[i][0];
            document.getElementById("answer2").value = cauhoi[i][1];
            document.getElementById("answer3").value = cauhoi[i][2];
            document.getElementById("answer4").value = cauhoi[i][3];
            i++;
        }
    };
    checkkq = function (trl) {
        clearInterval(doquizz);
        doquizz();
        let a = trl;
        for (let j = 0; j < cauhoi.length; j++) {
            tim = 0;
            if (a == cauhoi[j].true) {
                score++;
                document.getElementById("kqua").textContent = 'dung';
            } else {
                document.getElementById("kqua").textContent = 'sai';
            }
        }
    }
    myf();

    doquizz = setInterval(myf, tim);

    pause = function () {
        isPaused = true;
        document.getElementById("pl").style.display = 'block';
        document.getElementById("pau").style.display = 'none';
    }
    play = function () {
        isPaused = false;
        document.getElementById("pau").style.display = 'block';
        document.getElementById("pl").style.display = 'none';
    }
}

