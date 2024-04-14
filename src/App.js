// Importing the CSS file for styling
import './App.css';
// Importing necessary components from the project
import TaskForm from "./TaskForm";
import Task from "./Task";
// Importing hooks from React library
import {useEffect, useState} from "react";

function App() {
  // State hook for managing tasks
  const [tasks,setTasks] = useState([]);

  // Effect hook to save tasks to local storage whenever tasks change
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Effect hook to load tasks from local storage on initial render
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);

  // Function to add a new task
  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name:name,done:false}];
    });
  }

  // Function to remove a task by index
  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToRemove);
    });
  }

  // Function to update the 'done' status of a task
  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  // Counting the number of completed tasks
  const numberComplete = tasks.filter(t => t.done).length;
  // Counting the total number of tasks
  const numberTotal = tasks.length;

  // Function to determine the appropriate message based on completion percentage
  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (percentage === 0) {
      return 'Try to do at least one! 🙏';
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝';
    }
    return 'Keep it going 💪🏻';
  }

  // Function to rename a task
  function renameTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  // Rendering the main content of the app
  return (
    <main>
      {/* Displaying the number of completed and total tasks */}
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      {/* Displaying a message based on completion percentage */}
      <h2>{getMessage()}</h2>
      {/* Rendering the task form component for adding new tasks */}
      <TaskForm onAdd={addTask} />
      {/* Rendering each task component */}
      {tasks.map((task,index) => (
        <Task {...task}
              onRename={newName => renameTask(index,newName)}
              onTrash={() => removeTask(index)}
              onToggle={done => updateTaskDone(index, done)} />
      ))}
    </main>
  );
}

export default App;
