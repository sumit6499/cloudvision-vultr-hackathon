import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Upload } from "lucide-react";
import { uploadDiagram } from "@/actions/fetch";
import { useState } from "react";
export const UploadFile = ({
  setDiagramID,
  setSuccess,
}: {
  setDiagramID: (id: string) => void;
  setSuccess: (success: boolean) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Upload Your Infrastructure Image
      </h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label
            htmlFor="infrastructure-image"
            className="block text-[#656565] mb-2"
          >
            Infrastructure Image
          </Label>
          <div className="relative">
            <Input
              id="infrastructure-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="infrastructure-image"
              className="flex flex-col items-center justify-center w-full h-40 px-4 transition border-2 border-dashed border-[#353535] rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center py-20 pb-20">
                <Upload className="w-6 h-6 mb-3 text-[#656565]" />
                <p className="mb-2 text-sm text-[#656565]">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                {file && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </label>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 hover:text-white text-white"
          disabled={!file || loading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {loading ? "Uploading..." : "Upload Image"}
        </Button>
      </form>
    </main>
  );
};
