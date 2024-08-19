import { StartPage } from './components/StartPage/StartPage';
import { Quiz } from './components/Quiz/Quiz';
import { ResultPage } from './components/ResultPage/ResultPage';
import { useQuizContext } from './hooks/useQuizContext';

const App = () => {
  const {step, resetScore, changeStep, resetResponses } = useQuizContext();

  const quitQuiz = () => {
    resetResponses();
    resetScore();
    changeStep('start');
  }
  const finishQuiz = () => changeStep('result');
  const restartQuiz = () => {
    resetResponses();
    resetScore();
    changeStep('quiz');
  };

  return (
      <div className="app">
        {step === 'start' && <StartPage/>}
        {step === 'quiz' && <Quiz onFinish={finishQuiz} />}
        {step === 'result' && <ResultPage onRestart={restartQuiz} onFinish={quitQuiz} />}
      </div>
  );
};

export default App;
