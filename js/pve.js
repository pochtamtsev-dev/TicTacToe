document.addEventListener('DOMContentLoaded', function () {
    //Pop-up
    const popUpContainer = document.querySelector('.PopUps');
    const warningPopUp = document.querySelector('.warning__PopUp');
    const warnBtnOk = document.querySelector('#warnOkBtn');

    const winPopUp = document.querySelector('.win__PopUp');
    const winBtn = document.querySelector('#winBtn');

    const resetBtn = document.querySelector('#resetBtn');

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
    let countPlayerSteps = 0;
    let countGeneralSteps = 0;
    let isPlayerWin = false;
    let isGameOver = false;
    const stepCounter = document.querySelector('.step-counter');

    for(let i = 0; i < 9; i++){
        document.querySelectorAll('.cell')[i].addEventListener('click', () => move(i, 'player'), false)
    }

    function checkEnd() {
        if ((grid[0] === 'player' && grid[1] === 'player' && grid[2] === 'player') || (grid[0] === 'bot'  && grid[1] === 'bot' && grid[2] === 'bot')) {
            whoWin = grid[0];
            return isGameOver = true;
        }
        if ((grid[3] === 'player' && grid[4] === 'player' && grid[5] === 'player') || (grid[3] === 'bot' && grid[4] === 'bot' && grid[5] === 'bot')) {
            whoWin = grid[3];
            return isGameOver = true;
        }
        if ((grid[1] === 'player' && grid[4] === 'player' && grid[7] === 'player') || (grid[1] === 'bot' && grid[4] === 'bot' && grid[7] === 'bot')) {
            whoWin = grid[1];
            return isGameOver = true;
        }
        if ((grid[6] === 'player' && grid[7] === 'player' && grid[8] === 'player') || (grid[6] === 'bot' && grid[7] === 'bot' && grid[8] === 'bot')) {
            whoWin = grid[6];
            return isGameOver = true;
        }
        if ((grid[0] === 'player' && grid[4] === 'player' && grid[8] === 'player') || (grid[0] === 'bot' && grid[4] === 'bot' && grid[8] === 'bot')) {
            whoWin = grid[0];
            return isGameOver = true;
        }
        if ((grid[0] === 'player' && grid[3] === 'player' && grid[6] === 'player') || (grid[0] === 'bot' && grid[3] === 'bot' && grid[6] === 'bot')) {
            whoWin = grid[0];
            return isGameOver = true;
        }
        if ((grid[2] === 'player' && grid[4] === 'player' && grid[6] === 'player') || (grid[2] === 'bot' && grid[4] === 'bot' && grid[6] === 'bot')) {
            whoWin = grid[2];
            return isGameOver = true;
        }
        if ((grid[2] === 'player' && grid[5] === 'player' && grid[8] === 'player') || (grid[2] === 'bot' && grid[5] === 'bot' && grid[8] === 'bot')) {
            whoWin = grid[2];
            return isGameOver = true;
        }
        if(countGeneralSteps === 9){
            whoWin = '';
            return isGameOver = true;
        }
    }

    function endGame(){
        winPopUp.children[0].innerHTML = `Победил ${whoWin}. <br> Потраченное время: ${timer.hour}:${timer.minute}:${timer.seconds} <br> Потраченно ходов: ${countPlayerSteps} <br> Общие число ходов (игрок + бот): ${countGeneralSteps}`;
        timer.stop();
        if(whoWin === 'player'){
            isPlayerWin = true;
            showPopUp(winPopUp);
        } else if(whoWin === 'bot'){
            showPopUp(winPopUp)
        } else if(whoWin === ''){
            winPopUp.children[0].innerHTML = `Ничья. <br> Потраченное время: ${timer.hour}:${timer.minute}:${timer.seconds} <br> Потраченно ходов: ${countPlayerSteps} <br> Общие число ходов (игрок + бот): ${countGeneralSteps}`;
            showPopUp(winPopUp);
        }
    }

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
}
    // Easy bot
    function bot(){
        id = randomInteger(0, 8);
        grid[id] ? bot() : move(id, 'bot');
    }
    //Medium bot
    // Непонимаю(

    function move(whereID, role){

        if(grid[whereID]){
            showPopUp(warningPopUp);
            return false;
        }
        grid[whereID] = role;
        const cell = document.getElementById(whereID);
        console.log(++countGeneralSteps);
        role === 'player' ? (cell.innerHTML = 'X', stepCounter.innerHTML=`ХОД: ${++countPlayerSteps}`) : cell.innerHTML = 'O';
        !checkEnd()? role === 'player' ? bot() : null : endGame();
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
        countPlayerSteps = 0;
        countGeneralSteps = 0;
        timer.seconds = 0;
        timer.minute = 0;
        timer.hour = 0;
        timer.init();
    }

    function saveStatInLocalStorage(){
        localStorage.setItem('TotalSecondsPVE', +localStorage.getItem('TotalSecondsPVE') + timer.seconds);
        localStorage.setItem('TotalMinutesPVE', +localStorage.getItem('TotalMinutesPVE') + timer.minute);
        localStorage.setItem('TotalHoursPVE', +localStorage.getItem('TotalHoursPVE') + timer.hour);
        localStorage.setItem('TotalWinsPVE', +localStorage.getItem('TotalWinsPVE') + +isPlayerWin);
        localStorage.setItem('TotalRoundsPlayedPVE', +localStorage.getItem('TotalRoundsPlayedPVE') + 1)
    }




});
