# Posts App (React Native Test Task)

Mobile app for browsing posts with favorites. Built with React Native, TypeScript, FSD architecture, Redux Toolkit, RTK Query, and redux-persist (MMKV).

## Features

- Posts list from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts)
- Favorite toggle with favorites pinned to the top
- Data and favorites persist between sessions via MMKV
- Offline banner and cached data fallback
- Error boundary for runtime crashes
- Post images enriched with [PlaceBeard](https://placebeard.it/) (32×32 list, 300×300 details)
  Note: `fakerjs` image generation is unavailable in the region due to sanctions, so PlaceBeard is used as a replacement.

## Requirements

- Node.js >= 22.11.0
- Xcode (iOS) / Android Studio (Android)
- Ruby + Bundler (iOS CocoaPods)

## Setup & Run

```sh
yarn install && cd ios && pod install && cd ..
```

Note: If you encounter an error related to MMKV (e.g., Unable to find a specification for react-native-mmkv), run pod install with the repo update flag:

```sh
cd ios && pod install --repo-update && cd ..
```

```sh
yarn run ios
# or
yarn run android
```

## Quality checks

```sh
yarn run validate
```

Runs ESLint, TypeScript check, and Jest with coverage.

## Project Structure (FSD)

```
src/
├── app/              # store, persist, navigation, providers, error-boundary
├── pages/            # PostsScreen, DetailsScreen
├── features/         # favorites, toggle-favorite
├── entities/         # post (API, enrich, selectors)
├── widgets/          # PostCard, OfflineBanner
└── shared/           # theme, config, redux hooks, UI kit
```

## Configuration

API and image URLs are defined in `src/shared/config/env.ts`.

## AI Development

This project was built with Cursor AI using rules from `.cursorrules`.

### Agent chat history

The full conversation with the AI agent is exported to [`AGENT_CHAT_HISTORY.md`](./AGENT_CHAT_HISTORY.md) in the project root. It includes:

- all user prompts and assistant responses in chronological order
- implementation plans, architecture decisions, and troubleshooting notes
- a table of contents for quick navigation

This file is provided as part of the test task requirements (AI-only approach: prompts, rules, and chat export).
