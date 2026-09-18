import * as FileSystem from "expo-file-system/legacy";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Capsule {
  id: string;
  title: string;
  recordedAt: string;
  unlockDate: string;
  duration: string;
  isLocked: boolean;
  audioUri: string;
}

const CAPSULES_KEY = "ECHO_CAPSULES";
const AUDIO_DIR = `${FileSystem.documentDirectory}capsules/`;

// Ensure persistent audio directory exists
async function ensureDirectoryExists() {
  const dirInfo = await FileSystem.getInfoAsync(AUDIO_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(AUDIO_DIR, { intermediates: true });
  }
}

// Moves temporary audio file to permanent directory
export async function saveAudioFile(
  tempUri: string,
  id: string,
): Promise<string> {
  await ensureDirectoryExists();
  const permanentUri = `${AUDIO_DIR}${id}.m4a`;
  await FileSystem.moveAsync({
    from: tempUri,
    to: permanentUri,
  });
  return permanentUri;
}

// Retrieves stored capsules from AsyncStorage
export async function getStoredCapsules(): Promise<Capsule[]> {
  try {
    const json = await AsyncStorage.getItem(CAPSULES_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

// Saves a new capsule metadata entry
export async function saveCapsule(capsule: Capsule): Promise<void> {
  const existing = await getStoredCapsules();
  const updated = [capsule, ...existing];
  await AsyncStorage.setItem(CAPSULES_KEY, JSON.stringify(updated));
}
