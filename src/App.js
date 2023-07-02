import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ToDoItem from "./components/ToDoItem";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Axios from "axios";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [newList, setNewList] = useState("");

  const fetchToDo = () => {
    Axios.get("http://localhost:2000/todo")
      .then((response) => {
        setToDoList(response.data);
      })
      .catch((err) => {
        toast.error("Something Error!");
      });

    // alert("Hai");
  };

  useEffect(() => {
    fetchToDo();
  }, []);

  const renderToDoList = () => {
    return toDoList.map((val) => {
      return <ToDoItem deleteHandler={deleteList} completeHandler={completeList} toDoData={val} />;
    });
  };

  const addList = () => {
    if (!newList) {
      toast.error("Please input your new to do list name!");
    } else {
      Axios.post("http://localhost:2000/todo", {
        isFinished: false,
        name: newList,
      })
        .then(() => {
          toast.success("Add to do list success");
          fetchToDo();
        })
        .catch((err) => {
          toast.error("Something Error!");
        });
      setNewList("");
    }
  };

  const inputHandler = (event) => {
    setNewList(event.target.value);
  };

  const deleteList = (id) => {
    Axios.delete(`http://localhost:2000/todo/${id}`)
      .then(() => {
        toast.success("Delete success");
        fetchToDo();
      })
      .catch((err) => {
        toast.error("Something Error!");
      });
  };

  const completeList = (id) => {
    Axios.patch(`http://localhost:2000/todo/${id}`, {
      isFinished: true,
    })
      .then(() => {
        toast.success("The to do is complete");
        fetchToDo();
      })
      .catch((err) => {
        toast.error("Something Error!");
      });
  };

  return (
    <div>
      <header className="header">
        <a href="index.html" class="logo">
          matrohmatmath.
        </a>
      </header>

      <div className="container">
        <section className="todo">
          <h1>To Do List</h1>
          <div className="d-grid justify-content-center">
            {renderToDoList()}
          </div>
          <div className="d-grid justify-content-center">
            <div className="list">
              <input
                onChange={(e) => inputHandler(e)}
                value={newList}
                type="text"
                className="input-bg"
                placeholder="Input New To Do List Name"
              />
              <div>
                <button
                  onClick={addList}
                  className="fs-5 btn btn-primary p-3 mx-2"
                >
                  Add List
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
