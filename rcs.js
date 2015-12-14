(function () {

  var clues, p = [0, 0], solved = false;
  var startTime = new Date(), endTime, elapsedTime;
  var maxGuesses = 9999999999999, guessCount = 0;
  
  var allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var chars = [];
  for(var i = 0; i < allowedChars.length; i++)
  {
    chars.push(allowedChars.charCodeAt(i));
  }

  function init()
  {
    jQuery.noConflict();

    

    //hexagonal puzzle
    if(jQuery("form.puzzle-hexagonal").length > 0)
    {

    }

    //rectangular puzzle
    else
    {
      clues = [
        jQuery("div.grid table thead tr th:gt(0) span"),
        jQuery("div.grid table tbody tr th:even span")
      ];
    }

    //change dom objects to regexs and setup clues array
    for(var i = 0; i < clues.length; i++)
    {
      for(var j = 0; j < clues[i].length; j++)
      {
        var startGuess = "";
        var charCount = clues[(i + 1) % clues.length].length;
        for(var z = 0; z < charCount; z++) startGuess += String.fromCharCode(chars[0]);

        clues[i][j] = {
          regex: new RegExp(clues[i][j].getAttribute('title')),
          guess: startGuess,
          charCount : charCount,
          charCurrVal : 0
        };
      }
    }

    solve();

  }

  function solve()
  {
    guessCount++;
    //console.log(clues[p[0]][p[1]].charCurrVal + ' /// ' + clues[p[0]][p[1]].guess);

    document.title = clues[p[0]][p[1]].guess + ' /// ' + clues[p[0]][p[1]].charCurrVal + ' /// ' + clues[p[0]][p[1]].guess

    //does current regex match?
    if(clues[p[0]][p[1]].regex.test(clues[p[0]][p[1]].guess))
    {
      solved = true;
      console.log(clues[p[0]][p[1]].guess);
    }

    //no match, increment and continue
    else
    {
      if(clues[p[0]][p[1]].charCurrVal < Math.pow(chars.length, clues[p[0]][p[1]].charCount))
      {
        clues[p[0]][p[1]].charCurrVal++;
        var newGuess = charValToGuess(clues[p[0]][p[1]].charCurrVal);
        //pad
        while(newGuess.length < clues[p[0]][p[1]].charCount) newGuess += String.fromCharCode(chars[0]);
        clues[p[0]][p[1]].guess = newGuess;
      }
    }

    if(!solved && guessCount < maxGuesses) setTimeout(function(){solve()}, 0);
    else
    {
      endTime = new Date();
      elapsedTime = (endTime - startTime) / 1000;
      if(!solved)
        alert("Exhausted " + guessCount + " guesses in " + elapsedTime + " seconds!");
      else  
        alert("Solved in " + elapsedTime + " seconds!");
    }
  }

  function charValToGuess(c)
  {
    //http://stackoverflow.com/questions/11089399/count-with-a-b-c-d-instead-of-0-1-2-3-with-javascript
    var mod = c % chars.length,
        pow = c / chars.length | 0,
        out = mod ? String.fromCharCode(chars[mod - 1]) : (--pow, String.fromCharCode(chars[chars.length - 1]));
    return pow ? charValToGuess(pow) + out : out;
  }

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
  s.onload = init;
  document.getElementsByTagName("head")[0].appendChild(s);

})();
