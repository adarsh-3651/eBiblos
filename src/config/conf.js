// src/config/conf.js

const conf = {
    // Appwrite project configuration
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL), // Set from environment variable
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), // Set from environment variable
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID), // Set from environment variable
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID), // Set from environment variable
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID), // Set from environment variable
  
    // Appwrite Database and Collection details for the books
    booksDatabaseId: 'booksDatabase', // Replace with your actual database ID for books
    booksCollectionId: 'booksCollection', // Replace with your actual collection ID for books
    booksBucketId: 'booksImagesBucket', // Replace with your actual bucket ID for images
  };
  
  export default conf;
  