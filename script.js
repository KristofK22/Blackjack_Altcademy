/* Javascript for Blackjack */
/* Built and Designed by Kristof Kiraly */

//#region // onLoad function to reset game and its options =============
//======================================================================

  const onLoad = () => {

    function loadZero(id, value) {

      let element = document.getElementById(id);
      element.value = value;

    };

    loadZero('Deck_Options', '0');
    loadZero('Double_Options', '0');
    loadZero('Surrender_Options', '0');
    loadZero('Soft17_Options', '0');

  };

//======================================================================
//#endregion ===========================================================

const game = () => {

  // #region // Variables & Selectors ====================================
  //======================================================================


    // #region // ====================== User Options ====================

      const numberOfDecks = [0, 1, 2, 4, 6, 8];
      var userchoiceNumDecks = 0;
      const allowedDisallow = ["", "Allowed", "Disallowed"];
      var userchoice2xAfterSplit = "";
      var userchoiceSurrender = "";
      const dealerHitStand = ["", "Dealer Hits", "Dealer Stands"];
      var userchoiceSoft17 = "";

      const deckOptions = document.getElementById("Deck_Options");
      const doubleOptions = document.getElementById("Double_Options");
      const surrenderOptions = document.getElementById("Surrender_Options");
      const soft17Options = document.getElementById("Soft17_Options");
      // Soft17 Rule Text
      const soft17RuleText = document.querySelector(".Soft17_Rule");

      // require user options to be set
      const userOptionsGroup = document.querySelector(".User_Options_Group");
      const setGameButton = document.querySelector(".Set_Game_Button");
      var gameStatus = false;

    // #endregion =======================================================
    

    // #region // ===== PreGame/EndGame Status and # of Decks Counter ====

      const decksCounter = document.querySelector(".Deck_Counter");
      decksCounter.innerText = 0;

    // #endregion ========================================================


    //========== Cards, statistics, and Min/Max Bet amounts(keep constant for simplicity) =========================
    // #region // ========================================================

      var cardsShuffledArr = [];

      // Used Cards 
      const usedCardsPercent = document.querySelector(".Used_Cards_Percentage");
      
      var usedCardsArr = [];
      var usedCardsArrCount = usedCardsArr.length;
      var startingCardsCount = 0;

      // Min and Max bet
      const minBetCounter = document.querySelector(".Min_Bet_Counter");
      minBetCounter.innerText = 1;
      const minBet = 1;
      const maxBetCounter = document.querySelector(".Max_Bet_Counter");
      maxBetCounter.innerText = 100;
      const maxBet = 100;

      // New Cards
      const newCardsPercent = document.querySelector(".New_Cards_Percentage");

      var currentCardsCount = 0;

    // #endregion // =====================================================


    // #region // ========== Main/Game Section ===========================

      // Round Counter
      const roundCounter = document.querySelector(".Round_Counter");
      var round = 0;
      roundCounter.innerText = round;

      // Round Status
      const roundStatus = document.querySelector(".Round_Status");

      // "Hole Card", Dealer's Cards, and Total Values
      const holeCard = document.querySelector(".Hole_Card");
      var holeCardArr = [];
      holeCard.innerText = holeCardArr;
      const dealersCards = document.querySelector(".Dealers_Cards");
      var dealersCardsArr = [];
      var dealersCardsJoined = dealersCardsArr.join("");
      dealersCards.innerText = dealersCardsJoined;
      const dealersCardsTVal = document.querySelector(".Dealers_Cards_TValue")
      var dealersCardsTValAmount = [0];
      dealersCardsTVal.innerText = dealersCardsTValAmount;

      /*  Blackjack Pays 3 to 2 ==========================================
          Insurance Pays 2 to 1 ==========================================
      */

      // Player's Cards and Total Values
      const playersCards = document.querySelector(".Players_Cards");
      var playersCardsArr = [];
      var playersCardsJoined = playersCardsArr.join("");
      playersCards.innerText = playersCardsJoined;
      const playersCardsTVal = document.querySelector(".Players_Cards_TValue");
      let playersCardsTValAmount = [0];
      playersCardsTVal.innerText = playersCardsTValAmount;

      // Buttons
      const surrBtn = document.querySelector(".Surrender_Button");
      const dblBtn = document.querySelector(".Double_Button");

      const hitBtn = document.querySelector(".Hit_Button");
      const standBtn = document.querySelector(".Stand_Button");

      const splitBtn = document.querySelector(".Split_Button");
      const insBtn = document.querySelector(".Insurance_Button");

    // #endregion // ====================================================


    // #region // ========== Bet Amount Group ============================
    
      // Unit Amount Buttons
      const unit1Btn = document.querySelector(".Unit_1");
      const unit1 = 1;
      const unit5Btn = document.querySelector(".Unit_5");
      const unit5 = 5;
      const unit10Btn = document.querySelector(".Unit_10");
      const unit10 = 10;
      const unit25Btn = document.querySelector(".Unit_25");
      const unit25 = 25;
      const unit50Btn = document.querySelector(".Unit_50");
      const unit50 = 50;
      const unit100Btn = document.querySelector(".Unit_100");
      const unit100 = 100;
      const unit1000Btn = document.querySelector(".Unit_1000");
      const unit1000 = 1000;

    // #endregion ========================================================


    // #region // ===== Bankroll, BetAmount, WinAmount ===================

      //=========== Unit count, bet amount, win amount, & insurance ======
      // Place Bet Amount (Must meet Min. and Max. limits)
      const placeBetCounter = document.querySelector(".Place_Bet_Counter");
      var placeBetAmount = 0;
      const resetBetBtn = document.querySelector(".Reset_Bet_Button");

      const insuranceCounter =  document.querySelector(".Insurance_Counter");
      var insuranceAmount = 0;

      const bankRollCounter = document.querySelector(".Bank_Roll_Counter");
      var bankRollAmount = 100;

      const betAmountCounter = document.querySelector(".Bet_Amount_Counter");
      var betAmount = 0;
      
      const winAmountCounter = document.querySelector(".Win_Amount_Counter");
      var winAmount = 0;

      // reset game  
      const resetGameButton = document.querySelector(".Reset_Game_Button");

    // #endregion =======================================================


    // #region // ============ Game Functionality ========================
    // ===================================================================

      const cardsInADeckArr = ["A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",];

      const twoDecksArr = cardsInADeckArr.concat(cardsInADeckArr);
      const fourDecksArr = twoDecksArr.concat(twoDecksArr);
      const sixDecksArr = twoDecksArr.concat(fourDecksArr);
      const eightDecksArr = twoDecksArr.concat(sixDecksArr);

      // functions to convert arrays to total values respectively
      var cardArraystoNumbersDealer = function(dealersCardsArr) {

        // set array to local var
        var cardValue = dealersCardsArr;

        var determinedValues = [];

        // function to determine numerical values of each card
        var determineCardValue = function(cardValue) {
          
          for (i = 0; i < cardValue.length; i ++) {

            if (cardValue[i] === "A") {
              determinedValues.push("1 or 11");
              continue;
            } else if (cardValue[i] === "B") {
              determinedValues.push(2);
              continue;
            } else if (cardValue[i] === "C") {
              determinedValues.push(3);
              continue;
            } else if (cardValue[i] === "D") {
              determinedValues.push(4);
              continue;
            } else if (cardValue[i] === "E") {
              determinedValues.push(5);
              continue;
            } else if (cardValue[i] === "F") {
              determinedValues.push(6);
              continue;
            } else if (cardValue[i] === "G") {
              determinedValues.push(7);
              continue;
            } else if (cardValue[i] === "H") {
              determinedValues.push(8);
              continue;
            } else if (cardValue[i] === "I") {
              determinedValues.push(9);
              continue;
            } else if (cardValue[i] === "J") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "K") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "L") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "M") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "N") {
              determinedValues.push("1 or 11");
              continue;
            } else if (cardValue[i] === "O") {
              determinedValues.push(2);
              continue;
            } else if (cardValue[i] === "P") {
              determinedValues.push(3);
              continue;
            } else if (cardValue[i] === "Q") {
              determinedValues.push(4);
              continue;
            } else if (cardValue[i] === "R") {
              determinedValues.push(5);
              continue;
            } else if (cardValue[i] === "S") {
              determinedValues.push(6);
              continue;
            } else if (cardValue[i] === "T") {
              determinedValues.push(7);
              continue;
            } else if (cardValue[i] === "U") {
              determinedValues.push(8);
              continue;
            } else if (cardValue[i] === "V") {
              determinedValues.push(9);
              continue;
            } else if (cardValue[i] === "W") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "X") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "Y") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "Z") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "a") {
              determinedValues.push("1 or 11");
              continue;
            } else if (cardValue[i] === "b") {
              determinedValues.push(2);
              continue;
            } else if (cardValue[i] === "c") {
              determinedValues.push(3);
              continue;
            } else if (cardValue[i] === "d") {
              determinedValues.push(4);
              continue;
            } else if (cardValue[i] === "e") {
              determinedValues.push(5);
              continue;
            } else if (cardValue[i] === "f") {
              determinedValues.push(6);
              continue;
            } else if (cardValue[i] === "g") {
              determinedValues.push(7);
              continue;
            } else if (cardValue[i] === "h") {
              determinedValues.push(8);
              continue;
            } else if (cardValue[i] === "i") {
              determinedValues.push(9);
              continue;
            } else if (cardValue[i] === "j") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "k") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "l") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "m") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "n") {
              determinedValues.push("1 or 11");
              continue;
            } else if (cardValue[i] === "o") {
              determinedValues.push(2);
              continue;
            } else if (cardValue[i] === "p") {
              determinedValues.push(3);
              continue;
            } else if (cardValue[i] === "q") {
              determinedValues.push(4);
              continue;
            } else if (cardValue[i] === "r") {
              determinedValues.push(5);
              continue;
            } else if (cardValue[i] === "s") {
              determinedValues.push(6);
              continue;
            } else if (cardValue[i] === "t") {
              determinedValues.push(7);
              continue;
            } else if (cardValue[i] === "u") {
              determinedValues.push(8);
              continue;
            } else if (cardValue[i] === "v") {
              determinedValues.push(9);
              continue;
            } else if (cardValue[i] === "w") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "x") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "y") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "z") {
              determinedValues.push(10);
              continue;
            } else {};

          };

        };
        // call above function, return to "determinedValues"
        determineCardValue(cardValue);
        
        var determinedValuesSummed = [];
        var determinedValuesComplete = [];

        // function to sum up numerical values of all cards
        var sumUpCardValues = function (determinedValues) {
          
          var aceArr = [];
          var normArr = [];
          
          // push Ace Cards only into aceArr
          for (i = determinedValues.length; i--;) {

            if (determinedValues[i] === "1 or 11") {

              aceArr.unshift(1, " or ", 11);

            } else if (determinedValues[i] !== "1 or 11") {

              normArr.unshift(determinedValues[i]);

            } else {};

          };

          var normSum = 0;

          // for loop to sum up all cards other than "Ace"
          for (j = 0; j < normArr.length; j++) {
            
            normSum += normArr[j];

          };

          var completeSum = [];
          var acePlusNorm = [];

          if (aceArr.length > 0) {

            if (normSum === 0) {

              if (aceArr.length === 3) {

                completeSum = aceArr;

              } else if (aceArr.length === 6) { // ex.: 1, or, 11, 1, or, 11
                
                leftArr = completeSum.slice(0, 3); 
                rightArr = completeSum.slice(3);
                leftArr.push(" and ");
                completeSumAce2 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11 
                completeSum = completeSumAce2;

              } else if (aceArr.length === 9) {
                // ex.: 1, or, 11, 1, or, 11, 1, or, 11
                leftArr = completeSum.slice(0, 3); 
                rightArr = completeSum.slice(3);
                leftArr.push(" and ");
                completeSumAce2 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11, 1, or, 11
                leftArr = completeSumAce2.slice(0, 7);
                rightArr = completeSumAce2.slice(7);
                leftArr.push(" and ");
                completeSumAce3 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11, and, 1, or, 11
                completeSum = completeSumAce3;

              } else { console.log("determinedValuesSummed Error")};

              determinedValuesSummed = completeSum.join("");
            
            // otherwise add together normSum and "Ace" cards
            } else {

              // for loop to sum up "1 + nomSum" or "11 + norSum", respectively
              for (i = 0; i < aceArr.length; i++) {
                
                if (aceArr[i] !== " or ") {

                  acePlusNorm.push((aceArr[i] + normSum));
                  completeSum.push(acePlusNorm.shift());
                  continue;

                } else {

                  acePlusNorm.push((aceArr[i]));
                  completeSum.push(acePlusNorm.shift());
                  continue;

                };

              };

              if (aceArr.length === 3) {

                determinedValuesSummed = completeSum.join("");

              } else if (aceArr.length === 6) { // ex.: 1, or, 11, 1, or, 11
                
                leftArr = completeSum.slice(0, 3); 
                rightArr = completeSum.slice(3);
                leftArr.push(" and ");
                completeSumAce2 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11 
                determinedValuesSummed = completeSumAce2.join("");

              } else if (aceArr.length === 9) {
                // ex.: 1, or, 11, 1, or, 11, 1, or, 11
                leftArr = completeSum.slice(0, 3); 
                rightArr = completeSum.slice(3);
                leftArr.push(" and ");
                completeSumAce2 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11, 1, or, 11
                leftArr = completeSumAce2.slice(0, 7);
                rightArr = completeSumAce2.slice(7);
                leftArr.push(" and ");
                completeSumAce3 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11, and, 1, or, 11

                determinedValuesSummed = completeSumAce3.join("");

              } else { console.log("determinedValuesSummed Error")};

            };

          } else {
            
            completeSum.push(normSum);

            determinedValuesSummed = completeSum.join("");
            
          };

          determinedValuesComplete = determinedValuesSummed;
          return determinedValuesComplete;
          
        };
        // call above function, return to "determinedValuesJoined"
        sumUpCardValues(determinedValues);
        
        return determinedValuesComplete;

      };

      var cardArraystoNumbersPlayer = function(playersCardsArr) {

        // set array to local var
        var cardValue = playersCardsArr;

        var determinedValues = [];

        // function to determine numerical values of each card
        var determineCardValue = function(cardValue) {
          
          for (i = 0; i < cardValue.length; i ++) {

            if (cardValue[i] === "A") {
              determinedValues.push("1 or 11");
              continue;
            } else if (cardValue[i] === "B") {
              determinedValues.push(2);
              continue;
            } else if (cardValue[i] === "C") {
              determinedValues.push(3);
              continue;
            } else if (cardValue[i] === "D") {
              determinedValues.push(4);
              continue;
            } else if (cardValue[i] === "E") {
              determinedValues.push(5);
              continue;
            } else if (cardValue[i] === "F") {
              determinedValues.push(6);
              continue;
            } else if (cardValue[i] === "G") {
              determinedValues.push(7);
              continue;
            } else if (cardValue[i] === "H") {
              determinedValues.push(8);
              continue;
            } else if (cardValue[i] === "I") {
              determinedValues.push(9);
              continue;
            } else if (cardValue[i] === "J") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "K") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "L") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "M") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "N") {
              determinedValues.push("1 or 11");
              continue;
            } else if (cardValue[i] === "O") {
              determinedValues.push(2);
              continue;
            } else if (cardValue[i] === "P") {
              determinedValues.push(3);
              continue;
            } else if (cardValue[i] === "Q") {
              determinedValues.push(4);
              continue;
            } else if (cardValue[i] === "R") {
              determinedValues.push(5);
              continue;
            } else if (cardValue[i] === "S") {
              determinedValues.push(6);
              continue;
            } else if (cardValue[i] === "T") {
              determinedValues.push(7);
              continue;
            } else if (cardValue[i] === "U") {
              determinedValues.push(8);
              continue;
            } else if (cardValue[i] === "V") {
              determinedValues.push(9);
              continue;
            } else if (cardValue[i] === "W") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "X") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "Y") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "Z") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "a") {
              determinedValues.push("1 or 11");
              continue;
            } else if (cardValue[i] === "b") {
              determinedValues.push(2);
              continue;
            } else if (cardValue[i] === "c") {
              determinedValues.push(3);
              continue;
            } else if (cardValue[i] === "d") {
              determinedValues.push(4);
              continue;
            } else if (cardValue[i] === "e") {
              determinedValues.push(5);
              continue;
            } else if (cardValue[i] === "f") {
              determinedValues.push(6);
              continue;
            } else if (cardValue[i] === "g") {
              determinedValues.push(7);
              continue;
            } else if (cardValue[i] === "h") {
              determinedValues.push(8);
              continue;
            } else if (cardValue[i] === "i") {
              determinedValues.push(9);
              continue;
            } else if (cardValue[i] === "j") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "k") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "l") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "m") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "n") {
              determinedValues.push("1 or 11");
              continue;
            } else if (cardValue[i] === "o") {
              determinedValues.push(2);
              continue;
            } else if (cardValue[i] === "p") {
              determinedValues.push(3);
              continue;
            } else if (cardValue[i] === "q") {
              determinedValues.push(4);
              continue;
            } else if (cardValue[i] === "r") {
              determinedValues.push(5);
              continue;
            } else if (cardValue[i] === "s") {
              determinedValues.push(6);
              continue;
            } else if (cardValue[i] === "t") {
              determinedValues.push(7);
              continue;
            } else if (cardValue[i] === "u") {
              determinedValues.push(8);
              continue;
            } else if (cardValue[i] === "v") {
              determinedValues.push(9);
              continue;
            } else if (cardValue[i] === "w") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "x") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "y") {
              determinedValues.push(10);
              continue;
            } else if (cardValue[i] === "z") {
              determinedValues.push(10);
              continue;
            } else {};

          };

        };
        // call above function, return to "determinedValues"
        determineCardValue(cardValue);
        
        var determinedValuesSummed = [];
        var determinedValuesComplete = [];

        // function to sum up numerical values of all cards
        var sumUpCardValues = function (determinedValues) {
          
          var aceArr = [];
          var normArr = [];
          
          // push Ace Cards only into aceArr
          for (i = determinedValues.length; i--;) {

            if (determinedValues[i] === "1 or 11") {

              aceArr.unshift(1, " or ", 11);

            } else if (determinedValues[i] !== "1 or 11") {

              normArr.unshift(determinedValues[i]);

            } else {};

          };
          
          var normSum = 0;

          // for loop to sum up all cards other than "Ace"
          for (j = 0; j < normArr.length; j++) {
            
            normSum += normArr[j];

          };

          var completeSum = [];
          var acePlusNorm = [];

          if (aceArr.length > 0) {

            if (normSum === 0) {

              if (aceArr.length === 3) {

                completeSum = aceArr;
                console.log("Player CompletSum: " + completeSum);

              } else if (aceArr.length === 6) { // ex.: 1, or, 11, 1, or, 11
                
                leftArr = completeSum.slice(0, 3); 
                rightArr = completeSum.slice(3);
                leftArr.push(" and ");
                completeSumAce2 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11 

              } else if (aceArr.length === 9) {
                // ex.: 1, or, 11, 1, or, 11, 1, or, 11
                leftArr = completeSum.slice(0, 3); 
                rightArr = completeSum.slice(3);
                leftArr.push(" and ");
                completeSumAce2 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11, 1, or, 11
                leftArr = completeSumAce2.slice(0, 7);
                rightArr = completeSumAce2.slice(7);
                leftArr.push(" and ");
                completeSumAce3 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11, and, 1, or, 11

              } else { console.log("determinedValuesSummed Error")};

              determinedValuesSummed = completeSum.join("");
            
            // otherwise add together normSum and "Ace" cards
            } else {

              // for loop to sum up "1 + nomSum" or "11 + norSum", respectively
              for (i = 0; i < aceArr.length; i++) {
                
                if (aceArr[i] !== " or ") {

                  acePlusNorm.push((aceArr[i] + normSum));
                  completeSum.push(acePlusNorm.shift());
                  continue;

                } else {

                  acePlusNorm.push((aceArr[i]));
                  completeSum.push(acePlusNorm.shift());
                  continue;

                };

              };

              if (aceArr.length === 3) {

                determinedValuesSummed = completeSum.join("");

              } else if (aceArr.length === 6) { // ex.: 1, or, 11, 1, or, 11
                
                leftArr = completeSum.slice(0, 3); 
                rightArr = completeSum.slice(3);
                leftArr.push(" and ");
                completeSumAce2 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11 
                determinedValuesSummed = completeSumAce2.join("");

              } else if (aceArr.length === 9) {
                // ex.: 1, or, 11, 1, or, 11, 1, or, 11
                leftArr = completeSum.slice(0, 3); 
                rightArr = completeSum.slice(3);
                leftArr.push(" and ");
                completeSumAce2 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11, 1, or, 11
                leftArr = completeSumAce2.slice(0, 7);
                rightArr = completeSumAce2.slice(7);
                leftArr.push(" and ");
                completeSumAce3 = leftArr.concat(rightArr); 
                // ex.: 1, or, 11, and, 1, or, 11, and, 1, or, 11

                determinedValuesSummed = completeSumAce3.join("");

              } else { console.log("determinedValuesSummed Error")};

            };

          } else {
            
            completeSum.push(normSum);

            determinedValuesSummed = completeSum.join("");
            
          };

          determinedValuesComplete = determinedValuesSummed;
          return determinedValuesComplete;
          
        };
        // call above function, return to "determinedValuesJoined"
        sumUpCardValues(determinedValues);
        
        return determinedValuesComplete;

      };

      // Reset bet function
      const resetBetFunction = () => {

        bankRollAmount = bankRollAmount + placeBetAmount;
        bankRollCounter.innerText = bankRollAmount;

        placeBetAmount = 0;
        placeBetCounter.innerText = placeBetAmount;

        betAmount = 0;
        betAmountCounter.innerText = betAmount;

      }; 

      // functions to determine TRUE Total Value respectively
      var dealerDeterminedTVal = [];

      const dealerTValCalc = (dealersCardsTValAmount) => {

        // local variables
        var s = dealersCardsTValAmount.toString();
        var ace = 1;
        var value = [];
        var valueLess21 = [];
        var valueGreat21 = [];

        // if Ace(s) present, determine TVal
        if (ace >= 1) { // example: "11 or 21" or greater

          value = s.slice(-2);

          if (value <= 21) {

            valueLess21 = value;
            dealerDeterminedTVal = valueLess21;

          } else {

            value = s.slice(0, 2);
            valueGreat21 = value;
            dealerDeterminedTVal = valueGreat21;

          };

        } else {

          value = s.slice(-2);
          dealerDeterminedTVal = value;

        };

        return dealerDeterminedTVal;

      };

      var playerDeterminedTVal = [];

      const playerTValCalc = (playersCardsTValAmount) => {

        // local variables
        var s = playersCardsTValAmount.toString();
        var ace = 1;
        var value = [];
        var valueLess21 = [];
        var valueGreat21 = [];
        

        // if Ace(s) present, determine TVal
        if (ace >= 1) { // example: "11 or 21" or greater

          value = s.slice(-2);

          if (value <= 21) {

            valueLess21 = value;
            playerDeterminedTVal = valueLess21;

          } else {

            value = s.slice(0, 2);
            valueGreat21 = value;
            playerDeterminedTVal = valueGreat21;

          };

        } else {

          value = s.slice(-2);
          playerDeterminedTVal = value;

        };

        return playerDeterminedTVal;

      };

      /* function to determine if between min and max (not in use)
        
        const between = (number, min, max) => {

        return number >= min && number <= max;

      }; */

      // function to calc insurance win/loss
      const calcInsurance = (dealerDeterminedTVal) => {

        // determine insurance win/loss
        if (dealerDeterminedTVal == 21 && insuranceAmount > 0) {

          console.log("Insurance Won! -start");
          console.log("Determined Dealer TVal: " + dealerDeterminedTVal);

          // update bankRoll
          bankRollAmount = bankRollAmount + ((insuranceAmount) * 3);
          bankRollCounter.innerText = bankRollAmount;

          // clear insuranceAmount
          insuranceAmount = 0;
          insuranceCounter.innerText = insuranceAmount;

          // roundStatus update
          roundStatus.style.color = "purple";
          roundStatus.innerText = "Insurance won! Added to Bankroll."

          // update console
          console.log("Insurance Won! -finished");

        } else if (insuranceAmount > 0) {

          console.log("Insurance Lost! -start");
          console.log("Determined Dealer TVal: " + dealerDeterminedTVal);

          // clear insuranceAmount
          insuranceAmount = 0;
          insuranceCounter.innerText = insuranceAmount;

          // roundStatus update
          roundStatus.style.color = "purple";
          roundStatus.innerText = "Insurance lost!"

          // update console
          console.log("Insurance Lost! -finished");

        } else {};

      };

      // function to calc winner and bets
      const calcWinner = (dealersCardsTValAmount, playersCardsTValAmount) => {

        console.log("Winner Calc Started");

        // get TValCalc respectively
        dealerTValCalc(dealersCardsTValAmount);
        playerTValCalc(playersCardsTValAmount);
        console.log("Dealer Determined TVal: " + dealerDeterminedTVal);
        console.log("Player Determined Tval: " + playerDeterminedTVal);

        // Winner conditional statements
        if (dealerDeterminedTVal > 21) {

          roundStatus.style.color = "lightgreen";
          roundStatus.innerText = "Player Wins!";
          
          // bankroll/bet/winAmount calculations
          if (playerDeterminedTVal === 21) {

            winAmount = (placeBetAmount * 1.5);
            winAmountCounter.innerText = winAmount;

            bankRollAmount = bankRollAmount + ((placeBetAmount) + (placeBetAmount * 1.5));
            bankRollCounter.innerText = bankRollAmount;
            
            placeBetAmount = 0;
            placeBetCounter.innerText = placeBetAmount;

          } else {

            winAmount = placeBetAmount;
            winAmountCounter.innerText = winAmount;

            bankRollAmount = bankRollAmount + (placeBetAmount * 2);
            bankRollCounter.innerText = bankRollAmount;

            placeBetAmount = 0;
            placeBetCounter.innerText = placeBetAmount;

          };

          // update console
          console.log("Player Wins!");

          setTimeout(function() {

            roundStatus.style.color = "lightgreen";
            roundStatus.innerText = "Press Hit button again to start next round!"

          }, 3000);

        } else if (playerDeterminedTVal > 21) {

          roundStatus.style.color = "red";
          roundStatus.innerText = "Dealer Wins!";

          // bankroll/bet/winAmount calculations
          winAmount = 0;
          winAmountCounter.innerText = winAmount;

          placeBetAmount = 0;
          placeBetCounter.innerText = placeBetAmount;

          // update console
          console.log("Dealer Wins!");

          setTimeout(function() {

            roundStatus.style.color = "lightgreen";
            roundStatus.innerText = "Press Hit button again to start next round!"

          }, 3000);

        } else if (dealerDeterminedTVal > playerDeterminedTVal) {
          
          roundStatus.style.color = "red";
          roundStatus.innerText = "Dealer Wins!";

          // bankroll/bet/winAmount calculations
          winAmount = 0;
          winAmountCounter.innerText = winAmount;

          placeBetAmount = 0;
          placeBetCounter.innerText = placeBetAmount;

          // update console
          console.log("Dealer Wins!");

          setTimeout(function() {

            roundStatus.style.color = "lightgreen";
            roundStatus.innerText = "Press Hit button again to start next round!"

          }, 3000);

        } else if (dealerDeterminedTVal < playerDeterminedTVal) {

          roundStatus.style.color = "lightgreen";
          roundStatus.innerText = "Player Wins!";

          // bankroll/bet/winAmount calculations
          if (playerDeterminedTVal === 21) {

            winAmount = (placeBetAmount * 1.5);
            winAmountCounter.innerText = winAmount;

            bankRollAmount = bankRollAmount + ((placeBetAmount) + (placeBetAmount * 1.5));
            bankRollCounter.innerText = bankRollAmount;
            
            placeBetAmount = 0;
            placeBetCounter.innerText = placeBetAmount;

          } else {

            winAmount = (placeBetAmount * 2);
            winAmountCounter.innerText = winAmount;

            bankRollAmount = bankRollAmount + (placeBetAmount * 2);
            bankRollCounter.innerText = bankRollAmount;

            placeBetAmount = 0;
            placeBetCounter.innerText = placeBetAmount;

          };

          // update console
          console.log("Player Wins!");

          setTimeout(function() {

            roundStatus.style.color = "lightgreen";
            roundStatus.innerText = "Press Hit button again to start next round!"

          }, 3000);

        } else if (dealerDeterminedTVal === playerDeterminedTVal) {

          roundStatus.style.color = "lightblue";
          roundStatus.innerText = "Push! Bet restored bankroll.";

          // bankroll/bet/winAmount calculations
          winAmount = 0;
          winAmountCounter.innerText = winAmount;

          bankRollAmount = bankRollAmount + placeBetAmount;
          bankRollCounter.innerText = bankRollAmount;

          placeBetAmount = 0;
          placeBetCounter.innerText = placeBetAmount;

          // update console
          console.log("Push!");

          setTimeout(function() {

            roundStatus.style.color = "lightgreen";
            roundStatus.innerText = "Press Hit button again to start next round!"

          }, 3000);

        } else {

          console.log("Calc error");

        };

        // reset buttons
        setTimeout(function() {

          hitBtn.disabled = false;

          // reset bet buttons
          resetBetBtn.disabled = false;
          unit1Btn.disabled = false;
          unit5Btn.disabled = false;
          unit10Btn.disabled = false;
          unit25Btn.disabled = false;
          unit50Btn.disabled = false;
          unit100Btn.disabled = false;
          unit1000Btn.disabled = false;

        }, 3000);

        console.log("Winner Calc Finished");

      };

    // #endregion =======================================================
    

  // #endregion // =======================================================


  // #region Methods =====================================================
  //======================================================================


    function deckFunc (event) {

      if (this.value == 1) {
        userchoiceNumDecks = numberOfDecks[1];
      } else if (this.value == 2) {
        userchoiceNumDecks = numberOfDecks[2];
      } else if (this.value == 3) {
        userchoiceNumDecks = numberOfDecks[3];
      } else if (this.value == 4) {
        userchoiceNumDecks = numberOfDecks[4];
      } else if (this.value == 5) {
        userchoiceNumDecks = numberOfDecks[5];
      } else {userchoiceNumDecks = numberOfDecks[0];};
      
    };

    function dblFunc (event) {

      if (this.value == 1) {
        userchoice2xAfterSplit = allowedDisallow[1];
      } else if (this.value == 2) {
        userchoice2xAfterSplit = allowedDisallow[2];
      } else {userchoice2xAfterSplit = allowedDisallow[0]};

    };

    function surrFunc (event) {

      if (this.value == 1) {
        userchoiceSurrender = allowedDisallow[1];
      } else if (this.value == 2) {
        userchoiceSurrender = allowedDisallow[2];
      } else {userchoiceSurrender = allowedDisallow[0]};

    };

    function soft17func (event) {

      if (this.value == 1) {
        userchoiceSoft17 = dealerHitStand[1];
      } else if (this.value == 2) {
        userchoiceSoft17 = dealerHitStand[2];
      } else {userchoiceSoft17 = dealerHitStand[0]};
      
    };

    function calcUsedCards (usedCardsArrCount, startingCardsCount) {

      var usedCardsArrCount = usedCardsArr.length;

        if (usedCardsArrCount === 0) {
          return usedCardsPercent.innerText = 0;
        } else {
          return usedCardsPercent.innerText = ((usedCardsArrCount/startingCardsCount) * 100).toFixed(1);
        };

    };

    function calcNewCards (startingCardsCount, currentCardsCount) {

      currentCardsCount = cardsShuffledArr.length;

      if (currentCardsCount === 0) {
        return newCardsPercent.innerText = 0;
      } else if (currentCardsCount > startingCardsCount) {
        return newCardsPercent.innerText = 0;
      } else {
        return newCardsPercent.innerText = ((currentCardsCount/startingCardsCount) * 100).toFixed(1);
      };

    };

    function setGame (event) {
      // PreGame Status Messages
      const preGameStatus = document.querySelector(".Pre_Game_Status");
      const preGameStatus2 = document.querySelector(".Pre_Game_Status2");
      const errMessage = "Error! Please select an option for each from the above fields.";
      const errMessage2 = "(You may have to select a different option and reselect desired option.)";
      preGameStatus.style.color = "red";
      preGameStatus2.style.color = "orange";

      if (userchoiceNumDecks < 1 && userchoice2xAfterSplit < "!" && userchoiceSurrender < "!" && userchoiceSoft17 < "!") {
        
        gameStatus = false;
        preGameStatus.innerText = errMessage;
        preGameStatus2.innerText = errMessage2;

      } else if (userchoiceNumDecks >= 1 && userchoice2xAfterSplit > "!" && userchoiceSurrender > "!" && userchoiceSoft17 > "!") {
        
        // set game status to true
        gameStatus = true;

        // round + 1
        round += 1;
        roundCounter.innerText = round;

        // status update; options & button removals
        setGameButton.style.display = "none";
        userOptionsGroup.style.display = "none";

        const allSetMessage = "Game is all set! Click the 'Hit' button to start the game.";
        preGameStatus.style.color = "lightgreen";
        preGameStatus.innerText = allSetMessage;
        preGameStatus2.style.display = "none";

        // add surrender button(disabled) if...
        if(userchoiceSurrender === "Allowed") {

          surrBtn.style.display = "inline-block";
          surrBtn.disabled = true;

        } else {};

        // round status update
        roundStatus.style.color = "lightgreen";
        roundStatus.innerText = "Game Set, click 'Hit' button.";

        // Soft17 Rule add in
        if (userchoiceSoft17 === "Dealer Hits") {

          soft17RuleText.innerText = "Dealer Hits on Soft 17"

        } else {

          soft17RuleText.innerText = "Dealer Stands on Soft 17"
          
        };
        

        // shuffle cards once, per selected amount of decks
        // sort function read: https://stackoverflow.com/questions/69242025/javascript-cardValue-shuffling-why-does-the-random-number-have-to-be-shifted-0-5-d
        if (userchoiceNumDecks === 1) {
          cardsShuffledArr = randoSequence(cardsInADeckArr).map((i) => i.value);
          startingCardsCount = cardsInADeckArr.length;
          decksCounter.innerText = 1;
        } else if (userchoiceNumDecks === 2) {
          cardsShuffledArr = randoSequence(twoDecksArr).map((i) => i.value);
          startingCardsCount = twoDecksArr.length;
          decksCounter.innerText = 2;
        } else if (userchoiceNumDecks === 4) {
          cardsShuffledArr = randoSequence(fourDecksArr).map((i) => i.value);
          startingCardsCount = fourDecksArr.length;
          decksCounter.innerText = 4;
        } else if (userchoiceNumDecks === 6) {
          cardsShuffledArr = randoSequence(sixDecksArr).map((i) => i.value);
          startingCardsCount = sixDecksArr.length;
          decksCounter.innerText = 6;
        } else if (userchoiceNumDecks === 8) {
          cardsShuffledArr = randoSequence(eightDecksArr).map((i) => i.value);
          startingCardsCount = eightDecksArr.length;
          decksCounter.innerText = 8;
        } else {};

        // New and Used percentage calculations initiation
        newCardsPercent.innerText = calcNewCards(startingCardsCount, currentCardsCount);
    
        usedCardsPercent.innerText = calcUsedCards(usedCardsArrCount, startingCardsCount);

      } else {

        gameStatus = false;
        preGameStatus.innerText = errMessage;
        preGameStatus2.innerText = errMessage2;

      };

    };

    function resetGame (event) {

        window.location.reload();

    };

  // #endregion =========================================================


  // #region Events ======================================================
  //======================================================================

    deckOptions.addEventListener("change", deckFunc, false);

    doubleOptions.addEventListener("change", dblFunc, false);

    surrenderOptions.addEventListener("change", surrFunc, false);

    soft17Options.addEventListener("change", soft17func, false);

    setGameButton.addEventListener("click", setGame, false);

    resetGameButton.addEventListener("click", resetGame, false);
    
  // #endregion ==========================================================
  

  // #region // =================== Play Game Function ====================
  // function to start game after first "Hit" click event, 
  
    const playGame = () => {

      // then use "shuffled" cards arr for the rest of the game

      // After win/lose, move cards to usedcardarr

      // Repeat... until cards have run out (**some cards will reamin)

      var hitBtnCount = 0;
      var stndBtnCount = 0;

      // #region // Methods ===================================================

        // #region // Surrender button function (clear round)

          function surrButton () {

            // disable surrender button
            surrBtn.disabled = true;

            // round status update with delay
            setTimeout(function() {

              roundStatus.style.color = "orange";
              roundStatus.innerText = "Surrendered, table cleared. Click 'Hit' to deal next round."

            }, 1333);

            console.log("Surrendered start.");

            // remove cards from table to used card array
            // from hole card arr
            for (i = holeCardArr.length; i--;) {

              usedCardsArr.push(holeCardArr.shift());

            };

            // and for dealer
            for (i = dealersCardsArr.length; i--;) {

              usedCardsArr.push(dealersCardsArr.shift());

            };
            
            // and for player
            for (i = playersCardsArr.length; i--;) {

              usedCardsArr.push(playersCardsArr.shift());

            };

            // round counter +1
            round += 1;
            
            // update .innerTexts for dealer & player
            dealersCards.innerText = "";
            playersCards.innerText = "";
            dealersCardsTValAmount = [0];
            playersCardsTValAmount = [0];
            dealersCardsTVal.innerText = 0;
            playersCardsTVal.innerText = 0;

            // card percentages
            calcNewCards(startingCardsCount, currentCardsCount);
            calcUsedCards(usedCardsArrCount, startingCardsCount)

            // reset place bet and bet amount
            placeBetAmount = 0;
            placeBetCounter.innerText = placeBetAmount;

            betAmount = 0;
            betAmountCounter.innerText = betAmount;

            // reset hit/stand btn counts and stand/surrender buttons enabled
            hitBtnCount = 0;
            stndBtnCount = 0;
            standBtn.disabled = false;

            // update console
            console.log("Surrendered Complete.");
            console.log("Used Cards: ");
            console.log(usedCardsArr);
            console.log("Remaining Cards: ");
            console.log(cardsShuffledArr);

          };

        // #endregion  

        // #region // Double bet function

          function dblButton () {

            placeBetAmount = placeBetAmount * 2;
            placeBetCounter.innerText = placeBetAmount;
            
            betAmount = betAmount * 2;
            betAmountCounter.innerText = betAmount;

            bankRollAmount = (bankRollAmount) - (0.5 * placeBetAmount);
            bankRollCounter.innerText = bankRollAmount;

          };

        // #endregion  

        // #region // Hit Button, game start included

          function hitButton () {

          // get TValCalc for player
          playerTValCalc(playersCardsTValAmount);

          // conditional statements
          if (gameStatus === false) {
            
            // round status update
            roundStatus.style.color = "red";
            roundStatus.innerText = "Set game first.";

          } else if (gameStatus === true && hitBtnCount === 0) {

            // check if bet has been placed first
            if (placeBetAmount === 0) {

              // round status update
              roundStatus.style.color = "red";
              roundStatus.innerText = "Place bet first.";

            } else if (placeBetAmount > 100) {

              // round status update
              roundStatus.style.color = "red";
              roundStatus.innerText = "Check bet amount: Min. 1 & Max. 100.";

            } else if (cardsShuffledArr.length < 4) {
              
              roundStatus.style.color = "Red";
              roundStatus.innerText = "Out of Cards, Game Over."

            } else {

              // set bet amount to placeBetAmount
              betAmount = placeBetAmount;
              betAmountCounter.innerText = betAmount;

              // round ++
              round + 1;
              roundCounter.innerText = round;

              // disable bet buttons
              resetBetBtn.disabled = true;
              unit1Btn.disabled = true;
              unit5Btn.disabled = true;
              unit10Btn.disabled = true;
              unit25Btn.disabled = true;
              unit50Btn.disabled = true;
              unit100Btn.disabled = true;
              unit1000Btn.disabled = true;

              // reset stand/surrender buttons
              standBtn.disabled = false;
              surrBtn.disabled = false;
              insBtn.disabled = false;
              insBtn.style.display = "none";

              // round status update & round counter
              roundStatus.style.color = "lightgreen";
              roundStatus.innerText = "Hit button pressed, starting game.";
              
              // players cards
              playersCardsArr.push(cardsShuffledArr.shift());
              playersCardsArr.push(cardsShuffledArr.shift());
              playersCardsJoined = playersCardsArr.join("");
              playersCards.innerText = playersCardsJoined;
              playersCardsTValAmount = cardArraystoNumbersPlayer(playersCardsArr);
              playersCardsTVal.innerText = playersCardsTValAmount;

              // "Hole Card" & dealers cards
              holeCardArr.push(cardsShuffledArr.shift());
              holeCard.innerText = holeCardArr;
              dealersCardsArr.push(cardsShuffledArr.shift());
              dealersCards.innerText = dealersCardsArr;
              dealersCardsTValAmount = cardArraystoNumbersDealer(dealersCardsArr);
              dealersCardsTVal.innerText = dealersCardsTValAmount;

              // if dealer has Ace as first card, show insurance button
              if (dealersCardsTValAmount === "1 or 11") {

                insBtn.style.display = "inline-block";

              } else {};
              
              // card percentages
              calcNewCards(startingCardsCount, currentCardsCount);

              // keep track in console
              console.log("Remaining Cards = ");
              console.log(cardsShuffledArr);

              // hit button count
              hitBtnCount += 1;

            };

          } else {
            
            // more conditional statements
            // check if bet has been placed first
            if (placeBetAmount === 0) {

              // round status update
              roundStatus.style.color = "red";
              roundStatus.innerText = "Place bet first.";

            } else if (placeBetAmount > 100) {

              // round status update
              roundStatus.style.color = "red";
              roundStatus.innerText = "Check bet amount: Min. 1 & Max. 100.";

            } else if (playerDeterminedTVal <= 21 && stndBtnCount === 0) {

              // disable reset bet button
              resetBetBtn.disabled = true;

              // round status update
              roundStatus.innerText = "Hit or Stand";

              // players cards
              playersCardsArr.push(cardsShuffledArr.shift());
              playersCardsJoined = playersCardsArr.join("");
              playersCards.innerText = playersCardsJoined;
              playersCardsTValAmount = cardArraystoNumbersPlayer(playersCardsArr);
              playersCardsTVal.innerText = playersCardsTValAmount;

              // card percentages
              calcNewCards(startingCardsCount, currentCardsCount);
              calcUsedCards(usedCardsArrCount, startingCardsCount);

              // check TValCal for both again
              dealerTValCalc(dealersCardsTValAmount);
              playerTValCalc(playersCardsTValAmount);

              // then check if 21 or pushed over 21
              if (playerDeterminedTVal > 21) {

                // disable buttons
                hitBtn.disabled = true;
                standBtn.disabled = true;
                surrBtn.disabled = true;

                // turn over hole card to determine dealer TVal for insurance win/loss
                dealersCardsArr.unshift(holeCardArr.shift());
                holeCard.innerText = holeCardArr;
                dealersCards.innerText = dealersCardsArr.join("");
                dealersCardsTValAmount = cardArraystoNumbersDealer(dealersCardsArr);
                dealersCardsTVal.innerText = dealersCardsTValAmount;

                // card percentages
                calcNewCards(startingCardsCount, currentCardsCount);
                calcUsedCards(usedCardsArrCount, startingCardsCount);

                // get TValCalc respectively
                dealerTValCalc(dealersCardsTValAmount);
                playerTValCalc(playersCardsTValAmount);

                // run calcInsurance
                setTimeout(function() {

                  calcInsurance(dealerDeterminedTVal);

                }, 1333);
                
                // run calcWinner
                setTimeout(function() {
        
                  calcWinner(dealersCardsTValAmount, playersCardsTValAmount);

                  // reset hit button
                  hitBtn.disabled = false;

                }, 2666);

                // update console
                console.log("Winner calculated, no more hits allowed.");

              } else {

              // keep track in console
              console.log("Remaining Cards = ");
              console.log(cardsShuffledArr);

              };

            } else if (playerDeterminedTVal > 21 && stndBtnCount === 0) { 

              // remove cards from table to used card array
              // from hole card arr
              for (i = holeCardArr.length; i--;) {

                usedCardsArr.push(holeCardArr.shift());

              };

              // and for dealer
              for (i = dealersCardsArr.length; i--;) {

                usedCardsArr.push(dealersCardsArr.shift());

              };
              // and for player
              for (i = playersCardsArr.length; i--;) {

                usedCardsArr.push(playersCardsArr.shift());

              };

              // round counter +1
              round += 1;

              // round status update after table is cleared
              roundStatus.innerText = "Click 'Hit' button to deal next round."
            
              // update .innerTexts for dealer & player
              dealersCards.innerText = "";
              playersCards.innerText = "";
              dealersCardsTValAmount = [0];
              playersCardsTValAmount = [0];
              dealersCardsTVal.innerText = dealersCardsTValAmount;
              playersCardsTVal.innerText = playersCardsTValAmount;

              // card percentages
              calcNewCards(startingCardsCount, currentCardsCount);
              calcUsedCards(usedCardsArrCount, startingCardsCount)

              // reset hit/stand btn counts
              hitBtnCount = 0;
              stndBtnCount = 0;

              // update console
              console.log("Used Cards: ");
              console.log(usedCardsArr);

            } else if (stndBtnCount > 0 ) {

              // remove cards from table to used card array
              // from hole card arr
              for (i = holeCardArr.length; i--;) {

                usedCardsArr.push(holeCardArr.shift());

              };
              
              // and for dealer
              for (i = dealersCardsArr.length; i--;) {

                usedCardsArr.push(dealersCardsArr.shift());

              };

              // and for player
              for (i = playersCardsArr.length; i--;) {

                usedCardsArr.push(playersCardsArr.shift());

              };

              // round counter +1
              round += 1;

              // round status update after table is cleared
              roundStatus.innerText = "Click 'Hit' button to deal next round."
            
              // update .innerTexts for dealer & player
              dealersCards.innerText = "";
              playersCards.innerText = "";
              dealersCardsTValAmount = [0];
              playersCardsTValAmount = [0];
              dealersCardsTVal.innerText = dealersCardsTValAmount;
              playersCardsTVal.innerText = playersCardsTValAmount;

              // card percentages
              calcNewCards(startingCardsCount, currentCardsCount);
              calcUsedCards(usedCardsArrCount, startingCardsCount)

              // reset hit/stand btn counts and stand/surrender buttons enabled, reset bet button reset
              hitBtnCount = 0;
              stndBtnCount = 0;
              standBtn.disabled = false;
              surrBtn.disabled = false;
              resetBetBtn.disabled = false;

              // update console
              console.log("Used Cards: ");
              console.log(usedCardsArr);

            } else if (cardsShuffledArr.length < 4) {
              
              roundStatus.style.color = "Red";
              roundStatus.innerText = "Out of Cards, Game Over."

            } else {

              console.log("hit btn error...");

            };

          };
          
          };

        // #endregion

        // #region // Stand Button Sequence Function

          function stndBtnSequence (event) {

            if (gameStatus === false) {
              
              roundStatus.style.color = "red";
              roundStatus.innerText = "Set game first.";

            } else if (gameStatus === true && hitBtnCount === 0) {

              roundStatus.style.color = "red";
              roundStatus.innerText = "Press Hit Button first!";

            } else {
              
              // round status update
              roundStatus.style.color = "Yellow";
              roundStatus.innerText = "Player Stands!";

              // update console
              console.log("Stand Sequence Started");

              // disable buttons
              hitBtn.disabled = true;
              standBtn.disabled = true;
              surrBtn.disabled = true;

              // "Step 1" = "Hole Card" & dealers cards
              dealersCardsArr.unshift(holeCardArr.shift());
              holeCard.innerText = holeCardArr;
              dealersCards.innerText = dealersCardsArr.join("");
              dealersCardsTValAmount = cardArraystoNumbersDealer(dealersCardsArr);
              dealersCardsTVal.innerText = dealersCardsTValAmount;

              // card percentages
              calcNewCards(startingCardsCount, currentCardsCount);
              calcUsedCards(usedCardsArrCount, startingCardsCount);

              // get TValCalc respectively
              dealerTValCalc(dealersCardsTValAmount);
              playerTValCalc(playersCardsTValAmount);

              // run calcInsurance
              setTimeout(function() {

                calcInsurance(dealerDeterminedTVal);

              }, 888);

              // update console
              console.log("Sequence -Step 1");
              console.log("Dealer Determined TVal: " + dealerDeterminedTVal);

              // continue iteration = "Step 2", unless
              if (dealerDeterminedTVal < 17) {

                // set holecard display to none
                holeCard.style.display = "none";

                // dealers cards
                dealersCardsArr.push(cardsShuffledArr.shift());
                dealersCards.innerText = dealersCardsArr.join("");
                dealersCardsTValAmount = cardArraystoNumbersDealer(dealersCardsArr);
                dealersCardsTVal.innerText = dealersCardsTValAmount;

                // card percentages
                calcNewCards(startingCardsCount, currentCardsCount);
                calcUsedCards(usedCardsArrCount, startingCardsCount);

                // get TValCalc respectively
                dealerTValCalc(dealersCardsTValAmount);
                playerTValCalc(playersCardsTValAmount);

                // update console
                console.log("Sequence -Step 2");
                console.log("Dealer Determined TVal: " + dealerDeterminedTVal);

                // continue iteration = "Step 3", unless
                if (dealerDeterminedTVal < 17) {

                  // dealers cards
                  dealersCardsArr.push(cardsShuffledArr.shift());
                  dealersCards.innerText = dealersCardsArr.join("");
                  dealersCardsTValAmount = cardArraystoNumbersDealer(dealersCardsArr);
                  dealersCardsTVal.innerText = dealersCardsTValAmount;

                  // card percentages
                  calcNewCards(startingCardsCount, currentCardsCount);
                  calcUsedCards(usedCardsArrCount, startingCardsCount);

                  // get TValCalc respectively
                  dealerTValCalc(dealersCardsTValAmount);
                  playerTValCalc(playersCardsTValAmount);

                  // update console
                  console.log("Sequence -Step 3");
                  console.log("Dealer Determined TVal: " + dealerDeterminedTVal);

                  // continue iteration = "Step 4", unless
                  if (dealerDeterminedTVal < 17) {

                    // dealers cards
                    dealersCardsArr.push(cardsShuffledArr.shift());
                    dealersCards.innerText = dealersCardsArr.join("");
                    dealersCardsTValAmount = cardArraystoNumbersDealer(dealersCardsArr);
                    dealersCardsTVal.innerText = dealersCardsTValAmount;

                    // card percentages
                    calcNewCards(startingCardsCount, currentCardsCount);
                    calcUsedCards(usedCardsArrCount, startingCardsCount);

                    // get TValCalc respectively
                    dealerTValCalc(dealersCardsTValAmount);
                    playerTValCalc(playersCardsTValAmount);

                    // update console
                    console.log("Sequence -Step 4");
                    console.log("Dealer Determined TVal: " + dealerDeterminedTVal);

                    if (dealerDeterminedTVal < 17) {

                      // dealers cards
                      dealersCardsArr.push(cardsShuffledArr.shift());
                      dealersCards.innerText = dealersCardsArr.join("");
                      dealersCardsTValAmount = cardArraystoNumbersDealer(dealersCardsArr);
                      dealersCardsTVal.innerText = dealersCardsTValAmount;

                      // card percentages
                      calcNewCards(startingCardsCount, currentCardsCount);
                      calcUsedCards(usedCardsArrCount, startingCardsCount);

                      // get TValCalc respectively
                      dealerTValCalc(dealersCardsTValAmount);
                      playerTValCalc(playersCardsTValAmount);

                      // update console
                      console.log("Sequence -Step 5");
                      console.log("Dealer Determined TVal: " + dealerDeterminedTVal);

                    } else { // run calcwinner with delay
                    
                      setTimeout(function() {

                        calcWinner(dealersCardsTValAmount, playersCardsTValAmount);

                      }, 3000);

                      // update console
                      console.log("Winner calculated, Stand Sequence Finished");
                    
                    };

                  } else { // run calcwinner with delay
                  
                    setTimeout(function() {

                      calcWinner(dealersCardsTValAmount, playersCardsTValAmount);

                    }, 3000);

                    // update console
                    console.log("Winner calculated, Stand Sequence Finished");

                  };

                } else { // run calcwinner with delay
                
                  setTimeout(function() {

                    calcWinner(dealersCardsTValAmount, playersCardsTValAmount);

                  }, 3000);

                  // update console
                  console.log("Winner calculated, Stand Sequence Finished");

                };

              } else if (userchoiceSoft17 === "Dealer Hits" && dealersCardsTValAmount === "7 or 17") {

                // update console
                console.log("7 or 17, Dealer Hits! -start");

                // set holecard display to none
                holeCard.style.display = "none";

                // dealers cards
                dealersCardsArr.push(cardsShuffledArr.shift());
                dealersCards.innerText = dealersCardsArr.join("");
                dealersCardsTValAmount = cardArraystoNumbersDealer(dealersCardsArr);
                dealersCardsTVal.innerText = dealersCardsTValAmount;

                // card percentages
                calcNewCards(startingCardsCount, currentCardsCount);
                calcUsedCards(usedCardsArrCount, startingCardsCount);

                // get TValCalc respectively
                dealerTValCalc(dealersCardsTValAmount);
                playerTValCalc(playersCardsTValAmount);

                // run calcwinner with delay
                setTimeout(function() {

                  calcWinner(dealersCardsTValAmount, playersCardsTValAmount);

                  // update console
                  console.log("Stand Sequence Finished");

                }), 3000;

              } else { // run calcwinner with delay
                
                setTimeout(function() {

                  calcWinner(dealersCardsTValAmount, playersCardsTValAmount);

                  // update console
                  console.log("Stand Sequence Finished");

                }), 3000;

              };

              // stand button count
              stndBtnCount += 1;
            
            };

          };

        // #endregion

        /* 2xAfter Split button function (not in use) */

        // #region // Insurance function

          function insuranceBet (event) {

          bankRollAmount = bankRollAmount - (placeBetAmount/2);
          bankRollCounter.innerText = bankRollAmount;

          insuranceAmount = (placeBetAmount/2);
          insuranceCounter.innerText = insuranceAmount;

          insBtn.disabled = true;

          };

        // #endregion  

        // #region // Bet Unit buttons

          function unit1Func () {

            placeBetAmount = placeBetAmount + unit1;
            placeBetCounter.innerText = placeBetAmount;

            bankRollAmount = bankRollAmount - unit1;
            bankRollCounter.innerText = bankRollAmount;

            betAmount = betAmount + unit1;
            betAmountCounter.innerText = betAmount;

          };

          function unit5Func () {

            placeBetAmount = placeBetAmount + unit5;
            placeBetCounter.innerText = placeBetAmount;

            bankRollAmount = bankRollAmount - unit5;
            bankRollCounter.innerText = bankRollAmount;

            betAmount = betAmount + unit5;
            betAmountCounter.innerText = betAmount;

          };

          function unit10Func () {

            placeBetAmount = placeBetAmount + unit10;
            placeBetCounter.innerText = placeBetAmount;

            bankRollAmount = bankRollAmount - unit10;
            bankRollCounter.innerText = bankRollAmount;

            betAmount = betAmount + unit10;
            betAmountCounter.innerText = betAmount;

          };

          function unit25Func () {

            placeBetAmount = placeBetAmount + unit25;
            placeBetCounter.innerText = placeBetAmount;

            bankRollAmount = bankRollAmount - unit25;
            bankRollCounter.innerText = bankRollAmount;
            
            betAmount = betAmount + unit25;
            betAmountCounter.innerText = betAmount;

          };

          function unit50Func () {

            placeBetAmount = placeBetAmount + unit50;
            placeBetCounter.innerText = placeBetAmount;

            bankRollAmount = bankRollAmount - unit50;
            bankRollCounter.innerText = bankRollAmount;

            betAmount = betAmount + unit50;
            betAmountCounter.innerText = betAmount;

          };

          function unit100Func () {

            placeBetAmount = placeBetAmount + unit100;
            placeBetCounter.innerText = placeBetAmount;

            bankRollAmount = bankRollAmount - unit100;
            bankRollCounter.innerText = bankRollAmount;

            betAmount = betAmount + unit100;
            betAmountCounter.innerText = betAmount;

          };

          function unit1000Func () {

            placeBetAmount = placeBetAmount + unit1000;
            placeBetCounter.innerText = placeBetAmount;

            bankRollAmount = bankRollAmount - unit1000;
            bankRollCounter.innerText = bankRollAmount;

            betAmount = betAmount + unit1000;
            betAmountCounter.innerText = betAmount;

          };
          
          function resetBetFunc () {
            
            resetBetFunction();

          };

        // #endregion
      
      // #endregion =======================================================   

      // #region ======================== Events ==========================
        
        // Surrender Bet Function
        
          surrBtn.addEventListener("click", surrButton, false);

        // Double Bet Function

          dblBtn.addEventListener("click", dblButton, false);

        // Hit Button Event

          hitBtn.addEventListener("click", hitButton, false);

        // Stand Button Event

          standBtn.addEventListener("click", stndBtnSequence, false);

        // Insurance Button Event

          insBtn.addEventListener("click", insuranceBet, false);

        // Unit Button Events

          unit1Btn.addEventListener("click", unit1Func, false);
          unit5Btn.addEventListener("click", unit5Func, false);
          unit10Btn.addEventListener("click", unit10Func, false);
          unit25Btn.addEventListener("click", unit25Func, false);
          unit50Btn.addEventListener("click", unit50Func, false);
          unit100Btn.addEventListener("click", unit100Func, false);
          unit1000Btn.addEventListener("click", unit1000Func, false);
          resetBetBtn.addEventListener("click", resetBetFunc, false);

      // #endregion =======================================================

    };

    playGame();

  // #endregion ==========================================================

};

game();