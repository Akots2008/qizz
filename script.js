let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let start_button=document.querySelector('.start-btn')
let container_main=document.querySelector('.main')
let container_start=document.querySelector('.start')
let container_start_h3=container_start.querySelector('h3')

function randint(min, max){
   return Math.round(Math.random() * (max-min) + min)
}


let signs = ["+", "-", "/", "*"]


function returnRandSign(){
   return signs[randint(0,3)]
}


function shuffle(array) {
 let currentIndex = array.length,  randomIndex;


 while (currentIndex != 0) {
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex--;
   [array[currentIndex], array[randomIndex]] = [
     array[randomIndex], array[currentIndex]];
 }
 return array;
}


class Question{
   constructor(){
       let a = randint(1, 30)
       let b = randint(1, 30)
       let sign = returnRandSign()
       this.question = `${a} ${sign} ${b}`


       if(sign == "+"){this.correct = a + b}
       else if(sign =="-"){this.correct = a - b}
       else if(sign =="*"){this.correct = a * b}
       else if(sign =="/"){this.correct = a / b}


       this.answers = [
           randint(this.correct - 15, this.correct - 1),
           randint(this.correct - 15, this.correct - 1),
           this.correct,
           randint(this.correct + 15, this.correct + 1),
           randint(this.correct + 15, this.correct + 1)
       ]
       shuffle(this.answers)
   }
   display(){
       question_field.innerHTML = this.question
       for(let i = 0; i < this.answers.length; i++){
           answer_buttons[i].innerHTML = this.answers[i]
       }
   }
}


let currenQuestion
let total_answers
let cor_answers

start_button.addEventListener('click', function(){

    total_answers = 0
    cor_answers = 0
    
    container_start.style.display='none'
    container_main.style.display="flex"

    currenQuestion=new Question
    currenQuestion.display()

    setTimeout(function(){
        container_start_h3.innerHTML=`Вы дали ответов ${total_answers} . Из них ${cor_answers} правильных и ${total_answers-cor_answers} неправильных.`
    container_start.style.display='flex'
    container_main.style.display="none"

}, 10000)})



for(let i = 0; i < answer_buttons.length; i++){
    answer_buttons[i].addEventListener('click', function(){
        if(answer_buttons[i].innerHTML == currenQuestion.correct){
            answer_buttons[i].style.background = '#00FF00'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
            cor_answers++
        }else{
            answer_buttons[i].style.background = '#FF0000'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        total_answers++
        currenQuestion = new Question()
        currenQuestion.display()
    })
}
