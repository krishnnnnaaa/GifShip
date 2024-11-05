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

    async saveImage({slug, url, title, gifId, type, alt_text}: {slug:string, url:string, title:string, gifId:string, type:string, alt_text:string}){
        try {
            return await this.databases.createDocument(env.appwriteDatabaseId, env.appwriteCollectionId, slug, {title, url, slug, gifId, type, alt_text})
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }

    async removeImage(slug:string){
        try {
            return await this.databases.updateDocument(env.appwriteDatabaseId, env.appwriteCollectionId, slug)
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