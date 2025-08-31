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
import { TOUR_STEP_IDS } from "@/lib/tour-constants";
import { TourAlertDialog, TourStep } from "../tour";
import { useTour } from "../tour";

function Exam() {
  const { isActive } = useTour();
  const tab = useSelector((state: RootState) => state.exam.tab);
  const [currentQuestionAnswer, setCurrentQuestionAnswer] =
    useState<QuestionAnswer | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [allQuestionsAnswers,] = useState<
    Record<string, string | string[]>
  >({});

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
        Duration: 90,
        userName: "Javeed Hussain Siddiqui",
        examName: "AI Exam",
      })
    );
    dispatch(setCurrentQuestion(questions[0].id));
  }, [dispatch]);

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
  const clearResponse = useCallback(() => {
    setSelectedAnswers([]);
    setCurrentQuestionAnswer(null);
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIdx < questions.length - 1) {
      dispatch(setCurrentQuestion(questions[currentQuestionIdx + 1].id));
    }
  }, [currentQuestionIdx, dispatch]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIdx > 0) {
      dispatch(setCurrentQuestion(questions[currentQuestionIdx - 1].id));
    }
  }, [currentQuestionIdx, dispatch]);

  const handleMarkForReviewAndNext = useCallback(() => {
    if (currentQuestion?.id) {
      dispatch(toggleMarkForReview(currentQuestion.id));
    }
    if (currentQuestionIdx < questions.length - 1) {
      dispatch(setCurrentQuestion(questions[currentQuestionIdx + 1].id));
    }
  }, [currentQuestionIdx, dispatch, currentQuestion?.id]);

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

  const steps: TourStep[] = [
    {
      content: <div>Previous Next Question</div>,
      selectorId: TOUR_STEP_IDS.PREV_NEXT_QUESTION,
      position: "right",
      onClickWithinArea: () => { },
    },
    {
      content: <div>Clear Response</div>,
      selectorId: TOUR_STEP_IDS.CLEAR_RESPONSE,
      position: "bottom",
      onClickWithinArea: () => { },
    },
    {
      content: <div>Mark for Review and Next</div>,
      selectorId: TOUR_STEP_IDS.MARK_FOR_REVIEW_AND_NEXT,
      position: "right",
      onClickWithinArea: () => { },
    },
    {
      content: <div>Save & Next</div>,
      selectorId: TOUR_STEP_IDS.SAVE_AND_NEXT,
      position: "right",
      onClickWithinArea: () => { },
    },
  ];

  // long space

  const { setSteps } = useTour();
  const [openTour, setOpenTour] = useState(false);

  useEffect(() => {
    setSteps(steps);
    const timer = setTimeout(() => {
      setOpenTour(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [setSteps, steps]);

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <TourAlertDialog isOpen={openTour} setIsOpen={setOpenTour} />
        <div className="flex flex-1 p-4 overflow-y-auto max-h-[calc(100svh-var(--header-height))]">
          <SidebarInset>
            {tab === "question-wise" && (
              <>
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
                      className={cn(
                        "flex gap-2 items-center",
                        isActive && "p-4"
                      )}
                      id={TOUR_STEP_IDS.PREV_NEXT_QUESTION}
                    >
                      {selectedAnswers.length > 0 &&
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
                  <div className="px-4 py-3 w-full mt-2 bg-muted/10 flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <span className="font-medium">
                        Question Number: {currentQuestionIdx + 1}
                      </span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <Badge variant="secondary">
                        <span>
                          Type:{" "}
                          {currentQuestion?.type === QuestionType.SINGLE_CHOICE
                            ? "Single Choice"
                            : "Multiple Choice"}
                        </span>
                      </Badge>
                      <Badge variant="secondary">
                        <span>Marks: {currentQuestion?.positiveMarks}</span>
                      </Badge>
                      <Badge variant="secondary">
                        <span>
                          Negative Marks: {currentQuestion?.negativeMarks}
                        </span>
                      </Badge>
                    </div>
                  </div>
                  <TabsContent
                    value="account"
                    className="w-full px-4 flex flex-col gap-6"
                  >
                    <>
                      <div className="mb-2 mt-4" key={currentQuestion?.id}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium">
                            {currentQuestion?.question}
                          </p>
                          {currentQuestionWithIdx?.marked && (
                            <BookmarkIcon className="h-10 w-10 text-yellow-600 p-2 rounded-full bg-yellow-600/10" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {currentQuestion?.type ===
                          QuestionType.SINGLE_CHOICE ? (
                          <RadioGroup
                            value={selectedAnswers[0] || ""}
                            key={currentQuestion?.id}
                            onValueChange={handleSingleChoiceAnswer}
                          >
                            {currentQuestion?.options.map((option) => (
                              <Label
                                htmlFor={option.id}
                                className={cn(
                                  "flex items-center gap-3 bg-muted/20 p-3 rounded-md cursor-pointer w-full",
                                  selectedAnswers.includes(option.id) &&
                                  "bg-muted"
                                )}
                                key={option.id}
                              >
                                <RadioGroupItem
                                  value={option.id}
                                  id={option.id}
                                />
                                {option.option}
                              </Label>
                            ))}
                          </RadioGroup>
                        ) : (
                          <div
                            className="flex flex-col gap-2"
                            defaultValue="comfortable"
                            key={currentQuestion?.id}
                          >
                            {currentQuestion?.options.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center space-x-2"
                              >
                                <Label
                                  htmlFor={option.id}
                                  className={cn(
                                    "flex items-center gap-3 bg-muted/20 p-3 rounded-md cursor-pointer w-full",
                                    selectedAnswers.includes(option.id) &&
                                    "bg-muted"
                                  )}
                                >
                                  <Checkbox
                                    checked={selectedAnswers.includes(
                                      option.id
                                    )}
                                    onCheckedChange={(checked) =>
                                      handleMultipleChoiceAnswer(
                                        option.id,
                                        checked as boolean
                                      )
                                    }
                                    id={option.id}
                                  />
                                  {option.option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  </TabsContent>
                  <TabsContent value="password" className="w-full">
                    Section B
                  </TabsContent>
                  <TabsContent value="password1" className="w-full">
                    Section C
                  </TabsContent>
                </Tabs>
                <div className="pb-3 pt-4 px-4 border-t mt-auto w-full flex justify-between">
                  <div className="flex gap-4">
                    <Button
                      id={TOUR_STEP_IDS.CLEAR_RESPONSE}
                      className={cn(isActive && "p-2")}
                      variant="secondary"
                      onClick={clearResponse}
                    >
                      <TrashIcon className="size-4" />
                      Clear Response
                    </Button>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      id={TOUR_STEP_IDS.MARK_FOR_REVIEW_AND_NEXT}
                      className={cn(isActive && "p-2")}
                      variant="outline"
                      onClick={handleMarkForReviewAndNext}
                    >
                      <BookmarkIcon className="size-4" />
                      Mark for Review and Next
                    </Button>
                    <Button
                      id={TOUR_STEP_IDS.SAVE_AND_NEXT}
                      className={cn(isActive && "p-2")}
                      onClick={handleSaveAndNext}
                    >
                      <SaveIcon className="size-4" />
                      Save & Next
                    </Button>
                  </div>
                </div>
              </>
            )}
            {tab === "all-questions" && (
              <>
                {questions.map((question, questionIndex) => (
                  <div key={question.id} className="mb-8 border rounded-lg p-4">
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
                            {question.type === QuestionType.SINGLE_CHOICE
                              ? "Single Choice"
                              : "Multiple Choice"}
                          </span>
                        </Badge>
                        <Badge variant="secondary">
                          <span>Marks: {question.positiveMarks}</span>
                        </Badge>
                        <Badge variant="secondary">
                          <span>Negative Marks: {question.negativeMarks}</span>
                        </Badge>
                      </div>
                    </div>
                    <div className="mb-2 mt-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium">{question.question}</p>
                        {questionsState.find((q) => q.id === question.id)
                          ?.marked && (
                            <BookmarkIcon className="h-10 w-10 text-yellow-600 p-2 rounded-full bg-yellow-600/10" />
                          )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {question.type === QuestionType.SINGLE_CHOICE ? (
                        <RadioGroup
                          value={allQuestionsAnswers[question.id] as string}
                        >
                          {question.options.map((option) => (
                            <Label
                              htmlFor={`${question.id}-${option.id}`}
                              className={cn(
                                "flex items-center gap-3 bg-muted/20 p-3 rounded-md cursor-pointer w-full",
                                allQuestionsAnswers[question.id] ===
                                option.id && "bg-muted"
                              )}
                              key={option.id}
                            >
                              <RadioGroupItem
                                value={option.id}
                                id={`${question.id}-${option.id}`}
                              />
                              {option.option}
                            </Label>
                          ))}
                        </RadioGroup>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className="flex items-center space-x-2"
                            >
                              <Label
                                htmlFor={`${question.id}-${option.id}`}
                                className={cn(
                                  "flex items-center gap-3 bg-muted/20 p-3 rounded-md cursor-pointer w-full",
                                  (
                                    allQuestionsAnswers[question.id] as string[]
                                  )?.includes(option.id) && "bg-muted"
                                )}
                              >
                                <Checkbox
                                  id={`${question.id}-${option.id}`}
                                  checked={(
                                    allQuestionsAnswers[question.id] as string[]
                                  )?.includes(option.id)}
                                />
                                {option.option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </SidebarInset>
          <AppSidebar setOpenTour={setOpenTour} />
        </div>
      </SidebarProvider>
    </div>
  );
}

export default Exam;
