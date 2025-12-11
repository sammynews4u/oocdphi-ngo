import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateHealthResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) return "I'm sorry, I cannot connect to the AI service right now (Missing API Key).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: `You are a compassionate, knowledgeable, and trustworthy AI assistant for "LifeGuard", a Chronic Disease Prevention NGO. 
        Your goal is to provide general information about chronic diseases (diabetes, heart disease, cancer, respiratory issues), healthy lifestyles, and the NGO's mission.
        
        IMPORTANT RULES:
        1. ALWAYS include a disclaimer that you are an AI and not a doctor.
        2. DO NOT provide medical diagnosis or specific treatment plans. Advise users to consult healthcare professionals.
        3. Be encouraging and focus on prevention, early detection, and management.
        4. Keep responses concise (under 150 words) unless asked for a detailed guide.
        5. Tone: Professional, empathetic, and clear.`,
      }
    });

    return response.text || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};

export const generateHealthTip = async (): Promise<string> => {
  if (!apiKey) return "Drink plenty of water today!";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a short, catchy, 1-sentence health tip about chronic disease prevention.",
    });
    return response.text || "Stay active and eat your veggies!";
  } catch (e) {
    return "Take a walk today for better heart health!";
  }
};