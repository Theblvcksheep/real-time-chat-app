import jwt from "jsonwebtoken"
const JWT_KEY = "myKEY"
const NODE_ENV = "dev" // prod
export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, JWT_KEY, {
        expiresIn: "7d"
    })

    res.cookie("JWT", token, {
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV !== "dev",
    });
    return token
}