
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mic, MicOff, Volume2, Play, Pause, RotateCcw } from 'lucide-react';

interface VoiceInterfaceProps {
  onVoiceCommand?: (command: string, language: string) => void;
  onVoiceRecording?: (audioBlob: Blob, transcript: string) => void;
  mode: 'command' | 'record' | 'playback';
  title?: string;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
  onVoiceCommand,
  onVoiceRecording,
  mode,
  title
}) => {
  const { currentLanguage, translate } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  const [duration, setDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        
        if (onVoiceRecording) {
          onVoiceRecording(audioBlob, transcript);
        }
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);
      
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

      // Simulate voice recognition (in production, integrate with speech recognition API)
      setTimeout(() => {
        const sampleTranscripts: { [key: string]: string[] } = {
          'sw': ['Ningependa kuongeza mtu mpya katika ukoo', 'Naomba msaada wa fedha za harusi'],
          'ha': ['Ina son ba da sabon mutum a cikin iyali', 'Ina bukatar tallafi na kudin aure'],
          'yo': ['Mo fẹ́ fi ẹni kan sí ìdílé', 'Mo nílò ìrànlọ́wọ́ owó ìgbéyàwó'],
          'en': ['I want to add a new person to the family', 'I need help with wedding funds']
        };
        
        const langTranscripts = sampleTranscripts[currentLanguage.code] || sampleTranscripts['en'];
        const randomTranscript = langTranscripts[Math.floor(Math.random() * langTranscripts.length)];
        setTranscript(randomTranscript);
      }, 2000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const playRecording = () => {
    if (recordedAudio && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    setRecordedAudio(null);
    setTranscript('');
    setDuration(0);
    setIsPlaying(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getVoicePrompts = () => {
    const prompts: { [key: string]: { record: string; command: string; playback: string } } = {
      'sw': {
        record: 'Bonyeza kuanza kurekodi sauti yako',
        command: 'Sema amri yako kwa Kiswahili',
        playback: 'Sikiliza rekodi yako'
      },
      'ha': {
        record: 'Danna don fara yin rikodin muryar ka',
        command: 'Faɗa umarnin ka da Hausa',
        playback: 'Saurari rikodin ka'
      },
      'yo': {
        record: 'Tẹ láti bẹ̀rẹ̀ gbígba ohùn rẹ',
        command: 'Sọ àṣẹ rẹ ní Yorùbá',
        playback: 'Gbọ́ àgbékalẹ̀ rẹ'
      },
      'en': {
        record: 'Press to start recording your voice',
        command: 'Speak your command in English',
        playback: 'Listen to your recording'
      }
    };
    
    return prompts[currentLanguage.code] || prompts['en'];
  };

  const voicePrompts = getVoicePrompts();

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-emerald/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mic className="w-5 h-5 text-primary" />
          <span>{title || translate('voice_interface')}</span>
          <Badge className="bg-primary">{currentLanguage.nativeName}</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {voicePrompts[mode]}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recording Controls */}
        <div className="flex items-center justify-center space-x-4">
          {!isRecording && !recordedAudio && (
            <Button
              size="lg"
              className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600"
              onClick={startRecording}
            >
              <Mic className="w-8 h-8 text-white" />
            </Button>
          )}
          
          {isRecording && (
            <Button
              size="lg"
              className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 animate-pulse"
              onClick={stopRecording}
            >
              <MicOff className="w-8 h-8 text-white" />
            </Button>
          )}
          
          {recordedAudio && (
            <div className="flex items-center space-x-2">
              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full"
                onClick={isPlaying ? pauseRecording : playRecording}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full"
                onClick={resetRecording}
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>
          )}
        </div>

        {/* Recording Status */}
        {(isRecording || recordedAudio) && (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Volume2 className="w-4 h-4 text-primary" />
              <span className="font-medium">{formatDuration(duration)}</span>
            </div>
            {isRecording && (
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-red-500 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="p-3 bg-white/60 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-sm">Transcript:</span>
              <Badge variant="outline">{currentLanguage.nativeName}</Badge>
            </div>
            <p className="text-sm">{transcript}</p>
          </div>
        )}

        {/* Hidden audio element for playback */}
        {recordedAudio && (
          <audio
            ref={audioRef}
            src={recordedAudio}
            onEnded={() => setIsPlaying(false)}
            style={{ display: 'none' }}
          />
        )}

        {/* Action Buttons */}
        {transcript && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onVoiceCommand?.(transcript, currentLanguage.code)}
              className="flex-1"
            >
              Process Command
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setTranscript('')}
              className="flex-1"
            >
              Clear
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
