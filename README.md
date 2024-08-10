# Voice Assistant

This is a voice assistant application built using [Azure OpenAI](https://azure.microsoft.com/en-us/services/cognitive-services/openai-service/) and [Next.js](https://nextjs.org/). The application leverages AI to process and respond to voice commands, offering a seamless user experience.

## Features

- **Voice Recognition:** Processes and understands natural language voice commands.
- **AI-Powered Responses:** Uses Azure OpenAI to generate intelligent responses.
- **Real-Time Interaction:** Provides instant feedback and interaction.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- An Azure account with access to OpenAI services

### Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:Shenon69/azure-oai-voice-assistant.git
    cd azure-oai-voice-assistant
    ```

2. Install the dependencies:

    ```bash
    yarn
    ```

3. Create a `.env.local` file in the root directory and add your Azure OpenAI credentials:

    ```bash
    AZURE_API_KEY=xxxxxx
    AZURE_ENDPOINT=https://xxxxxx/xxx
    AZURE_DEPLOYMENT_NAME=xxxxxx
    AZURE_DEPLOYMENT_COMPLETIONS_NAME=xxxxx
    ```

4. Start the development server:

    ```bash
    yarn dev
    ```

    The app should now be running on [http://localhost:3000](http://localhost:3000).
