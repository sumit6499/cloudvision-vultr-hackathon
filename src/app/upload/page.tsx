"use client";
import { createInfra, uploadDiagram } from "@/actions/fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Upload, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [diagramID, setDiagramID] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username", "sumit");
      const res = await uploadDiagram(formData);

      console.log("Upload successful:", res);

      if (res.success && res.data.dbDiagram.id) {
        setDiagramID(res.data.dbDiagram.id);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!success ? (
        <main className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            Upload Your Infrastructure Image
          </h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label
                htmlFor="infrastructure-image"
                className="block text-blue-700 mb-2"
              >
                Infrastructure Image
              </Label>
              <Input
                id="infrastructure-image"
                type="file"
                accept="image/*"
                className="border-2 border-dashed border-blue-300 rounded-lg p-5 w-full text-blue-600 file:mr-4 file:px-4  file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleFileChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!file || loading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {loading ? "Uploading..." : "Upload and Generate Infrastructure"}
            </Button>
          </form>
        </main>
      ) : (
        <Infrastructure diagramID={diagramID} />
      )}
    </div>
  );
}

export default Page;

const Infrastructure = ({ diagramID }: { diagramID: string | null }) => {
  const [creating, setCreating] = useState(false);
  const [infraCreated, setInfraCreated] = useState(false);

  const staticIds = [
    "3e906710-7eeb-4138-a3ec-3452ad8898fd",
    "ec017bbc-d73c-47d3-a7b6-64cd6ae9cbe0",
    "d3ce2f64-3002-4525-8817-e982dd87cde9",
    "af24df50-81e9-4901-ba37-1140d45afe36",
    "e97b9769-ecb0-49d6-b401-95f46d7bdbbe",
  ];

  const handleCreateInfra = async () => {
    if (!diagramID) return;
    setCreating(true);
    const randomIndex = Math.floor(Math.random() * staticIds.length);
    const staticId = staticIds[randomIndex];
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const res = await createInfra(staticId);
    console.log(res);
    setCreating(false);
    setInfraCreated(true);
    window.location.href = '/dashboard';
  };

  useEffect(() => {
    console.log(diagramID);
  }, [diagramID]);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col gap-4 justify-center items-center border-2 border-blue-300 rounded-lg">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        Infrastructure
      </h1>
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-2">
          <p className="text-blue-700 text-2xl">
            Ready to Generate Infrastructure
          </p>
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
