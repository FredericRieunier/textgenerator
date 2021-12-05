// Random index generator
function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    var randomNumberPicked = Math.floor(Math.random() * (max-min +1)) + min;
    return randomNumberPicked;
}

var randomRecords = [];
var i = 0;
var lastIndex = 0;
var arrayRange = 0;

function getRandomIntInclusiveExperiment(min, max, array){
    lastIndex = array.length-1;
    arrayRange = max-min;

    min = Math.ceil(min);
    max = Math.floor(max);
    var randomNumberPicked = Math.floor(Math.random() * (max-min +1)) + min;

    if(array.includes(randomNumberPicked)){
        return getRandomIntInclusiveExperiment(min, max, array);
    }
    else{
        // Defines after how many phrases a proposition can be picked up again
        if(array.length > 7){
            array.push(randomNumberPicked);
            array.shift();
            return randomNumberPicked;            
        }
        else{
            array.push(randomNumberPicked);
            return randomNumberPicked;
        }
    }
}

// function experimentRandom(){
//     getRandomIntInclusiveExperiment(0, 10);
// }

// var randomExpButton = document.getElementById("test-random");
// randomExpButton.addEventListener("click", experimentRandom);


// Load words arrays
var requestPath = "wordsArrays.json";
var request = new XMLHttpRequest();
request.open('GET', requestPath);
request.responseType = 'json';
request.send();

request.onload = function(){
    var theWords = request.response;
    getWords(theWords);
}

var phrase = "";

function getWords(t){
    // get arrays names and display them
    var wordsArrays = t[0];
    var arraysNames = [];

    for(var array in wordsArrays){
        arraysNames.push(`${array}`);
    }
    
    const paragraph = document.getElementById("paragraph");

    // Add uppercase to sentence first letter
    function strUcFirst(a){return (a+'').charAt(0).toUpperCase()+a.substr(1);}

    function RandomizeIndexAndAddproposition(wordsArray, lastChosen){
        var randomIndex = getRandomIntInclusiveExperiment(0, wordsArray.length -1, lastChosen);
        if(phrase[phrase.length-1] == "." || phrase == ""){
            return phrase += ' ' + strUcFirst(wordsArray[randomIndex]);
        }
        else{
            return phrase += ' ' + wordsArray[randomIndex];
        }
    }

    var button = document.getElementById('generate');
    button.addEventListener("click", addSentence);

    var lastChosenSubjects = [];
    var lastChosenTransitiveVerbs = [];
    var lastChosenCod = [];
    function addSentence(){
 
        RandomizeIndexAndAddproposition(wordsArrays.sujets, lastChosenSubjects);
        RandomizeIndexAndAddproposition(wordsArrays.verbes_transitifs, lastChosenTransitiveVerbs);
        RandomizeIndexAndAddproposition(wordsArrays.cOD, lastChosenCod);
        phrase += ".";

        // Display text
        // var paragraphAnimated = document.getElementById("paragraph-animated");

        // // addALetter();
        // var interval;
        // phrase = "OK";
        // for(let i=0; i<phrase.length; i++){
        //     function addALetter(){
        //         paragraphAnimated.innerText += phrase[i];
        //     }
        //     interval = setInterval(addALetter, 2000);
        // }
       

        paragraph.innerText = phrase;
    }

    // Faire une animation d'apparition des lettres une par une (donner impression que le texte est tapé).
    // Bouton pour copier coller 
    // Alterner phrases simples et phrases avec :
    // CC de lieu
    // CC de manière (en mangeant du boudin)
    // CC d'agent (par la main, par l'Abbé Pierre) - peut-être l'intégrer à des verbes
    // Propositions : Quand... , ... - devant, face à, de retour de, parti pour, A la recherche de..., 
    // Catégories de sujets concrets et de sujets abstraits
    // Fusionner sujets et compléments ?
    
    
}
