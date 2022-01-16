document.addEventListener('DOMContentLoaded', function () {
    //Pop-up
    const popUpContainer = document.querySelector('.PopUps');
    const warningPopUp = document.querySelector('.warning__PopUp');
    const warnBtnOk = document.querySelector('#warnOkBtn');

    const winPopUp = document.querySelector('.win__PopUp');
    const winBtn = document.querySelector('#winBtn');

    const resetBtn = document.querySelector('#resetBtn');

    const pvpElem = document.querySelector('.pvp');

    warnBtnOk.addEventListener('click', () => hidePopUp(warningPopUp), false);
    winBtn.addEventListener('click', restart, false);
    resetBtn.addEventListener('click', restart, false);

    function hidePopUp(popUp){
        popUp.style.cssText = 'opacity:0; top: 40%; z-index: -1;';
        popUpContainer.style.cssText = 'opacity: 0; z-index: -2;';

    }

    function showPopUp(popUp){
        popUp.style.cssText = 'opacity:1; top: 50%; z-index: 1;';
        popUpContainer.style.cssText = 'opacity: 1; z-index: 0;';
    }


    //Timer

    class Timer{
        constructor(seconds, minute, hour, elem){
            this.seconds = seconds;
            this.minute = minute;
            this.hour = hour;
            this.elem = elem;
            this.intervalId;
        }
        updateTime(){
            this.seconds++;
            this.seconds > 59 ? (this.minute++, this.seconds = 0) : null;
            this.minute > 59 ? (this.hour++, this.minute = 0) : null;
        }
        init(){
            this.intervalId = setInterval(() => {
                this.updateTime();
                let secondStr = '';
                let minuteStr = '';
                let hourStr = '';
                this.seconds < 10 ? secondStr = '0' + this.seconds : secondStr = this.seconds.toString();
                this.minute < 10 ? minuteStr = '0' + this.minute : minuteStr = this.minute.toString();
                this.hour < 10 ? hourStr = '0' + this.hour : hourStr = this.hour.toString();
                this.elem.innerHTML = `${hourStr}:${minuteStr}:${secondStr}`;
            }, 1000);
        }
        stop(){
            clearInterval(this.intervalId);
        }
    }

    timer = new Timer(0, 0, 0, document.querySelector('.timer'));
    timer.init();

    // Game
    let grid = new Array(9);
    let whoWin = '';
    let countGeneralSteps = 0;
    let isGameOver = false;
    let isXplayerWin = false;
    let isOplayerWin = false;
    let xName = null;
    let oName = null;
    while(xName === oName && xName == null && oName == null){
        alert('Ники должны быть разные');
        xName = prompt('Имя первого игрока: ', 'playerX');
        oName = prompt('Имя второго игрока: ', 'playerO');
    }

    pvpElem.innerHTML = `${xName}(X) VS ${oName}(O)`;
    const stepCounter = document.querySelector('.step-counter');

    for(let i = 0; i < 9; i++){
        document.querySelectorAll('.cell')[i].addEventListener('click', () => move(i), false)
    }

    function checkEnd() {
        if ((grid[0] === xName && grid[1] === xName && grid[2] === xName) || (grid[0] === oName && grid[1] === oName && grid[2] === oName)) {
            whoWin = grid[0];
            return isGameOver = true;
        }
        if ((grid[3] === xName && grid[4] === xName && grid[5] === xName) || (grid[3] === oName && grid[4] === oName && grid[5] === oName)) {
            whoWin = grid[3];
            return isGameOver = true;
        }
        if ((grid[1] === xName && grid[4] === xName && grid[7] === xName) || (grid[1] === oName && grid[4] === oName && grid[7] === oName)) {
            whoWin = grid[1];
            return isGameOver = true;
        }
        if ((grid[6] === xName && grid[7] === xName && grid[8] === xName) || (grid[6] === oName && grid[7] === oName && grid[8] === oName)) {
            whoWin = grid[6];
            return isGameOver = true;
        }
        if ((grid[0] === xName && grid[4] === xName && grid[8] === xName) || (grid[0] === oName && grid[4] === oName && grid[8] === oName)) {
            whoWin = grid[0];
            return isGameOver = true;
        }
        if ((grid[0] === xName && grid[3] === xName && grid[6] === xName) || (grid[0] === oName && grid[3] === oName && grid[6] === oName)) {
            whoWin = grid[0];
            return isGameOver = true;
        }
        if ((grid[2] === xName && grid[4] === xName && grid[6] === xName) || (grid[2] === oName && grid[4] === oName && grid[6] === oName)) {
            whoWin = grid[2];
            return isGameOver = true;
        }
        if ((grid[2] === xName && grid[5] === xName && grid[8] === xName) || (grid[2] === oName && grid[5] === oName && grid[8] === oName)) {
            whoWin = grid[2];
            return isGameOver = true;
        }
        if(countGeneralSteps === 9){
            whoWin = '';
            return isGameOver = true;
        }
    }

    function endGame(){
        winPopUp.children[0].innerHTML = `Победил ${whoWin}. <br> Потраченное время: ${timer.hour}:${timer.minute}:${timer.seconds} <br> Потраченно ходов: ${countGeneralSteps}`;
        timer.stop();
        if(whoWin === xName){
            isXplayerWin = true;
            showPopUp(winPopUp);
        } else if(whoWin === oName){
            isOplayerWin = true;
            showPopUp(winPopUp)
        } else if(whoWin === ''){
            winPopUp.children[0].innerHTML = `Ничья. <br> Потраченное время: ${timer.hour}:${timer.minute}:${timer.seconds} <br> Потраченно ходов: ${countGeneralSteps}`;
            showPopUp(winPopUp);
        }
    }

    function move(whereID){
        if(grid[whereID]){
            showPopUp(warningPopUp);
            return false;
        }
        const cell = document.getElementById(whereID);
        if(countGeneralSteps % 2 == 0){
            cell.innerHTML = 'X';
            grid[whereID] = xName;
        } else {
            cell.innerHTML = 'O';
            grid[whereID] = oName;
        }
        countGeneralSteps++;
        stepCounter.innerHTML = `ХОД: ${countGeneralSteps}`;
        checkEnd() ? endGame() : null;

    }

    function restart(){
        saveStatInLocalStorage();
        hidePopUp(warningPopUp);
        hidePopUp(winPopUp);

        for(let i = 0; i < 9; i++){
            document.querySelectorAll('.cell')[i].innerHTML ='';
        }
        grid = new Array(9);
        whoWin = '';
        isPlayerWin = false;
        isGameOver = false;
        stepCounter.innerHTML = 'ХОД: ';
        countGeneralSteps = 0;
        timer.seconds = 0;
        timer.minute = 0;
        timer.hour = 0;
        timer.init();
    }

    function saveStatInLocalStorage(){
        localStorage.setItem('TotalSecondsPVP', +localStorage.getItem('TotalSecondsPVP') + timer.seconds);
        localStorage.setItem('TotalMinutesPVP', +localStorage.getItem('TotalMinutesPVP') + timer.minute);
        localStorage.setItem('TotalHoursPVP', +localStorage.getItem('TotalHoursPVP') + timer.hour);
        localStorage.setItem('TotalWinsXPVP', +localStorage.getItem('TotalWinsXPVP') + +isXplayerWin);
        localStorage.setItem('TotalWinsOPVP', +localStorage.getItem('TotalWinsOPVP') + +isOplayerWin);
        localStorage.setItem('TotalRoundsPlayedPVP', +localStorage.getItem('TotalRoundsPlayedPVP') + 1)
    }




});
