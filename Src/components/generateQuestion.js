import { OPENAI_API_KEY } from "@env";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs/promises";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const shape = {
  question: "",
  categories: ["old_testament", "judges"],
  reference: "Judges 15:15",
  options: [["Jawbone of an ass"], "Sword", "Club", "Bow and Arrow"],
};

const openai = new OpenAIApi(configuration);

async function generateBibleQuestions(count) {
  try {
    const questions = [];

    for (let i = 0; i < count; i++) {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `generate 1 trivia question related to Bible stories in the format: ${JSON.stringify(
              shape
            )}`,
          },
        ],
      });

      const question = JSON.parse(completion.data.choices[0].message.content);
      questions.push(question);
    }

    return questions;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function main() {
  const numberOfQuestionsToGenerate = 10;

  try {
    const questions = await generateBibleQuestions(numberOfQuestionsToGenerate);
    await fs.writeFile("./data/questions.json", JSON.stringify(questions));
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
