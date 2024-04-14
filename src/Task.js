// Importing the Checkbox component for task status
import Checkbox from "./Checkbox";
// Importing useState hook from React library
import {useState} from "react";

// Component for rendering a task
export default function Task({name,done,onToggle,onTrash,onRename}) {
  // State hook for managing edit mode
  const [editMode,setEditMode] = useState(false);

  // Rendering the task component
  return (
    // Task container with class based on completion status
    <div className={'task ' + (done?'done':'')}>
      {/* Rendering the checkbox for task completion */}
      <Checkbox checked={done} onClick={() => onToggle(!done)} />
      {/* Rendering task name in non-edit mode */}
      {!editMode && (
        <div className="task-name" onClick={() => setEditMode(prev => !prev)}>
          <span>{name}</span>
        </div>
      )}
      {/* Rendering task name in edit mode */}
      {editMode && (
        <form onSubmit={ev => {ev.preventDefault();setEditMode(false);}}>
          {/* Input field for editing task name */}
          <input type="text" value={name}
                 onChange={ev => onRename(ev.target.value)} />
        </form>
      )}
      {/* Button for deleting the task */}
      <button className="trash" onClick={onTrash}>
        {/* SVG icon for trash can */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
      </button>
    </div>
  );
}
