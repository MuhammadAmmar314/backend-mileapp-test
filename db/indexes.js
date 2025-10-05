import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017"; // ganti dengan URL dari .env
const dbName = "taskapp";

async function createIndexes() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const tasks = db.collection("tasks");

    // index untuk search (title)
    await tasks.createIndex({ title: "text" });

    // index untuk sort/filter (status, id, title)
    await tasks.createIndex({ status: 1 });
    await tasks.createIndex({ id: 1 });
    await tasks.createIndex({ title: 1 });

    console.log("Indexes created successfully");
  } catch (err) {
    console.error("Error creating indexes:", err);
  } finally {
    await client.close();
  }
}

createIndexes();
