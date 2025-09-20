import Questions from "./questions.js";
import Final from "./final.js";
class Quiz{
    constructor(quizElement,ammount,questions)
    {
        this.quizElement=quizElement;
        this.currentElement=document.querySelector(".current");
        this.totalElement=document.querySelector(".total");
        this.finalElement=document.querySelector(".final");
        this.nextBtn=document.querySelector("#next");
        this.totalAmount=ammount;
        this.answeredAmount=0;
        this.questions=this.setQuestions(questions);
        this.nextBtn.addEventListener('click',this.nextQuestion);
        this.renderQuestion();

    }
    setQuestions(questions)
    {
        return questions.map(question=>new Questions(question));
    }
    renderQuestion()
    {
        this.questions[this.answeredAmount].render();
        this.currentElement.innerHTML=this.answeredAmount+1;
        this.totalElement.innerHTML=this.totalAmount;
    }
    nextQuestion=()=>{
        const checkedElement=this.questions[this.answeredAmount].answerElements.filter((ele)=>ele.firstChild.checked);
        if(checkedElement.length==0)
        {
            alert("please check element");
        }
        else
        {
            this.questions[this.answeredAmount].answer(checkedElement);
            this.answeredAmount++;
            this.answeredAmount<this.totalAmount?this.renderQuestion():this.endQuizApp(); 
        }
    }
    endQuizApp()
    {
        this.quizElement.style.display="none";
        this.finalElement.style.display="block";
        const correctAnsweres=this.countCorrectAnswer();
        new Final(correctAnsweres,this.totalAmount)
    }
    countCorrectAnswer()
    {
        let count=0;
        this.questions.forEach(element => {
            if(element.isCorrect)
            {
                count++;
            }
        });
        return count;
    }
}
export default Quiz;