"use client";

const Workspaces = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.location.href = "/admin/workspace";
        }}
      >
        Redirect to workspaces
      </button>
    </div>
  );
};

export default Workspaces;
