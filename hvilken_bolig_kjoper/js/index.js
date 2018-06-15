// Quiz result options in a separate object for flexibility
var resultOptions = [
    {   title: '1. Den spontane kjøperen',
        desc: 'Din handlekraft er din fremste styrke. Du vet hva du vil ha og bruker aldri lang tid på å bestemme deg. Du ser forbi boligstyling og skjønner med en gang hva som er boligens styrker og svakheter. Du er god til å se muligheter, men pass deg for å ta på deg et for stort prosjekt. Er du virkelig klar for å rive en vegg eller flytte kjøkkenet? Ta deg tid i kjøpeprosessen og sørg for at du ser flere objekter før du bestemmer deg. Din fantastiske evne til å gjøre det beste ut av situasjonen vil garantere at du får et flott hjem, men det er jo fint å få det uten å måtte jobbe seg i hjel.'},
    {   title: '2. Den rasjonelle kjøperen',
        desc: 'Du er den metodiske typen som går systematisk til verks i de fleste beslutninger du tar. Som boligkjøper er du opptatt av å ha all informasjonen. Du har selvsagt lest alle papirene før du kommer på visning, stiller relevante spørsmål og vet hvordan du sjekker sluk og teknisk anlegg. Du er gjerne typer som ser på boligen som en investering og er opptatt av hvordan du kan tilføre den verdi og hvordan prisutviklingen i området vil være fremover. Du vil neppe stå i fare for å bli lurt til å kjøpe en bolig med dårlig standard. Men husk at dette også skal være ditt hjem, ikke bare en pengeplassering. Ta deg tid til å kjenne om boligen gir deg godfølelsen, og tillat deg selv å drømme litt om livet du skal ha i din nye bolig. Penger er ikke alt og det er faktisk mulig å både gjøre et godt kjøp og få drømmeboligen!'},
    {   title: '3. Den skeptiske kjøperen',
        desc: 'Du vet nøyaktig hva du er på utkikk etter i en bolig, og lar deg ikke imponere av meglernes flotte vendinger. Formuleringer som «fantastisk potensiale» og «unik mulighet» preller av på deg som vann på gåsa. Du tar deg god tid og ber gjerne om en ekstra visning. Din grundighet vil sikre at du ender opp med en bolig som møter alle dine krav til funksjon og hygge. Pass bare på at du ikke venter for lenge med å bestemme. De beste boligene forsvinner raskt fra markedet og bruker du for lang tid til å tenke, kan drømmeboligen glippe.'},
    {   title: '4. Den emosjonelle kjøperen',
        desc: 'Du har et utrolig godt instinkt som har hjulpet deg til riktig beslutning mange ganger før. Når du får en følelse av at noe ikke stemmer, vet du at du må lytte til den. Du kan ikke alltid sette ord på hvorfor du mener noe, du bare VET at det er slik. Du merker med en gang om dette er den riktige boligen eller ikke og er den feil, så hjelper det ikke at den er «good on paper». Din intuisjon vil sikre deg at du finner den riktige boligen, men pass deg for skjulte feil og mangler. Hvis du ikke gidder å lese alle papirene, så kan du jo be en venn om å gjøre det. Og du bør nok vurdere å ta med takstmann på visning.'}
];

// global variables
var quizSteps = $('#quizzie .quiz-step'),
    indexCounts = [].fill.call({ length: resultOptions.length + 1 }, 0);
// for each step in the quiz, add the selected answer value to the total score
// if an answer has already been selected, subtract the previous value and update total score with the new selected answer value
// toggle a visual active state to show which option has been selected
quizSteps.each(function () {
    var currentStep = $(this),
        ansOpts = currentStep.children('.quiz-answer');
    // for each option per step, add a click listener
    // apply active class and calculate the total score
    ansOpts.each(function () {
        var eachOpt = $(this);
        eachOpt[0].addEventListener('click', check, false);
        function check() {
            var $this = $(this),
                value = $this.attr('data-quizIndex'),
                index = parseInt(value);
            // check to see if an answer was previously selected
            if (currentStep.children('.active').length > 0) {
                var wasActive = currentStep.children('.active'),
                    oldValue = wasActive.attr('data-quizIndex'),
                    oldIndex = parseInt(oldValue);
                // handle visual active state
                currentStep.children('.active').removeClass('active');
                $this.addClass('active');
                // handle the score calculation
                indexCounts[oldIndex] -= 1;
                indexCounts[index] += 1;
                calcResults(indexCounts);
            } else {
                // handle visual active state
                $this.addClass('active');
                // handle score calculation
                indexCounts[index] += 1;
                calcResults(indexCounts);
                // handle current step
                updateStep(currentStep);
            }
        }
    });
});

// show current step/hide other steps
function updateStep(currentStep) {
    if(currentStep.hasClass('current')){
       currentStep.removeClass('current');
       currentStep.next().addClass('current');
    }
}

function getMostFrequentIndex(indexCounts) {
    var index = 0,
        count = 0;

    for (i = 1; i < indexCounts.length; i++) {
        var thisCount = indexCounts[i];
        if (thisCount > count) {
            index = i;
            count = thisCount;
        }
    }
    return index - 1;
}

// display scoring results
function calcResults(indexCounts) {
    // only update the results div if all questions have been answered
    if (quizSteps.find('.active').length == quizSteps.length){
        var resultsTitle = $('#results h1'),
            resultsDesc = $('#results .desc'),
            mostFrequentIndex = getMostFrequentIndex(indexCounts),
            result = resultOptions[mostFrequentIndex];

        resultsTitle.replaceWith("<h1>" + result.title + "</h1>");
        resultsDesc.replaceWith("<p class='desc'>" + result.desc + "</p>");
    }
}
