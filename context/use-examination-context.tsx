import { questions } from "@/lib/dummy-question";
import {
  recalculateQuestionStates,
  setAnswer,
  setCurrentQuestion,
  setExamMeta,
  setQuestions,
  toggleMarkForReview,
} from "@/store/exam-slice";
import { RootState } from "@/store/store";
import { QuestionAnswer } from "@/types/question.type";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";

interface ExaminationContextType {
  selectedAnswers: string[];
  setSelectedAnswers: (answers: string[]) => void;

  currentQuestionAnswer: QuestionAnswer | null;
  setCurrentQuestionAnswer: (answer: QuestionAnswer | null) => void;
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
  handleSingleChoiceAnswer: (value: string) => void;
  handleMultipleChoiceAnswer: (optionId: string, checked: boolean) => void;
  clearResponse: () => void;
  handleMarkForReviewAndNext: () => void;
  handleSaveAndNext: () => void;
}

const ExaminationContext = createContext<ExaminationContextType | undefined>(
  undefined
);

interface ExaminationContextProviderProps {
  children: ReactNode;
}

export const ExaminationContextProvider: React.FC<ExaminationContextProviderProps> = ({
  children,
}) => {
  const [currentQuestionAnswer, setCurrentQuestionAnswer] =
    useState<QuestionAnswer | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const dispatch = useDispatch();
  const questionsState = useSelector(
    (state: RootState) => state.exam.questions
  );
  const currentQuestion = useSelector(
    (state: RootState) => state.exam.currentQuestion
  );
  const currentQuestionIdx = useSelector(
    (state: RootState) => state.exam.currentQuestionIdx
  );
  const answers = useSelector((state: RootState) => state.exam.answers);
  const currentQuestionWithIdx = useSelector(
    (state: RootState) => state.exam.questions[currentQuestionIdx]
  );
  useEffect(() => {
    const existingAnswers = sessionStorage.getItem("exam-answers");
    const existingMarked = sessionStorage.getItem("exam-marked");

    if (existingAnswers) {
      try {
        const parsedAnswers = JSON.parse(existingAnswers);
        Object.entries(parsedAnswers).forEach(([qid, answer]) => {
          if (answer && typeof answer === "string" && answer.trim() !== "") {
            dispatch(setAnswer({ qid, answer: answer as string }));
          }
        });
      } catch (error) {
        console.error("Error parsing stored answers:", error);
      }
    }

    if (existingMarked) {
      try {
        const parsedMarked = JSON.parse(existingMarked);
        Object.entries(parsedMarked).forEach(([qid, marked]) => {
          if (marked) {
            dispatch(toggleMarkForReview(qid));
          }
        });
      } catch (error) {
        console.error("Error parsing stored marked status:", error);
      }
    }

    if (!sessionStorage.getItem("exam-time-left")) {
      sessionStorage.setItem("exam-time-left", "30:00");
    }

    dispatch(setQuestions(questions));
    dispatch(
      setExamMeta({
        Duration: 120,
        userName: "Javeed Hussain Siddiqui",
        examName: "AI Exam",
      })
    );
    dispatch(setCurrentQuestion(questions[0].id));
  }, [dispatch, questions]);

  useEffect(() => {
    if (questionsState.length > 0 && Object.keys(answers).length > 0) {
      dispatch(recalculateQuestionStates());
    }
  }, [questionsState.length, answers, dispatch]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      sessionStorage.setItem("exam-answers", JSON.stringify(answers));
    }
  }, [answers]);

  useEffect(() => {
    const markedQuestions = questionsState.filter((q) => q.marked);
    if (markedQuestions.length > 0) {
      const markedMap = markedQuestions.reduce((acc, q) => {
        acc[q.id] = true;
        return acc;
      }, {} as Record<string, boolean>);
      sessionStorage.setItem("exam-marked", JSON.stringify(markedMap));
    }
  }, [questionsState]);

  useEffect(() => {
    setSelectedAnswers([]);
    setCurrentQuestionAnswer(null);

    if (currentQuestion?.id && answers[currentQuestion.id]) {
      const savedAnswer = answers[currentQuestion.id];
      if (savedAnswer) {
        const answerArray = savedAnswer.split(",");
        setSelectedAnswers(answerArray);
        setCurrentQuestionAnswer({
          id: currentQuestion.id,
          answer: answerArray,
        });
      }
    }
  }, [currentQuestion?.id, answers]);

  const handleSingleChoiceAnswer = (value: string) => {
    setSelectedAnswers([value]);
    setCurrentQuestionAnswer({
      id: currentQuestion?.id || "",
      answer: value,
    });
  };

  const handleMultipleChoiceAnswer = (optionId: string, checked: boolean) => {
    let newAnswers: string[];
    if (checked) {
      newAnswers = [...selectedAnswers, optionId];
    } else {
      newAnswers = selectedAnswers.filter((id) => id !== optionId);
    }
    setSelectedAnswers(newAnswers);

    if (newAnswers.length > 0) {
      setCurrentQuestionAnswer({
        id: currentQuestion?.id || "",
        answer: newAnswers,
      });
    } else {
      setCurrentQuestionAnswer(null);
    }
  };

  // New handlers for all questions view

  //   const handleAllQuestionsMultipleChoice = (
  //     optionId: string,
  //     checked: boolean,
  //     questionId: string
  //   ) => {
  //     const currentAnswers = (allQuestionsAnswers[questionId] as string[]) || [];

  //     let newAnswers: string[];
  //     if (checked) {
  //       newAnswers = [...currentAnswers, optionId];
  //     } else {
  //       newAnswers = currentAnswers.filter((id) => id !== optionId);
  //     }

  //     setAllQuestionsAnswers((prev) => ({
  //       ...prev,
  //       [questionId]: newAnswers,
  //     }));
  //   };

  const clearResponse = useCallback(() => {
    setSelectedAnswers([]);
    setCurrentQuestionAnswer(null);
  }, [currentQuestion?.id, answers, dispatch]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIdx < questions.length - 1) {
      dispatch(setCurrentQuestion(questions[currentQuestionIdx + 1].id));
    }
  }, [currentQuestionIdx, questions, dispatch]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIdx > 0) {
      dispatch(setCurrentQuestion(questions[currentQuestionIdx - 1].id));
    }
  }, [currentQuestionIdx, questions, dispatch]);

  const handleMarkForReviewAndNext = useCallback(() => {
    if (currentQuestion?.id) {
      dispatch(toggleMarkForReview(currentQuestion.id));
    }
    if (currentQuestionIdx < questions.length - 1) {
      dispatch(setCurrentQuestion(questions[currentQuestionIdx + 1].id));
    }
  }, [currentQuestionIdx, questions, dispatch, currentQuestion?.id]);

  const handleSaveAndNext = useCallback(() => {
    if (currentQuestionAnswer?.answer) {
      const answerString = Array.isArray(currentQuestionAnswer.answer)
        ? currentQuestionAnswer.answer.join(",")
        : currentQuestionAnswer.answer;

      dispatch(
        setAnswer({
          qid: currentQuestion?.id || "",
          answer: answerString,
        })
      );
      // Move to next question if available
    } else {
      dispatch(
        setAnswer({
          qid: currentQuestion?.id || "",
          answer: "",
        })
      );
    }
    if (currentQuestionIdx < questions.length - 1) {
      dispatch(setCurrentQuestion(questions[currentQuestionIdx + 1].id));
    }
  }, [currentQuestionIdx, currentQuestionAnswer, currentQuestion, dispatch]);

  useEffect(() => {
    console.log("Answers updated:", answers);
    console.log("Current question answer:", currentQuestionAnswer);

    // Recalculate question states when answers change
    if (Object.keys(answers).length > 0) {
      dispatch(recalculateQuestionStates());
    }
  }, [answers, currentQuestionAnswer, dispatch]);

  return (
    <ExaminationContext.Provider
      value={{
        handlePreviousQuestion,
        handleNextQuestion,
        selectedAnswers,
        setSelectedAnswers,
        currentQuestionAnswer,
        setCurrentQuestionAnswer,
        handleSingleChoiceAnswer,
        handleMultipleChoiceAnswer,
        clearResponse,
        handleMarkForReviewAndNext,
        handleSaveAndNext,
      }}
    >
      {children}
    </ExaminationContext.Provider>
  );
};

export const useExaminationContext = (): ExaminationContextType => {
  const context = useContext(ExaminationContext);
  if (!context) {
    throw new Error(
      "useExaminationContext must be used within a ExaminationContextProvider"
    );
  }
  return context;
};
