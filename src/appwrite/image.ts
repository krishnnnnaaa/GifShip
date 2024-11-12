import env from "@/environment/config";
import { Client, Databases, ID, Query, Storage } from "appwrite";


export class DataImage{
    client = new Client();
    databases: Databases;
    bucket: Storage

    constructor(){
        this.client
        .setEndpoint(env.appwriteUrl)
        .setProject(env.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async saveImage({slug, url, title, gifId, type, alt_text, width, height}: {slug:string, url:string, title:string, gifId:string, type:string, alt_text:string, width: number, height: number}){
        try {
            return await this.databases.createDocument(env.appwriteDatabaseId, env.appwriteCollectionId, gifId, {title, url, slug, gifId, type, alt_text, width, height})
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async removeImage(id:string){
        try {
            return await this.databases.deleteDocument(env.appwriteDatabaseId, env.appwriteCollectionId, id)
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async getImage(slug:string){
        try {
            return await this.databases.getDocument(env.appwriteDatabaseId, env.appwriteCollectionId, slug)
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async getImages(){
        try {
            return await this.databases.listDocuments(env.appwriteDatabaseId, env.appwriteCollectionId)
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }
}

const dataImage = new DataImage()
export default dataImage