"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import QuestionWise from "@/components/examination/questions/question-wise";
import AllQuestions from "@/components/examination/all-questions";
import { ExaminationContextProvider } from "@/context/use-examination-context";
import { TourAlertDialog, TourStep, useTour } from "@/components/tour";
import { useEffect, useState } from "react";
import { TOUR_STEP_IDS } from "@/lib/tour-constants";

export default function Page() {
  const { setSteps } = useTour();
  const [openTour, setOpenTour] = useState(false);
  const steps: TourStep[] = [
    {
      content: <div>Metrics</div>,
      selectorId: TOUR_STEP_IDS.METRICS,
      position: "left",
    },
    {
      content: <div>Questions</div>,
      selectorId: TOUR_STEP_IDS.QUESTIONS,
      position: "left",
    },
    {
      content: <div>Time Left</div>,
      selectorId: TOUR_STEP_IDS.TIME_LEFT,
      position: "bottom",
    },
    {
      content: <div>Previous Next Question</div>,
      selectorId: TOUR_STEP_IDS.PREV_NEXT_QUESTION,
      position: "left",
    },
    {
      content: <div>Toggle Tabs</div>,
      selectorId: TOUR_STEP_IDS.TOGGLE_TABS,
      position: "right",
    },
    {
      content: <div>Question Type Marks Negative Marks</div>,
      selectorId: TOUR_STEP_IDS.QUESTION_TYPE_MARKS_NEGATIVE_MARKS,
      position: "left",
    },
    {
      content: <div>Clear Response</div>,
      selectorId: TOUR_STEP_IDS.CLEAR_RESPONSE,
      position: "bottom",
    },
    {
      content: <div>Mark for Review and Next</div>,
      selectorId: TOUR_STEP_IDS.MARK_FOR_REVIEW_AND_NEXT,
      position: "right",
    },
    {
      content: <div>Save and Next</div>,
      selectorId: TOUR_STEP_IDS.SAVE_AND_NEXT,
      position: "right",
    },
    {
      content: <div>Question Wise Question</div>,
      selectorId: TOUR_STEP_IDS.QUESTION_WISE_QUESTION,
      position: "bottom",
    },
    {
      content: <div>Submit Test</div>,
      selectorId: TOUR_STEP_IDS.SUBMIT_TEST,
      position: "right",
    },
  ];

  useEffect(() => {
    setSteps(steps);
    const timer = setTimeout(() => {
      setOpenTour(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [setSteps, steps]);

  return (
    <ExaminationContextProvider>
      <div className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1 p-4 overflow-y-auto max-h-[calc(100svh-var(--header-height))]">
            <SidebarInset>
              <QuestionWise />
              <AllQuestions />
            </SidebarInset>
            <AppSidebar setOpenTour={setOpenTour} />
          </div>
        </SidebarProvider>
      </div>
      <TourAlertDialog isOpen={openTour} setIsOpen={setOpenTour} />
    </ExaminationContextProvider>
  );
}
