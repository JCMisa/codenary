"use client";

import { useState } from "react";
import {
  Control,
  useFieldArray,
  useFormContext,
  FieldArrayWithId,
} from "react-hook-form";
import { Plus, GripVertical, Pencil, Trash2, X } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Utils
import { cn } from "@/lib/utils"; // Standard shadcn utility
import { FormValues } from "@/lib/zod/schema";

// ----------------------------------------------------------------------
// MAIN COMPONENT: ChaptersList
// ----------------------------------------------------------------------

interface ChaptersListProps {
  control: Control<FormValues>;
}

export const ChaptersList = ({ control }: ChaptersListProps) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "chapters",
  });

  const [newChapterName, setNewChapterName] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (!newChapterName.trim()) return;

      append({
        name: newChapterName,
        desc: "",
        exercises: [],
      });
      setNewChapterName("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ------------------------------------------------------- */}
      {/* 1. SCROLLABLE CONTAINER (List Only)                     */}
      {/* ------------------------------------------------------- */}
      <div className="max-h-[347px] overflow-y-auto no-scrollbar pr-2 flex flex-col gap-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((field, index) => (
              <SortableChapterItem
                key={field.id}
                field={field}
                index={index}
                control={control}
                onEdit={() => setEditingIndex(index)}
                onRemove={() => remove(index)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* ------------------------------------------------------- */}
      {/* 2. FIXED INPUT AREA (Stays at bottom)                   */}
      {/* ------------------------------------------------------- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type chapter title and press Enter..."
            value={newChapterName}
            onChange={(e) => setNewChapterName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-slate-50/50 dark:bg-neutral-800"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (newChapterName.trim()) {
                append({ name: newChapterName, desc: "", exercises: [] });
                setNewChapterName("");
              }
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Drag to reorder. Press Enter to add.
        </p>
      </div>

      {/* ------------------------------------------------------- */}
      {/* 3. MODAL (Outside flow is fine)                         */}
      {/* ------------------------------------------------------- */}
      <Dialog
        open={editingIndex !== null}
        onOpenChange={(open) => !open && setEditingIndex(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit Chapter {editingIndex !== null ? editingIndex + 1 : ""}
            </DialogTitle>
            <DialogDescription>
              Add details and exercises for this chapter.
            </DialogDescription>
          </DialogHeader>

          {editingIndex !== null && (
            <ChapterDetailForm nestIndex={editingIndex} control={control} />
          )}

          <DialogFooter>
            <Button type="button" onClick={() => setEditingIndex(null)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ----------------------------------------------------------------------
// SUB-COMPONENT: Sortable Chapter Item (The Row)
// ----------------------------------------------------------------------

interface SortableChapterItemProps {
  field: FieldArrayWithId<FormValues, "chapters", "id">;
  index: number;
  control: Control<FormValues>;
  onEdit: () => void;
  onRemove: () => void;
}

const SortableChapterItem = ({
  field,
  index,
  control,
  onEdit,
  onRemove,
}: SortableChapterItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between p-3 border rounded-md bg-white dark:bg-neutral-900 shadow-sm",
        isDragging && "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
      )}
    >
      <div className="flex items-center gap-2">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="bg-slate-100 dark:bg-neutral-800 p-2 rounded-md cursor-grab active:cursor-grabbing hover:bg-slate-200 dark:hover:bg-neutral-700 transition"
        >
          <GripVertical className="h-4 w-4 text-slate-500" />
        </div>

        <span className="font-medium text-sm">
          {index + 1}. {field.name}
        </span>

        <ChapterBadge index={index} />
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4 text-yellow-500" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// HELPER: Chapter Badge (Reactive to Exercise Count)
// ----------------------------------------------------------------------

const ChapterBadge = ({ index }: { index: number }) => {
  const { watch } = useFormContext<FormValues>();
  const exercises = watch(`chapters.${index}.exercises`);

  if (!exercises || exercises.length === 0) return null;

  return (
    <Badge variant="secondary" className="text-xs">
      {exercises.length} Exercises
    </Badge>
  );
};

// ----------------------------------------------------------------------
// SUB-COMPONENT: Chapter Detail Form (Inside Modal)
// ----------------------------------------------------------------------

interface ChapterDetailFormProps {
  nestIndex: number;
  control: Control<FormValues>;
}

const ChapterDetailForm = ({ nestIndex, control }: ChapterDetailFormProps) => {
  return (
    <div className="space-y-6 py-4">
      <FormField
        control={control}
        name={`chapters.${nestIndex}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chapter Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`chapters.${nestIndex}.desc`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What is this chapter about?"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      <div>
        <h4 className="font-medium text-sm mb-4">Chapter Exercises</h4>
        <ExercisesList nestIndex={nestIndex} control={control} />
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// SUB-COMPONENT: Exercises List (Nested Array)
// ----------------------------------------------------------------------

interface ExercisesListProps {
  nestIndex: number;
  control: Control<FormValues>;
}

const ExercisesList = ({ nestIndex, control }: ExercisesListProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `chapters.${nestIndex}.exercises`,
  });

  return (
    <div className="space-y-3">
      {fields.map((item, k) => (
        <div
          key={item.id}
          className="grid grid-cols-12 gap-2 items-start border p-2 rounded-md bg-slate-50 dark:bg-neutral-800/50"
        >
          {/* Name */}
          <div className="col-span-5">
            <FormField
              control={control}
              name={`chapters.${nestIndex}.exercises.${k}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Ex: Flexbox Layout"
                      className="h-8 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* XP */}
          <div className="col-span-3">
            <FormField
              control={control}
              name={`chapters.${nestIndex}.exercises.${k}.xp`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="XP"
                      className="h-8 text-sm"
                      {...field}
                      onChange={(e) => {
                        // 1. Get the value as a number directly from the DOM event
                        const value = e.target.valueAsNumber;

                        // 2. Handle empty inputs (NaN) by defaulting to 0,
                        // or send the number value to React Hook Form
                        field.onChange(isNaN(value) ? 0 : value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Difficulty */}
          <div className="col-span-3">
            <FormField
              control={control}
              name={`chapters.${nestIndex}.exercises.${k}.difficulty`}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Diff" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          {/* Remove Button */}
          <div className="col-span-1 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-700"
              onClick={() => remove(k)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-dashed"
        onClick={() => append({ name: "", xp: 10, difficulty: "Easy" })}
      >
        <Plus className="w-3 h-3 mr-1" /> Add Exercise
      </Button>
    </div>
  );
};
