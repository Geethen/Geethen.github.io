import { GoogleGenAI, Content, Part } from "@google/genai";
import { PROFILE, PAPERS, BLOG_POSTS } from "../constants";

// Initialize the Gemini API client
// The API key must be obtained exclusively from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

// Construct the system instruction based on the static data
const constructSystemPrompt = (): string => {
  const papersStr = PAPERS.map(p => 
    `- Title: ${p.title} (${p.year || 'N/A'})\n  Venue: ${p.venue || 'N/A'}\n  Abstract: ${p.abstract || 'N/A'}`
  ).join("\n\n");

  const blogsStr = BLOG_POSTS.map(b =>
    `- Title: ${b.title} (${b.date})\n  Excerpt: ${b.excerpt}`
  ).join("\n\n");

  return `
    You are an AI assistant for ${PROFILE.name}'s personal research portfolio website.
    ${PROFILE.name} is a researcher focusing on Machine Learning, Remote Sensing, and Ecology.
    Your goal is to answer visitor questions about ${PROFILE.name}, their research in biodiversity and conservation, publications, and blog posts.
    
    Here is the researcher's profile:
    Bio: ${PROFILE.bio}
    Current Institution: ${PROFILE.institution}
    
    Here is a list of their publications:
    ${papersStr}
    
    Here is a list of their recent blog posts:
    ${blogsStr}
    
    Instructions:
    1. Be polite, professional, yet approachable.
    2. If a user asks about specific research, summarize the relevant paper.
    3. If the answer isn't in the provided context, state that you don't have that information but suggest contacting ${PROFILE.name} directly via email (${PROFILE.email}).
    4. Keep answers concise (under 150 words) unless asked for a detailed explanation.
  `;
};

export const generateChatResponse = async (history: { role: 'user' | 'model', text: string }[], newMessage: string): Promise<string> => {
  try {
    const formattedHistory: Content[] = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text } as Part],
    }));

    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: constructSystemPrompt(),
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble connecting to the AI service right now. Please check your internet connection or API key.";
  }
};