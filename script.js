/* =========================================
   1. DATA STRUCTURE (Questions Database)
   ========================================= */
const quizData = {
  // === ELEMENTARY (Grades 1-8) ===
  elementary: {
    "common_subjects": ["Mathematics", "English", "General Science", "Amharic", "Social Studies"]
  },

  // === HIGH SCHOOL (Grades 9-12) ===
  highschool: {
    // Grade 9 & 10: Direct Subjects
    "9": {
      "Mathematics": [
        { q: "Solve for x: x + 5 = 10", opts: ["5", "10", "15", "0"], a: 0 },
        { q: "What is the square root of 144?", opts: ["10", "11", "12", "13"], a: 2 }
      ],
      "Biology": [
        { q: "Which organelle is the powerhouse of the cell?", opts: ["Nucleus", "Mitochondria", "Ribosome", "Cell Wall"], a: 1 }
      ],
      "Chemistry": [
        { q: "What is the chemical symbol for Gold?", opts: ["Ag", "Au", "Fe", "Pb"], a: 1 }
      ],
      "Physics": [
        { q: "What is the SI Unit of Force?", opts: ["Joule", "Newton", "Watt", "Pascal"], a: 1 }
      ],
      "English": [{ q: "What is the verb form of 'Beauty'?", opts: ["Beautify", "Beautiful", "Beautifully", "Beaut"], a: 0 }]
    },
    "10": {
      "Mathematics": [
        { q: "What is the value of Sin(30)?", opts: ["0.5", "1", "0", "0.866"], a: 0 }
      ],
      "Biology": [
        { q: "What does DNA stand for?", opts: ["Deoxyribonucleic Acid", "Dual Nature Acid", "Dynamic Acid", "None"], a: 0 }
      ],
      "Chemistry": [
        { q: "What is the pH of pure Water?", opts: ["5", "7", "9", "12"], a: 1 }
      ],
      "Physics": [
        { q: "V = IR is the formula for whose law?", opts: ["Newton", "Ohm", "Faraday", "Tesla"], a: 1 }
      ]
    },

    // Grade 11: Stream Specific
    "11": {
      "Natural": {
        "Mathematics": [{ q: "Grade 11 Natural Math: Which is a vector quantity?", opts: ["Speed", "Mass", "Velocity", "Time"], a: 2 }],
        "Physics": [{ q: "The rate of change of velocity is?", opts: ["Speed", "Acceleration", "Displacement", "Force"], a: 1 }],
        "Chemistry": [{ q: "Oxidation is the ___ of electrons.", opts: ["Gain", "Loss", "Sharing", "Holding"], a: 1 }],
        "Biology": [{ q: "Which of these is not a kingdom of life?", opts: ["Animalia", "Plantae", "Fungi", "Virus"], a: 3 }]
      },
      "Social": {
        "Mathematics": [{ q: "Grade 11 Social Math: Simple Interest Formula?", opts: ["I=Prt", "I=P(1+r)", "I=mc2", "None"], a: 0 }],
        "Geography": [{ q: "Which river is the longest in the world?", opts: ["Nile", "Amazon", "Yangtze", "Mississippi"], a: 0 }],
        "History": [{ q: "When was the Battle of Adwa?", opts: ["1896", "1935", "1888", "1991"], a: 0 }],
        "Economics": [{ q: "GDP stands for?", opts: ["Gross Domestic Product", "Global Daily Price", "General Demand", "None"], a: 0 }]
      }
    },
    
    // === GRADE 12 (NATIONAL ENTRANCE) ===
    "12": {
      "Natural": {
        "Mathematics": [
            { q: "What is the slope of line y = 2x + 1?", opts: ["2", "1", "0", "-1"], a: 0 },
            { q: "Integral of 2x dx is?", opts: ["x^2 + c", "2x^2", "x", "1"], a: 0 }
        ],
        "Physics": [{ q: "Which law states 'For every action there is an equal reaction'?", opts: ["1st Law", "2nd Law", "3rd Law", "Gravity"], a: 2 }],
        "Chemistry": [{ q: "Which element has atomic number 6?", opts: ["Oxygen", "Carbon", "Nitrogen", "Iron"], a: 1 }]
      },
      "Social": {
        "Mathematics": [
          { q: "Find the mean of data set: 2, 4, 6.", opts: ["2", "4", "6", "8"], a: 1 }
        ],
        "Geography": [{ q: "What is the capital city of Ethiopia?", opts: ["Addis Ababa", "Gondar", "Mekelle", "Hawassa"], a: 0 }],
        "Economics": [{ q: "The fundamental problem of economics is?", opts: ["Unlimited resources", "Scarcity", "No money", "None"], a: 1 }]
      }
    }
  }
};

