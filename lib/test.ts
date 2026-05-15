export const questionsTests = [
  // SECTION 1 — WHAT KIND OF PERSON ARE YOU?
  {
    question_id: 1,
    text: "Which of these do you enjoy most?",
    answers: ["Drawing or making things look fine", "Solving difficult problems", "Talking to people", "Arranging or organizing things", "Figuring out how things work"],
    weights: { "Product Design": [3,0,0,0,0], "Graphics Design": [3,0,0,0,0], "Backend Development": [0,3,0,0,3], "Cybersecurity": [0,2,0,0,0], "Digital Marketing": [0,0,3,0,0], "Product Management": [0,0,2,3,0], "Data Analytics": [0,0,0,2,0], "Frontend Development": [0,0,0,0,2] }
  },
  {
    question_id: 2,
    text: "When people need help, what do they usually come to you for?",
    answers: ["Advice", "Fixing problems", "Making things look better", "Explaining things", "Helping them stay organized"],
    weights: { "Product Management": [2,0,0,0,3], "Technical Writing": [2,0,0,3,0], "Digital Marketing": [1,0,0,0,0], "Backend Development": [0,3,0,0,0], "Cybersecurity": [0,2,0,0,0], "Product Design": [0,0,3,0,0], "Graphics Design": [0,0,3,0,0], "Content Creation": [0,0,0,2,0], "Data Analytics": [0,0,0,0,2] }
  },
  {
    question_id: 3,
    text: "Which school subject did/do you enjoy most?",
    answers: ["Fine art", "Mathematics", "English/Literature", "Computer studies", "Business/Economics"],
    weights: { "Product Design": [3,0,0,0,0], "Graphics Design": [3,0,0,0,0], "Data Analytics": [0,3,0,0,0], "Backend Development": [0,2,0,2,0], "Technical Writing": [0,0,3,0,0], "Content Creation": [0,0,2,0,0], "Frontend Development": [0,0,0,2,0], "Cybersecurity": [0,0,0,2,0], "Product Management": [0,0,0,0,3], "Digital Marketing": [0,0,0,0,2] }
  },
  {
    question_id: 4,
    text: "If you had free data and a laptop for one week, what would you most likely spend time doing?",
    answers: ["Watching creative videos", "Learning how apps/websites work", "Posting or growing social media", "Watching business or money content", "Learning random interesting things"],
    weights: { "Video Editing": [3,0,0,0,0], "Content Creation": [3,0,3,0,0], "Frontend Development": [0,3,0,0,0], "Backend Development": [0,3,0,0,0], "Digital Marketing": [0,0,3,0,0], "Product Management": [0,0,0,3,0], "Data Analytics": [0,0,0,2,0], "Cybersecurity": [0,0,0,0,2], "Technical Writing": [0,0,0,0,2] }
  },
  {
    question_id: 5,
    text: "Which of these sounds most fun?",
    answers: ["Creating designs or videos", "Building a website or app", "Finding hidden information in numbers", "Protecting systems from hackers", "Helping businesses grow online"],
    weights: { "Graphics Design": [3,0,0,0,0], "Video Editing": [3,0,0,0,0], "Frontend Development": [0,3,0,0,0], "Backend Development": [0,3,0,0,0], "Data Analytics": [0,0,3,0,0], "Cybersecurity": [0,0,0,3,0], "Digital Marketing": [0,0,0,0,3], "Product Management": [0,0,0,0,2] }
  },
  // SECTION 2 — HOW YOUR MIND WORKS
  {
    question_id: 6,
    text: "When something spoils, what do you normally do?",
    answers: ["Try to fix it", "Ask someone for help", "Watch videos to understand it", "Ignore it until later", "Find another method"],
    weights: { "Backend Development": [3,0,0,0,0], "Cybersecurity": [2,0,0,0,0], "Product Management": [0,2,0,0,0], "Digital Marketing": [0,2,0,0,0], "Content Creation": [0,0,2,0,0], "Video Editing": [0,0,2,0,0], "Frontend Development": [0,0,0,0,2], "Product Design": [0,0,0,0,2] }
  },
  {
    question_id: 7,
    text: "Which best describes you?",
    answers: ["I notice small details quickly", "I talk a lot and express myself well", "I enjoy thinking deeply", "I enjoy trying new things", "I like when things look neat and attractive"],
    weights: { "Data Analytics": [3,0,0,0,0], "Cybersecurity": [3,0,2,0,0], "Technical Writing": [2,0,0,0,0], "Digital Marketing": [0,3,0,0,0], "Content Creation": [0,3,0,0,0], "Backend Development": [0,0,3,0,0], "Frontend Development": [0,0,0,2,0], "Product Design": [0,0,0,2,3], "Graphics Design": [0,0,0,0,3] }
  },
  {
    question_id: 8,
    text: "What do you usually do first when using a new app?",
    answers: ["Check how it looks", "Click everything out of curiosity", "Read instructions carefully", "Test different features", "Use only what I need"],
    weights: { "Product Design": [3,0,0,0,0], "Graphics Design": [2,0,0,0,0], "Content Creation": [0,2,0,0,0], "Digital Marketing": [0,2,0,0,0], "Technical Writing": [0,0,3,0,0], "Data Analytics": [0,0,2,0,0], "Cybersecurity": [0,0,0,2,0], "Frontend Development": [0,0,0,2,0], "Product Management": [0,0,0,0,2] }
  },
  {
    question_id: 9,
    text: "Which would stress you the most?",
    answers: ["Speaking in public", "Too much calculation", "Repeating the same thing every day", "Drawing/design work", "Strict rules and instructions"],
    weights: { "Backend Development": [1,0,1,1,0], "Data Analytics": [1,0,0,0,0], "Product Design": [0,1,0,0,1], "Digital Marketing": [0,1,0,0,0], "Content Creation": [0,0,1,0,1], "Video Editing": [0,0,1,0,0], "Cybersecurity": [0,0,0,1,0] }
  },
  {
    question_id: 10,
    text: "Which sounds more like you?",
    answers: ["I enjoy creativity", "I enjoy solving problems", "I enjoy helping people", "I enjoy understanding systems", "I enjoy analyzing things"],
    weights: { "Product Design": [3,0,0,0,0], "Graphics Design": [3,0,0,0,0], "Video Editing": [2,0,0,0,0], "Backend Development": [0,3,0,3,0], "Cybersecurity": [0,2,0,3,0], "Frontend Development": [0,2,0,0,0], "Product Management": [0,0,3,0,2], "Digital Marketing": [0,0,2,0,0], "Technical Writing": [0,0,2,0,0], "Data Analytics": [0,0,0,0,3] }
  },
  // SECTION 3 — THINGS YOU NATURALLY ENJOY
  {
    question_id: 11,
    text: "Which type of videos do you enjoy most online?",
    answers: ["Design/content creation videos", "Tech videos", "Business videos", "Educational videos", "Social media trend videos"],
    weights: { "Product Design": [3,0,0,0,0], "Graphics Design": [3,0,0,0,0], "Frontend Development": [0,3,0,0,0], "Backend Development": [0,3,0,0,0], "Cybersecurity": [0,3,0,0,0], "Product Management": [0,0,3,0,0], "Data Analytics": [0,0,2,2,0], "Technical Writing": [0,0,0,3,0], "Content Creation": [0,0,0,0,3], "Digital Marketing": [0,0,0,0,3] }
  },
  {
    question_id: 12,
    text: "Which of these would you learn even if nobody forced you?",
    answers: ["Video editing", "Graphic design", "Coding", "Social media marketing", "Cybersecurity/hacking", "Data analysis"],
    weights: { "Video Editing": [3,0,0,0,0,0], "Graphics Design": [0,3,0,0,0,0], "Frontend Development": [0,0,3,0,0,0], "Backend Development": [0,0,3,0,0,0], "Digital Marketing": [0,0,0,3,0,0], "Cybersecurity": [0,0,0,0,3,0], "Data Analytics": [0,0,0,0,0,3] }
  },
  {
    question_id: 13,
    text: "If you owned a business, what would you care about most?",
    answers: ["Making the brand attractive", "Getting more customers", "Organizing the business well", "Protecting customer information", "Understanding customer behavior"],
    weights: { "Product Design": [3,0,0,0,0], "Graphics Design": [3,0,0,0,0], "Digital Marketing": [0,3,0,0,2], "Product Management": [0,2,3,0,0], "Data Analytics": [0,0,2,0,3], "Cybersecurity": [0,0,0,3,0] }
  },
  {
    question_id: 14,
    text: "Which sounds most exciting?",
    answers: ["Creating something people will admire", "Solving a difficult challenge", "Discovering hidden patterns", "Growing an audience online", "Learning how systems work"],
    weights: { "Product Design": [3,0,0,0,0], "Graphics Design": [3,0,0,0,0], "Video Editing": [3,0,0,0,0], "Backend Development": [0,3,0,0,3], "Cybersecurity": [0,3,0,0,0], "Data Analytics": [0,0,3,0,0], "Digital Marketing": [0,0,0,3,0], "Content Creation": [0,0,0,3,0], "Frontend Development": [0,0,0,0,2] }
  },
  {
    question_id: 15,
    text: "What kind of compliment do you get most?",
    answers: ["You’re creative", "You’re smart", "You explain things well", "You’re organized", "You learn fast"],
    weights: { "Product Design": [3,0,0,0,0], "Graphics Design": [3,0,0,0,0], "Video Editing": [2,0,0,0,0], "Backend Development": [0,3,0,0,3], "Data Analytics": [0,3,0,2,0], "Cybersecurity": [0,3,0,0,0], "Technical Writing": [0,0,3,0,0], "Content Creation": [0,0,2,0,0], "Product Management": [0,0,0,3,0], "Frontend Development": [0,0,0,0,3] }
  },
  // SECTION 4 — REAL LIFE SCENARIOS
  {
    question_id: 16,
    text: "Your friend wants to start a business. How would you help most?",
    answers: ["Design logo/flyers", "Promote it online", "Build a website", "Organize the operations", "Help understand customer data"],
    weights: { "Graphics Design": [3,0,0,0,0], "Product Design": [2,0,0,0,0], "Digital Marketing": [0,3,0,0,2], "Frontend Development": [0,0,3,0,0], "Backend Development": [0,0,2,0,0], "Product Management": [0,0,0,3,0], "Data Analytics": [0,0,0,2,3] }
  },
  {
    question_id: 17,
    text: "Which activity sounds more interesting?",
    answers: ["Editing pictures/videos", "Solving puzzles", "Learning computer tricks", "Posting content online", "Researching information"],
    weights: { "Video Editing": [3,0,0,0,0], "Graphics Design": [3,0,0,0,0], "Backend Development": [0,3,0,0,0], "Cybersecurity": [0,3,2,0,0], "Frontend Development": [0,0,3,0,0], "Digital Marketing": [0,0,0,3,0], "Content Creation": [0,0,0,3,0], "Technical Writing": [0,0,0,0,3], "Data Analytics": [0,0,0,0,2] }
  },
  {
    question_id: 18,
    text: "If your phone suddenly develops a problem, what would you most likely do?",
    answers: ["Watch YouTube tutorials", "Give it to an expert", "Try random things until it works", "Research the exact issue", "Ignore it for a while"],
    weights: { "Content Creation": [2,0,0,0,0], "Video Editing": [1,0,0,0,0], "Product Management": [0,2,0,0,0], "Frontend Development": [0,0,1,0,0], "Product Design": [0,0,1,0,0], "Technical Writing": [0,0,0,3,0], "Data Analytics": [0,0,0,2,0] }
  },
  {
    question_id: 19,
    text: "Which would you rather spend 5 hours doing?",
    answers: ["Creating content/designs", "Learning software tools", "Solving a challenge", "Researching trends", "Organizing information"],
    weights: { "Content Creation": [3,0,0,0,0], "Graphics Design": [3,0,0,0,0], "Product Design": [3,0,0,0,0], "Frontend Development": [0,3,0,0,0], "Backend Development": [0,3,3,0,0], "Cybersecurity": [0,0,3,0,0], "Digital Marketing": [0,0,0,3,0], "Data Analytics": [0,0,0,2,3], "Product Management": [0,0,0,0,3] }
  },
  {
    question_id: 20,
    text: "Which statement sounds most like you?",
    answers: ["I love expressing ideas visually", "I enjoy understanding how things work", "I enjoy convincing or attracting people", "I enjoy discovering useful information", "I enjoy solving difficult challenges"],
    weights: { "Product Design": [3,0,0,0,0], "Graphics Design": [3,0,0,0,0], "Video Editing": [3,0,0,0,0], "Backend Development": [0,3,0,0,3], "Frontend Development": [0,2,0,0,0], "Digital Marketing": [0,0,3,0,0], "Product Management": [0,0,2,0,0], "Data Analytics": [0,0,0,3,0], "Technical Writing": [0,0,0,2,0], "Cybersecurity": [0,0,0,0,3] }
  },
  {
    question_id: 21,
    text: "Which of these tech careers are you already interested in?",
    answers: ["Design", "Coding", "Marketing", "Data", "Cybersecurity", "Not sure yet"],
    weights: { "Product Design": [3,0,0,0,0,0], "Graphics Design": [3,0,0,0,0,0], "Frontend Development": [0,3,0,0,0,0], "Backend Development": [0,3,0,0,0,0], "Digital Marketing": [0,0,3,0,0,0], "Data Analytics": [0,0,0,3,0,0], "Cybersecurity": [0,0,0,0,3,0] }
  },
  {
    question_id: 22,
    text: "Why are you interested in tech?",
    answers: ["To earn more money", "To work remotely", "I enjoy technology", "I want a better career", "I’m still exploring", "I want to build something"],
    weights: { "Frontend Development": [0,0,0,0,0,3], "Backend Development": [0,0,0,0,0,3], "Product Design": [0,0,0,0,0,2], "Graphics Design": [0,0,0,0,0,2] }
  }
];
