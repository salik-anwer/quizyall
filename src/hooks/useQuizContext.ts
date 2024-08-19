import { useContext } from "react";
import { QuizContext, QuizContextProps } from "../context/QuizContext";

const useQuizContext = (): QuizContextProps => {
    const context = useContext(QuizContext);
    if (!context) {
      throw new Error('useContext must be used within a ContextProvider');
    }
    return context;
  };

export {useQuizContext};