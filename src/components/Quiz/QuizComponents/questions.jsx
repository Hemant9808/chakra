// src/data/questions.js

const questions = [
  {
    question: "What brought you to us today?",
    image: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif",
    options: [
      "Erection problems",
      "Ejaculation problems",
      "Sexual urge problems",
      "Size problems",
      "I don’t know, I’m just not feeling it",
    ],
  },
  {
    question: "How long have you been facing this issue?",
    image: "https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif",
    options: [
      "A few weeks",
      "2-3 months",
      "Over 6 months",
      "Over a year",
      "Since the beginning",
    ],
  },
  {
    question: "How frequently do you have sex?",
    image: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
    options: [
      "More than 4 times a week",
      "2-4 times a week",
      "Once a week",
      "Once in 2-3 weeks",
      "I don't remember",
    ],
  },
  {
    question: "How confident are you in bed?",
    image: "https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif",
    options: [
      "Very confident",
      "Somewhat confident",
      "Neutral",
      "Not confident",
      "I avoid it",
    ],
  },
  {
    question: "What do you think is the main cause of the issue?",
    image: "https://media.giphy.com/media/l41YdAH8JbPEN0LLO/giphy.gif",
    options: ["Stress", "Workload", "Lifestyle", "Lack of sleep", "No idea"],
  },
  // New question for phone number only
  {
    question: "Please provide your phone number to continue.",
    image: "https://media.giphy.com/media/3o7TKH1fOWo4bH4KDS/giphy.gif",
    type: "phoneInput", // Custom type for this question
  },
  {
    question: "Are you currently taking any medication or supplements?",
    image: "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif",
    options: [
      "No",
      "Yes, allopathy",
      "Yes, Ayurvedic",
      "Yes, homeopathy",
      "Yes, other",
    ],
  },
  {
    question: "Do you consume alcohol, tobacco, or smoke?",
    image: "https://media.giphy.com/media/3o6Mbcj5Cj0P5EJxX2/giphy.gif",
    options: [
      "None of them",
      "Alcohol only",
      "Smoke only",
      "Both alcohol and smoke",
      "All of them regularly",
    ],
  },
  {
    question: "How is your sleep quality?",
    image: "https://media.giphy.com/media/l2JhBtz3dlKFV0WEo/giphy.gif",
    options: ["Very good", "Good", "Fair", "Poor", "Very poor"],
  },
  {
    question: "Do you experience any of the following?",
    image: "https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif",
    options: [
      "Fatigue",
      "Low confidence",
      "Stress",
      "All of them",
      "None",
    ],
  },
  {
    question: "How would you describe your lifestyle?",
    image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
    options: [
      "Very active",
      "Moderately active",
      "Balanced",
      "Sedentary",
      "Very inactive",
    ],
  },
  // New final question for name and email
  {
    question: "Just one last step to get your personalized report!",
    image: "https://media.giphy.com/media/3o7btPCcdNni1e3D32/giphy.gif",
    type: "contactForm", // Custom type for the final form
  },
];

export default questions;