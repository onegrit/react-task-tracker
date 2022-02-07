import { useEffect, useState } from 'react'
import './App.css'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import Header from './components/Header'
import Tasks from './components/Tasks'
/*
state作为Model 
const tasks = [
  { id: 1, text: 'Doctors Appointment', day: 'Feb 5th at 2:30pm', reminder: true },
  {
    id: 2,
    text: 'Meeting at school',
    day: 'Feb 6th at 1:30pm',
    reminder: false,
  },
  {
    id: 3,
    text: 'Shopping',
    day: 'Feb 7th at 9:30am',
    reminder: true,
  },
] 
*/
function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  /**
   * 使用useEffect hook更新状态
   * Todo：在获取后台数据时应显示数据加载状态
   */
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])
  // 获取后台task列表，在useEffect中调用
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // 获取单个task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    if (!res) {
      alert(`Task with id: ${id} not found`)
      return
    }
    const task = await res.json()

    return task
  }

  /**
   * 向后台添加数据
   * 现实添加是否成功消息
   * @param {*} task
   */
  const addTaskHandler = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    //Todo: 现实是否添加成功消息
    const data = await res.json()

    setTasks([...tasks, data]) //data是上面添加的数据，合并到当前状态中
    // const id = Math.floor(Math.random() * 10000) + 1
    // setTasks([...tasks, { id, ...task }])
    // console.log('Add Task: ', task)
  }

  const deleteTaskHandler = async (id) => {
    //删除后台数据
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
    //更新本地状态数据
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // 当用户双击task时，变更task 提醒状态
  const toggleReminderHandler = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
    // console.log('UpdatedTask: ', updatedTask)
    const data = await res.json()

    // console.log('Toggled the task: ', id)
    // 找到这个id的task后，使用immutable方法修改该task
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} show={showAddTask} />
      {showAddTask && <AddTask onAdd={addTaskHandler} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTaskHandler}
          onToggle={toggleReminderHandler}
        />
      ) : (
        'No task yet. Add Task Please.'
      )}
      <Footer />
    </div>
  )
}

export default App
