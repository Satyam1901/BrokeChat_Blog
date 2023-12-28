import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf. appwriteUrl)
        .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
    }

async createAccount({email, password, name}){
    try {
       const userAccount = await this.account.create(ID.unique() , email,password,name);

       if (userAccount) {
        //call another method if user already able so login directly..
        
       } else {
        return userAccount;
       }
    } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);
        throw error;
    }
}

async login({email, password}){
    try {
        return await this.account.createEmailSession(email,password);
    } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);
        throw error;
    }
}

async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);
        throw error;
    }
}

async logout() {
    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);
        throw error;
    }
}
}

const authService = new AuthService();

export default authService;