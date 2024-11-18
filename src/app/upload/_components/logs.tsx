import { getLogs } from "@/actions/logs";
import { useState, useEffect } from "react";

type Log = {
  timestamp: string;
  message: string;
  type: "info" | "error" | "success" | "warning";
};

export const Logs = ({
  creating,
  setSuccess,
  setCreating,
  diagramID,
}: {
  creating: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
  diagramID: string;
}) => {
  const [logs, setLogs] = useState<Log[]>([]);

  // Mock logs for demonstration - replace with actual log fetching logic
  useEffect(() => {
    const fetchLogs = async () => {
      const fetchedLogs = await getLogs({diagramID});
      setLogs([
        ...fetchedLogs.map((log) => ({
          ...log,
          timestamp: new Date().toISOString(),
        })),
      ]);

      // Check if any log has "finished" message
      if (fetchedLogs.some((log) => log.message === "finished")) {
        setSuccess(true);
        setCreating(false);
      }
    };

    if (creating) {
      fetchLogs();
      const interval = setInterval(fetchLogs, 5000);
      return () => clearInterval(interval);
    }
  }, [creating]);

  return (
    <div className="w-full">
      <div className="bg-black/90 rounded-lg p-4 h-[400px] overflow-y-auto">
        <pre className="font-mono text-sm">
          {logs.map((log, index) => (
            <div
              className={`${
                log.type === "info"
                  ? "text-green-400"
                  : log.type === "error"
                  ? "text-red-400"
                  : log.type === "success"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
              key={index}
            >
              {log.timestamp} - {log.message}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};
