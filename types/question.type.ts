export const QuestionType = {
  MULTIPLE_CHOICE: "multiple_choice",
  SINGLE_CHOICE: "single_choice",
};

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

export interface QuestionOption {
  id: string;
  option: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
  type: QuestionType;
  positiveMarks: number;
  negativeMarks: number;
}

export interface QuestionIdx {
  id: string;
  question: string;
  options: QuestionOption[];
  type: QuestionType;
  positiveMarks: number;
  negativeMarks: number;
  idx: number;
  answered: boolean;
  marked: boolean;
  visited: boolean;
  reviewed: boolean;
}

export interface QuestionAnswer {
  id: string;
  answer: string | string[];
}
