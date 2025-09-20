class Final
{
    constructor(correctAnswers,totalAmmount)
    {
        this.scoreElement=document.querySelector(".score");
        this.againBtn=document.querySelector("#again");
        this.againBtn.addEventListener('click',this.startAgain);
        this.render(correctAnswers,totalAmmount);
    }
    startAgain=()=>{
        location.reload();
    }
    render(correctAnswer,totalAmount)
    {
       this.scoreElement.innerHTML=`You answered ${correctAnswer} out of ${totalAmount} correct `;
    }
}
export default Final;