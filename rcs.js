(function () {

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
  s.onload = solveCrossword;
  document.getElementsByTagName("head")[0].appendChild(s);

  function solveCrossword()
  {
    var clues, answers, remaining = 0;
    var startTime = new Date(), endTime, elapsedTime;
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    jQuery.noConflict();

    //hexagonal puzzle
    if(jQuery("form.puzzle-hexagonal").length > 0)
    {

    }

    //rectangular puzzle
    else
    {
      clues = [
        jQuery("div.grid table tbody tr th:even span"),
        jQuery("div.grid table thead tr th:gt(0) span")
      ];
    }

    //change dom objects to regexs and setup answers array
    for(var i = 0; i < clues.length; i++)
    {
      answers.push([]);
      for(var j = 0; j < clues[i].length; j++)
      {
        answers[i].push(chars);
        clues[i][j] = new Regex(clues[i][j].getAttribute('title')); 
        remaining++;
      }
    }

    //solve
    while(remaining > 0)
    {
      for(var i = 0; i < clues.length; i++)
      {
        for(var j = 0; j < clues[i].length; j++)
        {
          if(answers[i][j].length == 1) continue;

          for(var k = 0; k < answers[i][j].length; k++)
          {
            
          }
        }
      }
    }

    endTime = new Date();
    elapsedTime = (endTime - startTime) / 1000;
    alert("Solved in " + elapsedTime + " seconds!");
  }


})();
