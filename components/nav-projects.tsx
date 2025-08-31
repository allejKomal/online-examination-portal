"use client";

import { CheckIcon, BookmarkIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { setCurrentQuestion, setTab } from "@/store/exam-slice";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { TOUR_STEP_IDS } from "@/lib/tour-constants";
import { useTour } from "./tour";

export function NavProjects() {
  const { isActive } = useTour();
  const { questions } = useSelector((state: RootState) => state.exam);
  const answers = useSelector((state: RootState) => state.exam.answers);
  const dispatch = useDispatch();
  const currentQuestionIdx = useSelector(
    (state: RootState) => state.exam.currentQuestionIdx
  );

  const handleQuestionClick = (questionId: string) => {
    dispatch(setTab("question-wise"));
    dispatch(setCurrentQuestion(questionId));
  };

  const variants = useMemo(
    () => [
      {
        variant: "answered",
        className: "bg-answered hover:bg-answered",
        count: questions.filter((question) => question.answered).length,
        label: "Answered",
      },
      {
        variant: "unanswered",
        className: "bg-unanswered hover:bg-unanswered",
        count: questions.filter((question) => !question.answered).length,
        label: "Unanswered",
      },
      {
        variant: "marked",
        className: "bg-reviewed hover:bg-reviewed",
        count: questions.filter(
          (question) => question.marked && !question.answered
        ).length,
        label: "Marked Only",
      },
      {
        variant: "not-visited",
        className: "bg-not-visited hover:bg-not-visited",
        count: questions.filter((question) => !question.visited).length,
        label: "Not Visited",
      },
      {
        variant: "answered-marked",
        className: "bg-answered-reviewed hover:bg-answered-reviewed",
        count: questions.filter(
          (question) => question.answered && question.marked
        ).length,
        label: "Answered & Marked",
      },
    ],
    [questions]
  );
  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden gap-2">
        <SidebarMenu
          id={TOUR_STEP_IDS.METRICS}
          className={cn(
            "grid grid-cols-2  gap-2.5 overflow-y-auto",
            isActive && "p-2"
          )}
        >
          {variants.map((variant, idx) => (
            <SidebarMenuItem
              key={variant.variant}
              className={cn(
                "flex items-center gap-3",
                idx === variants.length - 1 && "col-span-2"
              )}
            >
              <Button
                variant="outline"
                size="sm"
                className={cn("h-10 min-w-12 max-w-15", variant.className)}
              >
                {variant.count}
              </Button>
              <span className="text-sm text-muted-foreground lex-1">
                {variant.label}
              </span>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden gap-2 mx-auto flex flex-col">
        <SidebarGroupLabel className="text-xl">Questions</SidebarGroupLabel>
        <SidebarMenu
          id={TOUR_STEP_IDS.QUESTIONS}
          className={cn(
            "grid grid-cols-5 gap-2.5 max-h-[600px] overflow-y-auto p-2",
            isActive && "p-4"
          )}
        >
          {questions.map((question, index) => {
            const isAnswered = answers[question.id];
            const isCurrent = index === currentQuestionIdx;
            const isVisited = question.visited;
            const isReviewed = question.marked;

            return (
              <Button
                key={question.id}
                variant="outline"
                size="sm"
                className={cn(
                  "h-10 w-full p-0 text-xs font-medium cursor-pointer",
                  isCurrent && "ring-2 ring-primary",
                  // Priority order: answered-marked > answered > marked > visited > not-visited
                  isAnswered &&
                    isReviewed &&
                    "bg-answered-reviewed hover:bg-answered-reviewed",
                  isAnswered && !isReviewed && "bg-answered hover:bg-answered",
                  !isAnswered && isReviewed && "bg-reviewed hover:bg-reviewed",
                  !isAnswered &&
                    !isReviewed &&
                    isVisited &&
                    "bg-unanswered hover:bg-unanswered",
                  !isAnswered &&
                    !isReviewed &&
                    !isVisited &&
                    "bg-not-visited hover:bg-not-visited"
                )}
                onClick={() => handleQuestionClick(question.id)}
              >
                <div className="flex flex-col items-center justify-center">
                  <span>{index + 1}</span>
                </div>
              </Button>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
