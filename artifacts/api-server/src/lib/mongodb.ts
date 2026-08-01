import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.MONGO_URL || "";

if (!uri) {
  throw new Error("MONGODB_URI or MONGO_URL environment variable is required.");
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

client = new MongoClient(uri, options as any);

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