/* =========================================
   2. STATE MANAGEMENT
   ========================================= */
let state = {
  page: 'home',
  path: {
    type: null, 
    grade: null,
    stream: null,
    course: null
  },
  currentQuizSet: [],
  qIndex: 0,
  score: 0,
  answers: [],
  timer: null,
  timeLeft: 60
};

/* =========================================
   3. NAVIGATION HANDLERS
   ========================================= */

function showPage(pageId) {
  // Stop timer if leaving quiz
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Handle specific nav active states
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  if(activeLink) activeLink.classList.add('active');

  // Show target
  const target = document.getElementById(pageId + '-page');
  if(target) target.classList.add('active');
  window.scrollTo(0, 0);
}

// --- ELEMENTARY FLOW ---
function startElementaryFlow() {
  state.path.type = 'elementary';
  showPage('elementary-grade');
}

function selectElementaryGrade(grade) {
  state.path.grade = grade;
  renderElementarySubjects();
  showPage('elementary-subject');
}

function renderElementarySubjects() {
  const listDiv = document.getElementById('elementary-subject-list');
  listDiv.innerHTML = '';
  const subjects = quizData.elementary.common_subjects;
  
  subjects.forEach(subName => {
    const box = document.createElement('div');
    box.className = 'feature-box';
    box.onclick = () => selectElementarySubject(subName);
    
    const img = document.createElement('img');
    img.src = 'https://cdn-icons-png.flaticon.com/512/1046/1046269.png'; // Block icon
    const h3 = document.createElement('h3');
    h3.textContent = subName;
    
    box.appendChild(img);
    box.appendChild(h3);
    listDiv.appendChild(box);
  });
}

function selectElementarySubject(subName) {
  state.path.course = subName;
  // Mock questions for demo
  state.currentQuizSet = [
    { q: `(Grade ${state.path.grade}) 5 + 3 = ?`, opts: ["5", "8", "9", "10"], a: 1 },
    { q: `(Grade ${state.path.grade}) Which is an animal?`, opts: ["Rock", "Tree", "Cat", "Car"], a: 2 },
    { q: `(Grade ${state.path.grade}) Fill in: The sky is ___`, opts: ["Green", "Blue", "Red", "Yellow"], a: 1 }
  ];
  startQuiz();
}

// --- HIGH SCHOOL FLOW ---
function startHighSchoolFlow() {
  state.path.type = 'highschool';
  showPage('grade');
}

function selectGrade(grade) {
  state.path.grade = grade;
  if (grade === '11') {
    state.path.stream = null;
    showPage('stream');
  } else {
    state.path.stream = null;
    renderHighSchoolSubjects();
    showPage('hs-subject');
  }
}

function selectStream(streamType) {
  state.path.stream = streamType;
  renderHighSchoolSubjects();
  showPage('hs-subject');
}

function renderHighSchoolSubjects() {
  const listDiv = document.getElementById('hs-subject-list');
  listDiv.innerHTML = '';
  const grade = state.path.grade;
  const stream = state.path.stream;
  let subjectsObj = {};
  
  if (grade === '11') {
    subjectsObj = quizData.highschool[grade][stream];
  } else {
    subjectsObj = quizData.highschool[grade];
  }
  
  Object.keys(subjectsObj).forEach(subName => {
    const box = document.createElement('div');
    box.className = 'feature-box';
    box.onclick = () => selectHighSchoolSubject(subName);
    const img = document.createElement('img');
    img.src = 'https://cdn-icons-png.flaticon.com/512/3389/3389081.png';
    const h3 = document.createElement('h3');
    h3.textContent = subName;
    box.appendChild(img);
    box.appendChild(h3);
    listDiv.appendChild(box);
  });
}

