import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: "AIzaSyA_6kZu4r3IhUCxjrZVInh1ehuW92ozbdI",
});

const interaction =  await client.interactions.create({
    model: 'gemini-3-flash-preview',
    input: 'Tell me a short joke about programming.',
});
console.log(
  interaction.outputs[interaction.outputs.length - 1].text
);
