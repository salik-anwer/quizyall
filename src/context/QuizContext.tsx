import { createContext, useState, ReactNode } from 'react';

interface Question {
  type: "boolean" | "multiple";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface UserResponse {
    question: string;
    answer: string;
    response: string;
}

type QuizStep = 'start' | 'quiz' | 'result';
 
interface QuizContextProps {
    step: QuizStep;
    changeStep: (step: QuizStep) => void;
    questions: Question[] | undefined;
    updateQuestions: (questions: Question[]) => void;
    score: number;
    updateScore: () => void;
    resetScore: () => void;
    responses: UserResponse[] | undefined;
    updateResponses: (response: UserResponse) => void;
    resetResponses: () => void;
    error: Error | null;
    updateError: (error: Error | null) => void;
    loading: boolean;
    updateLoading: (loading: boolean) => void;
  }


const QuizContext = createContext<QuizContextProps | undefined>(undefined);

const QuizContextProvider = ({ children }: {children: ReactNode}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number>(0);
  const [step, setStep] = useState<'start' | 'quiz' | 'result'>('start');
  const [responses, setResponses] = useState<UserResponse[]>([]);    
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const changeStep = (step: QuizStep) => {
    setStep(step);
  }

  const updateQuestions = (questions: Question[]) => {
    setQuestions(questions);
  }

  const updateScore = () => {
    setScore(prevScore => prevScore + 1);
  }

  const resetScore = () => {
    setScore(0);
  }

  const updateResponses = (response: UserResponse) => {
    setResponses(prevResponses => [...prevResponses, response]);
  };

  const resetResponses = () => {
    setResponses([]);
  }

  const updateLoading = (loading: boolean) => {
    setLoading(loading);
  }

  const updateError = (error: Error | null) => {
    setError(error);
  } 

  return (
    <QuizContext.Provider 
        value={{
            step,
            changeStep,
            questions,
            updateQuestions,
            score,
            updateScore,
            resetScore,
            responses,
            updateResponses,
            resetResponses,
            error,
            updateError,
            loading,
            updateLoading,
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizContextProvider };
export type {QuizContextProps};
