"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
} from "lucide-react";
import { questions } from "@/lib/dummy-question";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { QuestionType } from "@/types/question.type";
import { Badge } from "@/components/ui/badge";
import { useExaminationContext } from "@/context/use-examination-context";
import { TOUR_STEP_IDS } from "@/lib/tour-constants";
import QuestionHeader from "./question-header";
import QuestionFooter from "./question-footer";
import SingleAnswer from "./single-answer";
import MultipleType from "./multiple-answer";

function QuestionWise() {
  const {
    handlePreviousQuestion,
    handleNextQuestion,
    selectedAnswers,
    handleSingleChoiceAnswer,
    handleMultipleChoiceAnswer,
  } = useExaminationContext();

  const tab = useSelector((state: RootState) => state.exam.tab);
  const answers = useSelector((state: RootState) => state.exam.answers);
  const currentQuestion = useSelector(
    (state: RootState) => state.exam.currentQuestion
  );
  const currentQuestionIdx = useSelector(
    (state: RootState) => state.exam.currentQuestionIdx
  );
  const currentQuestionWithIdx = useSelector(
    (state: RootState) => state.exam.questions[currentQuestionIdx]
  );

  return (
    <>
      {tab === "question-wise" && (
        <div key='questionw-wise'>
          <Tabs defaultValue="account" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList className="h-10">
                <TabsTrigger value="account" className="p-4">
                  Section A
                </TabsTrigger>
                <TabsTrigger value="password" className="p-4" disabled>
                  Section B
                </TabsTrigger>
                <TabsTrigger value="password1" className="p-4" disabled>
                  Section C
                </TabsTrigger>
              </TabsList>
              <div
                className="flex gap-2 items-center"
                id={TOUR_STEP_IDS.PREV_NEXT_QUESTION}
              >
                {selectedAnswers?.length > 0 &&
                  !answers[currentQuestion?.id || ""] && (
                    <div>
                      <Badge variant="destructive">Unsaved Changes</Badge>
                    </div>
                  )}
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIdx === 0}
                >
                  <ArrowLeftIcon className="size-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIdx === questions.length - 1}
                >
                  Next
                  <ArrowRightIcon className="size-4" />
                </Button>
              </div>
            </div>
            <QuestionHeader
              questionIndex={currentQuestionIdx}
              question={currentQuestion}
            />
            <TabsContent
              value="account"
              className="w-full px-4 flex flex-col gap-6"
            >
              <div id={TOUR_STEP_IDS.QUESTION_WISE_QUESTION}>
                <div className="mb-2 mt-4" key={currentQuestion?.id}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{currentQuestion?.question}</p>
                    {currentQuestionWithIdx?.marked && (
                      <BookmarkIcon className="h-10 w-10 text-yellow-600 p-2 rounded-full bg-yellow-600/10" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {currentQuestion?.type === QuestionType.SINGLE_CHOICE ? (
                    <MultipleType
                      key={currentQuestion?.id}
                      answer={selectedAnswers[0] || null}
                      options={currentQuestion?.options}
                      id={currentQuestion?.id}
                      onValueChange={handleSingleChoiceAnswer}
                    />
                  ) : (
                    <div
                      className="flex flex-col gap-2"
                      defaultValue="comfortable"
                      key={currentQuestion?.id}
                    >
                      {currentQuestion?.options.map((option) => (
                        <SingleAnswer
                          key={`single-${currentQuestion?.id}-${option.id}`}
                          id={currentQuestion?.id || ""}
                          option={option}
                          checked={selectedAnswers.includes(option.id)}
                          onCheckedChange={handleMultipleChoiceAnswer}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="password" className="w-full">
              Section B
            </TabsContent>
            <TabsContent value="password1" className="w-full">
              Section C
            </TabsContent>
          </Tabs>
          <QuestionFooter />
        </div>
      )}
    </>
  );
}

export default QuestionWise;
