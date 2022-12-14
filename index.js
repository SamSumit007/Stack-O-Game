$(function() {

  

    var shuffledBag = [];
    var tempBag = [];
    var selected = false;
    var tabCounter = 0;
    var firstTurn = true;
    var sameColumn = true;
    var sameRow = true;
    var players = []

    var resetGame = function() {
           
            shuffledBag = [];
            tempBag = [];
            selected = false;
            tabCounter = 0;
            firstTurn = true;
            sameColumn = true;
            sameRow = true;

            players =[{
                name: "",
                score: 0,
                rack: []
            },
            {
                name: "",
                score: 0,
                rack: []
            }]
        }
       
    var createBag = function() {
        tileBag = [
            { letter: "E", score: 1, count: 12 },
            { letter: "A", score: 1, count: 9 },
            { letter: "I", score: 1, count: 9 },
            { letter: "O", score: 1, count: 8 },
            { letter: "N", score: 1, count: 6 },
            { letter: "R", score: 1, count: 6 },
            { letter: "T", score: 1, count: 6 },
            { letter: "L", score: 1, count: 4 },
            { letter: "S", score: 1, count: 4 },
            { letter: "U", score: 1, count: 4 },
            { letter: "D", score: 2, count: 4 },
            { letter: "G", score: 2, count: 3 },
            { letter: "B", score: 3, count: 2 },
            { letter: "C", score: 3, count: 2 },
            { letter: "M", score: 3, count: 2 },
            { letter: "P", score: 3, count: 2 },
            { letter: "F", score: 4, count: 2 },
            { letter: "H", score: 4, count: 2 },
            { letter: "V", score: 4, count: 2 },
            { letter: "W", score: 4, count: 2 },
            { letter: "Y", score: 4, count: 2 },
            { letter: "K", score: 5, count: 1 },
            { letter: "J", score: 8, count: 1 },
            { letter: "X", score: 8, count: 1 },
            { letter: "Q", score: 10, count: 1 },
            { letter: "Z", score: 10, count: 1 }
        ]
    }

    var createBoard = function() {
        for (i = 0; i < 15; i++) {
            var newRow = $('<div class="row"></div>');
            for (j = 0; j < 15; j++) {
                var newBox = $('<div class="box"></div>');
                newBox.attr("data-row", i);
                newBox.attr("data-column", j);
                newRow.append(newBox);
            }
            $('.gameBoard').append(newRow);
        }
    }

    var createLetterKey = function() {
        tileBag.forEach(function(tile) {
            var newListing = $('<li>');
            newListing.text(tile.letter + ": " + tile.score + " points");
            $('.letterValueList').append(newListing);
        });
    }

    var createTileBag = function() {
        while (tileBag.length > 0) {
            tempBag.push(tileBag[0]);
            tileBag[0].count--;
            if (tileBag[0].count === 0) {
                tileBag.shift();
            }
        }
    }

    var shuffleBag = function() {
        while (tempBag.length > 0) {
            var rndm = Math.floor(tempBag.length * Math.random());
            shuffledBag.push(tempBag[rndm]);
            tempBag.splice(rndm, 1);
        }
    }

    var endGame = function() {
        players.forEach(function(player) {
            player.rack.forEach(function(tile) {
                player.score -= tile.score;
            })
        })

        $('.tempInPlay').text("");
        $('.permInPlay').text("");
        $('.permInPlay').removeClass('permInPlay');
        $('.playerOneTile').remove();
        $('.playerTwoTile').remove();
        $('.playerOneTiles').hide();
        $('.playerOneTitle').hide();
        $('.playerTwoTiles').show();
        $('.playerTwoTitle').show();
        $('.playerOneTilesRow').hide();
        $('.playerTwoTilesRow').hide();

        if (players[0].score > players[1].score) {
            alert(players[0].name + " is the winner!\nFinal score:\n" + players[0].name + ": " + players[0].score + " points\n" + players[1].name + ": " + players[1].score + " points");
        } else if (players[0].score < players[1].score) {
            alert(players[1].name + " is the winner!\nFinal score:\n" + players[0].name + ": " + players[0].score + " points\n" + players[1].name + ": " + players[1].score + " points");
        } else {
            alert("It's a tie game!");
        }

        createBag();
        resetGame();
        $('.container').hide();
        $('.letterValuesBox').hide();
        $('.playAgain').show();
    };

    var isItPlayerOnesTurn = function() {
        if ($('.playerOneTiles').css("display") !== 'none') {
            return true;
        } else {
            return false;
        }
    }

    var loadRack = function(player) {
        for (i = player.rack.length; i < 4; i++) {
            if (shuffledBag.length > 0) {
                player.rack.push(shuffledBag[0]);
                shuffledBag.shift();
                if (player === players[0]) {
                    var newTileBox = $('<div class="playerOneTile tileBox"></div>');
                    $('.playerOneTilesRow').append(newTileBox);
                } else {
                    var newTileBox = $('<div class="playerTwoTile tileBox"></div>');
                    $('.playerTwoTilesRow').append(newTileBox);
                }
            }
        }

        if (player === players[0]) {
            for (j = 0; j < $('.playerOneTile').length; j++) {
                $('.playerOneTile').eq(j).text(player.rack[j].letter);
            }
        } else {
            for (j = 0; j < $('.playerTwoTile').length; j++) {
                $('.playerTwoTile').eq(j).text(player.rack[j].letter);
            }
        }
    }

    var letterValue = function(tile) {
        var selectedLetter = tile.text();
        createBag();
        var selectedTile = tileBag.find(function(tile1) {
            return tile1.letter === selectedLetter;
        });
        return selectedTile.score;
    }

    var direction = function(original, adjacent) {
        if (original.attr('data-row') < adjacent.attr('data-row')) {
            return "bottom";
        } else if (original.attr('data-row') > adjacent.attr('data-row')) {
            return "top";
        } else if (original.attr('data-column') < adjacent.attr('data-column')) {
            return "right";
        } else {
            return "left";
        }
    }

    var tallyScore = function(player) {
        var counter = 0;
        $(".counted").removeClass('counted');

        for (var i = 0; i < $('.tempInPlay').length; i++) {
            player.score += letterValue($('.tempInPlay').eq(i));
            var adjacentToMe = adjacentTiles(parseInt($('.tempInPlay').eq(i).attr('data-row')), parseInt($('.tempInPlay').eq(i).attr('data-column')), true, true, true, true);

            for (j = 0; j < adjacentToMe.length; j++) {
                if (adjacentToMe[j].hasClass('permInPlay') && !(adjacentToMe[j].hasClass('counted'))) {
                    player.score += letterValue(adjacentToMe[j]);
                    adjacentToMe[j].addClass('counted');
                    if ((sameRow && (adjacentToMe[j].attr('data-column') === $('.tempInPlay').eq(i).attr('data-column'))) || (sameColumn && (adjacentToMe[j].attr('data-row') === $('.tempInPlay').eq(i).attr('data-row')))) {
                        player.score += letterValue($('.tempInPlay').eq(i));
                    }
                    var stop = false;

                    if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "left") {
                        var dirCounter = 0;
                        while (stop === false) {
                            var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')), parseInt(adjacentToMe[j].attr('data-column')) - dirCounter, false, false, true, false);
                            if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                player.score += letterValue(nextOne[0]);
                                nextOne[0].addClass("counted");
                                dirCounter++;
                            } else {
                                stop = true;
                            }
                        }
                    }
                    if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "right") {
                        var dirCounter = 0;
                        while (stop === false) {
                            var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')), parseInt(adjacentToMe[j].attr('data-column')) + dirCounter, false, false, false, true);
                            if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                player.score += letterValue(nextOne[0]);
                                nextOne[0].addClass("counted");
                                dirCounter++;
                            } else {
                                stop = true;
                            }
                        }
                    }
                    if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "top") {
                        var dirCounter = 0;
                        while (stop === false) {
                            var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')) - dirCounter, parseInt(adjacentToMe[j].attr('data-column')), true, false, false, false);
                            if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                player.score += letterValue(nextOne[0]);
                                nextOne[0].addClass("counted");
                                dirCounter++;
                            } else {
                                stop = true;
                            }
                        }
                    }
                    if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "bottom") {
                        var dirCounter = 0;
                        while (stop === false) {
                            var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')) + dirCounter, parseInt(adjacentToMe[j].attr('data-column')), false, true, false, false);
                            if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                player.score += letterValue(nextOne[0]);
                                nextOne[0].addClass("counted");
                                dirCounter++;
                            } else {
                                stop = true;
                            }
                        }
                    }
                }
            }
        }

        if (isItPlayerOnesTurn()) {
            while (counter < player.rack.length) {
                if ($('.playerOneTile').eq(counter).css("display") === 'none') {
                    player.rack.splice(counter, 1);
                    $('.playerOneTile').eq(counter).remove();
                } else {
                    counter++;
                }
            }
        } else {
            while (counter < player.rack.length) {
                if ($('.playerTwoTile').eq(counter).css("display") === 'none') {
                    player.rack.splice(counter, 1);
                    $('.playerTwoTile').eq(counter).remove();
                } else {
                    counter++;
                }
            }
        }
    }

    var turn = function() {
        $('.playerOneTilesRow').hide();
        $('.playerTwoTilesRow').hide();
        $('.showTiles').show();
        if (shuffledBag.length > 0) {
            loadRack(players[0]);
            loadRack(players[1]);
        }

        if (players[0].rack.length === 0 || players[1].rack.length === 0) {
            endGame();
        } else {
            $('.playerOneTiles').toggle();
            $('.playerOneTitle').toggle();
            $('.playerTwoTiles').toggle();
            $('.playerTwoTitle').toggle();

            $('.playerOneScore').text(players[0].score);
            $('.playerTwoScore').text(players[1].score);
            $('.remainingTiles').text(shuffledBag.length);
        }
    }

    var returnToRack = function() {
        if (isItPlayerOnesTurn()) {
            $('.playerOneTile').css("display", "inline-block");
        } else {
            $('.playerTwoTile').css("display", "inline-block");
        }
        $('.tempInPlay').text("");
        $('.tempInPlay').removeClass('tempInPlay');
    }

    var adjacentTiles = function(row, column, justAbove, justBelow, justLeft, justRight) {
        var allAdjacents = [];
        if (justAbove && row > 0) {
            var above = $("[data-row=\'" + (row - 1) + "\'][data-column=\'" + column + "\']");
            allAdjacents.push(above);
        }
        if (justBelow && row < 14) {
            var below = $("[data-row=\'" + (row + 1) + "\'][data-column=\'" + column + "\']");
            allAdjacents.push(below);
        }
        if (justLeft && column > 0) {
            var left = $("[data-row=\'" + row + "\'][data-column=\'" + (column - 1) + "\']");
            allAdjacents.push(left);
        }
        if (justRight && column < 14) {
            var right = $("[data-row=\'" + row + "\'][data-column=\'" + (column + 1) + "\']");
            allAdjacents.push(right);
        }
        return allAdjacents;
    }

    var correctOrientation = function() {
        sameColumn = true;
        sameRow = true;
        var row = $('.tempInPlay').eq(0).attr('data-row');
        var column = $('.tempInPlay').eq(0).attr('data-column');
        for (i = 0; i < $('.tempInPlay').length; i++) {
            if ($('.tempInPlay').eq(i).attr('data-column') !== column) {
                sameColumn = false;
            }
            if ($('.tempInPlay').eq(i).attr('data-row') !== row) {
                sameRow = false;
            }
        }
        return (sameRow || sameColumn);
    }

    var permanentAdjacent = function() {
        for (i = 0; i < $('.tempInPlay').length; i++) {
            var adjacentToMe = adjacentTiles(parseInt($('.tempInPlay').eq(i).attr('data-row')), parseInt($('.tempInPlay').eq(i).attr('data-column')), true, true, true, true);
            for (j = 0; j < adjacentToMe.length; j++) {
                if (adjacentToMe[j].hasClass('permInPlay')) {
                    return true;
                }
            }
        }
        return false;
    }

    var allTouching = function() {
        var counter = 0;
        if (sameRow) {
            for (l = 0; l < $('.tempInPlay').length; l++) {
                var adjacentToMe = adjacentTiles(parseInt($('.tempInPlay').eq(l).attr('data-row')), parseInt($('.tempInPlay').eq(l).attr('data-column')), false, false, true, true);
                for (x = 0; x < adjacentToMe.length; x++) {
                    if (!(adjacentToMe[x].hasClass('permInPlay') || adjacentToMe[x].hasClass('tempInPlay'))) {
                        counter++;
                    }
                }
                if (parseInt($('.tempInPlay').eq(l).attr('data-column')) === 0 || parseInt($('.tempInPlay').eq(l).attr('data-column')) === 14) {
                    counter++;
                }
            }

        } else if (sameColumn) {
            for (l = 0; l < $('.tempInPlay').length; l++) {
                var adjacentToMe = adjacentTiles(parseInt($('.tempInPlay').eq(l).attr('data-row')), parseInt($('.tempInPlay').eq(l).attr('data-column')), true, true, false, false);
                for (x = 0; x < adjacentToMe.length; x++) {
                    if (!(adjacentToMe[x].hasClass('permInPlay') || adjacentToMe[x].hasClass('tempInPlay'))) {
                        counter++;
                    }
                }
                if (parseInt($('.tempInPlay').eq(l).attr('data-row')) === 0 || parseInt($('.tempInPlay').eq(l).attr('data-row')) === 14) {
                    counter++;
                }
            }
        }
        if (counter > 2) {
            return false;
        }
        return true;
    }

    var submitWord = function() {
        correctOrientation();
        if ($('.tempInPlay').length > 0 && (firstTurn || permanentAdjacent()) && ($('.tempInPlay').length === 1 || correctOrientation()) && allTouching()) {
            if (isItPlayerOnesTurn()) {
                tallyScore(players[0]);
            } else {
                tallyScore(players[1]);
            }
            $('.tempInPlay').addClass('permInPlay');
            $('.tempInPlay').removeClass('tempInPlay');
            turn();
            firstTurn = false;
            sameColumn = true;
            sameRow = true;
        }
    }

    var refreshTiles = function() {
        returnToRack();
        if (isItPlayerOnesTurn()) {
            players[0].rack.forEach(function(tile) {
                shuffledBag.splice(Math.floor(Math.random() * shuffledBag.length), 0, tile);
            });
            while (players[0].rack.length > 0) {
                players[0].rack.pop();
            }
            $('.playerOneTile').remove();
        } else {
            players[1].rack.forEach(function(tile) {
                shuffledBag.splice(Math.floor(Math.random() * shuffledBag.length), 0, tile);
            });
            while (players[1].rack.length > 0) {
                players[1].rack.pop();
            }
            $('.playerTwoTile').remove();
        }
        turn();
    }

    var showTiles = function() {
        if (isItPlayerOnesTurn()) {
            $('.playerOneTilesRow').show();
        } else {
            $('.playerTwoTilesRow').show();
        }
        $('.showTiles').hide();
    }

    var tabClick = function() {
        if (tabCounter % 2 === 0) {
            $('.letterValuesBox').removeClass('slideRight');
            $('.letterValuesBox').addClass('slideLeft');
        } else {
            $('.letterValuesBox').removeClass('slideLeft');
            $('.letterValuesBox').addClass('slideRight');
        }
        tabCounter++;
    }

    var startGame = function() {
        if (($('.playerOneName').val() !== "") && ($('.playerTwoName').val() !== "")) {
            $('.instructions').fadeOut(1000);
            players[0].name = $('.playerOneName').val();
            players[1].name = $('.playerTwoName').val();
            $('.playerOneDisplayName').text(players[0].name + "\'s Score");
            $('.playerTwoDisplayName').text(players[1].name + "\'s Score");
            turn();
        } else {
            alert("Please make sure both players have entered their names!");
        }
    }

    var startingProcedure = function() {
        $('.playAgain').hide();
        $('.container').show();
        $('.letterValuesBox').show();
        $('.instructions').fadeIn();
        createTileBag();
        shuffleBag();
    }

  
    resetGame();
    createBag();
    createBoard();
    createLetterKey();
    startingProcedure();

    
    $(document.body).on('click', '.tileBox', function() {
        $('.tileBox').removeClass('selected');
        $(this).addClass('selected');
        selected = true;
    });

    $(document.body).on('click', '.box', function() {
        if (selected) {
            if (!($(this).hasClass('permInPlay')) && (!$(this).hasClass('tempInPlay'))) {
                $(this).text($('.selected').text());
                $(this).addClass('tempInPlay')
                $('.selected').hide();
                $('.selected').removeClass('selected');
                selected = false;
            }
        }
    });

    $('.start').click(startGame);

    $('.submitWord').click(submitWord);

    $('.refreshTiles').click(refreshTiles);

    $('.backToRack').click(returnToRack);

    $('.showTiles').click(showTiles);

    $('.tab').click(tabClick);

    $('.playAgain').click(startingProcedure);

});