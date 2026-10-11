import { useState } from 'react'
import styles from './styles.module.css'
import { useContext } from 'react';
import { Link } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Odin Book App</h1>
      <Link to={'/login'}>Login</Link>
      <Link to={'/signup'}>Signup</Link>

    </>
  )
}

export default App
