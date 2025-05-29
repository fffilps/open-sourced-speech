declare module '@usefulsensors/moonshine-js' {
    export class MicrophoneTranscriber {
      constructor(
        model: string,
        options: {
          onTranscriptionUpdated: (text: string) => void;
        },
        enableVoiceActivityDetection?: boolean
      );
      start(): void;
      stop(): void;
    }
  }
  