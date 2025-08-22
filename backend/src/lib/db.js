import mongoose from "mongoose";

const con_uri = `mongodb://semousuneo:4YcD4AhGiNqPXjde@ac-4o6y7ik-shard-00-00.qddf6lb.mongodb.net:27017,ac-4o6y7ik-shard-00-01.qddf6lb.mongodb.net:27017,ac-4o6y7ik-shard-00-02.qddf6lb.mongodb.net:27017/?ssl=true&replicaSet=atlas-12rdoj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

 export const connectDB = async () => {
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };

  const run = async () => {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(con_uri, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch (e) {
      console.log(`Error Connectintg to Mongo - ${e}`);
    } finally {
      // Ensures that the client will close when you finish/error
      await mongoose.disconnect();
    }
  };

  run().catch(console.dir);
};
