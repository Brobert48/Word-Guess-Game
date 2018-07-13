

var lives=10;
var wins=0;
var loses=0;
var game ={
    wordOptions:["ahoy","landlubber","booty","buccaneer","cutlass","doubloons","grog","plunder","rum",],
    usedLetters:[],
    hotSeatWord:"",
    alphabet:"abcdefghijklmnopqrstuvwxyz",
    letterToguess:[],
    matchedLetters:[],
    gameSpace:[],
    wrongLetters:[],
// selects Word from array
    selectWord: function(){
       var num = Math.floor((Math.random()*this.wordOptions.length));
        this.hotSeatWord = this.wordOptions[num];
        
    },
    // creates _ for each letter of hotSeatword
    anonimize:function(){
        for (var i = 0; i < this.hotSeatWord.length; i++) {
                    this.gameSpace.push(' - '); 
                    this.matchedLetters.push("-");
                    
        var newText = $("<div style='float:left;'' id='"+i+"'>"+ this.gameSpace[i] +"</div>")
        $("#game-space").append(newText);
        // newText.setAttribute("ID", "gamespace[i]");
        }

},
    // breaks hotseatword into an array of characters
    characterize:function(){
        for (var i=0; i < this.hotSeatWord.length; i++){
           this.letterToguess = this.hotSeatWord.split("");
        }
    },
    //resets game after a win or loss
    reset:function(){
        this.wordOptions=["ahoy","landlubber","booty","buccaneer","cutlass","doubloons","grog","plunder","rum",];
        this.usedLetters=[];
        this.letterToguess=[];
        this.matchedLetters=[];
        this.gameSpace=[];
        this.wrongLetters=[];
        document.getElementById("game-space").innerHTML = "";
        document.getElementById("guessed").innerHTML = "";
        document.getElementById("hangman").src = "assets/images/Hangman_10.jpg";
        lives=10;
    
    },
    
};
//calling functions

game.selectWord();
game.anonimize();
game.characterize();
//heres where the user input is entered and processed
document.onkeyup= function(event){
    if(lives>0){
    
    var str = game.hotSeatWord;
    var n = str.includes(event.key);
    var arr = game.usedLetters;
    var m = arr.includes(event.key);
    var arr2= game.wrongLetters;
    var o = arr2.includes(event.key);
    var str2 = game.alphabet;
    var p = str2.includes(event.key);
    if(p){
    for (var i = 0; i < game.letterToguess.length; i++) {
        //if not in hotseatword or wrong letters add user guess to wrong letters
        if (!n&&!o) {
            game.wrongLetters.push(event.key);
            lives--;
            break;
        }
        //if user input matches letters in hotseatword
        else if (game.letterToguess[i] === event.key && !m && !o) {
        //    inputs character into gamespace
            $("#"+i).text(event.key);
            // if character already in matchedLetters, stop
            if(game.matchedLetters[i] === event.key){
                break;
            }
            //else add character into matched letters at appropriate index location
            else {game.matchedLetters.splice(i, 1, event.key);}
              
            
        }
       
    }
    //adds character to usedLetters as long as it has not already been used
    if(!m){
        game.usedLetters.push(event.key);}
    // displays usedLetters to UI
    var str = game.usedLetters;
    document.getElementById("guessed"). innerHTML = str;
    }
    //win condition
    if (game.matchedLetters.toString() == game.letterToguess.toString()){
        document.getElementById("win").innerHTML="You guessed "+game.hotSeatWord.toLocaleUpperCase()+" correctly!";
        wins++;
        var audio = new Audio("assets/audio/Win-dings.wav");
        audio.play(); 
        game.reset();
        game.selectWord();
        game.anonimize();
        game.characterize();
    }
    // loss condition
    if (lives==0){
        document.getElementById("win").innerHTML= "One more pirate for the gallows. The correct answer was: "+game.hotSeatWord.toLocaleUpperCase();
        loses++;
        var audio = new Audio("assets/audio/Lose-Horn.mp3");
        audio.play();       
        // commented these out so that I can show my awesome hangman animation to finish.
        // game.reset();
        // game.selectWord();
        // game.anonimize();
        // game.characterize();
    }
    // writes Stats to UI
    document.getElementById("lives").innerHTML = lives;   
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("loses").innerHTML = loses;
    document.getElementById("hangman").src = "assets/images/Hangman_"+lives+".jpg";
}
}
document.getElementById('reset-button').addEventListener('click', function(){
    game.reset();
    game.selectWord();
    game.anonimize();
    game.characterize()
    
   });
   

// //mobile text field

//     document.getElementById("mobile-field").addEventListener("keyup", readMobile);
//     function myFunction() {
//     var x = document.getElementById("mobile-field");
//     // x.value = x.value.toUpperCase();
//     if(lives>0){
    
//         var str = game.hotSeatWord;
//         var n = str.includes(x);
//         var arr = game.usedLetters;
//         var m = arr.includes(x);
//         var arr2= game.wrongLetters;
//         var o = arr2.includes(x);
//         var str2 = game.alphabet;
//         var p = str2.includes(x);
//         if(p){
//         for (var i = 0; i < game.letterToguess.length; i++) {
//             //if not in hotseatword or wrong letters add user guess to wrong letters
//             if (!n&&!o) {
//                 game.wrongLetters.push(x);
//                 lives--;
//                 break;
//             }
//             //if user input matches letters in hotseatword
//             else if (game.letterToguess[i] === x && !m && !o) {
//             //    inputs character into gamespace
//                 $("#"+i).text(x);
//                 // if character already in matchedLetters, stop
//                 if(game.matchedLetters[i] === x){
//                     break;
//                 }
//                 //else add character into matched letters at appropriate index location
//                 else {game.matchedLetters.splice(i, 1, x);}
                  
                
//             }
           
//         }
//         //adds character to usedLetters as long as it has not already been used
//         if(!m){
//             game.usedLetters.push(x);}
//         // displays usedLetters to UI
//         var str = game.usedLetters;
//         document.getElementById("guessed"). innerHTML = str;
//         }
//         //win condition
//         if (game.matchedLetters.toString() == game.letterToguess.toString()){
//             document.getElementById("win").innerHTML="You guessed "+game.hotSeatWord.toLocaleUpperCase()+" correctly!";
//             wins++;
//             var audio = new Audio("assets/audio/Win-dings.wav");
//             audio.play(); 
//             game.reset();
//             game.selectWord();
//             game.anonimize();
//             game.characterize();
//         }
//     }}