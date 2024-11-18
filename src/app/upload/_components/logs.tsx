import { useState, useEffect } from "react";

type Log = {
  message: string;
  type: "info" | "error" | "success" | "warning";
};

export const Logs = ({
  creating,
  setSuccess,
  setCreating,
}: {
  creating: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [logs, setLogs] = useState<Log[]>([]);

  // Mock logs for demonstration - replace with actual log fetching logic
  useEffect(() => {
    const fetchLogs = async () => {
      // TODO: Replace with actual API call to fetch logs
      const mockLogs: Log[] = [
        { message: "Initializing infrastructure...", type: "info" as const },
        { message: "Creating VPC...", type: "info" as const },
        { message: "Setting up security groups...", type: "info" as const },
        { message: "Deploying resources...", type: "info" as const },
        // TODO: Add error logs
        { message: "Error creating VPC...", type: "error" as const },
        {
          message: "Error setting up security groups...",
          type: "error" as const,
        },
        // TODO: Add success logs
        {
          message: "Infrastructure created successfully!",
          type: "success" as const,
        },
        { message: "Infrastructure creation failed!", type: "error" as const },
        // warning logs
        {
          message: "Warning: VPC creation may take longer than expected.",
          type: "warning" as const,
        },
        {
          message: "Warning: Security groups setup may fail.",
          type: "warning" as const,
        },
        {
          message: "Infrastructure creation completed!",
          type: "success" as const,
        },
      ];

      // Simulate real-time logs
      mockLogs.forEach((log, index) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, log]);
          if (log.message === "Infrastructure creation completed!") {
            setLogs((prev) => [
              ...prev,
              { message: "Redirecting to dashboard...", type: "info" as const },
            ]);
            new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
              setSuccess(true);
              setCreating(false);
            });
          }
        }, index * 1000);
      });
    };

    creating && fetchLogs();
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
              $ {log.message}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};
