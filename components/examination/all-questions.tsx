"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  SaveIcon,
  TrashIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback, useEffect, useState } from "react";
import {
  setQuestions,
  setCurrentQuestion,
  setAnswer,
  toggleMarkForReview,
  recalculateQuestionStates,
  setExamMeta,
} from "@/store/exam-slice";
import { questions } from "@/lib/dummy-question";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QuestionAnswer, QuestionType } from "@/types/question.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import QuestionWise from "@/components/examination/questions/question-wise";
import QuestionHeader from "./questions/question-header";
import MultipleType from "./questions/multiple-answer";
import SingleAnswer from "./questions/single-answer";

function AllQuestions() {
  const [allQuestionsAnswers, setAllQuestionsAnswers] = useState<
    Record<string, string | string[]>
  >({});

  const questionsState = useSelector(
    (state: RootState) => state.exam.questions
  );

  const tab = useSelector((state: RootState) => state.exam.tab);
  return (
    <>
      {tab === "all-questions" && (
        <>
          {questions.map((question, questionIndex) => (
            <div
              key={question.id}
              id={`all-questions-${question.id}`}
              className="mb-8 border rounded-lg p-4"
            >
              <QuestionHeader
                questionIndex={questionIndex}
                question={question}
              />
              <div className="mb-2 mt-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">{question.question}</p>
                  {questionsState.find((q) => q.id === question.id)?.marked && (
                    <BookmarkIcon className="h-10 w-10 text-yellow-600 p-2 rounded-full bg-yellow-600/10" />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {question.type === QuestionType.SINGLE_CHOICE ? (
                  <MultipleType
                    answer={allQuestionsAnswers[question.id] as string}
                    options={question.options}
                    id={question.id}
                  />
                ) : (
                  <div className="flex flex-col gap-2">
                    {question.options.map((option) => (
                      <SingleAnswer
                        key={`single-${question.id}-${option.id}`}
                        id={question.id}
                        option={option}
                        checked={(
                          allQuestionsAnswers[question.id] as string[]
                        )?.includes(option.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default AllQuestions;
