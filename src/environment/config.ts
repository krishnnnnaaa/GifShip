const env = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
    originkey: String(process.env.NEXT_PUBLIC_ORIGIN_KEY),
    giphyKey: process.env.NEXT_PUBLIC_GIPHY_KEY,
}
export default env