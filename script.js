// Dependencies
require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");
const inquirer = require('inquirer');

// Variables
const model = new OpenAI({ 
    openAIApiKey: process.env.OPENAI_API_KEY, 
    temperature: 0,
    model: 'gpt-3.5-turbo'
  });
  

console.log({ model });

const promptFunc = async (input) => {
    try {
        const res = await model.call(input);
        console.log(await parser.parse(res));
        const prompt = new PromptTemplate({
            template: "You are a javascript expert and will answer the user’s coding questions thoroughly as possible.\n{format_instructions}\n{question}",
            inputVariables: ["question"],
            partialVariables: { format_instructions: formatInstructions }
          });
          const promptInput = await prompt.format({
            question: input
          });
          
    }
    catch (err) {
      console.error(err);
    }

};

const parser = StructuredOutputParser.fromNamesAndDescriptions({
    code: "Javascript code that answers the user's question",
    explanation: "detailed explanation of the example code provided",
});

const formatInstructions = parser.getFormatInstructions();

const init = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Ask a coding question:',
      },
    ]).then((inquirerResponse) => {
      promptFunc(inquirerResponse.name)
    });
  };
  
init();

  