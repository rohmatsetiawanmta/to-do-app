import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ToDoItem = (props) => {
  return (
    <div className="list">
      #{props.toDoData.id} - {props.toDoData.name}
      <div>
        <button
          onClick={() => props.deleteHandler(props.toDoData.id)}
          className="fs-5 btn btn-danger p-3 mx-2"
        >
          Delete
        </button>

        <button
          disabled={props.toDoData.isFinished}
          onClick={() => props.completeHandler(props.toDoData.id)}
          className="fs-5 btn btn-success p-3"
        >
          {props.toDoData.isFinished ? "Finished" : "Complete"}
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
