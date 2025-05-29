import React from 'react'

import * as Moonshine from '@usefulsensors/moonshine-js'

const App = () => {
  const [transcription, setTranscription] = React.useState('')
  const [alert, setAlert] = React.useState({ show: false, text: '' })

  // Function to show alert bubble
  const showAlert = (text: string) => {
    setAlert({ show: true, text });
    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, text: '' });
    }, 3000);
  }

  // Command handlers map voice commands to the actions they should trigger
  const commandHandlers = {
    "turn on": () => {
      showAlert("Lights turned on");
    },
    "turn off": () => {
      showAlert("Lights turned off");
    },
    "hello": () => {
      showAlert("Hello there!");
    },
    "what time is it": () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      showAlert(`It's ${timeString}`);
    }
  }

  // const keywordSpotter = Moonshine.KeywordSpotter(commandHandlers)

  // Create transcriber with handlers
  const transcriber = new Moonshine.MicrophoneTranscriber(
    "model/base",
    {
      onTranscriptionUpdated(text) {
        console.log(text);
        setTranscription(text);
        
        // Check for keyphrases
        // Object.keys(commandHandlers).forEach(phrase => {
        //   if (text.toLowerCase().includes(phrase.toLowerCase())) {
        //     commandHandlers[phrase as keyof typeof commandHandlers]();
        //   }
        // });

      }
    },
    true // VAD enabled
  )

  const startTranscriber = () => {
    transcriber.start();
    console.log("transcriber started")
  }

  const stopTranscriber = () => {
    transcriber.stop();
    console.log("transcriber stopped")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl">{transcription}</div>
      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={startTranscriber}>Start</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={stopTranscriber}>Stop</button>
      </div>
      
      {/* Alert bubble */}
      {alert.show && (
        <div className="fixed top-2 right-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {alert.text}
        </div>
      )}
    </div>
  )
}

export default App