import { StartPage } from './components/StartPage/StartPage';
import { Quiz } from './components/Quiz/Quiz';
import { ResultPage } from './components/ResultPage/ResultPage';
import { useQuizContext } from './hooks/useQuizContext';

const App = () => {
  const {step, resetScore, changeStep, resetResponses } = useQuizContext();

  const startQuiz = () => changeStep('quiz');
  const finishQuiz = () => changeStep('result');
  const restartQuiz = () => {
    resetResponses();
    resetScore();
    changeStep('quiz');
  };
  const endQuiz = () => {
    resetResponses();
    resetScore();
    changeStep('start');
  }

  return (
      <div className="app">
        {step === 'start' && <StartPage onStart = {startQuiz} />}
        {step === 'quiz' && <Quiz onFinish={finishQuiz} />}
        {step === 'result' && <ResultPage onRestart={restartQuiz} onFinish={endQuiz} />}
      </div>
  );
};

export default App;
