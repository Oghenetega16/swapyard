// import { createClient } from "redis";

// export const redisClient = createClient({
//     url: "redis://127.0.0.1:6379"
// })

// redisClient.on("error", (err) => {
//     console.error("Redis had the following error", err)
// }
// )

// if(!redisClient.isOpen){
//     await redisClient.connect()
// }


// TEMPORARY MOCK CLIENT: 
// This bypasses the ECONNREFUSED error so you can test your app without running a local Redis server.

export const redisClient = {
    get: async () => null,       // Always pretend the cache is empty
    set: async () => "OK",       // Pretend we saved to cache successfully
    on: () => {},                // Ignore error listeners
    connect: async () => {},     // Do nothing on connect
    isOpen: true                 // Trick the app into thinking it's connected
} as any; // The 'as any' stops TypeScript from complaining about missing methods

