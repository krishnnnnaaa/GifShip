import env from "@/environment/config";
import { Account, Avatars, Client, ID } from "appwrite";

export class UserAuthService {
    client = new Client();
    account: Account;
    avatar: Avatars

    constructor(){
        this.client
        .setEndpoint(env.appwriteUrl)
        .setProject(env.appwriteProjectId)
        this.account = new Account(this.client)
        this.avatar = new Avatars(this.client)
    }

    async createUser({name, email, password}: { name:string, email: string, password: string}){
        try {
            const newUser = await this.account.create(ID.unique(), email, password, name)
            if(newUser){
                return newUser
            }else return
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async login({email, password}: {email: string, password: string}){
        try {
            const userLogin = await this.account.createEmailPasswordSession(email, password);
            if(userLogin){
                return userLogin
            }else return
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async passwordRecoveryEmail({email}: {email:string}){
        try {
            const recoverPassword = await this.account.createRecovery(email, env.originkey)
            if(recoverPassword){
                return recoverPassword
            }else return;
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async passwordRecovery({userId, secret, password}: {userId:string, secret:string, password:string}){
        try {
            const updatePassword =  await this.account.updateRecovery(userId, secret, password)
            if(updatePassword){
                return updatePassword
            }else return
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async getThisUser(){
        try {
                const userAccount =  await this.account.get();
                if(userAccount) return userAccount
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async getUserInitial(name:string){
        try {
            return this.avatar.getInitials(name)
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    } 
}


const userAuthService = new UserAuthService()

export default userAuthService