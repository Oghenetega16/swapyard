import { createClient } from "redis";

export const redisClient = createClient({
    url: "redis://127.0.0.1:6379"
})

redisClient.on("error", (err) => {
    console.error("Redis had the following error", err)
}
)

if(!redisClient.isOpen){
    await redisClient.connect()
}

