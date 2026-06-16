import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('Available');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');

    async function getBook() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
                method: 'GET',
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTitle(data.title);
                setAuthor(data.author);
                setCategory(data.category);
                setStatus(data.status);
            } else {
                setMessage('Could not load book.');
            }
        } catch (error) {
            setMessage('Something went wrong.');
        }
    }

    async function handleUpdateBook(e) {
        e.preventDefault();

        if (!title || !author || !category) {
            setMessage('Please fill all required fields.');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    title,
                    author,
                    category,
                    status,
                }),
            });

            if (response.ok) {
                navigate('/');
            } else {
                setMessage('Could not update book.');
            }
        } catch (error) {
            setMessage('Something went wrong.');
        }
    }

    useEffect(() => {
        getBook();
    }, []);

    return (
        <div className="form-container">
            <h1>Edit Book</h1>

            <form onSubmit={handleUpdateBook}>
                <input
                    type="text"
                    placeholder="Book title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Available">Available</option>
                    <option value="Borrowed">Borrowed</option>
                </select>

                <button type="submit">Update Book</button>
            </form>

            <p className="message">{message}</p>
        </div>
    );
}

export default EditBook;