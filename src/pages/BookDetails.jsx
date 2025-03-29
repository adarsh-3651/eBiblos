import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookDetails = ({ books }) => {
    const { id } = useParams();
    const book = books.find((b) => b.id === parseInt(id, 10));

    if (!book) {
        return <h2 style={{ color: 'red', textAlign: 'center' }}>Book not found</h2>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h1>{book.title}</h1>
            <h3>Author: {book.author}</h3>
            <p>{book.description}</p>
            <p style={{ fontWeight: 'bold' }}>Price: ${book.price.toFixed(2)}</p>
        </div>
    );
};

BookDetails.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            description: PropTypes.string,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default BookDetails;
