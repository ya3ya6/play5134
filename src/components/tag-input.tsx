import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Tag } from "@/types";
import { Link2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

export const TagInput = ({
  defaultValue,
  value,
  onChange,
  showTags = false,
  className,
}: {
  defaultValue?: Tag[];
  value?: Tag[];
  onChange?: (project: Tag[]) => void;
  showTags?: boolean;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [tags, setTags] = useControllableState({
    defaultProp: defaultValue,
    prop: value,
    onChange: onChange,
  });

  // TODO: get tags from api (filtered)
  const filteredTags: Tag[] = [...tags];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {showTags && tags && tags.length > 0 ? (
          <Button
            size="sm"
            variant="default"
            className={cn("gap-x-2", className)}
          >
            <Link2Icon />
            {/*tags?.map((t) => t.name).join(", ")*/}
            Edit Tags
          </Button>
        ) : (
          <Button
            size="icon"
            variant={tags && tags.length > 0 ? "default" : "ghost"}
            className={className}
          >
            <Link2Icon />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          iconPosition="left"
          icon={<MagnifyingGlassIcon />}
          placeholder="Add/filter tags"
        />
        <div className="space-y-2 mt-4">
          {filteredTags.map((tag) => (
            <div key={tag.id}>
              <Label className="text-sm flex gap-x-2 items-center">
                <Checkbox
                  checked={tags?.some((val) => val.id === tag.id)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? setTags([...(tags || []), tag])
                      : setTags(
                          (tags || []).filter((val) => val.id !== tag.id),
                        );
                  }}
                />
                {tag.name}
              </Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
