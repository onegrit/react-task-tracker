import React from 'react'
import { FaTimes } from 'react-icons/fa'
const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    // conditional style
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text} {/* onClick传递参数时，需要使用匿名函数 */}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  )
}

export default TaskItem
