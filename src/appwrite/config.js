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

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(), // Generate a unique ID instead of using slug
                { title, slug, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error("Appwrite service error: createPost:", error);
        }
    }

    async updatePost(postId, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error("Appwrite service error: updatePost", error);
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
            const response = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return response; // Returning the uploaded file details (e.g., file ID)
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

    async getFilePreview(fileId) {
        try {
            return await this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.error("Appwrite service error: getFilePreview", error);
        }
    }
}

const service = new Service();
export default service;