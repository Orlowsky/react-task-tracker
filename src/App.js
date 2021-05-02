import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import Footer from "./Components/Footer";
import About from "./Components/About";
import { useState, useEffect } from "react"; 
import {BrowserRouter as Router, Route} from 'react-router-dom'
/* import React from 'react' */ function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //fetch task
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  const fetchOneTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);

    // console.log(task)
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id,...task}
    // setTasks([...tasks,newTask])
  };

  //Delete task
  const deleteTask = async (id) => {
    // console.log('delete',id)
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };
  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchOneTask(id);
    console.log(taskToToggle);
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    /* const updTask = await taskToToggle.json() */
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, reminder: data.reminder };
        } else {
          return task;
        }
      })
    );
  };
  //toggle form area
  const toggleAddButton = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <Router>
    <div className="container">
      <Header toggleAddButton={toggleAddButton} showAddTask={showAddTask} />
      
      <Route path="/" exact render={(props)=>(
        <>
{showAddTask ? <AddTask onAdd={addTask} /> : ""}
      {/* <h2>Hello From React</h2>
      <h3>Hello {name}</h3>
      <h3>Hello {x ? 'hola':'mui bien'}</h3> */}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} />
      ) : (
        "There is no task to show"
      )}
        </>
      )} />
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

/* class App extends React.Component{
  render(){
    return(
<div className="container">
    <Header></Header>
   <h2>Hello From React</h2>
  
  
 </div>
    )
    
  }
} */
export default App;
