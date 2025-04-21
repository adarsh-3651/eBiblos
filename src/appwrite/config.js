import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        this.account = new Account(this.client);
    }

    // Create a new post with multiple images
    async createPost({
        title,
        slug,
        content,
        featuredImage = [],
        status,
        userId,
        postedBy, // <-- add this
        rate,
        dateAD,
        dateBS,
        phoneNo,
        location,
        category,
    }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                    postedBy, // <-- include it here too
                    rate,
                    dateAD,
                    dateBS,
                    phoneNo,
                    location,
                    category,
                }
            );
        } catch (error) {
            console.error("Appwrite service error: createPost", error);
            throw error;
        }
    }
    

    // Update post with multiple images
    async updatePost(postId, {
        title,
        slug,
        content,
        featuredImage = [],
        status,
        userId,
        postedBy, // <-- add here
        rate,
        dateAD,
        dateBS,
        phoneNo,
        location,
        category,
    }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                    postedBy, // <-- and include here
                    rate,
                    dateAD,
                    dateBS,
                    phoneNo,
                    location,
                    category,
                }
            );
        } catch (error) {
            console.error("Appwrite service error: updatePost", error);
            throw error;
        }
    }
    

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
            return true;
        } catch (error) {
            console.error("Appwrite service error: deletePost", error);
            return false;
        }
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
        } catch (error) {
            console.error("Appwrite service error: getPost", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Appwrite service error: getPosts", error);
        }
    }

    async uploadFile(file) {
        try {
            const result = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return result.$id;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw new Error("Failed to upload file.");
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Appwrite service error: deleteFile", error);
            return false;
        }
    }

    // Get view URLs for an array of fileIds
    async getFilePreviews(fileIds) {
        try {
            console.log("File IDs:", fileIds); // Debugging line
            if (!Array.isArray(fileIds)) return [];

            const previews = fileIds.map((fileId) => {
                return this.bucket.getFileView(conf.appwriteBucketId, fileId);
            });

            return previews; // array of preview URLs (promises are not awaited because getFileView is synchronous)
        } catch (error) {
            console.error("Appwrite service error: getFilePreviews", error);
            return [];
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service error: getCurrentUser", error);
            return null;
        }
    }
}

const service = new Service();
export default service;