function selectHighSchoolSubject(subName) {
  state.path.course = subName;
  if (state.path.stream) {
    state.currentQuizSet = quizData.highschool[state.path.grade][state.path.stream][subName];
  } else {
    state.currentQuizSet = quizData.highschool[state.path.grade][subName];
  }
  startQuiz();
}

function handleSubjectBack() {
  if (state.path.grade === '11') {
    showPage('stream');
  } else {
    showPage('grade');
  }
}

// --- ENTRANCE EXAM FLOW ---
function startEntranceFlow() {
  state.path.type = 'entrance';
  state.path.grade = '12';
  showPage('entrance-stream');
}

function selectEntranceStream(streamType) {
  state.path.stream = streamType;
  renderEntranceSubjects();
  showPage('entrance-subject');
}

function renderEntranceSubjects() {
  const listDiv = document.getElementById('entrance-subject-list');
  listDiv.innerHTML = '';
  const subjectsObj = quizData.highschool['12'][state.path.stream];
  
  Object.keys(subjectsObj).forEach(subName => {
    const box = document.createElement('div');
    box.className = 'feature-box';
    box.onclick = () => selectEntranceSubject(subName);
    const img = document.createElement('img');
    img.src = 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png';
    const h3 = document.createElement('h3');
    h3.textContent = subName;
    box.appendChild(img);
    box.appendChild(h3);
    listDiv.appendChild(box);
  });
}

function selectEntranceSubject(subName) {
  state.path.course = subName;
  state.currentQuizSet = quizData.highschool['12'][state.path.stream][subName];
  startQuiz();
}

/* =========================================
   4. QUIZ ENGINE
   ========================================= */

function startQuiz() {
  if (!state.currentQuizSet || state.currentQuizSet.length === 0) {
    alert("Content coming soon for this subject!");
    return;
  }
  
  // Reset State
  state.qIndex = 0;
  state.score = 0;
  state.answers = new Array(state.currentQuizSet.length).fill(null);
  state.timeLeft = 60 * 2; // 2 minutes for demo
  
  showPage('quiz');
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const q = state.currentQuizSet[state.qIndex];
  
  // Set Title
  let title = "Quiz";
  if(state.path.type === 'elementary') title = `Grade ${state.path.grade} : ${state.path.course}`;
  else if(state.path.type === 'entrance') title = `Entrance : ${state.path.course}`;
  else title = `Grade ${state.path.grade} : ${state.path.course}`;
  
  document.getElementById('quiz-title').textContent = title;
  
  // Set Text
  document.getElementById('question-text').textContent = q.q;
  
  // Set Options
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  
  q.opts.forEach((optText, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.textContent = optText;
    
    if (state.answers[state.qIndex] === i) div.classList.add('selected');
    
    div.onclick = () => {
      // Clear siblings
      Array.from(container.children).forEach(c => c.classList.remove('selected'));
      div.classList.add('selected');
      state.answers[state.qIndex] = i;
    };
    
    container.appendChild(div);
  });
  
  // Update Progress Bar
  const pct = ((state.qIndex + 1) / state.currentQuizSet.length) * 100;
  document.getElementById('quiz-progress').style.width = pct + '%';
  
  // Update Buttons
  document.getElementById('prev-btn').disabled = state.qIndex === 0;
  document.getElementById('next-btn').textContent = 
    (state.qIndex === state.currentQuizSet.length - 1) ? 'Finish' : 'Next';
}

