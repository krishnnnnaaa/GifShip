const env = {
    appwriteUrl: String(process.env.APPWRITE_URL),
    appwriteProjectId: String(process.env.APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(process.env.APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(process.env.APPWRITE_BUCKET_ID),
    originkey: String(process.env.ORIGIN_KEY),
    giphyKey: String(process.env.GIPHY_KEY),
}
export default env