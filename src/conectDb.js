import mongoose from "mongoose";

mongoose.connect("mongodb+srv://schrezequiel:coderhouse2024@cluster0.q96gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Connected to the database"))
    .catch((error)=> console.log("Failed to connect to the database", error))
