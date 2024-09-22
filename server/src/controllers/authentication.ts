import express  from "express";
import { createrUser, getUserByEmail } from "../db/users"
import { authentication, random } from "../helpers/index";

export const register = async(req: express.Request, res: express.Response) => {
    try {
        const {email, password, username} = req.body

        if(!email || !password || !username){
            return res.sendStatus(400)
        }

        const existingUser = await getUserByEmail(email)

        if(existingUser){
            return res.sendStatus(400)
        }

        const salt = random()
        const user = await createrUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.sendStatus(200).json(user).end()

    } catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}