$(document).ready(function() {

    var ttt = {
        /* is */
        userTurnToMove: true,
        userClicked: false,
        step: 0,
        arrayWin: [],
        madeMove: false,
        userMoveCounter: 0,
        userPlaysCross: true,
        cpuMoveCounter: 0
    };
    var initialPlayerSelect = function() {
        $("#dialog").dialog({
            closeOnEscape: false,
            open: function(event, ui) {
                $(".ui-dialog-titlebar-close").hide();
                $(".ui-dialog-titlebar").hide();
            },
            autoOpen: true,
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Play X": function() {

                    $(this).dialog("close");
                    console.log('X selected');
                    ttt.userTurnToMove = true;
                },
                "Play O": function() {
                    $(this).dialog("close");
                    console.log('O selected. CPU playes X, user plays O');
                    ttt.userTurnToMove = false;
                    ttt.userPlaysCross = false;
                    console.log('ttt.userTurnToMove', ttt.userTurnToMove);
                    attack();
                }
            },
            show: {
                effect: "fade",
                duration: 500
            },
            hide: {
                effect: "fade",
                duration: 500
            }
        });
    };
    initialPlayerSelect();
    //setup();

    function setup() {
        //ttt.isUserCross(userStartsFirst);

        //ttt.userTurnToMove = true;
        ttt.userMoveCounter = 0;
        ttt.cpuMoveCounter = 0;
        $('#board .cell').each(function(idx, el) {
            if ($(el).hasClass('cross')) {
                $(el).removeClass('cross');
            }
            if ($(el).hasClass('nought')) {
                $(el).removeClass('nought');
            }
            $(el).addClass('empty');
        });
        console.log('board prepared for new game');
    }

    $('.cell').click(function() {
        /**
         * Scenario when a user plays X
         */
        if (ttt.userTurnToMove && ttt.userPlaysCross) {
            //ttt.step++;
            //let cellNumber = $(this).data('number');

            if ($(this).hasClass('empty')) {
                $(this).removeClass('empty');
                $(this).addClass('cross');
                ttt.userMoveCounter++;
                console.log('ttt.userMoveCounter', ttt.userMoveCounter);

                if (checkForWin('cross')) {
                    setTimeout(function() {
                        alert('cross has won');

                    }, 100);
                    setTimeout(function() {
                        setup();
                    }, 100);
                } else if (isAllCellsPlayed()) {
                    setTimeout(function() {
                        alert('draw');
                    }, 100);
                    setTimeout(function() {
                        setup();
                    }, 100);
                }

            }
            ttt.userTurnToMove = false;

            ttt.madeMove = true;
            /* Here is where CPU defends itself agains the user */
            if (ttt.madeMove && !ttt.userTurnToMove) {
                defend();
            }
            //ttt.isUserCross = false;
            /**
             * END of Scenario when a user plays X
             */

        } else if (ttt.userTurnToMove && !ttt.userPlaysCross) {
            console.log(ttt.userTurnToMove);
            console.log(ttt.userPlaysCross);
            if ($(this).hasClass('empty')) {
                $(this).removeClass('empty');
                $(this).addClass('nought');


                if (checkForWin('nought')) {
                    setTimeout(function() {
                        alert('nought has won');

                    }, 100);
                    setTimeout(function() {
                        setup();
                    }, 100);
                } else if (isAllCellsPlayed()) {
                    setTimeout(function() {
                        alert('draw');
                    }, 100);
                    setTimeout(function() {
                        setup();
                    }, 100);
                }

            }
            console.log('a new nought has to be added');

            ttt.userTurnToMove = false;

            ttt.madeMove = true;
            /* Here is where CPU defends itself agains the user */
            if (ttt.madeMove && !ttt.userTurnToMove) {
                attack();
            }
        }
    });

    function attack() {
        console.log('CPU attacks');
        console.log('ttt.userTurnToMove', ttt.userTurnToMove);
        var opportunityPosition = '';
        var dangerPosition = '';

        ttt.cpuMoveCounter++;

        if (ttt.cpuMoveCounter === 1) {
            if (isCellEmpty('#1')) {
                makeMove('#1', 'cross');

            }
        } else {
            console.log('no idea');
        }

        if (ttt.cpuMoveCounter === 2) {
            if (isCellEmpty('#3')) {
                makeMove('#3', 'cross');
            } else if (isCellEmpty('#7')) {
                makeMove('#7', 'cross');
            } else if (isCellEmpty('#9')) {
                makeMove('#9', 'cross');
            }

        }

        if (ttt.cpuMoveCounter > 2) {

            dangerPosition = forkAt('nought');
            opportunityPosition = forkAt('cross');
            console.log('opportunityPosition', opportunityPosition);

            if (opportunityPosition !== -1) {
                makeMove(opportunityPosition, 'cross');

            } else {
                if (dangerPosition !== -1) {
                    makeMove(dangerPosition, 'cross');
                } else {
                    if (isCellEmpty('#3')) {
                        makeMove('#3', 'cross');
                    } else if (isCellEmpty('#7')) {
                        makeMove('#7', 'cross');
                    } else if (isCellEmpty('#9')) {
                        makeMove('#9', 'cross');
                    }
                }
            }
        }

        setTimeout(function() {
            if (checkForWin('cross')) {
                console.log('checkForWin TRUE');
                setTimeout(function() {
                    alert('CPU has won');
                }, 1);
                setTimeout(function() {
                    setup();
                }, 100);
            } else if (checkForWin('nought')) {
                setTimeout(function() {
                    alert('user has won');
                }, 1);
                setTimeout(function() {
                    setup();
                }, 100);
            } else {
                console.log('checkForWin FALSE');
            }
        }, 100);

        ttt.userTurnToMove = true;

        console.log('ttt.userTurnToMove', ttt.userTurnToMove);
    }

    function defend() {
        console.log('Code plays noughts');
        var dangerPosition = '';
        var attackPosition = '';

        if (($('#1').hasClass('cross') ||
            $('#3').hasClass('cross') ||
            $('#7').hasClass('cross') ||
            $('#9').hasClass('cross')) &&
            ttt.userMoveCounter === 1) {
            if (isCellEmpty('#5')) {
                makeMove('#5', 'nought');
            //ttt.userTurnToMove = true;
            }
        } else if (($('#4').hasClass('cross') ||
            $('#2').hasClass('cross') ||
            $('#6').hasClass('cross') ||
            $('#8').hasClass('cross')) &&
            ttt.userMoveCounter === 1) {
            if (isCellEmpty('#5')) {
                makeMove('#5', 'nought');
            //ttt.userTurnToMove = true;
            }
        } else if ($('#5').hasClass('cross') && ttt.userMoveCounter === 1) {
            if (isCellEmpty('#1')) {
                makeMove('#1', 'nought');
            //ttt.userTurnToMove = true;
            }
        }

        if (ttt.userMoveCounter === 2) {
            dangerPosition = forkAt('cross');
            console.log('position', dangerPosition);
            if (dangerPosition === -1 && ($('#1').hasClass('cross') ||
                $('#3').hasClass('cross') ||
                $('#7').hasClass('cross') ||
                $('#9').hasClass('cross'))) {
                if (isCellEmpty('#2')) {
                    makeMove('#2', 'nought');
                } else if (isCellEmpty('#4')) {
                    makeMove('#4', 'nought');
                } else if (isCellEmpty('#6')) {
                    makeMove('#6', 'nought');
                } else if (isCellEmpty('#8')) {
                    makeMove('#8', 'nought');
                }
            } else {
                console.log('danger at', dangerPosition);
                makeMove(dangerPosition, 'nought');
            }
        }

        if (ttt.userMoveCounter > 2) {
            dangerPosition = forkAt('cross');
            attackPosition = forkAt('nought');

            if (attackPosition !== -1) {
                console.log('chance to WIN at ' + attackPosition);
                makeMove(attackPosition, 'nought');
            } else if (dangerPosition === -1) {
                if (isCellEmpty('#1')) {
                    makeMove('#1', 'nought');
                } else if (isCellEmpty('#3')) {
                    makeMove('#3', 'nought');
                } else if (isCellEmpty('#9')) {
                    makeMove('#9', 'nought');
                } else if (isCellEmpty('#7')) {
                    makeMove('#7', 'nought');
                } else if (isCellEmpty('#2')) {
                    makeMove('#2', 'nought');
                } else if (isCellEmpty('#4')) {
                    makeMove('#4', 'nought');
                } else if (isCellEmpty('#6')) {
                    makeMove('#6', 'nought');
                } else if (isCellEmpty('#8')) {
                    makeMove('#8', 'nought');
                }
            } else {
                console.log('danger at ' + dangerPosition);
                makeMove(dangerPosition, 'nought');
            }
        //ttt.userTurnToMove = true;
        }

        setTimeout(function() {
            if (checkForWin('nought')) {
                console.log('checkForWin TRUE');
                console.log('checkForWin return ', checkForWin('nought'));
                setTimeout(function() {
                    alert('CPU has won');
                }, 1);
                setTimeout(function() {
                    setup();
                }, 100);
            } else {
                console.log('checkForWin FALSE');
                console.log('checkForWin return ', checkForWin('nought'));
            }
        }, 100);

        ttt.userTurnToMove = true;
    }


    function isCellEmpty(cellId) {
        if ($(cellId).hasClass('empty')) {
            return true;
        }
        return false;
    }

    function makeMove(cellNumber, player) {
        //setTimeout(function() {
        $(cellNumber).removeClass('empty');
        $(cellNumber).addClass(player);
        //}, 100);

    }

    function forkAt(player) {
        if ($('#1').hasClass(player) && $('#2').hasClass(player) && isCellEmpty('#3')) {
            return '#3';
        } else if ($('#2').hasClass(player) && $('#3').hasClass(player) && isCellEmpty('#1')) {
            return '#1';
        } else if ($('#1').hasClass(player) && $('#3').hasClass(player) && isCellEmpty('#2')) {
            return '#2'; /*----*/
        } else if ($('#4').hasClass(player) && $('#5').hasClass(player) && isCellEmpty('#6')) {
            return '#6';
        } else if ($('#5').hasClass(player) && $('#6').hasClass(player) && isCellEmpty('#4')) {
            return '#4';
        } else if ($('#4').hasClass(player) && $('#6').hasClass(player) && isCellEmpty('#5')) {
            return '#5'; /*----*/
        } else if ($('#7').hasClass(player) && $('#8').hasClass(player) && isCellEmpty('#9')) {
            return '#9';
        } else if ($('#8').hasClass(player) && $('#9').hasClass(player) && isCellEmpty('#7')) {
            return '#7';
        } else if ($('#7').hasClass(player) && $('#9').hasClass(player) && isCellEmpty('#8')) {
            return '#8'; /*----*/
        } else if ($('#1').hasClass(player) && $('#4').hasClass(player) && isCellEmpty('#7')) {
            return '#7';
        } else if ($('#4').hasClass(player) && $('#7').hasClass(player) && isCellEmpty('#1')) {
            return '#1';
        } else if ($('#1').hasClass(player) && $('#7').hasClass(player) && isCellEmpty('#4')) {
            return '#4'; /*----*/
        } else if ($('#2').hasClass(player) && $('#5').hasClass(player) && isCellEmpty('#8')) {
            return '#8';
        } else if ($('#2').hasClass(player) && $('#8').hasClass(player) && isCellEmpty('#5')) {
            return '#5';
        } else if ($('#8').hasClass(player) && $('#5').hasClass(player) && isCellEmpty('#2')) {
            return '#2'; /*----*/
        } else if ($('#3').hasClass(player) && $('#6').hasClass(player) && isCellEmpty('#9')) {
            return '#9';
        } else if ($('#3').hasClass(player) && $('#9').hasClass(player) && isCellEmpty('#6')) {
            return '#6';
        } else if ($('#9').hasClass(player) && $('#6').hasClass(player) && isCellEmpty('#3')) {
            return '#3'; /*----*/
        } else if ($('#7').hasClass(player) && $('#5').hasClass(player) && isCellEmpty('#3')) {
            return '#3';
        } else if ($('#7').hasClass(player) && $('#3').hasClass(player) && isCellEmpty('#5')) {
            return '#5';
        } else if ($('#3').hasClass(player) && $('#5').hasClass(player) && isCellEmpty('#7')) {
            return '#7'; /*----*/
        } else if ($('#1').hasClass(player) && $('#5').hasClass(player) && isCellEmpty('#9')) {
            return '#9';
        } else if ($('#1').hasClass(player) && $('#9').hasClass(player) && isCellEmpty('#5')) {
            return '#5';
        } else if ($('#9').hasClass(player) && $('#5').hasClass(player) && isCellEmpty('#1')) {
            return '#1';
        } else {
            return -1;
        }

    }

    function checkForWin(player) {
        if ($('#1').hasClass(player) && $('#2').hasClass(player) && $('#3').hasClass(player) ||
            ($('#4').hasClass(player) && $('#5').hasClass(player) && $('#6').hasClass(player)) ||
            ($('#7').hasClass(player) && $('#8').hasClass(player) && $('#9').hasClass(player)) ||
            ($('#1').hasClass(player) && $('#4').hasClass(player) && $('#7').hasClass(player)) ||
            ($('#2').hasClass(player) && $('#5').hasClass(player) && $('#8').hasClass(player)) ||
            ($('#3').hasClass(player) && $('#6').hasClass(player) && $('#9').hasClass(player)) ||
            ($('#1').hasClass(player) && $('#5').hasClass(player) && $('#9').hasClass(player)) ||
            ($('#3').hasClass(player) && $('#5').hasClass(player) && $('#7').hasClass(player))) {
            /*setTimeout(function() {
                alert(player + ' has won');
            }, 300);
            setTimeout(function() {
                setup();
            }, 1500);*/
            return true;
        } else {
            return false;
        }
    }

    function isAllCellsPlayed() {
        var playedCellCounter = 0;
        $('#board .cell').each(function(idx, el) {
            if ($(el).hasClass('cross') || $(el).hasClass('nought')) {
                playedCellCounter++;
            }
        });
        if (playedCellCounter === 9) {
            return true;
        }
        return false;
    }

});