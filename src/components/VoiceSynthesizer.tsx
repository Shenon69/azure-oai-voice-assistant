"use client"

import { useState } from "react";

type State = {
  sender: string;
  response: string | null | undefined;
}

function VoiceSynthesizer({
  state,
  displaySettings,
}: {
  state: State,
  displaySettings: boolean
}) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find(voice => voice.name === e.target.value)

    if (!voice) return

    setVoice(voice)
  }

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {displaySettings && (
        <>
          <div>
            <p className="text-xs text-gray-500 p-2">Voice:</p>
            <select
              value={voice?.name}
              onChange={handleVoiceChange}
              className="flex-1 bg-purple-500 text-white border border-gray-200 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
            >
              {window.speechSynthesis.getVoices().map((voice, index) => (
                <option key={index} value={voice.name}>{voice.name}</option>
              )
              )}
            </select>
          </div>
        </>
      )}
    </div>
  )
}

export default VoiceSynthesizer;
