import { Question } from "../context/QuizContext";

export async function fetchQuestions(categoryQuery: string, difficultyQuery: string) {
    const res = await fetch(`https://opentdb.com/api.php?amount=10${categoryQuery}${difficultyQuery}&encode=base64`);
    const data = await res.json();
    const questions: Question[] = data.results;
    return questions;
};