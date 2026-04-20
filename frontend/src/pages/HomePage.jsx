import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axious";
import { visibleTasksLimit } from "@/lib/data";

const Homepage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  // Move fetchTasks here (outside useEffect)
  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("lỗi xảy ra khi truy xuất tasks: ", error);
      toast.error("lỗi xảy ra khi truy xuất tasks.");
    }
  }, [dateQuery]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  //biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "complete":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTasksLimit,
    page * visibleTasksLimit,
  );

  if (visibleTasks.length === 0) {
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTasksLimit);

  return (
    <div className="min-h-screen w-full relative">
      {/* Peachy Mint Dream Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
             radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.48), transparent 67%),
            radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.41), transparent 67%),
            radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.44), transparent 63%),
            radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.36), transparent 66%),
            linear-gradient(45deg, #f7eaff 0%, #fde2ea 100%)
          `,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl -6 mx-auto space-y-6">
          {/* Dau trang */}
          <Header />

          {/* Tao nhiem vu */}
          <AddTask handleNewTaskAdd={handleTaskChanged} />

          {/* Thong ke va bo loc */}
          <StatsAndFilter
            filter={filter}
            setFilter={setFilter}
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />

          <div className="min-h-[350px]">
            <TaskList
              filteredTasks={visibleTasks}
              filter={filter}
              handleTaskChanged={handleTaskChanged}
            />
          </div>
          {/* Danh sach nhiem vu */}

          {/* Phan trang va loc theo ngay */}
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="order-2 sm:order-1">
              <TaskListPagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                handlePageChange={handlePageChange}
                page={page}
                totalPages={totalPages}
              />
            </div>
            <div className="order-1 sm:order-2">
              <DateTimeFilter
                dateQuery={dateQuery}
                setDateQuery={setDateQuery}
              />
            </div>
          </div>

          {/* Cuoi trang */}
          <Footer
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
