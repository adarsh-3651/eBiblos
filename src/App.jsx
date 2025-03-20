import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-gray-600'>
    <h1 className='bg-white-300'>We are building eBiblos</h1>
    <h2 className='bg-white-300'>This is a test</h2>
    <h3 className='bg-white-300'>This is a test</h3>
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={() => {
        setCount(count + 1)
        console.log(count)}
        }>Click me</button>
    </div>
  )
}

export default App
