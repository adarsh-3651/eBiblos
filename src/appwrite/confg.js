import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query, Account } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases=new Databases(this.databases)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){{
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }
        catch{
            console.log("Appwrite service error")
        }
    }
}
    async updatePost(slug,{title,content,featuredImage,status,userId}){{
    try{
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        )
    }
    catch{
        console.log("Appwrite service error")
    }
    }}
    async deletePost(slug){{
    try{
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
        )
        return true
    }
    catch{
        console.log("Appwrite service error:DeletePost")
        return false
    }
    }}
    async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite service error: getPost")
    }
    }
    async getPosts(queries=[Query.equals("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }
        catch{
            console.log("Appwrite service error: getPosts")
        }
    }
    //file upload and delete services
    async uploadFile(file){
        try{
            await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file,    
            )
            return true
        }
        catch{
            console.log("Appwrite service error: uploadFile")
            return false
        }
    }
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        }
        catch{
            console.log("Appwrite service error: deleteFile")
            return false
        }
    }
    async getFilePreview(fileId){
        try{
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        }
        catch{
            console.log("Appwrite service error: getFilePreview")
        }
    }
}

const service = new Service()
export default service