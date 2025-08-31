"use client";

import { BookOpen, Send } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { questions } from "@/lib/dummy-question";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Badge } from "./ui/badge";
import { setTab } from "@/store/exam-slice";
import { TOUR_STEP_IDS } from "@/lib/tour-constants";
import { useTour } from "./tour";
import { cn } from "@/lib/utils";

export function NavUser({ setOpenTour }: { setOpenTour: (open: boolean) => void }) {
  const { isActive } = useTour();
  const answers = useSelector((state: RootState) => state.exam.answers);
  const tab = useSelector((state: RootState) => state.exam.tab);
  const dispatch = useDispatch();
  return (
    <SidebarMenu className="flex flex-col gap-4 pb-4">
      <div className="flex gap-2 w-full">
        <SidebarMenuItem className="flex-1">
          <Button
            className="w-full border rounded-md flex items-center justify-center"
            variant="outline"
            onClick={() => setOpenTour(true)}
          >
            <BookOpen className="size-4" />
            Instrcutions
          </Button>
        </SidebarMenuItem>
        <SidebarMenuItem className="flex-1">
          <Button
          id={TOUR_STEP_IDS.TOGGLE_TABS}
            className={cn("w-full border rounded-md flex items-center justify-center", isActive && "p-2")}
            variant="outline"
            onClick={() =>
              dispatch(
                setTab(
                  tab === "question-wise" ? "all-questions" : "question-wise"
                )
              )
            }
          >
            <BookOpen className="size-4" />
            {tab === "question-wise" ? "Question Paper" : "Preview"}
          </Button>
        </SidebarMenuItem>
      </div>
      <SidebarMenuItem>
        <Button
          id={TOUR_STEP_IDS.SUBMIT_TEST}
          size="default"
          className="w-full flex items-center justify-center"
          variant="default"
        >
          <Send className="size-4" />
          Submit Test
          <Badge variant="secondary" className="ml-2">
            {Object.keys(answers).length} / {questions.length}
          </Badge>
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
