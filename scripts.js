window.onload = function() {
    const allPages = document.querySelectorAll('.page-pair, .page-single');
    let currentPageIndex = 0; 
    const isSmallScreen = window.innerWidth <= 768; 

    const quizQuestions = [
        {
            question: "Do you think ChatGPT has passed the Turing Test?",
            options: ["True", "False"],
            answer: "A"
        },
        {
            question: "What does 'AI' stand for?",
            options: ["Artificial Interface", "Automated Integration", "Artificial Intelligence", "Autonomous Interaction"],
            answer: "C"
        }
    ];
    
    let currentQuizQuestionIndex = 0;

    function loadQuizQuestion() {
        const quizQuestion = quizQuestions[currentQuizQuestionIndex];
        document.getElementById("question").innerText = quizQuestion.question;
        document.getElementById("label1").innerText = quizQuestion.options[0];
        document.getElementById("label2").innerText = quizQuestion.options[1];
        if (quizQuestion.options.length > 2) {
            document.getElementById("label3").innerText = quizQuestion.options[2];
            document.getElementById("label4").innerText = quizQuestion.options[3];
        }
        
        document.querySelectorAll('input[name="option"]').forEach(option => {
            option.checked = false;
            option.disabled = false;
        });
        
        document.getElementById("result").innerText = "";
        
        document.querySelector('button[onclick="checkQuizAnswer()"]').disabled = false;
    }

    window.checkQuizAnswer = function() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        
        if (!selectedOption) {
            alert("Please select an option!");
            return;
        }
        
        const answer = selectedOption.value;
        const resultElement = document.getElementById("result");

        if (answer === quizQuestions[currentQuizQuestionIndex].answer) {
            resultElement.innerText = "Correct! Go to the next page to learn more...";
            resultElement.style.color = "green"; 
        } else {
            resultElement.innerText = "That's not correct! According to current research, ChatGPT has passed the Turing Test! Go to the next page to learn more...";
            resultElement.style.color = "red";
        }
        document.querySelectorAll('input[name="option"]').forEach(option => option.disabled = true);
        document.querySelector('button[onclick="checkQuizAnswer()"]').disabled = true;
    }

    function showPage(index) {
        allPages.forEach((page, i) => {
            page.style.display = i === index ? 'flex' : 'none';
        });

        updateProgressBar(index, allPages.length);

        document.getElementById('prev-btn').style.display = index === 0 ? 'none' : 'inline-block';
        document.getElementById('next-btn').style.display = index === allPages.length - 1 ? 'none' : 'inline-block';
        
        if (index === Array.from(allPages).findIndex(page => page.id === "pair29")) {
            loadQuizQuestion(); 
        }
    }

    window.prevPage = function() {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            showPage(currentPageIndex);
        }
    }

    window.nextPage = function() {
        if (currentPageIndex < allPages.length - 1) {
            currentPageIndex++;
            showPage(currentPageIndex);
        }
    }

    function updateProgressBar(currentIndex, totalPages) {
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = ((currentIndex + 1) / totalPages) * 100;
        progressFill.style.width = progressPercentage + '%';

        const lampIcon = document.getElementById('lamp-icon');
        lampIcon.style.left = `calc(${progressPercentage}% - 15px)`; 
    }

    showPage(currentPageIndex);

    const pages = document.querySelectorAll('.page');
    let pageNumber = 3; 

    pages.forEach((page, index) => {
        if (index >= 2) { 
            let pageNumDiv = document.createElement('div');
            pageNumDiv.className = 'page-number';

            if (isSmallScreen) {
                if (index % 2 === 0) { 
                    pageNumDiv.classList.add('left');
                    pageNumDiv.innerText = pageNumber++;
                    page.appendChild(pageNumDiv);
                }
            } else {
                if (page.classList.contains('left-page')) {
                    pageNumDiv.classList.add('left');
                } else if (page.classList.contains('right-page')) {
                    pageNumDiv.classList.add('right');
                }
                pageNumDiv.innerText = pageNumber++;
                page.appendChild(pageNumDiv);
            }
        }
    });
};
