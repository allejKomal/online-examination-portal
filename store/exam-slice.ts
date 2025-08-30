import { Question, QuestionIdx } from "@/types/question.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Answers = Record<string, string | null>;

interface ExamState {
  answers: Answers;
  marked: Record<string, boolean>;
  visited: Record<string, boolean>;
  currentQuestionId: string | null;
  currentQuestion: Question | null;
  questions: QuestionIdx[];
  currentQuestionIdx: number;
  tab: "question-wise" | "all-questions";
  examMeta: {
    Duration: number;
    userName: string;
    examName: string;
  };
}

const initialState: ExamState = {
  answers: {},
  marked: {},
  visited: {},
  currentQuestionId: null,
  questions: [],
  currentQuestion: null,
  currentQuestionIdx: 0,
  tab: "question-wise",
  examMeta: {
    Duration: 0,
    userName: "",
    examName: "",
  },
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload.map((question, idx) => ({
        ...question,
        idx,
        answered: !!state.answers[question.id], // Check if answer exists
        marked: !!state.marked[question.id], // Check if marked exists
        visited: !!state.answers[question.id] || !!state.visited[question.id], // Visited if answered or previously visited
        reviewed: !!state.marked[question.id], // Same as marked
      }));
    },
    setAnswer(state, action: PayloadAction<{ qid: string; answer: string }>) {
      const { qid, answer } = action.payload;
      if (answer && answer.trim() !== "") {
        state.answers[qid] = answer;
        state.questions.find((question) => question.id === qid)!.answered =
          true;
      } else {
        // Remove answer if it's empty
        delete state.answers[qid];
        state.questions.find((question) => question.id === qid)!.answered =
          false;
      }
      state.visited[qid] = true;
    },
    toggleMarkForReview(state, action: PayloadAction<string>) {
      const qid = action.payload;
      const question = state.questions.find((q) => q.id === qid);
      if (question) {
        question.marked = !question.marked;
        state.marked[qid] = question.marked;
        question.reviewed = question.marked; // Keep reviewed in sync with marked
      }
    },
    setCurrentQuestion(state, action: PayloadAction<string>) {
      state.currentQuestion =
        state.questions.find((question) => question.id === action.payload) ||
        null;
      state.questions.find(
        (question) => question.id === action.payload
      )!.visited = true;
      state.currentQuestionIdx =
        state.questions.findIndex(
          (question) => question.id === action.payload
        ) || 0;
    },
    setCurrentQuestionId(state, action: PayloadAction<number>) {
      state.currentQuestionIdx = action.payload;
      state.currentQuestion = state.questions[action.payload];
    },
    clearCurrentQuestion(state) {
      state.currentQuestionId = null;
      state.currentQuestionIdx = 0;
    },
    clearExam(state) {
      state.answers = {};
      state.marked = {};
      state.visited = {};
      state.currentQuestionId = null;
      state.currentQuestionIdx = 0;
      state.currentQuestion = null;
    },
    recalculateQuestionStates(state) {
      // Recalculate question states based on current answers and marked status
      state.questions.forEach((question) => {
        question.answered = !!state.answers[question.id];
        question.marked = !!state.marked[question.id];
        question.visited =
          !!state.answers[question.id] || !!state.visited[question.id];
        question.reviewed = !!state.marked[question.id];
      });
    },
    setExamMeta(
      state,
      action: PayloadAction<{
        Duration: number;
        userName: string;
        examName: string;
      }>
    ) {
      state.examMeta = action.payload;
    },
    setTab(state, action: PayloadAction<"question-wise" | "all-questions">) {
      state.tab = action.payload;
    },
  },
});

export const {
  setQuestions,
  setAnswer,
  setCurrentQuestion,
  setCurrentQuestionId,
  clearCurrentQuestion,
  clearExam,
  toggleMarkForReview,
  recalculateQuestionStates,
  setExamMeta,
  setTab,
} = examSlice.actions;

export default examSlice.reducer;
