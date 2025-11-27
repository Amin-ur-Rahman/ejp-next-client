import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    client = new MongoClient(uri, options);
    global._mongoClient = client.connect();
  }
  clientPromise = global._mongoClient;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
