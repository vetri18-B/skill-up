import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [listening, setListening] = useState(false);

  // Speech Recognition Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTitle(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };
  };

  const addTask = () => {
    if (title.trim() === '' || priority.trim() === '') return;
    const newTask = { id: Date.now(), title, priority: Number(priority) };
    setTasks([...tasks, newTask]);
    setTitle('');
    setPriority('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">📝 Voice-Enabled To-Do List</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-64"
        />
        <input
          type="number"
          placeholder="Priority (1-5)"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded w-32"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
        <button
          onClick={handleVoiceInput}
          className={bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${listening ? 'animate-pulse' : ''}}
        >
          🎤 {listening ? 'Listening...' : 'Voice Input'}
        </button>
      </div>

      <div className="w-full max-w-md">
        {sortedTasks.map((task) => (
          <div key={task.id} className="flex justify-between items-center p-4 mb-2 bg-white rounded shadow">
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-500">Priority: {task.priority}</p>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;