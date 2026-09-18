import { useState, useEffect } from "react";
import {
  useAudioRecorder as useExpoAudioRecorder,
  useAudioRecorderState,
  AudioModule,
  RecordingPresets,
} from "expo-audio";

export function useAudioRecorder() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Initialize the expo-audio recorder instance
  const audioRecorder = useExpoAudioRecorder(
    RecordingPresets.HIGH_QUALITY,
    (status) => {
      // Optional status listener
    },
  );

  // Subscribe to recorder state changes (100ms interval for smooth UI updates)
  const recorderState = useAudioRecorderState(audioRecorder, 100);

  // 1. Request Microphone Permissions on Mount
  useEffect(() => {
    async function requestPermissions() {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        setPermissionGranted(status.granted);
      } catch (error) {
        console.error("Failed to request audio permissions:", error);
      }
    }

    requestPermissions();
  }, []);

  // 2. Start Recording with Audio Mode Setup
  const startRecording = async () => {
    try {
      if (!permissionGranted) {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        if (!status.granted) return;
        setPermissionGranted(true);
      }

      // Explicitly set audio mode to allow recording hardware allocation
      await AudioModule.setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      // Start recording session
      await audioRecorder.record();
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  // 3. Pause / Resume Recording
  const pauseRecording = async () => {
    try {
      if (recorderState.isRecording) {
        await audioRecorder.pause();
      } else {
        await audioRecorder.record();
      }
    } catch (error) {
      console.error("Failed to pause/resume recording:", error);
    }
  };

  // 4. Stop Recording and Reset Audio Mode
  const stopRecording = async () => {
    try {
      await audioRecorder.stop();

      // Reset audio mode after stopping
      await AudioModule.setAudioModeAsync({
        allowsRecording: false,
      });

      return audioRecorder.uri;
    } catch (error) {
      console.error("Failed to stop recording:", error);
      return null;
    }
  };

  return {
    isRecording: recorderState.isRecording,
    durationMillis: recorderState.durationMillis,
    metering: recorderState.metering ?? -160,
    permissionGranted,
    audioUri: audioRecorder.uri,
    startRecording,
    pauseRecording,
    stopRecording,
  };
}
