// Store book data with genres
const books = [
    { id: 1, title: "Book Title 1", author: "Author 1", price: 20.00, genre: "Fiction" },
    { id: 2, title: "Book Title 2", author: "Author 2", price: 15.00, genre: "Mystery" },
    { id: 3, title: "Book Title 3", author: "Author 3", price: 25.00, genre: "Science Fiction" },
    { id: 4, title: "Book Title 4", author: "Author 4", price: 18.00, genre: "Fantasy" },
    // Add more books as needed
];

// Function to render books
function renderBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';  // Clear previous book listings

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-item');
        bookElement.setAttribute('data-id', book.id);

        bookElement.innerHTML = `
            <img src="${book.image || 'default-image.jpg'}" alt="${book.title}" class="book-image">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Price: $${book.price}</p>
            <p>Genre: ${book.genre}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        // Append to the book list
        bookList.appendChild(bookElement);
    });

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookId = parseInt(button.parentElement.getAttribute('data-id'), 10);
            addToCart(bookId);
        });
    });
}

// Call the renderBooks function on page load
document.addEventListener('DOMContentLoaded', renderBooks);
