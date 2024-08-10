'use server'

import { AzureKeyCredential, OpenAIClient } from "@azure/openai"

async function transcript(prevState: any, formData: FormData) {
  console.log("PREVIOUS STATE: ", prevState)

  const id = Math.random().toString(36).substring(7)

  if (
    process.env.AZURE_API_KEY === undefined ||
    process.env.AZURE_ENDPOINT === undefined ||
    process.env.AZURE_DEPLOYMENT_NAME === undefined ||
    process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME === undefined
  ) {
    console.error("Azure API Key, Endpoint, Deployment Name, or Deployment Completions Name is not defined.")
    return {
      sender: "",
      response: "Azure API Key, Endpoint, Deployment Name, or Deployment Completions Name is not defined."
    }
  }

  const file = formData.get("audio") as File

  if (file.size === 0) {
    return {
      sender: "",
      response: "No audio file uploaded."
    }
  }

  console.log("FILE: ", file);

  const arrayBuffer = await file.arrayBuffer()
  const audio = new Uint8Array(arrayBuffer);

  // -- get audio transcription from azure openai whistler model --

  console.log("== Transcribe audio sample ==");

  const client = new OpenAIClient(
    process.env.AZURE_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_API_KEY)
  );

  const result = await client.getAudioTranscription(
    process.env.AZURE_DEPLOYMENT_NAME,
    audio
  )

  console.log("TRANSCRIPT: ", result.text)

  // -- get completion from azure openai gpt-3 model --

  const messages = [
    {
      role: "system",
      content: "you are a helpful assistant",
    },
    {
      role: "user",
      content: result.text,
    }
  ]

  const completions = await client.getChatCompletions(
    process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME,
    messages,
    { maxTokens: 128 }
  )

  const response = completions.choices[0].message?.content;

  console.log(prevState.sender, "+++", result.text)

  return {
    sender: result.text,
    response: response,
    id,
  }


}

export default transcript
