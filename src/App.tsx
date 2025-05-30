import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Task, { taskData } from './components/Task'
import Test from './pages/Test'
import Chat from './pages/Chat'
import Calculator from './pages/Calculator'
import UserEffectDemo from './pages/UseEffectDemo'
import UseEffectDemoPractice from './pages/UseEffectDemoPractice'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-4xl mx-auto flex gap-4">
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
            <Link to="/test" className="text-blue-500 hover:text-blue-700">
              Test
            </Link>
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
						<Link to="/chat" className="text-blue-500 hover:text-blue-700">
              Chat
            </Link>
						<Link to="/calculator" className="text-blue-500 hover:text-blue-700">
              Calculator
            </Link>
						<Link to="/use_effect_demo" className="text-blue-500 hover:text-blue-700">
              UseEffectDemo
            </Link>
						<Link to="/use_effect_demo_practice" className="text-blue-500 hover:text-blue-700">
              UseEffectDemoPractice
            </Link>
						<Link to="/use_effect_demo_practice" className="text-blue-500 hover:text-blue-700">
              UseEffectDemoPractice
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                  Task Manager
                </h1>
                <Task 
                  subTasks={taskData} 
                  level={0}
                />
              </div>
            </div>
          } />
          <Route path="/test" element={<Test />} />
					<Route path="/login" element={<Login />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/calculator" element={<Calculator />} />
					<Route path="/use_effect_demo" element={<UserEffectDemo />} />
					<Route path="/use_effect_demo_practice" element={<UseEffectDemoPractice />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
