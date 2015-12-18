(function () {

  var clues, solution, p = [0, 0];
  var startTime = new Date(), endTime, elapsedTime;
  
  var chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var wildcard = "~";
  
  function init()
  {
    jQuery.noConflict();

    // hexagonal puzzle
    if(jQuery("form.puzzle-hexagonal").length > 0)
    {
      // lol later
    }

    // rectangular puzzle
    else
    {
      clues = [
        jQuery("div.grid table tbody tr th:even span"),
        jQuery("div.grid table thead tr th:gt(0) span")
      ];
    }

    // change dom objects to regexs and setup clues array
    var dims = [];
    for(var i = 0; i < clues.length; i++)
    {
      dims.push(clues[i].length);
      for(var j = 0; j < clues[i].length; j++)
      {
        clues[i][j] = {
          string: clues[i][j].getAttribute('title')
          regex: new RegExp(clues[i][j].getAttribute('title'))
        }
      }
    }

    // setup solution array
    solution = createArray.apply(this, dims);

    // prune the number of characters we need to check
    for(var i = 0; i < solution.length; i++)
    {
      var xclue = clues[0][i].string;
      var xcount = clues[1].length;

      for(var j = 0; j < solution[i].length; j++)
      {
        var yclue = clues[1][j].string;
        var ycount = clues[0].length;

        solution[i][j] = chars;

        for(var k = 0; k < solution[i][j].length; k++)
        {
          // setup the strings/regexes to test against
          var xstring = '';
          for(var x = 0; x < xcount; x++)
          {
            if(x == j) xstring += solution[i][j][k];
            else xstring += wildcard;
          }

          var ystring = '';
          for(var y = 0; y < ycount; y++)
          {
            if(y == 1) ystring += solution[i][j][k];
            else ystring += wildcard;
          }

        }
      }
    }

    //console.log(solution);

    //solve();

  }

  function solve()
  {
    var solved = false;

    // check for win condition - 2 possible ways to do this:
    //
    // 1) make sure only one character remains in every element of solution[]
    //      -- quicker, but fails if there is more than one valid solution to a puzzle
    //
    // 2) run all regexs against the current state of solution[]
    //      -- expensive, but works if there is more than one valid solution to a puzzle
    //
    // a final version of the algorithm should implement both in some manner
    // for now, use 1) and assume each puzzle only has one solution
    
    check:
    for(var i = 0; i < solution.length; i++)
    {
      for(var j = 0; j < solution[i].length; j++)
      {
        if(solution[i][j].length > 1)
        {
          break check;
        }
      }
    }

    if(solved)
    {
      endTime = new Date();
      elapsedTime = (endTime - startTime) / 1000;
      alert("Solved in " + elapsedTime + " seconds!");
      return;
    }

    // the fun part

    for(var i = 0; i < solution[p[0], p[1]].length; i++)
    {

    }

    solve();
  }

  // http://stackoverflow.com/a/966938
  function createArray(length) 
  {
    var arr = new Array(length || 0), i = length;
    if(arguments.length > 1)
    {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
  }

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
  s.onload = init;
  document.getElementsByTagName("head")[0].appendChild(s);

})();
