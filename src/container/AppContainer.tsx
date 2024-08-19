import App from "../App";
import { QuizContextProvider } from "../context/QuizContext";

const AppContainer = () => {
    
    return (
        <QuizContextProvider>
            <App/>
        </QuizContextProvider>
    );
};

export {AppContainer};