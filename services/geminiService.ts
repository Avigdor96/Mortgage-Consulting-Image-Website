import { GoogleGenAI } from "@google/genai";

// FIX: Per coding guidelines, initialize GoogleGenAI directly with process.env.API_KEY.
// The API key is assumed to be available in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = 'gemini-2.5-flash';

export const askAiAdvisor = async (prompt: string): Promise<string> => {
  // FIX: Removed redundant API key check, as per guidelines assuming it's pre-configured.
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            systemInstruction: "אתה עוזר וירטואלי מועיל בנושא משכנתאות בישראל. ענה בעברית ברורה ותמציתית. אל תספק ייעוץ פיננסי אישי, אלא הסבר מושגים כלליים בלבד. התשובות שלך צריכות להיות קצרות, אינפורמטיביות וידידותיות."
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "אופס, נתקלתי בבעיה. אנא נסה שוב מאוחר יותר.";
  }
};
