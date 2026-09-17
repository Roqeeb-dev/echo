# Echo — Voice Capsules for Your Future Self

Record a voice note, set a date, and it stays sealed until that date arrives.

## Why I built this

[1-2 sentences — the personal/emotional hook, not just "practice project"]

## Features

- Record and seal voice notes with a custom unlock date
- Local notifications when a capsule unlocks
- Locked/unlocked states with playback
- Dark mode support

## Tech Stack

- React Native (Expo)
- expo-router (file-based navigation)
- expo-av / expo-audio (recording & playback)
- expo-notifications (scheduled local notifications)
- SQLite / AsyncStorage (local persistence)
- TypeScript

## What I learned / technical challenges

- Handling scheduled local notifications tied to arbitrary future dates
- Managing locked vs unlocked UI state
- [whatever else was genuinely hard]

## Screenshots / Demo

[screen recording GIF or a few screenshots — this section alone does more work than paragraphs of text]

## Getting Started

npx create-expo-app clone instructions, npm install, npx expo start
