import { getLogs } from "@/actions/logs";
import { useState, useEffect, useRef } from "react";

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
  handleCreateInfra,
}: {
  creating: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
  diagramID: string;
  handleCreateInfra: () => Promise<void>;
}) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Mock logs for demonstration - replace with actual log fetching logic
  useEffect(() => {
    const fetchLogs = async () => {
      const fetchedLogs = await getLogs({ diagramID });
      setLogs([
        ...fetchedLogs.map((log) => ({
          ...log,
          timestamp: new Date().toISOString(),
          type: log.type as "info" | "error" | "success" | "warning",
        })),
      ]);

      // Check if any log has "finished" message
      if (
        logs[logs.length - 1].message.includes(
          "Image processed and code generated successfully"
        ) &&
        !creating
      ) {
        setLogs((prevLogs) => [
          ...prevLogs,
          {
            type: "info",
            message: "⏱️ Waiting for terraform to initialize",
            timestamp: new Date().toISOString(),
          },
        ]);
        await handleCreateInfra();
      }
      if (
        fetchedLogs.some((log) =>
          log.message.includes("Task Finished successfully!")
        )
      ) {
        setLogs((prevLogs) => [
          ...prevLogs,
          {
            type: "info",
            message: "Redirecting to dashboard...",
            timestamp: new Date().toISOString(),
          },
        ]);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSuccess(true);
        setCreating(false);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
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
          <div ref={logRef} />
        </pre>
      </div>
    </div>
  );
};
