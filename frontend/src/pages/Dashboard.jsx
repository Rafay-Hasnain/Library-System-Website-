import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    async function getBooks() {
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/books/', {
                method: 'GET',
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                setMessage('Could not load books.');
            }
        } catch (error) {
            setMessage('Something went wrong.');
        }
    }

    async function deleteBook(id) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (response.ok) {
                setMessage('Book deleted successfully.');
                getBooks();
            } else {
                setMessage('Could not delete book.');
            }
        } catch (error) {
            setMessage('Something went wrong.');
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="container">
            <h1>Book List</h1>

            <p className="message">{message}</p>

            {books.length === 0 ? (
                <p>No books found. Add your first book.</p>
            ) : (
                <div className="book-list">
                    {books.map((book) => (
                        <div className="book-card" key={book.id}>
                            <h3>{book.title}</h3>
                            <p><b>Author:</b> {book.author}</p>
                            <p><b>Category:</b> {book.category}</p>
                            <p><b>Status:</b> {book.status}</p>

                            <Link to={`/edit/${book.id}`}>
                                <button>Edit</button>
                            </Link>

                            <button onClick={() => deleteBook(book.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;