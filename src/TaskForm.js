// Importing useState hook from React library
import {useState} from "react";

// Component for rendering a form to add tasks
export default function TaskForm({onAdd}) {
  // State hook for managing the task name input
  const [taskName,setTaskName] = useState('');

  // Function to handle form submission
  function handleSubmit(ev) {
    ev.preventDefault();
    // Calling the onAdd callback with the task name
    onAdd(taskName);
    // Resetting the task name input
    setTaskName('');
  }

  // Rendering the task form
  return (
    // Form element with submission handler
    <form onSubmit={handleSubmit}>
      {/* Button for adding a new task */}
      <button>+</button>
      {/* Input field for entering task name */}
      <input type="text"
             value={taskName}
             onChange={ev => setTaskName(ev.target.value)}
             placeholder="Your next task..."/>
    </form>
  );
}
