import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader } from "@/components/ui/loader"; // Assuming you have a loader component

// Replace with your actual Azure subscription key and region
const AZURE_KEY = 'ca8468df636d4bfe92242083112d4880';
const AZURE_REGION = 'eastus';

const CourseContent = ({ module, onNext, isCorrect }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially loading
  const [selectedVoice, setSelectedVoice] = useState('en-US-AvaNeural'); // Set Ava as the default
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    fetchVoices();
  }, []);

  useEffect(() => {
    if (module) {
      generateSpeech();
    }
  }, [module, selectedVoice]);

  const fetchVoices = async () => {
    try {
      const response = await fetch(`https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list`, {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_KEY
        }
      });
      const voicesList = await response.json();
      setVoices(voicesList.filter(voice => voice.Locale.startsWith('en')));
    } catch (error) {
      console.error('Error fetching voices:', error);
    }
  };

  const generateSpeech = async () => {
    setIsLoading(true); // Start loading when generating speech
    try {
      const response = await fetch(`https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_KEY,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
        },
        body: `
          <speak version='1.0' xml:lang='en-US'>
            <voice name='${selectedVoice}'>
              ${module.content}
            </voice>
          </speak>
        `
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setIsLoading(false); // Stop loading once speech is generated
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVoiceChange = (value) => {
    setSelectedVoice(value);
  };

  if (!module) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent>
          <p>No module content available. Please start the course or select a module.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{module.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Show loading message and hide the rest until the voice is processed */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader /> {/* Cool animation component */}
            <p>Your personalized course is cooking...</p>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-wrap mb-4">{module.content}</p>
            <div className="flex items-center space-x-4 mb-4">
              <Select onValueChange={handleVoiceChange} value={selectedVoice}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.ShortName} value={voice.ShortName}>
                      {voice.DisplayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={togglePlayPause} disabled={isLoading}>
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
            </div>

            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
            <Button onClick={onNext} disabled={!isCorrect}>
              Next Module
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseContent;
