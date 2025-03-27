import conf from "../conf/conf";
import {Client,Account,ID, Databases,Storage} from "appwrite"

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email, password, name);
            if (userAccount){
                // We will call another function to create a profile for the user
                return this.login({email,password});
            }
            else{
                return "Error creating account";
            }
        }
        catch(e){
            console.error(e);
        }
    }

    async login ({email,password}){
        try{
            return await this.account.createEmailSession(email,password)
        }
        catch(e){
            console.error(e);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();    
        } 
        catch (error) {
            throw error;
        }
        return null;
    }

    async logOut(){
        try{
            return await this.account.deleteSessions();
        }
        catch(error){
            console.log(error);
        }
    }
}

const authService = new AuthService();

export default authService;
