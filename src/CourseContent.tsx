import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';

const CustomCard = ({ children, className = '' }) => (
  <div className={`bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CustomButton = ({ children, onClick, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 
      ${disabled 
        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
        : 'bg-indigo-600 text-white hover:bg-indigo-500 active:transform active:scale-95'
      } ${className}`}
  >
    {children}
  </button>
);

const CustomSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 w-[200px]
      focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent" />
);

const CourseContent = ({ module, onNext, isCorrect }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState('en-US-AvaNeural');
  const [voices, setVoices] = useState([]);
  const [volume, setVolume] = useState(1);

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
    setIsLoading(true);
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

      if (!response.ok) throw new Error('Failed to generate speech');

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
      setIsLoading(false);
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

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!module) {
    return (
      <CustomCard>
        <p className="text-gray-400">No module content available. Please start the course or select a module.</p>
      </CustomCard>
    );
  }

  return (
    <CustomCard>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">{module.title}</h2>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <LoadingSpinner />
            <p className="text-indigo-400">Preparing your lesson...</p>
          </div>
        ) : (
          <>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed">{module.content}</p>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <CustomButton onClick={togglePlayPause} className="w-12 h-12 p-0 flex items-center justify-center">
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </CustomButton>
                  
                  <div className="flex items-center space-x-2">
                    <Volume2 size={20} className="text-gray-400" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <CustomSelect
                  value={selectedVoice}
                  onChange={setSelectedVoice}
                  options={voices.map(voice => ({
                    value: voice.ShortName,
                    label: voice.DisplayName
                  }))}
                />
              </div>

              <audio
                ref={audioRef}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            </div>

            <div className="flex justify-end">
              <CustomButton
                onClick={onNext}
                disabled={!isCorrect}
                className="min-w-[120px]"
              >
                Next Module
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </CustomCard>
  );
};

export default CourseContent;
