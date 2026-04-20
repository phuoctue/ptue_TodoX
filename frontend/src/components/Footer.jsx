import React from "react";

const Footer = ({ completedTaskCount = 0, activeTaskCount = 0 }) => {
  return (
    <>
      {(completedTaskCount > 0 || activeTaskCount > 0) && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {activeTaskCount > 0 && completedTaskCount > 0 && (
              <>
                🎇 Tuyệt vời! Bạn đã hoàn thành {completedTaskCount} việc, còn{" "}
                {activeTaskCount} việc nữa thôi. Cố lên!
              </>
            )}
            {activeTaskCount > 0 && completedTaskCount === 0 && (
              <>
                ✨ Bạn có {activeTaskCount} việc đang hoạt động. Cố lên hoàn
                thành nốt nhé!
              </>
            )}
            {activeTaskCount === 0 && completedTaskCount > 0 && (
              <>
                🎉 Bạn đã hoàn thành {completedTaskCount} việc! Không còn việc
                nào đang hoạt động.
              </>
            )}
            {activeTaskCount === 0 && completedTaskCount === 0 && (
              <>Hãy bắt đầu làm {activeTaskCount} nhiệm vụ nào!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
