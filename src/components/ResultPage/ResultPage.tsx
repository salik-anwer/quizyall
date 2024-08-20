import React from 'react';
import { useQuizContext } from '../../hooks/useQuizContext';
import './ResultPage.scss';

type ResultPageProps = {
  onRestart: () => void;
  onFinish: () => void;
};

export const ResultPage: React.FC<ResultPageProps> = ({ onRestart, onFinish }) => {
  const { responses, questions, score } = useQuizContext();

  return (
    <div className='result-container'>
    <div className="result-page-container">
      <h2 className="score">
        Your Score: {score} / {questions?.length}
      </h2>
      {!!responses?.length && <div className="review-section">
        <h3 className='response-title'>Your responses:</h3>
        {responses.map((item, index) => (
          <div key={index} className="review-item">
            <p className="question">Q{index + 1}: {item.question}</p>
            <p className="answer">Correct Answer: <span>{item.answer}</span></p>
            <p className={`response ${item.answer === item.response ? 'correct' : 'wrong'}`}>
              Your Answer: <span>{item.response}</span>
            </p>
          </div>
        ))}
      </div>}
      <div className="button-group">
        <button className="result-button" onClick={onRestart}>Restart Quiz</button>
        <button className="result-button" onClick={onFinish}>Finish</button>
      </div>
    </div>
    </div>
  );
};
