// Random index generator
var randomRecords = [];
function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    var randomNumberPicked = Math.floor(Math.random() * (max-min +1)) + min;
    randomRecords.push(randomNumberPicked);
    return randomNumberPicked;
}



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

    function RandomizeIndexAndAddproposition(array){
        var randomIndex = getRandomIntInclusive(0, array.length -1);
        if(phrase[phrase.length-1] == "." || phrase == ""){
            return phrase += ' ' + strUcFirst(array[randomIndex]);
        }
        else{
            return phrase += ' ' + array[randomIndex];
        }
    }

    var button = document.getElementById('generate');
    button.addEventListener("click", addSentence);

    function addSentence(){
        // console.log(getRandomIntInclusive(1, 10));
        console.log(randomRecords);
        // console.log(Math.random());
        RandomizeIndexAndAddproposition(wordsArrays.sujets);
        RandomizeIndexAndAddproposition(wordsArrays.verbes_transitifs);
        RandomizeIndexAndAddproposition(wordsArrays.cOD);
        phrase += ".";

        // console.log(phrase[phrase.length-1]);
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
        //     console.log(phrase.length);
        // }
       

        paragraph.innerText = phrase;
        // console.log(phrase[1]);
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
