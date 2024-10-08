import { useState, useEffect } from 'react';
import { useQuizContext } from '../../hooks/useQuizContext';
import { fetchCategories } from '../../utilities/fetchCategories';
import { fetchQuestions } from '../../utilities/fetchQuestions';
import './StartPage.scss'; 

export const StartPage = ({onStart} : {onStart: () => void}) => {
  const { updateQuestions, updateLoading } = useQuizContext();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    (async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    })();
  }, []);

  const handleQuery = async () => {
    updateLoading(true);
    onStart();

    const categoryQuery = category ? `&category=${category}` : '';
    const difficultyQuery = difficulty ? `&difficulty=${difficulty}` : '';

    const questions = await fetchQuestions(categoryQuery, difficultyQuery);

    updateQuestions(questions);
    updateLoading(false);
  };

  return (
    <div className="start-page-container">
      <div className='title-container'>
        <img src='/quiz.png' alt='logo' height={50} width={50}/>
        <h1 className="title">Quizyall</h1>
      </div>
      <div className="select-container">
        <label htmlFor="category-select">Select Category:</label>
        <select
          id="category-select"
          value={category || ''}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Any Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label htmlFor="difficulty-select">Select Difficulty:</label>
        <select
          id="difficulty-select"
          value={difficulty || ''}
          onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button className="start-button" onClick={handleQuery}>
        Start Quiz
      </button>
    </div>
  );
};
