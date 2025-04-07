import { MongoClient } from "mongodb";
let cachedClient: any = null;

export const connectMongo = async () => {
  if (cachedClient) {
    console.log("👌 Using existing connection");
    return Promise.resolve(cachedClient);
  }

  return MongoClient.connect(process.env.MONGO_URI as string)
    .then((client: any) => {
      console.log("🔥 New DB Connection");
      cachedClient = client;
      return client;
    })
    .catch((error: string) => {
      console.log("Mongo connect Error");
      console.log(error);
    });
};
