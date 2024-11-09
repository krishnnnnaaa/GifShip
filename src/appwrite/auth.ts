import env from "@/environment/config";
import { Account, Client, ID, OAuthProvider } from "appwrite";

export class UserAuthService {
    client = new Client();
    account: Account;

    constructor(){
        this.client
        .setEndpoint(env.appwriteUrl)
        .setProject(env.appwriteProjectId)
        this.account = new Account(this.client)
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

    async googleLogin(){
        try {
            const loginWithGoogle = await this.account.createOAuth2Session(OAuthProvider.Google, env.originkey, env.originkey)
            if(loginWithGoogle){
                return loginWithGoogle
            }else return
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }
    async spotifyLogin(){
        try {
            const loginWithSpotify = await this.account.createOAuth2Session(OAuthProvider.Spotify, env.originkey, env.originkey)
            if(loginWithSpotify){
                return loginWithSpotify
            }else return
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async getThisUser(){
        try {
            if(this.account){
                const userAccount =  await this.account.get();
                if(userAccount) return userAccount
            }
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async loginAsGuest(){
        try {
            await this.account.createAnonymousSession()
        } catch (error) {
            
        }
    }
    async getUserSession(){
        try {
            if(this.account){
                const userSession =  await this.account.getSession('current')
                if(userSession) return userSession;
            }
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