
// Var RNG = function(){Math.floor((Math.random() * this.wordOptions.length))};
var lives=10;
var wins=0;
var loses=0;
var game ={
    wordOptions:["blake","robert","is","the","best"],
    usedLetters:[],
    hotSeatWord:"",
    letterToguess:[],
    matchedLetters:[],
    gameSpace:[],
    wrongLetters:[],
// selects Word from array
    selectWord: function(){
       var num = Math.floor((Math.random()*this.wordOptions.length));
        this.hotSeatWord = this.wordOptions[num];
        
        // var newText = document.getElementById("hotSeatWord");
        // newText.append(this.hotSeatWord);
        
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
    reset:function(){
        this.wordOptions=["blake","robert","is","the","best"];
        this.usedLetters=[];
        this.letterToguess=[];
        this.matchedLetters=[];
        this.gameSpace=[];
        this.wrongLetters=[];
        // document.getElementById("hotSeatWord").innerHTML = "";
        document.getElementById("game-space").innerHTML = "";
        document.getElementById("guessed").innerHTML = "";
        lives=10;
    
    },
    
};

game.selectWord();
game.anonimize();
game.characterize();
document.onkeyup= function(event){
    
    
    var str = game.hotSeatWord;
    var n = str.includes(event.key);
    var arr = game.usedLetters;
    var m = arr.includes(event.key);
    var arr2= game.wrongLetters;
    var o = arr2.includes(event.key);
    
    for (var i = 0; i < game.letterToguess.length; i++) {
        if (!n&&!o) {
            game.wrongLetters.push(event.key);
            lives--;
            break;
        }
        else if (game.letterToguess[i] === event.key && !m && !o) {
            $("#"+i).text(event.key);
            if(game.matchedLetters[i] === event.key){
                break;
            }
            else {game.matchedLetters.splice(i, 1, event.key);}
              
            
        }
         
    }
    game.usedLetters.push(event.key);
    var str = game.usedLetters;
    document.getElementById("guessed"). innerHTML =str;
    
    if (game.matchedLetters.toString() == game.letterToguess.toString()){
        document.getElementById("win").innerHTML="You guessed "+game.hotSeatWord+" correctly!";
        wins++;
        game.reset();
        game.selectWord();
        game.anonimize();
        game.characterize();
    }
    if (lives===0){
        document.getElementById("win").innerHTML= "You Lose";
        loses++;
        game.reset();
        game.selectWord();
        game.anonimize();
        game.characterize();
    }
    
    document.getElementById("lives").innerHTML = lives;   
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("loses").innerHTML = loses;
}
         
   

