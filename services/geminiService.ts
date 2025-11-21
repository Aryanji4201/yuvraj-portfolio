import { GoogleGenAI, Type } from '@google/genai';
import type { MCQ } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateMcqTest = async (studentClass: number, subjects: string[], language: string): Promise<MCQ[]> => {
  const prompt = `Generate 10 multiple-choice questions in the ${language} language for a class ${studentClass} student. The questions should cover fundamental concepts from the following subjects: ${subjects.join(', ')}. The difficulty should be appropriate for a student of that class. Each question must have exactly 4 options. Ensure the 'correctAnswer' is one of the strings from the 'options' array. Provide the output as a JSON array. All text (question, options, correctAnswer) must be in ${language}.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "The question text." },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "An array of 4 possible answers."
              },
              correctAnswer: { type: Type.STRING, description: "The correct answer, must match one of the options." },
            },
            required: ['question', 'options', 'correctAnswer'],
          },
        },
      },
    });

    const jsonString = response.text;
    const questions: MCQ[] = JSON.parse(jsonString);
    
    if (Array.isArray(questions) && questions.every(q => q.question && Array.isArray(q.options) && q.options.length === 4 && q.correctAnswer)) {
        return questions;
    } else {
        console.error("Generated JSON does not match expected MCQ structure", questions);
        throw new Error('Received invalid data structure from AI.');
    }
  } catch (error) {
    console.error('Error generating MCQ test:', error);
    throw new Error('Failed to generate the assessment test. Please check your API key and try again.');
  }
};

export const generateChapterNotes = async (studentClass: number, subject: string, chapter: string, language: string): Promise<string> => {
    const prompt = `Generate simple and easy-to-understand study notes in the ${language} language for a class ${studentClass} student on the chapter "${chapter}" from the subject "${subject}". The notes should cover the key concepts in a concise manner, using simple language. Use markdown for formatting, like headings, subheadings, bullet points, and bold text for important terms. All text must be in ${language}.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error('Error generating chapter notes:', error);
        throw new Error('Failed to generate study notes. Please try again.');
    }
};