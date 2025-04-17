// mongodb.ts
import { MongoClient } from 'mongodb';

// Extend the NodeJS.Global interface to include _mongoClientPromise
declare global {
    namespace NodeJS {
        interface GlobalThis {
            _mongoClientPromise?: Promise<MongoClient>;
        }
    }
}

const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the MongoClient instance
    if (!(globalThis as NodeJS.GlobalThis)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        (globalThis as NodeJS.GlobalThis)._mongoClientPromise = client.connect();
    }
    clientPromise = (globalThis as NodeJS.GlobalThis)._mongoClientPromise!;

} else {
    // In production mode, create a new MongoClient instance for each request
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;