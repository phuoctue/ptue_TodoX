import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash,
  EllipsisVertical, // Import for options button
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axious";
import { toast } from "sonner";
// Import Popover components
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
  const [isOptionsOpen, setIsOptionsOpen] = useState(false); // State for popover

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Xóa nhiệm vụ thành công!");
      handleTaskChanged();
    } catch (error) {
      console.error("lỗi xảy ra khi xóa nhiệm vụ: ", error);
      toast.error("lỗi xảy ra khi xóa nhiệm vụ.");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success(`Nhiệm vụ đã đổi thành ${updateTaskTitle}`);
      handleTaskChanged();
    } catch (error) {
      console.error("lỗi xảy ra khi cập nhập nhiệm vụ: ", error);
      toast.error("lỗi xảy ra khi cập nhập nhiệm vụ.");
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "complete",
          completeAt: new Date().toISOString(),
        });
        toast.success(`${task.title} đã hoàn thành!`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completeAt: null,
        });
        toast.success(`${task.title} đã bỏ hoàn thành!`);
      }
      handleTaskChanged();
    } catch (error) {
      console.error("lỗi xảy ra khi thay đổi trạng thái nhiệm vụ: ", error);
      toast.error("lỗi xảy ra khi thay đổi trạng thái nhiệm vụ.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animation-fade-in group focus-within:shadow-custom-lg",
        task.status === "complete" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* Nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200 cursor-pointer",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* Hiển thị hoặc chỉnh sửa title */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Cần phải làm gì."
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}

          {/* Ngày tạo & Ngày hoàn thành */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-mute-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completeAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-mute-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completeAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Edit and Delete Buttons - Visible on PC (hover), Hidden on Mobile */}
        <div className="hidden md:flex gap-2 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-200">
          {/* Nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info cursor-pointer"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* Nút delete */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive cursor-pointer"
            onClick={() => deleteTask(task._id)}
          >
            <Trash className="size-4" />
          </Button>
        </div>

        {/* Options Popover - Visible on Mobile, Hidden on PC */}
        <div className="md:hidden">
          <Popover open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-primary"
              >
                <EllipsisVertical className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2" align="end">
              <div className="flex flex-col gap-1">
                {/* Nút edit (inside popover for mobile) */}
                <Button
                  variant="ghost"
                  className="justify-start w-full gap-2 text-muted-foreground hover:text-info"
                  onClick={() => {
                    setIsOptionsOpen(false); // Manually close popover
                    setIsEditting(true);
                    setUpdateTaskTitle(task.title || "");
                  }}
                >
                  <SquarePen className="size-4" />
                  Chỉnh sửa
                </Button>
                {/* Nút delete (inside popover for mobile) */}
                <Button
                  variant="ghost"
                  className="justify-start w-full gap-2 text-destructive hover:text-destructive/80"
                  onClick={() => {
                    setIsOptionsOpen(false); // Manually close popover
                    deleteTask(task._id);
                  }}
                >
                  <Trash className="size-4" />
                  Xóa
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>{" "}
    </Card>
  );
};

export default TaskCard;
