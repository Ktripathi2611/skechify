import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDtSkLK9kqF8aMDaPQHsGzSl2pEOeAx_2Y';
const genAI = new GoogleGenerativeAI(API_KEY);

export const testGeminiAPI = async (): Promise<boolean> => {
  try {
    console.log('Testing Gemini API connection...');
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent('Ready to assist in the classroom!');
    const response = await result.response;
    console.log('API Test Response:', response.text());
    return true;
  } catch (error) {
    console.error('API Test Error:', error);
    return false;
  }
};

export const analyzeDrawing = async (imageData: string): Promise<string> => {
  try {
    if (!imageData) {
      throw new Error('No image data provided');
    }

    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageData.split(',')[1];
    if (!base64Data) {
      throw new Error('Invalid image data format');
    }

    console.log('Preparing image data for analysis...');
    
    // Create a model instance with the new model name
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    console.log('Sending request to Gemini API...');
    
    // Analyze the image with a structured prompt
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: 'image/png'
        }
      },
      `Analyze this drawing for a classroom smartboard. Provide a clear, educational response following this format:

      For Mathematical Expressions:
      📝 Expression: [Write the mathematical expression]
      ✍️ Solution: [Show the solution clearly]
      📚 Key Concept: [Explain the main mathematical concept in 1-2 sentences]

      For Drawings/Diagrams:
      🎯 Main Topic: [Identify the subject/concept]
      📋 Key Points:
      • [Point 1]
      • [Point 2]
      • [Point 3]

      Keep the response concise, educational, and suitable for classroom display. Use clear language that students can understand.`
    ]);

    console.log('Received response from Gemini API');
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in analyzeDrawing:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to analyze drawing: ${error.message}`);
    }
    throw new Error('Failed to analyze drawing. Please try again.');
  }
};
