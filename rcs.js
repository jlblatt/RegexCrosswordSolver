(function () {

  var clues, solution, p = [0, 0];
  var startTime = new Date(), endTime, elapsedTime;

  var chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

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

    // change dom objects to regexs and setup clues array
    var dims = [];
    for(var i = 0; i < clues.length; i++)
    {
      dims.push(clues[i].length);
      for(var j = 0; j < clues[i].length; j++)
      {
        clues[i][j] = new RegExp(clues[i][j].getAttribute('title'));
      }
    }

    // setup solution array
    solution = createArray.apply(this, dims);
    setInitialArrayState(solution);

    //solve();

  }

  function solve()
  {
    var solved = false;

    // check for win condition

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

  // http://stackoverflow.com/a/15854485/3365483
  function zeroArray(arr)
  {
    for(var i = 0; i < arr.length; i++)
    {
      if(Array.isArray(arr[i])) zeroArray(arr[i]);
      else arr[i] = 0;
    }
  }

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
  s.onload = init;
  document.getElementsByTagName("head")[0].appendChild(s);

})();
