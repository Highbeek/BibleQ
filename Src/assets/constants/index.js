import {
  preview,
  // slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8,
  slide9,
  slide10,
} from "../images";

export const carouselData = [
  { id: 1, img: preview, title: "Slide 1" },
  { id: 2, img: slide2, title: "Slide 2" },
  { id: 3, img: slide3, title: "Slide 3" },
  { id: 4, img: slide4, title: "Slide 4" },
  { id: 5, img: slide5, title: "Slide 5" },
  { id: 6, img: slide6, title: "Slide 6" },
  { id: 7, img: slide7, title: "Slide 7" },
  { id: 8, img: slide8, title: "Slide 8" },
  { id: 9, img: slide9, title: "Slide 9" },
  { id: 10, img: slide10, title: "Slide 10" },
];

// bibleQuestions.js
export const bibleQuestions = {
  oldTestament: [
    {
      id: "Q1",
      question: "Who was the first man created by God?",
      answers: ["Adam", "Noah", "Abraham", "Moses"],
      correctAnswer: "Adam",
    },
    {
      id: "Q2",
      question:
        "Who built the ark to save his family and animals from the flood?",
      answers: ["Abraham", "Moses", "Noah", "David"],
      correctAnswer: "Noah",
    },
    // Add more Old Testament questions here...
  ],
  newTestament: [
    {
      id: "Q3",
      question: "Who baptized Jesus in the Jordan River?",
      answers: ["John the Baptist", "Peter", "Paul", "James"],
      correctAnswer: "John the Baptist",
    },
    {
      id: "Q4",
      question: "Which disciple betrayed Jesus for thirty pieces of silver?",
      answers: ["Peter", "Thomas", "Judas Iscariot", "Matthew"],
      correctAnswer: "Judas Iscariot",
    },
    // Add more New Testament questions here...
  ],
  wholeBible: [
    {
      id: "Q5",
      question: "How many books are there in the Bible?",
      answers: ["39", "66", "72", "80"],
      correctAnswer: "66",
    },
    {
      id: "Q6",
      question: "Which book is known as the Psalms of the Bible?",
      answers: ["Psalms", "Proverbs", "Genesis", "Exodus"],
      correctAnswer: "Psalms",
    },
    // Add more general Bible questions here...
  ],
};