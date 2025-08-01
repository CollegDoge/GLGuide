// QUIZ TREE
const quizTree = {
    init: { // initial question
        question: "What are you most familiar with?",
        answers: [
            { text: "Windows", next: "w1" },
            { text: "MacOS",   next: "m1" },
            { text: "Something Else", next: "s1" },
        ]
    },
    
    // windows branch
    w1: { question: "Do you want a Windows‑like experience?", answers: [{ text: "Yes", next: "w2" }, { text: "No",  next: "w3" }] },
    w2: { question: "Do you like tinkering / changing things to your liking?", answers: [{ text: "Yes", next: "o1" }, { text: "No",  outcome: "f1" }] },
    w3: { question: "Do you like tinkering / changing things to your liking?", answers: [{ text: "Yes", next: "o1" }, { text: "No",  next: "w4" }] },
    w4: { question: "Do you want a feature‑rich desktop?", answers: [{ text: "Yes", outcome: "f3" }, { text: "No",  outcome: "f1" }] },

    // mac branch
    m1: { question: "Is your personal device MacOS?", answers: [{ text: "Yes", next: "m3" }, { text: "No",  next: "m2" }] },
    m2: { question: "Do you like tinkering / changing things to your liking?", answers: [{ text: "Yes", next: "o1" }, { text: "No",  outcome: "f2" }] },
    m3: { question: "Is your Mac model newer than 2020? (AKA M‑Series chip)", answers: [{ text: "Yes", next: "m4" }, { text: "No",  outcome: "f2" }] },
    m4: { question: "Do you have a PC/Laptop that isn’t Apple?", answers: [{ text: "Yes",  outcome: "f2" }, { text: "No",   next: "m5" }] },
    m5: { question: "Are you patient or willing to play around to get things working?", answers: [{ text: "Yes", outcome: "f9" }, { text: "No",  next: "m6" }] },
    m6: { question: "Are you willing to purchase a non‑Apple device?", answers: [{ text: "Yes", outcome: "f6" }, { text: "No",  outcome: "f5" }] },

    // other (e.g chromeos) branch
    s1: { question: "Have you used ChromeOS?", answers: [{ text: "Yes", next: "s2" }, { text: "No",  next: "s3" }] },
    s2: { question: "Do you have a computer that ISN’T a Chromebook?", answers: [{ text: "Yes", outcome: "f1" }, { text: "No",  next: "s4" }] },
    s3: { question: "Do you have a computer?", answers: [{ text: "Yes", outcome: "f10" }, { text: "No",  outcome: "f6" }] },
    s4: { question: "Are you willing to tinker to get things working?", answers: [{ text: "Yes", next: "s5" }, { text: "No",  outcome: "f4" }] },
    s5: { question: "Are you technical, patient and willing to learn?", answers: [{ text: "Yes", outcome: "f7" }, { text: "No",  outcome: "f1" }] },

    // other (shared between questions)
    o1: { question: "Are you technical, patient and want the most out of your device?", answers: [{ text: "Yes", outcome: "f7" }, { text: "No",  outcome: "f8" }] },

    // outcomes
    outcomes: {
        f1: "ZorinOS or Linux Mint", f2: "Ubuntu or Fedora Workstation", f3: "Fedora KDE Desktop", f4: "Stay on ChromeOS for now", f5: "Stay on MacOS for now",
        f6: "Purchase a Windows computer, and come back!", f7: "Arch Linux", f8: "CachyOS or EndeavourOS", f9: "Asahi Linux (Fedora Remix)", f10: "…what the flip, buddy?"
    }
};


// DOCUMENT ELEMENTS
const startScreen = document.querySelector('.quiz-default');
const quizFrame = document.querySelector('.quiz-frame');

const questionsContainer = document.querySelector('.quiz-questions');
const outcomesContainer = document.querySelector('.quiz-outcomes');

const questionTextElement = questionsContainer.querySelector('h2');
const answersContainer = questionsContainer.querySelector('.quiz-answers');
const outcomeTextElement = outcomesContainer.querySelector('.quizlink').previousElementSibling; // changed this for reliability
const restartButton = outcomesContainer.querySelector('.quizlink');



// QUIZ FUNCTIONS
function quizMain() {
    startScreen.style.display = 'none'; // hide start screen
    quizFrame.style.display = 'block'; // show quiz frame
    
    questionsContainer.style.display = 'block';
    outcomesContainer.style.display = 'none';
    displayQuestion('init'); // initialize question (see below)
}

function displayQuestion(key) {
    const node = quizTree[key];

    questionTextElement.textContent = node.question; 
    answersContainer.innerHTML = ''; 

    node.answers.forEach(answer => { // create and add a button for each answer
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.className = 'buttonsec';
        
        button.onclick = () => handleAnswer(answer); // on click, handle the answer
        answersContainer.appendChild(button);
    });
}

function handleAnswer(answer) {
    if (answer.next) {
        // if the answer leads to another question
        displayQuestion(answer.next);
    } else if (answer.outcome) {
        // if the answer leads to an outcome
        displayOutcome(answer.outcome);
    }
}

function displayOutcome(key) {
    const result = quizTree.outcomes[key];
    outcomeTextElement.textContent = result || "An error occurred. Please try again."; // this shouldnt happen anymore
    
    questionsContainer.style.display = 'none';
    outcomesContainer.style.display = 'block';

    restartButton.textContent = "Take Again";
    restartButton.onclick = restartQuiz;
    // will add page links later maybe
}

function restartQuiz() {
    quizFrame.style.display = 'none';
    startScreen.style.display = 'block';
}