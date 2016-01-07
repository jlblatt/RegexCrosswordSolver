(function () {

  var clues, solution, guesses = 1;
  var chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var startTime = new Date(), endTime, elapsedTime;

  function init()
  {
    jQuery.noConflict();

    // hexagonal puzzle
    if(jQuery("form.puzzle-hexagonal").length > 0)
    {
      // hex fix
      alert("Sorry, hexagonal puzzles aren't supported yet!");
      return;
    }

    // rectangular puzzle
    else
    {
      clues = [
        jQuery("div.grid table tbody tr th:even span"),
        jQuery("div.grid table thead tr th:gt(0) span")
      ];
    }

    // change dom objects to RegExps and setup clues array
    var dims = [];
    for(var i = 0; i < clues.length; i++)
    {
      dims.push(clues[i].length);
      for(var j = 0; j < clues[i].length; j++)
      {
        clues[i][j] = new RegExp('^' + clues[i][j].getAttribute('title') + '$');
      }
    }

    console.log(dims);

    //setup status
    jQuery("h1.ng-binding").append('<br /><small style="font-style: italic;">Solving: <span id="rcs-guess">1</span></small>');

    // solve
    solve();

  }

  function solve()
  {
    // check for win condition
    var solved = true;

    if(solved)
    {
      // solution found
      endTime = new Date();
      elapsedTime = (endTime - startTime) / 1000;
      alert("Solved in " + elapsedTime + " seconds with " + guesses + " guesses!");

      // hex fix

      var answerQueue = [];

      jQuery("input.char").each(function(){
        jQuery(this).val(chars[answerQueue.shift()]);
        angular.element(jQuery(this).get()).triggerHandler('input');
      });

      jQuery("button.validate").click();
      return;
    }

    else
    {
      // increment guesses and continue
      guesses++;
      setTimeout(solve, 0);
    }

  }

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
  s.onload = init;
  document.getElementsByTagName("head")[0].appendChild(s);

})();
