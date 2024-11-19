import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

const getTerraformCode = async (diagramID: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/infra/code/${diagramID}`,
    {
      method: "GET",
    }
  );
  const responseData = await response.json();
  return responseData.data.terraformCode;
};

export async function POST(req: Request) {
  const { messages, diagramID } = await req.json();

  try {
    // Fetch terraform code
    let terraformCode = "";
    try {
      terraformCode = await getTerraformCode(diagramID);
    } catch (error) {
      console.error(error);
      terraformCode = "NO CODE FOUND";
    }

    const result = streamText({
      model: google("gemini-1.5-flash"),
      messages,
      system: `You are a terraform expert. You are given a diagram and the corresponding terraform code.
       You need to answer the user's question based on the diagram and the terraform code. 
       INSTRUCTIONS:
      1. Respond in markdown format!.
      2. Be concise and to the point.
      3. Provide accurate and helpful information.
      4. If you don't know the answer, say so. Don't make up an answer.
      5. Be friendly and professional.
       The following is the terraform code for the diagram: ${terraformCode}.`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response("Error processing chat request", { status: 500 });
  }
}
