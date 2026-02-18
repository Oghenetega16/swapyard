import {SignJWT, jwtVerify} from "jose";


const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(userId: string) {
    return await new SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secret);

}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload.userId as string;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}