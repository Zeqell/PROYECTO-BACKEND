import mongoose from "mongoose";
import configObject from "./config/config.js";

const {mongo_url} = configObject

class DataBase {
    static #instance;
    constructor(){
        mongoose.connect(mongo_url)
        .then(()=>console.log("Connected to the database"))
        .catch((error)=> console.log("Failed to connect to the database", error))
    }

    static getInstance(){
        if(this.#instance){
            return this.#instance
        }
        this.#instance = new DataBase()
        return this.#instance
    }

}

export default DataBase
