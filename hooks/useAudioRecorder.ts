import { useState, useEffect } from "react";
import {
  useAudioRecorder as useExpoAudioRecorder,
  useAudioRecorderState,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  RecordingPresets,
} from "expo-audio";

export function useAudioRecorder() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const audioRecorder = useExpoAudioRecorder(
    RecordingPresets.HIGH_QUALITY,
    (status) => {
      // Optional status listener
    },
  );

  const recorderState = useAudioRecorderState(audioRecorder, 100);

  useEffect(() => {
    async function requestPermissions() {
      try {
        const status = await requestRecordingPermissionsAsync();
        setPermissionGranted(status.granted);
      } catch (error) {
        console.error("Failed to request audio permissions:", error);
      }
    }

    requestPermissions();
  }, []);

  const startRecording = async () => {
    try {
      if (!permissionGranted) {
        const status = await requestRecordingPermissionsAsync();
        if (!status.granted) return;
        setPermissionGranted(true);
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      await audioRecorder.record();
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

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

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();

      await setAudioModeAsync({
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
