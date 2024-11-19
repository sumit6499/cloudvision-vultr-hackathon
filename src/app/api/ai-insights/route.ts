import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

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
  const { diagramId } = await req.json();

  try {
    let terraformCode = "";
    try {
      terraformCode = await getTerraformCode(diagramId);
    } catch (error) {
      console.error(error);
      terraformCode = "NO CODE FOUND";
    }

    const response = await generateText({
      model: google("gemini-1.5-flash"),
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant & terraform with cloud infrasturcture expert that can answer questions and help with tasks by understanding code given in your system instruction after terraform code keyword.
          Behave as a Terraform Expert that provide suggestion and insights on infrastucture that will be created after given code executed.
          INSTRUCTIONS:
          1. Respond in markdown format!.
          2. Be concise and to the point.
          3. Provide accurate and helpful information.
          4. If you don't know the answer, say so. Don't make up an answer.
          5. Be friendly and professional.
          6. Max 300 characters should be given in response, Be concise.
          7. Use markdown lists to provide the insights.
          Here is the terraform code to analyze: ${terraformCode}`
        },
        {
          role: "user",
          content: "What infrastructure will be created by this Terraform code? Please provide a concise analysis."
        }
      ]
    });

    const content = typeof response === 'string' ? response : response.text || JSON.stringify(response);

    return new Response(JSON.stringify({ content }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ 
      content: "Error processing chat request" 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
