import { MongoClient } from "mongodb";

const MONGODB_URI = Deno.env.get("MONGODB_URI") || "";
const DB_NAME = Deno.env.get("DB_NAME") || "gymtrack-db";

if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set");
    Deno.exit(1);
}

const client = new MongoClient(MONGODB_URI);

try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB");
} 
catch (error) {
    console.error("Error connecting to MongoDB:", error);
    Deno.exit(1);
}

const db = client.db(DB_NAME);
const exercisesCollection = db.collection(Deno.env.get("COLLECTION_NAME") || "exercises");

export { db, exercisesCollection };