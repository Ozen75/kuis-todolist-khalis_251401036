import { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router'

const todoDummy = [
  {
    id: '1',
    title: 'Sarapan',
    description: 'Hari ini sarapan apa yah?',
    status: 'done',
    priority: 'high',
    deadline: '2026-10-11',
  },
  {
    id: '2',
    title: 'Membuat Website Portfolio',
    description: 'Membangun website portfolio pribadi menggunakan React dan Tailwind CSS',
    status: 'in progress',
    priority: 'low',
    deadline: '2026-10-20',
  },
  {
    id: '3',
    title: 'Mempelajari React Hooks',
    description: 'Mendalami penggunaan useState, useEffect, dan custom hooks',
    status: 'to-do',
    priority: 'low',
    deadline: '2026-10-11',
  },
  {
    id: '4',
    title: 'Menggulingkan rezim',
    description: 'HITAMKAAANNNNN!!! RAGNAMOOKK',
    status: 'to-do',
    priority: 'high',
    deadline: '2026-12-01',
  },
]

function TodoModal({ onClose, onSubmit, todoDummy }) {
  const [title, setTitle] = useState(todoDummy?.title || '')
  const [description, setDescription] = useState(todoDummy?.description || '')
  const [status, setStatus] = useState(todoDummy?.status || 'to-do')
  const [priority, setPriority] = useState(todoDummy?.priority || 'low')
  const [deadline, setDeadline] = useState(todoDummy?.deadline || '')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !deadline) {
      setError('Judul, deskripsi, dan deadline wajib diisi.')
      return
    }

    onSubmit({
      ...(todoDummy ? { id: todoDummy.id } : { id: crypto.randomUUID() }),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      deadline,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl text-gray-800">
        <h2 className="mb-5 text-center text-xl font-bold text-gray-900">
          {todoDummy ? 'Update Todo' : 'Tambah Todo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-800">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-800">Deskripsi</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-800">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none"
              >
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-bold text-gray-800">Prioritas</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-800">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {error && <p className="text-xs font-medium text-red-600">{error}</p>}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-full rounded bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              {todoDummy ? 'Update' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function TodoList({ todos, onAdd, onDelete }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-900">Todo List</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
        >
          Tambah Todo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 text-sm font-bold text-gray-900">
              <th className="py-3 pr-4">Judul</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Prioritas</th>
              <th className="py-3 px-4">Deadline</th>
              <th className="py-3 pl-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {todos.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400">
                  Belum ada tugas. Klik "Tambah Todo" untuk menambahkan.
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id} className="hover:bg-gray-50">
                  <td className="py-4 pr-4 font-medium text-gray-900 max-w-55 truncate">
                    {todo.title}
                  </td>
                  <td className="py-4 px-4">{todo.status}</td>
                  <td className="py-4 px-4">{todo.priority}</td>
                  <td className="py-4 px-4">{todo.deadline}</td>
                  <td className="py-4 pl-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/todo/${todo.id}`}
                        title="Lihat Detail"
                        className="rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => onDelete(todo.id)}
                        title="Hapus Todo"
                        className="rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <TodoModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={onAdd}
        />
      )}
    </div>
  )
}

function TodoDetail({ todos, onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const todo = todos.find((item) => item.id === id)

  if (!todo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-gray-600">Tugas tidak ditemukan.</p>
        <button
          onClick={() => navigate('/')}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Kembali ke Daftar
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          <div className="space-y-4 md:col-span-2">
            <div>
              <h2 className="text-base font-bold text-gray-900">Judul</h2>
              <p className="mt-1 text-sm text-gray-700">{todo.title}</p>
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900">Deskripsi</h3>
              <div className="mt-2 min-h-25 rounded border border-gray-200 bg-gray-50/50 p-3 text-sm text-gray-700">
                {todo.description}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">Status</h3>
                <p className="text-sm text-gray-700">{todo.status}</p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">Prioritas</h3>
                <p className="text-sm text-gray-700">{todo.priority}</p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">Deadline</h3>
                <p className="text-sm text-gray-700">{todo.deadline}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-4">
              <button
                onClick={() => navigate('/')}
                className="rounded bg-red-600 py-2 text-xs font-semibold text-white hover:bg-red-700 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="rounded bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {isUpdateModalOpen && (
        <TodoModal
          key={todo.id}
          onClose={() => setIsUpdateModalOpen(false)}
          onSubmit={onUpdate}
          todoDummy={todo}
        />
      )}
    </div>
  )
}

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('todo-list-kuis-v1'))
      return Array.isArray(saved) ? saved : todoDummy
    } catch {
      return todoDummy
    }
  })

  useEffect(() => {
    localStorage.setItem('todo-list-kuis-v1', JSON.stringify(todos))
  }, [todos])

  function addTodo(newTodo) {
    setTodos((prev) => [newTodo, ...prev])
  }

  function updateTodo(updatedTodo) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    )
  }

  function deleteTodo(id) {
    const target = todos.find((todo) => todo.id === id)
    const title = target ? target.title : 'tugas ini'

    if (window.confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Routes>
        <Route
          path="/"
          element={
            <TodoList
              todos={todos}
              onAdd={addTodo}
              onDelete={deleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={
            <TodoDetail
              todos={todos}
              onUpdate={updateTodo}
            />
          }
        />
      </Routes>
    </main>
  )
}