const yahtzee = (function () {

    const roundCounter = document.querySelector('#roundCounter');
    const diceDiv = document.querySelector('.dice');
    const diceButtons = Array.from(diceDiv.children);
    const rollButton = document.querySelector('#rollButton');
    const scoreButton = rollButton.nextElementSibling;
    const highScore = scoreButton.parentNode.nextElementSibling.firstElementChild;
    const radioInput = document.querySelectorAll('input');
    const radioYahtzee = radioInput[11];
    const upperScore = document.querySelector('#upperScore').lastElementChild;
    const lowerScore = document.querySelector('#lowerScore').lastElementChild;
    const totalScore = document.querySelector('#totalScore').lastElementChild;
    const bonus = document.getElementById('bonus');
  
    let dice = [];
    let rollsLeft = 2;
    let round = 0;
    let disallowFutureYahtzees = false;
    const upperScores = {};
    const lowerScores = {};
    const total = {};
  
    for (let i = 0; i < 5; i++) {
      /* Select which dice to keep vs reroll */
      diceButtons[i].addEventListener('click', function () {
        if (diceButtons[i].title === 'Rerolling') {
          diceButtons[i].title = 'Keeping';
        } else {
          diceButtons[i].title = 'Rerolling';
        };
      });
    };
  
    rollButton.addEventListener('click', function () {
      /* Reroll selected dice */
      if (rollsLeft > 0) {
        reroll();
        rollsLeft--;
        printRollButton();
      };
    });
  
    scoreButton.addEventListener('click', function () {
      if (this.textContent === 'Score Now') {
        let element = scrollInput();
        if (!element) {
          alert('Please choose a scoring option.');
        } else {
          score[element.id]();
          printTableRow(element);
          if (element.id !== 'yahtzee') newRound();
        };
      } else {
        highScore.textContent = '';
        newGame();
      }
    });
    
    const d = () => Math.floor(Math.random() * 6) + 1;
  
    const firstRoll = () => {
      dice = [];
      if (radioYahtzee.disabled = true) {
        radioYahtzee.disabled = false;
      }
  
      for (let i = 0; i < 5; i++) {
        dice.push(d());
        diceButtons[i].title = 'Rerolling';
      };
  
      dice.sort();
      printDice();
    };
  
    const reroll = () => {
      for (let i = 0; i < 5; i++) {
        if (diceButtons[i].title === 'Rerolling') {
          dice[i] = d();
        };
      };
  
      printDice();
    };
  
    const newRound = () => {
      printScoreSums();
      round++;
  
      if (round > 3) {
        highScore.textContent = `Congrats! Your final score was ${total.total}.`;
        scoreButton.textContent = 'Play Again?';
      } else {
        rollsLeft = 2;
        printRound();
        printRollButton();
        firstRoll();
      };
    };
  
    const scrollInput = () => {
      for (let i = 0; i < radioInput.length; i++) {
        if (radioInput[i].checked) {
          const radio = radioInput[i];
          return radio;
        };
      };
    };
  
    const printRound = () => roundCounter.textContent = `Round ${round} of 13`;
    const printRollButton = () => rollButton.textContent = `${rollsLeft} rolls left`;
  
    const printDice = () => {
      for (let i = 0; i < 5; i++) {
        diceButtons[i].textContent = dice[i];
      };
    };
  
    const disableRadio = radio => {
      radio.checked = false;
      if (radio.id == 'yahtzee' && lowerScores.yahtzee > 0) {
        return;
      }
  
      radio.disabled = true;
    };
  
    const printScore = (element, tr) => {
      if (upperScores[element.id] || upperScores[element.id] === 0) {
        tr.lastElementChild.textContent = upperScores[element.id];
      } else if (lowerScores[element.id] || lowerScores[element.id] === 0) {
        tr.lastElementChild.textContent = lowerScores[element.id];
      };
    };
  
    const printTableRow = radio => {
      let tr = radio.parentNode.parentNode.parentNode;
      disableRadio(radio);
      printScore(radio, tr);
    };
  
    const printScoreSums = () => {
      getTotals();
      upperScore.textContent = total.upper;
      lowerScore.textContent = total.lower;
      totalScore.textContent = total.total;
    };
    
    const is = num => dice.filter((value) => value === num);
    const sum = arr => arr.reduce((acc, cur) => acc + cur, 0);
  
    const scoreNum = (num, id) => {
      let filtered = is(num);
      upperScores[id] = sum(filtered);
    };
  
    function scoreSets(id, fullHouse) {
      dice.sort();
      let x = 1;
      let y = 1;
      let z = 1;
      let d = 0;
  
      for (let i = 0; i < dice.length; i++) {
        const isAPair = dice[i] === dice[i + 1];
        const isFirstPairFound = d === 0;
        const equalsFirstPair = d === dice[i];
  
        if (isAPair) {
          if (isFirstPairFound) {
            x++;
            d = dice[i];
          } else if (equalsFirstPair) {
            x++;
          } else {
            y++;
          }
        }
      }
  
      z = x > y ? x : y;
      y = x < y ? x : y;
  
      const successful = testFor[id](z, y);
  
      if (successful) {
        if (id === 'fullHouse') lowerScores[id] = 25;
        else if (id !== 'yahtzee') lowerScores[id] = sum(dice);
        else scoreYahtzee();
  
      } else {
        lowerScores[id] = 0;
      };
  
    };
  
    const scoreYahtzee = () => {
      if (!lowerScores.yahtzee) {
        lowerScores.yahtzee = 50;
        newRound();
      } else {
        lowerScores.yahtzee += 100;
        radioYahtzee.disabled = true;
        alert('Congrats! Select a second scoring option.');
      };
    };
  
    function scoreRuns(points, id) {
      dice.sort();
      let x = 1;
  
      for (let i = 0; i < dice.length; i++) {
        const isRunning = dice[i] + 1 === dice [i + 1];
        if (isRunning) x++;
      };
  
      const successful = testFor[id](x);
      if (successful) lowerScores[id] = points;
      else lowerScores[id] = 0;
    };
  
    const score = {
      one: () => scoreNum(1, 'one'),
      two: () => scoreNum(2, 'two'),
      three: () => scoreNum(3, 'three'),
      four: () => scoreNum(4, 'four'),
      five: () => scoreNum(5, 'five'),
      six: () => scoreNum(6, 'six'),
  
      threeOAK: () => scoreSets('threeOAK'),
      fourOAK: () => scoreSets('fourOAK'),
      fullHouse: () => scoreSets('fullHouse'),
      sStraight: () => scoreRuns(30, 'sStraight'),
      lStraight: () => scoreRuns(40, 'lStraight'),
      yahtzee: () => scoreSets('yahtzee'),
      chance: () => lowerScores.chance = sum(dice),
    };
  
    const testFor = {
      threeOAK: z => z >= 3 ? true : false,
      fourOAK: z => z >= 4 ? true : false,
      fullHouse: (z, y) => z === 3 && y === 2 ? true : false,
      yahtzee: z => z === 5 ? true : false,
  
      sStraight: z => z >= 4 ? true : false,
      lStraight: z => z === 5 ? true : false,
    };
  
    const addScore = obj => {
      let sum = 0;
      for (let prop in obj) {
        sum += obj[prop];
      };
  
      return sum;
    };
  
    const getTotals = () => {
      let categoryTotal = "Lower"
      total.upper = addScore(upperScores);
      if (total.upper >= 63 && !upperScores.bonus) {
        upperScores.bonus = 35;
        bonus.textContent = upperScores.bonus;
        total.upper = addScore(upperScores);
        categoryTotal = "Upper";
      };
  
      total.lower = addScore(lowerScores);
      total.total = total.upper + total.lower;
      if(round >= 3) {
        const player1 = JSON.parse(localStorage.getItem('player_1'))
        const userInfoScore = {
            total_score: total.total,
            userId: player1.userId,
            category: categoryTotal
        }

        socket.emit('set-scores', userInfoScore);
      }
    };
  
    const newGame = () => {
      dice = [];
      rollsLeft = 2;
      round = 0;
      disallowFutureYahtzees = false;
      for (var score in upperScores) delete upperScores[score];
      for (var score in lowerScores) delete lowerScores[score];
      for (var score in total) delete total[score];
  
      scoreButton.textContent = 'Score Now';
      bonus.textContent = '';
      printScoreSums();
      for (let i = 0; i < radioInput.length; i++) {
        radioInput[i].disabled = false;
        radioInput[i].parentNode.parentNode.parentNode.lastElementChild.textContent = '';
      }
  
      newRound();
    };
  
    return {
      init: newRound,
    };
  
  })();
  
  yahtzee.init();
  