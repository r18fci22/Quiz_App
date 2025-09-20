import Quiz from "./quiz.js";
class Settings
{
    constructor()
    {
        this.SettingDom=document.querySelector(".setting");
        this.quizDom=document.querySelector(".quiz");
        this.categoryDom=document.querySelector("#category");
        this.nQuestionsDom=document.querySelector("#nQuestions");
        this.startBtn=document.querySelector("#start");
        this.difficulty=
        [
            document.querySelector("#easy"),
            document.querySelector("#medium"),
            document.querySelector("#hard"),
        ];
        this.quiz={};
        this.startBtn.addEventListener("click",this.startQuiz);
    }
    startQuiz=async()=>
    {
    try
    {
        const ammount=this.getAmmount();
        const categoryID=this.categoryDom.value;
        const difficulty=this.getDifficulty();
        const url=`https://opentdb.com/api.php?amount=${ammount}&category=${categoryID}&difficulty=${difficulty}`;
        let {results}=await this.fetchData(url);
        console.log(results);
        this.quiz=new Quiz(this.quizDom,ammount,results);
        this.toggleElements();
    }
    catch(err)
    {
        alert(err);
    }
    };
    toggleElements=()=>
    {
        this.quizDom.style.display="block";
        this.SettingDom.style.display="none";
    }
    fetchData=async(url)=>
    {
        const response=await fetch(url);
        const result= await response.json();
        return result;
    };
    getAmmount=()=>{
        const ammount=this.nQuestionsDom.value;
        if(ammount>0 && ammount<20)
            return ammount;
        else
        alert("please enter number of questions [1:20]");
    };
    getDifficulty=()=>{
        const difficulty=this.difficulty.filter((el)=>el.checked);
        if(difficulty.length===1)
        {
            return difficulty[0].id;
        }
        else
        {
            alert("please select difficulty");
        }
    }
}
export default Settings;