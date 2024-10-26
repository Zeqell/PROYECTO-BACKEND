import passport  from "passport";
import UserModel from "../dao/models/users.model.js";
import { githubAuth } from "../utils/jsonwebtoken.js";
import GitHubStrategy from "passport-github2"
import jwt from "passport-jwt"
import configObject from "./config.js";

const JWTStrategy = jwt.Strategy; 
const ExtractJwt = jwt.ExtractJwt; 
const {secret_or_key, client_id, client_secret, cookie_token} = configObject

const initializePassport= ()=>{

    passport.serializeUser((user, done)=>{
         done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id)
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    })

    passport.use("github", new GitHubStrategy({
        clientID: client_id,
        clientSecret: client_secret, 
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("Profile", profile)
        try {
            const { user, token } = await githubAuth(profile)
            done(null, user, token);
        } catch (error) {
            done(error)
        }
    }))

    passport.use("current", new JWTStrategy({
         jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
         secretOrKey: secret_or_key,
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload); 
         } catch (error) {
             return done(error);
         }
    }))
}

const cookieExtractor = (req) => {
     let token = null; 
     if(req && req.cookies) {
         token = req.cookies[cookie_token]; 
     }
     return token; 
}

export default initializePassport

