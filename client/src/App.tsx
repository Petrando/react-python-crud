/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import "./App.css"
function App() {

  return (
    <>
      <h1>Book Website</h1>
      <div>
        <input
          type="text"
          placeholder="Book Title..."
          onChange={() => {}}
        />
        <input
          type="number"
          placeholder="Release Year..."
          onChange={() => {}}
        />
        <button onClick={()=>{}}> Add Book </button>
      </div>
    </>
  )
}

export default App
