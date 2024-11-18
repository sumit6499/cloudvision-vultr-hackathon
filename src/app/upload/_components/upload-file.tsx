import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { TriangleAlert, Upload } from "lucide-react";
import { uploadDiagram } from "@/actions/fetch";
import { useState } from "react";


const DEMO_IMAGE_URL = "https://cloudvision-diagram.blr1.vultrobjects.com/sumit/pop.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ZLIFDU8L767BDVY3UR3P%2F20241118%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241118T160809Z&X-Amz-Expires=604800&X-Amz-Signature=d5813d07cb40a867d8aa704364eb6a81b9463afcd8e6f701b95b51b2f2a07236&X-Amz-SignedHeaders=host&x-id=GetObject"

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
      console.log(res);
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
    <main className="container mx-auto max-w-xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-3 text-center">
        Upload Your Infrastructure Image
      </h1>
      <p className="text-center flex px-5 items-center justify-center gap-5 mb-8 bg-yellow-600/5 p-2 text-sm border border-yellow-600 rounded-md">
        <TriangleAlert className="w-4 h-4 text-yellow-600" />
        <span>
          Upload only <br className="sm:hidden block" />
           architecture diagrams like <a className="underline text-yellow-600" target="_blank" href={DEMO_IMAGE_URL}>this</a>
        </span>
        <TriangleAlert className="w-4 h-4 text-yellow-600" />
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6">
          <Label
            htmlFor="infrastructure-image"
            className="block text-[#656565] mb-2"
          >
            Infrastructure Image
          </Label>
          <div>
            <Input
              id="infrastructure-image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label
              htmlFor="infrastructure-image"
              className="flex flex-col items-center justify-center w-full h-40 px-4 transition border-2 border-dashed border-[#353535] rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5">
                <Upload className="w-6 h-6 mb-3 text-[#656565]" />
                <p className="mb-2 text-sm text-[#656565]">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                {file && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </label>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed text-white rounded-md flex items-center justify-center"
            disabled={!file || loading}
          >
            <Upload className="mr-2 h-4 w-4" />
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </form>
    </main>
  );
};
