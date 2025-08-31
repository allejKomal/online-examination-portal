import React from "react";
import { Badge } from "@/components/ui/badge";
import { Question, QuestionType } from "@/types/question.type";

interface QuestionHeaderProps {
  questionIndex: number;
  question: Question | null;
}

function QuestionHeader({ questionIndex, question }: QuestionHeaderProps) {
  return (
    <div>
      <div className="px-4 py-3 w-full mt-2 bg-muted/10 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">
            Question Number: {questionIndex + 1}
          </span>
        </div>
        <div className="flex gap-2 text-sm">
          <Badge variant="secondary">
            <span>
              Type:{" "}
              {question?.type === QuestionType.SINGLE_CHOICE
                ? "Single Choice"
                : "Multiple Choice"}
            </span>
          </Badge>
          <Badge variant="secondary">
            <span>Marks: {question?.positiveMarks}</span>
          </Badge>
          <Badge variant="secondary">
            <span>Negative Marks: {question?.negativeMarks}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default QuestionHeader;
