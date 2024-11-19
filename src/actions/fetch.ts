"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export const uploadDiagram = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/upload/diagram`,
    {
      method: "POST",
      body: formData,
    }
  );
  return (await response.json()) as {
    success: boolean;
    data: { dbDiagram: { id: string } };
  };
};

export const createInfra = async (diagramID: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/infra/create`,
    {
      method: "POST",
      body: JSON.stringify({ diagramID }),
    }
  );
  return await response.json();
};

export const getChatCompletion = async (message: string) => {

 try {
    const diagramID="fd8ad278-06fb-4576-a9e8-f190f9e61eca"

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/infra/code/${diagramID}`,
      {
        method: "GET",
      }
    );
    const responseData=await response.json();

    const terraformCode=responseData.data.terraformCode

    const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: `You are a helpful assistant & terraform with cloud infrasturcture expert that can answer questions and help with tasks by understanding code given in your system instruction after terraform code keyword. Behave as a helpful assistant. terraform code : ${terraformCode}` });
    const result = await model.generateContent(message);
    console.log(result.response.text());
  
    return result.response.text();


 } catch (error) {
    console.log(error)
 }
 
};

export const getAiInsights= async ()=>{
  
 try {
  const diagramID="fd8ad278-06fb-4576-a9e8-f190f9e61eca"

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/infra/code/${diagramID}`,
    {
      method: "GET",
    }
  );
  const responseData=await response.json();

  const terraformCode=responseData.data.terraformCode

  const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = client.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: `You are a helpful assistant & terraform with cloud infrasturcture expert that can answer questions and help with tasks by understanding code given in your system instruction after terraform code keyword. Behave as a Terraform Expert that provide suggestion and insights on infrastucture that will be created after given code executed. Don't provide suggestion on api key or secret parts terraform code : ${terraformCode}` });
  const result = await model.generateContent("Provide Suggestion and insights");
  console.log(result.response.text());

  return result.response.text();


} catch (error) {
  console.log(error)
}
}

// getChatCompletion("hi how are you")
getAiInsights()