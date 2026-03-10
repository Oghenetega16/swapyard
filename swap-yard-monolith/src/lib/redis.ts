import { createClient } from "redis";

export const redisClient = createClient({
    url: "http://localhost:3000"
})

redisClient.on("error", (err) => {
    console.error("Redis had the following error", err)
}
)

await redisClient.connect()