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
  return { success: true };
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
    const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "You are a helpful assistant that can answer questions and help with tasks. Behave as a helpful assistant." });
    const result = await model.generateContent(message);
    console.log(result.response.text());
  
    return result.response.text();
 } catch (error) {
    console.log(error)
 }
 
};
