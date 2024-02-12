import { ComponentPropsWithRef, forwardRef, useId, useState } from "react";

import { format, getHours, getMinutes, isToday, parse, set } from "date-fns";
import { twMerge } from "tailwind-merge";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getInitialDate } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

function formatTime(date: Date) {
  return format(date, "hh:mm a");
}

function parseTime(date: string, base: Date) {
  return parse(date, "h:m a", base);
}

export type TimeInputProps = Omit<
  ComponentPropsWithRef<"input">,
  "defaultValue" | "value" | "onChange"
> & {
  defaultValue?: Date;
  value?: Date;
  onChange?: (value: Date) => void;
  dateIndicator?: "text" | "datepicker";
  spanOfDays?: number;
  label?: string;
};
export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (props, ref) => {
    const {
      defaultValue,
      value,
      onChange,
      dateIndicator,
      spanOfDays,
      label,
      onBlur,
      id: idProp,
      className,
      ...rest
    } = props;

    const initialDate = getInitialDate();
    const [time, setTime] = useControllableState({
      defaultProp: defaultValue ? defaultValue : undefined,
      prop: value || initialDate,
      onChange: onChange,
    });
    const [localTime, setLocalTime] = useState(formatTime(time || initialDate));

    function validateInput() {
      const newTime = parseTime(localTime, time || initialDate);
      if (!isNaN(newTime as any)) {
        setTime(newTime);
        setLocalTime(formatTime(newTime));
      } else {
        setLocalTime(formatTime(time || initialDate));
      }
    }

    const id = useId();

    return (
      <div className={twMerge("space-y-1 w-full max-w-sm", className)}>
        {label && (
          <Label htmlFor={idProp || id} className="text-xs uppercase">
            {label}
          </Label>
        )}
        <div className="relative">
          <Input
            id={idProp || id}
            ref={ref}
            value={localTime}
            onChange={(e) => setLocalTime(e.target.value)}
            onBlur={(e) => {
              validateInput();
              onBlur?.(e);
            }}
            iconPosition={dateIndicator ? "right" : undefined}
            icon={
              dateIndicator === "text" ? (
                <span className="text-sm text-muted-foreground">
                  {isToday(time || initialDate)
                    ? "TODAY"
                    : format(time || initialDate, "MM/dd")}
                </span>
              ) : dateIndicator === "datepicker" ? (
                <Popover>
                  <PopoverTrigger>
                    <CalendarIcon />
                  </PopoverTrigger>
                  <PopoverContent side="bottom">
                    <Calendar
                      mode="single"
                      disabled={{ after: new Date() }}
                      selected={time}
                      onSelect={(date) => {
                        if (date) {
                          setTime(
                            set(date, {
                              hours: getHours(time || initialDate),
                              minutes: getMinutes(time || initialDate),
                              seconds: 0,
                              milliseconds: 0,
                            }),
                          );
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              ) : undefined
            }
            {...rest}
          />
          {spanOfDays !== undefined && (
            <span className="bg-black w-4 h-4 flex items-center justify-center text-white text-xs rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
              {spanOfDays}
            </span>
          )}
        </div>
      </div>
    );
  },
);
TimeInput.displayName = "TimeInput";
