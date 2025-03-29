import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();
client.setEndpoint('https://[YOUR_APPWRITE_ENDPOINT]').setProject('[YOUR_PROJECT_ID]'); // Replace with your Appwrite endpoint and project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Appwrite collection details (replace with your actual collection and database names)
const databaseId = 'booksDatabase';
const booksCollectionId = 'booksCollection';

// Fetch all books from Appwrite
export const getBooks = async () => {
  try {
    const response = await databases.listDocuments(databaseId, booksCollectionId);
    return response; // Returns the list of books from the collection
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error; // Propagate error
  }
};

// Fetch book details by its ID
export const getBookById = async (bookId) => {
  try {
    const response = await databases.getDocument(databaseId, booksCollectionId, bookId);
    return response;
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw error;
  }
};

// Create a new book (for seller to add a book)
export const createBook = async (bookData) => {
  try {
    const response = await databases.createDocument(databaseId, booksCollectionId, bookData);
    return response;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

// Update an existing book's details
export const updateBook = async (bookId, bookData) => {
  try {
    const response = await databases.updateDocument(databaseId, booksCollectionId, bookId, bookData);
    return response;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// Delete a book
export const deleteBook = async (bookId) => {
  try {
    const response = await databases.deleteDocument(databaseId, booksCollectionId, bookId);
    return response;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

// Upload an image to Appwrite's storage (for book cover image upload)
export const uploadImage = async (file) => {
  try {
    const response = await storage.createFile('booksImagesBucket', file);
    return response; // Returns the file object with URL to access the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// User authentication methods
export const login = async (email, password) => {
  try {
    const response = await account.createSession(email, password);
    return response; // Returns session info
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current'); // Deletes the current session (logs out)
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await account.get();
    return response; // Returns the current user object
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// Register a new user
export const register = async (email, password) => {
  try {
    const response = await account.create(email, password);
    return response; // Returns user info
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
