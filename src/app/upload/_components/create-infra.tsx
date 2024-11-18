"use client";
import { createInfra } from "@/actions/fetch";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const CreateInfra = ({
  diagramID = "1234",
}: {
  diagramID: string | null;
}) => {
  const [creating, setCreating] = useState(false);

  const handleCreateInfra = async () => {
    if (!diagramID) return;
    setCreating(true);
    const res = await createInfra(diagramID);
    console.log(res);
    setCreating(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col gap-4 justify-center items-center  rounded-lg">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-4xl font-bold text-center">
          Generate Infrastructure
        </h1>
        <p className="text-[#656565] text-center">
          Your architecture is ready to be generated!
        </p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleCreateInfra}
            disabled={creating}
            className="w-full"
          >
            {creating ? "Creating Infrastructure..." : "Create Infrastructure"}
          </Button>
          {creating && (
            <p className="text-zinc-500 text-sm">
              Please wait while we process your request
            </p>
          )}
        </div>
        {creating && <Loader2 className="animate-spin" />}
      </div>
    </div>
  );
};
