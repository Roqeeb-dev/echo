export interface CapsuleMock {
  id: string;
  title: string;
  recordedAt: string;
  unlockDate: string;
  duration: string;
  isLocked: boolean;
  audioUrl?: string;
}

export const MOCK_CAPSULES: CapsuleMock[] = [
  {
    id: "1",
    title: "Letter to my Future Self",
    recordedAt: "Jan 12, 2026",
    unlockDate: "Dec 31, 2026",
    duration: "02:15",
    isLocked: true,
  },
  {
    id: "2",
    title: "New Year Goals & Predictions",
    recordedAt: "Jan 1, 2026",
    unlockDate: "Jan 1, 2027",
    duration: "04:45",
    isLocked: true,
  },
  {
    id: "3",
    title: "Birthday Reflections 2025",
    recordedAt: "Aug 14, 2025",
    unlockDate: "Aug 14, 2026",
    duration: "01:30",
    isLocked: false,
    audioUrl: "https://example.com/audio/3.mp3",
  },
  {
    id: "4",
    title: "Career Change Thoughts",
    recordedAt: "Nov 03, 2025",
    unlockDate: "Nov 03, 2026",
    duration: "03:10",
    isLocked: true,
  },
  {
    id: "5",
    title: "First Day in New House",
    recordedAt: "Feb 20, 2025",
    unlockDate: "Feb 20, 2026",
    duration: "00:55",
    isLocked: false,
    audioUrl: "https://example.com/audio/5.mp3",
  },
];
