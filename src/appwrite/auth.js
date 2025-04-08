import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password }); // Auto-login after account creation
            }
            throw new Error("Account creation failed");
        } catch (e) {
            console.error("Create Account Error:", e.message);
            throw e;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (e) {
            console.error("Login Error:", e.message);
            throw e;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            if (user) {
                console.log("Current User:", user);
                return user;
            }
        } catch (error) {
            console.error("Get Current User Error:", error.message);
            return null; // Avoids app crashes when no session exists
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.error("Logout Error:", error.message);
            return false;
        }
    }

    async loginWithGoogle() {
        try {
            return this.account.createOAuth2Session(
                "google",
                `${window.location.origin}/auth/success`,
                `${window.location.origin}/auth/failure`
            );
        } catch (error) {
            console.error("Google Login Error:", error.message);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
