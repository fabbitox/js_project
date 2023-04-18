document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const shake_btn = document.querySelector('#shake');
    const comment = document.querySelector('#comment');

    // 초기화: 1이 폭탄 위치
    let boom_arr;
    shake();// shuffle
    let enable = true;// true일 때 눌러짐.
    let cnt = 0;// 8개 눌릴 때까지 폭탄 안 나오면 성공, 하트 개수
    let open = [];// 누른 순서.

    // 폭탄 섞기 버튼
    shake_btn.addEventListener('click', () => {
        if (!enable) {
            shake();
            enable = true;
            cnt = 0;
            for (let cell of cells) {
                resetCell(cell);
            }
            open = [];
            comment.innerHTML = '';
        }
    });

    // div 박스 제어
    for (let cell of cells) {// 클릭 이벤트 달기
        // 박스 번호 넣기
        resetCell(cell);
        // 박스 클릭 이벤트 처리
        cell.addEventListener('click', () => {
            if (enable) {
                let n = parseInt(cell.textContent);
                console.log('n = ', n);
                if (isNaN(n)) {
                    return;
                }

                // 폭탄 하트 구분
                if (boom_arr[n - 1] == 0) {
                    // 하트
                    cell.innerHTML = '<img src="./images/heart.png">';
                    cnt++;
                    open.push(n);
                    if (cnt == 8) {
                        //let last = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((item) => !open.includes(item));
                        //console.log('남은 셀', last[0]);
                        //arr[last[0] - 1] = 0;
                        let last = boom_arr.findIndex((item) => item == 1);
                        console.log(last);
                        boom_arr[last] = 0;
                    }
                    else if (cnt == 9) {
                        enable = false;
                        comment.className = 'win';
                        comment.innerHTML = "축하합니다!";
                    }
                }
                else {
                    // 폭탄
                    cell.innerHTML = '<img src="./images/boom.png">';
                    enable = false;
                    comment.className = 'lose';
                    comment.innerHTML = "폭탄을 터뜨렸습니다!";
                }
            }
        });
    }

    function shake() {
        boom_arr = [1, 0, 0, 0, 0, 0, 0, 0, 0];
        console.log("shake");
        boom_arr.sort(() => Math.random() - 0.5);
        console.log(boom_arr);
    }

    function resetCell(cell) {
        cell.innerHTML = cell.getAttribute('id').replace('c', '');
    }
});