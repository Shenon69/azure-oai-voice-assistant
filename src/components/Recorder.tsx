"use client"

import activeAssistantIcon from '@/images/active.gif'
import inactiveAssistantIcon from '@/images/notactive.png'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function Recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) {
    const [permission, setPermission] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null)

    const mediaRecorder = useRef<MediaStream | null>(null)

    useEffect(() => {
        getMicrophonePermission()
    }, [])

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                })
                setPermission(true)
                setStream(streamData)
            } catch (err: any) {
                alert(err.message)
            }
        } else {
            alert("The media recorder API is not supported in this browser")
        }

    }

    const startRecording = async () => {
        if (mediaRecorder === null || stream === null) return
    }

    return (
        <div className="flex items-center justify-center text-white">
            {
                !permission && (
                    <button onClick={getMicrophonePermission}>Get Microphone</button>
                )
            }

            <Image
                src={activeAssistantIcon}
                alt="Assistant Icon"
                width={200}
                height={200}
                priority
            />
        </div>
    );
}

export default Recorder;
