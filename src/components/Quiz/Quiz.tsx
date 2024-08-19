import { useEffect, useState } from 'react';
import './Quiz.scss'; 
import { useQuizContext } from '../../hooks/useQuizContext';
import { Spinner } from '../Spinner/Spinner';

type QuizProps = {
  onFinish: () => void;
};

export const Quiz: React.FC<QuizProps> = ({ onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const { updateScore, updateResponses, questions, loading} = useQuizContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);

    if (timeLeft === 0) {
      handleNext();
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(60); 
  }, [currentQuestionIndex]);

  if(loading || !questions) return <Spinner/>;
  
  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selectedAnswer === currentQuestion.correct_answer) {
      updateScore();
    }
    if(selectedAnswer) {
      const response = {question: atob(currentQuestion.question), answer: atob(currentQuestion.correct_answer), response: atob(selectedAnswer)};
      updateResponses(response);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onFinish();
    }
  };

  const getButtonClass = (option: string) => {
    if (!isSubmitted) {
      return selectedAnswer === option ? 'selected' : '';
    }
    if (option === currentQuestion.correct_answer) {
      return 'correct';
    }
    if (selectedAnswer === option && option !== currentQuestion.correct_answer) {
      return 'wrong';
    }
    return '';
  };

  return (
    <div className="quiz-container">
      <div className="timer">{timeLeft}</div>
      <h2 className='question-index'>Question {currentQuestionIndex + 1}</h2>
      <p className="question">{atob(currentQuestion.question)}</p>
      <div className="options">
        {currentQuestion.incorrect_answers
          .concat(currentQuestion.correct_answer)
          .sort()
          .map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={getButtonClass(option)}
              disabled={isSubmitted}
            >
              {atob(option)}
            </button>
          ))}
      </div>
      <div className="navigation">
        <button onClick={handleSubmit} disabled={isSubmitted || !selectedAnswer}>
          Submit
        </button>
        <button onClick={handleNext} disabled={!isSubmitted}>
          Next
        </button>
        <button onClick={onFinish}>Quit</button>
      </div>
    </div>
  );
};
