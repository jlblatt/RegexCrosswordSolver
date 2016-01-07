# RegexCrosswordSolver
A javascript solver for [regexcrossword.com](regexcrossword.com)

Latest release only works via completely dumb brute-force until I have more time to experiment.  This means that it is *hilariously slow!*

It also doesn't work with hexagonal puzzles yet.

#### Quickstart

On any puzzle page, type this into your console:

    var s = document.createElement("script"); s.type = "text/javascript"; s.src = "https://raw.githubusercontent.com/jlblatt/RegexCrosswordSolver/master/rcs.js"; document.getElementsByTagName("head")[0].appendChild(s);
