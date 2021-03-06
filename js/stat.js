document.addEventListener('DOMContentLoaded', function(){

    let totalSecondsPVE = localStorage.getItem('TotalSecondsPVE');
    let totalMinutesPVE = localStorage.getItem('TotalMinutesPVE');
    let totalHoursPVE = localStorage.getItem('TotalHoursPVE');
    const totalWinsPVE = localStorage.getItem('TotalWinsPVE');
    const totalRoundsPVE = localStorage.getItem('TotalRoundsPlayedPVE');

    let totalSecondsPVP = localStorage.getItem('TotalSecondsPVP');
    let totalMinutesPVP = localStorage.getItem('TotalMinutesPVP');
    let totalHoursPVP = localStorage.getItem('TotalHoursPVP');
    const totalWinsXPVP = localStorage.getItem('TotalWinsXPVP');
    const totalWinsOPVP = localStorage.getItem('TotalWinsOPVP');
    const totalRoundsPVP = localStorage.getItem('TotalRoundsPlayedPVP');

    const percentageOfWinsPVE = +totalWinsPVE / +totalRoundsPVE * 100;
    const percentageOfWinsX = +totalWinsXPVP / +totalRoundsPVP * 100;
    const percentageOfWinsO = +totalWinsOPVP / +totalRoundsPVP * 100;

    const totalTimePveElem = document.querySelector('.stat__totalTimePVE');
    const totalWinsPveElem = document.querySelector('.stat__totalWinsPVE');
    const totalRoundsPveElem = document.querySelector('.stat__totalRoundsPVE');
    const totalPoWElem = document.querySelector('.stat__PoW');

    const totalTimePvpElem = document.querySelector('.stat__totalTimePVP');
    const totalWinsXPvpElem = document.querySelector('.stat__totalWinsXPVP');
    const totalWinsOPvpElem = document.querySelector('.stat__totalWinsOPVP');
    const totalRoundsPvpElem = document.querySelector('.stat__totalRoundsPVP');
    const totalXPoWElem = document.querySelector('.stat__PoW-x');
    const totalOPoWElem = document.querySelector('.stat__PoW-o');

    +totalSecondsPVE > 59 ? (+totalMinutesPVE++, totalSecondsPVE -= 60) : null;
    +totalMinutesPVE > 59 ? (+totalHoursPVE++, totalMinutesPVE -= 60) : null;

    +totalSecondsPVP > 59 ? (+totalMinutesPVP++, totalSecondsPVP -= 60) : null;
    +totalMinutesPVP > 59 ? (+totalHoursPVE++, totalSecondsPVP -= 60) : null;

    totalTimePveElem.innerHTML = `?????????????????????? ??????????: ${totalHoursPVE != null ? totalHoursPVE < 10 ? '0' + totalHoursPVE : totalHoursPVE : '00'}:${totalMinutesPVE != null ? totalMinutesPVE < 10 ? '0' + totalMinutesPVE : totalMinutesPVE : '00'}:${totalSecondsPVE != null ? totalSecondsPVE < 10 ? '0' + totalSecondsPVE : totalSecondsPVE : '00'}`;
    totalWinsPveElem.innerHTML = `??????????: ${totalWinsPVE != null ? totalWinsPVE : 0}`;
    totalRoundsPveElem.innerHTML = `?????? ??????????????: ${totalRoundsPVE != null ? totalRoundsPVE : 0}`;
    totalPoWElem.innerHTML = `?????????????? ??????????: ${isNaN(percentageOfWinsPVE) ? 0 : Math.floor(percentageOfWinsPVE)}%`;

    totalTimePvpElem.innerHTML = `?????????????????????? ??????????: ${totalHoursPVP != null ? totalHoursPVP < 10 ? '0' + totalHoursPVP : totalHoursPVP : '00'}:${totalMinutesPVP != null ? totalMinutesPVP < 10 ? '0' + totalMinutesPVP : totalMinutesPVP : '00'}:${totalSecondsPVP != null ? totalSecondsPVP < 10 ? '0' + totalSecondsPVP : totalSecondsPVP : '00'}`;
    totalWinsXPvpElem.innerHTML = `?????????? X: ${totalWinsXPVP != null ? totalWinsXPVP : 0}`;
    totalWinsOPvpElem.innerHTML = `?????????? O: ${totalWinsOPVP != null ? totalWinsOPVP : 0}`;
    totalRoundsPvpElem.innerHTML = `?????? ??????????????: ${totalRoundsPVP != null ? totalRoundsPVP : 0}`;
    totalXPoWElem.innerHTML = `?????????????? ?????????? X: ${isNaN(percentageOfWinsX) ? 0 : Math.floor(percentageOfWinsX)}%`;
    totalOPoWElem.innerHTML = `?????????????? ?????????? O: ${isNaN(percentageOfWinsO) ? 0 : Math.floor(percentageOfWinsO)}%`;

    document.querySelector('.btn-reset').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    }, false);


})
