const start = document.getElementById('start')
const startButton = document.getElementById('start-button')
const quiz = document.querySelector('.quiz')
const qustion = document.querySelector('.qustion')
const title = document.getElementById('title')
const answer = document.querySelectorAll('#answer')
const number = document.getElementById('number')
const button = document.getElementById('button')
const radio = document.querySelectorAll('input')
const ansResult = document.getElementById('ans-result')
const ansResultTitle = document.getElementById('ans-result-title')
const description = document.getElementById('description')
const next = document.getElementById('next')
const result = document.getElementById('result')
const resulth1 = document.getElementById('result-h1')

let quizs
let num = 0
let ans = 0

const ReadJson = async () => {
    const res = await fetch('quiz.json')
    const file = await res.json()
    quizs = file
    Shuffle()
}

const Shuffle = () => {
    for (let i = quizs.length; 1 < i; i--) {
        const index = Math.floor(Math.random() * i);
        [quizs[index], quizs[i - 1]] = [quizs[i - 1], quizs[index]]
    }
    for(let i=0; i<quizs.length; i++){
        for(let j=quizs[i].answers.length; 1<j; j--){
            const index = Math.floor(Math.random() * j);
            [quizs[i].answers[index],quizs[i].answers[j-1]]=[quizs[i].answers[j-1],quizs[i].answers[index]]
        }
    }
}

ReadJson()

const ShowQuiz = () => {
    title.innerText = quizs[num].title
    number.textContent = `${num+1}/${quizs.length}`
    for (let i = 0; i < 3; i++) {
        answer[i].textContent = quizs[num].answers[i]
        radio[i].value=quizs[num].answers[i]
    }
}

button.onclick = () => {
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            radio.forEach(ele => {
                if (ele.checked) {
                    return
                }
                ele.disabled = true
            })
            ans += radio[i].value === quizs[num].answer ? 1 : 0
            ansResultTitle.textContent = radio[i].value === quizs[num].answer ? "正解です" : "不正解です。"
            description.textContent = radio[i].value === quizs[num].answer ? "見事正解しました" : `正解は${quizs[num].answer}でした。`
            ansResult.classList.remove('none')
            button.classList.add('none')
            next.classList.remove('none')
            return
        }
    }
    alert('どれかの選択肢を選んでください')
}
next.onclick = () => {
    num += 1
    if (num >= quizs.length) {
        result.classList.remove('none')
        resulth1.textContent = `${quizs.length}問中${ans}問
        正解でした`
        ansResultTitle.textContent = ""
        description.textContent = ""
        qustion.classList.add('none')
        next.classList.add('none')
    } else {
        ansResult.classList.add('none')
        button.classList.remove('none')
        next.classList.add('none')
        radio.forEach(ele => {
            ele.disabled = false
            ele.checked = false
        })
        ShowQuiz()
    }
}

startButton.onclick = () => {
    start.classList.add('none')
    quiz.classList.remove('none')
    ShowQuiz()
}
