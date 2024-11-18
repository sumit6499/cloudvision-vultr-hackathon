"use server";
import { Redis } from "ioredis";

type Log = {
  message: string;
  type: "info" | "error" | "success" | "warning";
};

const redis = new Redis(process.env.REDIS_URL as string);

export const getLogs = async ({ diagramID }: { diagramID: string }) => {
  try {
    const logs = await redis.lrange(`logs-${diagramID}`, 0, -1);
    console.log("logs", logs);
    if (!logs) return [];

    return logs.map((log) => JSON.parse(log)) as Log[];
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
};