function nextQuestion() {
  const total = state.currentQuizSet.length;
  if (state.qIndex < total - 1) {
    state.qIndex++;
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function prevQuestion() {
  if (state.qIndex > 0) {
    state.qIndex--;
    loadQuestion();
  }
}

function startTimer() {
  if(state.timer) clearInterval(state.timer);
  const display = document.getElementById('time-left');
  
  state.timer = setInterval(() => {
    state.timeLeft--;
    display.textContent = state.timeLeft;
    
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      finishQuiz();
    }
  }, 1000);
}

function finishQuiz() {
  clearInterval(state.timer);
  
  // Calculate Score
  state.score = 0;
  state.currentQuizSet.forEach((q, i) => {
    if (state.answers[i] === q.a) state.score++;
  });
  
  const total = state.currentQuizSet.length;
  const pct = Math.round((state.score / total) * 100);
  
  document.getElementById('score-percentage').textContent = pct + '%';
  document.getElementById('correct-answers').textContent = state.score;
  document.getElementById('total-questions').textContent = total;
  
  // Result Message
  let msg = "Keep Practicing!";
  if(pct > 80) msg = "Excellent Job!";
  else if(pct > 50) msg = "Good Effort!";
  
  document.getElementById('result-message').textContent = msg;
  
  showPage('results');
}

/* =========================================
   5. AI SIMULATOR (New Feature)
   ========================================= */
let currentAiAnswer = "";

function generateAIQuestion() {
  const input = document.getElementById('ai-topic-input').value.trim();
  const btn = document.querySelector('#ai-gen-page .btn');
  const resultDiv = document.getElementById('ai-result');
  
  if(!input) {
    alert("Please enter a topic!");
    return;
  }
  
  // UI Simulation
  btn.textContent = "AI is thinking...";
  btn.disabled = true;
  resultDiv.style.display = 'none';
  
  setTimeout(() => {
    btn.textContent = "Generate Question";
    btn.disabled = false;
    
    // Simulate AI Logic based on simple keywords
    let qText = "";
    let opts = [];
    let ans = "";
    
    const topic = input.toLowerCase();
    
    if(topic.includes("photo")) {
      qText = "AI Generated: What is the primary product of Photosynthesis?";
      opts = ["Oxygen", "Carbon Dioxide", "Nitrogen", "Iron"];
      ans = "Oxygen";
    } else if (topic.includes("newton")) {
      qText = "AI Generated: Which law involves F=ma?";
      opts = ["1st Law", "2nd Law", "3rd Law", "Law of Cooling"];
      ans = "2nd Law";
    } else if (topic.includes("ethiopia")) {
      qText = "AI Generated: Which is a UNESCO site in Ethiopia?";
      opts = ["Lalibela", "Eiffel Tower", "Pyramids", "Taj Mahal"];
      ans = "Lalibela";
    } else {
      qText = `AI Generated: Explain the core concept of '${input}'.`;
      opts = ["Concept A", "Concept B", "Concept C", "Concept D"];
      ans = "Concept A (Simulated Correct Answer)";
    }
    
    currentAiAnswer = ans;
    
    // Render
    document.getElementById('ai-question-text').textContent = qText;
    const optContainer = document.getElementById('ai-options');
    optContainer.innerHTML = '';
    
    opts.forEach(o => {
      const d = document.createElement('div');
      d.className = 'option';
      d.textContent = o;
      optContainer.appendChild(d);
    });
    
    document.getElementById('ai-answer-reveal').style.display = 'none';
    resultDiv.style.display = 'block';
    
  }, 1500); // 1.5s delay
}

function revealAIAnswer() {
  const revealDiv = document.getElementById('ai-answer-reveal');
  revealDiv.textContent = "Correct Answer: " + currentAiAnswer;
  revealDiv.style.display = 'block';
}

/* =========================================
   6. UI UTILITIES
   ========================================= */

// FAQ Toggle
function toggleFaq(element) {
  element.classList.toggle('active');
}

// Auth Switcher
function switchAuth(type) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  
  if(type === 'login') {
    document.querySelectorAll('.auth-tab')[0].classList.add('active');
    document.getElementById('login-form').classList.add('active');
  } else {
    document.querySelectorAll('.auth-tab')[1].classList.add('active');
    document.getElementById('register-form').classList.add('active');
  }
}

// Navigation Listeners
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = e.target.dataset.page;
    showPage(page);
  });
});
