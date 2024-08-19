export async function fetchQuestions(categoryQuery: string, difficultyQuery: string) {
    const res = await fetch(`https://opentdb.com/api.php?amount=10${categoryQuery}${difficultyQuery}`);
    const data = await res.json();
    const questions = data.results;
    return questions;
};