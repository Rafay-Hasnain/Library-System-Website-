import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('Available');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    async function handleAddBook(e) {
        e.preventDefault();

        if (!title || !author || !category) {
            setMessage('Please fill all required fields.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/books/', {
                method: 'POST',
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
                setMessage('Could not add book.');
            }
        } catch (error) {
            setMessage('Something went wrong.');
        }
    }

    return (
        <div className="form-container">
            <h1>Add Book</h1>

            <form onSubmit={handleAddBook}>
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

                <button type="submit">Add Book</button>
            </form>

            <p className="message">{message}</p>
        </div>
    );
}

export default AddBook;