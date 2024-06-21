"use client"

import activeAssistantIcon from '@/images/active.gif'
import inactiveAssistantIcon from '@/images/notactive.png'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';

export const mimeType = 'audio/webm'

function Recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) {

    const { pending } = useFormStatus()
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const [permission, setPermission] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [recordingStatus, setRecordingStatus] = useState("inactive")
    const [audioChunks, setAudioChunks] = useState<Blob[]>([])

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
        if (stream === null || pending) return

        setRecordingStatus("recording")

        const media = new MediaRecorder(stream, { mimeType })
        mediaRecorder.current = media
        mediaRecorder.current.start()

        let localAudioChunks: Blob[] = []

        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') return
            if (event.data.size === 0) return

            localAudioChunks.push(event.data)
        }

        setAudioChunks(localAudioChunks)

    }

    const stopRecording = async () => {
        if (mediaRecorder.current === null || pending) return

        setRecordingStatus("inactive")
        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType })
            const audioUrl = URL.createObjectURL(audioBlob)

            console.log("Audio take url:", audioUrl)
            uploadAudio(audioBlob)
            setAudioChunks([])
        }
    }

    return (
        <div className="flex items-center justify-center text-white">
            {
                !permission && (
                    <button onClick={getMicrophonePermission}>Get Microphone</button>
                )
            }

            {
                pending && (
                    <Image
                        src={activeAssistantIcon}
                        alt="Assistant Icon"
                        width={200}
                        height={200}
                        priority
                        className='assistant grayscale'
                    />
                )
            }

            {
                permission && recordingStatus === "inactive" && !pending && (
                    <Image
                        src={inactiveAssistantIcon}
                        alt="Not Recording"
                        width={200}
                        height={200}
                        onClick={startRecording}
                        priority
                        className='assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out'
                    />
                )
            }

            {
                recordingStatus === "recording" && (
                    <Image
                        src={activeAssistantIcon}
                        alt="Recording"
                        width={200}
                        height={200}
                        onClick={stopRecording}
                        priority
                        className='assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out'
                    />
                )
            }
        </div>
    );
}

export default Recorder;
