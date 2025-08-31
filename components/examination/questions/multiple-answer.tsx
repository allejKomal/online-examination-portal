import React from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionOption } from "@/types/question.type";

export interface MultipleTypeProps {
  answer: string | null;
  options: QuestionOption[];
  id: string;
  onValueChange?: (value: string) => void;
}

function MultipleType({
  answer,
  options,
  id,
  onValueChange,
}: MultipleTypeProps) {
  return (
    <>
      <RadioGroup
        key={`multiple-${id}`}
        value={answer || ""}
        onValueChange={onValueChange || undefined}
      >
        {options.map((option) => (
          <Label
            htmlFor={`multiple-${id}-${option.id}`}
            className={cn(
              "flex items-center gap-3 bg-muted/20 p-3 rounded-md cursor-pointer w-full",
              answer === option.id && "bg-muted"
            )}
            key={option.id}
          >
            <RadioGroupItem
              value={option.id}
              id={`multiple-${id}-${option.id}`}
            />
            {option.option}
          </Label>
        ))}
      </RadioGroup>
    </>
  );
}

export default MultipleType;
