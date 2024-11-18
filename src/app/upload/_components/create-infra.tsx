"use client";
import { createInfra } from "@/actions/fetch";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Logs } from "./logs";

export const CreateInfra = ({ diagramID }: { diagramID: string | null }) => {
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreateInfra = async () => {
    if (!diagramID) return;
    setCreating(true);
    await createInfra(diagramID);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  };
  useEffect(() => {
    if (success) {
      window.location.href = "/dashboard";
    }
  }, [success]);

  return (
    <div>
      <div className="flex sm:flex-row flex-col sm:justify-between gap-4 sm:gap-0 items-center py-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Generate Infrastructure</h1>
          <p className="text-[#656565]">
            Your architecture is ready to be generated!
          </p>
        </div>
        <Button
          className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-600/80"
          onClick={handleCreateInfra}
          disabled={creating}
        >
          {creating ? "Creating Infrastructure..." : "Create Infrastructure"}
        </Button>
      </div>
      <Logs
        diagramID={diagramID!}
        creating={creating}
        setCreating={setCreating}
        setSuccess={setSuccess}
      />
    </div>
  );
};
