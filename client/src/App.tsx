/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import "./App.css"

interface Book {
  id: number;
  title: string;
  release_year: number;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);

  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addBook = async () => {
    const bookData = {
      title,
      release_year: releaseYear,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();      
      setBooks((prev) => [...prev, data]);
      setTitle("")
      setReleaseYear(0)
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (pk: number, release_year: number) => {
    const bookData = {
      title: newTitle,
      release_year,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === pk) {
            return data;
          } else {
            return book;
          }
        })
      );
      
      setNewTitle("")
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (pk: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "DELETE",
      });

      setBooks((prev) => prev.filter((book) => book.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Book Website</h1>
      <div>
        <input
          type="text"
          placeholder="Book Title..."
          onChange={(e) => {setTitle(e.target.value)}}
        />
        <input
          type="number"
          placeholder="Release Year..."
          onChange={(e) => {setReleaseYear(parseInt(e.target.value))}}
        />
        <button onClick={addBook}
          disabled={title === "" || releaseYear <= 0}  
        > 
          Add Book 
        </button>
      </div>
      {books.map((book) => (
        <div key={book.id}>
          <p>Title: {book.title}</p>
          <p>Release Year: {book.release_year} </p>
          <input
            type="text"
            placeholder={`New Title for ${book.title}`}
            onChange={(e) => { setNewTitle(e.target.value) }}
            onFocus={()=>{if(newTitle === ""){ setNewTitle(book.title)}}}
            onBlur={()=>{if(newTitle === book.title){setNewTitle("")}}}
          />
          <button onClick={() => { updateTitle(book.id, book.release_year)}}>
            Change Title
          </button>
          <button onClick={() => {deleteBook(book.id)}}> Delete</button>
        </div>
      ))}
    </>
  )
}

export default App
