import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import TransactionDetail from './pages/TransactionDetail'
import Summary from './pages/Summary'
import './styles/Navbar.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </>
  )
}

export default App