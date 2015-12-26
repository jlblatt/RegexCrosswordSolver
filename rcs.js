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
      clues = [
        // lol later
      ];
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

    // setup solution array
    solution = createMultiDimArray.apply(this, dims);
    zeroArray(solution);

    //setup status
    var maxGuesses = Math.pow(chars.length, dims.reduce(function (a, b) { return a * b; }, 1));
    jQuery("h1.ng-binding").append('<br /><small style="font-style: italic;">Solving: <span id="rcs-guess">1</span> / ' + maxGuesses + '</small>');

    // solve
    solve();

  }

  function solve()
  {
    // check for win condition
    var solved = true;

    check:
    for(var i = 0; i < clues.length; i++)
    {
      for(var j = 0; j < clues[i].length; j++)
      {
        // build word to test against RegExp
        var word = '';

        // need to recode this section to deal with arrays with more than 2 dimensions
        if(i == 0)
        {
          for(var x = 0; x < solution[j].length; x++)
          {
            word += chars[solution[j][x]];
          }
        }

        else if(i == 1)
        {
          for(var x = 0; x < solution.length; x++)
          {
            word += chars[solution[x][j]];
          }
        }

        // run the test
        if(!clues[i][j].test(word))
        {
          solved = false;
          break check;
        }
      }
    }

    if(solved)
    {
      // solution found
      endTime = new Date();
      elapsedTime = (endTime - startTime) / 1000;
      alert("Solved in " + elapsedTime + " seconds with " + guesses + " guesses!");
      console.log(solution);
      return;
    }

    else
    {
      // increment solution and continue
      guesses++;
      jQuery("#rcs-guess").text(guesses);
      var incremented = {flag: false};
      incrementArray(solution, chars.length, incremented);
      setTimeout(solve, 0);
    }

  }

  // http://stackoverflow.com/a/966938
  function createMultiDimArray(length)
  {
    var arr = new Array(length || 0), i = length;
    if(arguments.length > 1)
    {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = createMultiDimArray.apply(this, args);
    }
    return arr;
  }

  // http://stackoverflow.com/a/15854485/3365483
  function zeroArray(arr)
  {
    for(var i = 0; i < arr.length; i++)
    {
      if(Array.isArray(arr[i])) zeroArray(arr[i]);
      else arr[i] = 0;
    }
  }

  function incrementArray(arr, mod, incremented)
  {
    for(var i = 0; i < arr.length; i++)
    {
      if(Array.isArray(arr[i])) incrementArray(arr[i], mod, incremented);
      else if(!incremented.flag)
      {
        arr[i]++;
        if(arr[i] < mod)
        {
          incremented.flag = true;
          return;
        }
        else arr[i] = 0;
      }
    }
  }

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
  s.onload = init;
  document.getElementsByTagName("head")[0].appendChild(s);

})();
