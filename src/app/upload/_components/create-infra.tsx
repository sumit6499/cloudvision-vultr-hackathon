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
  };
  useEffect(() => {
    if (success) {
      window.location.href = `/dashboard?diagramId=${diagramID}`;
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
      </div>
      <Logs
        handleCreateInfra={handleCreateInfra}
        diagramID={diagramID!}
        creating={creating}
        setCreating={setCreating}
        setSuccess={setSuccess}
      />
    </div>
  );
};
