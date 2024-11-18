"use client";
import { useState } from "react";
import { UploadFile } from "./_components/upload-file";
import { CreateInfra } from "./_components/create-infra";

function Page() {
  const [diagramID, setDiagramID] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  return (
    <div>
      {!success ? (
        <UploadFile setDiagramID={setDiagramID} setSuccess={setSuccess} />
      ) : (
        <CreateInfra diagramID={diagramID} />
      )}
    </div>
  );
}

export default Page;
