# Posts App (React Native Test Task)

Mobile app for browsing posts with favorites. Built with React Native, TypeScript, FSD architecture, Redux Toolkit, RTK Query, and redux-persist (MMKV).

## Features

- Posts list from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts)
- Post images enriched with [PlaceBeard](https://placebeard.it/) (32×32 list, 300×300 details)
- Favorite toggle with favorites pinned to the top
- Data and favorites persist between sessions via MMKV

## Requirements

- Node.js >= 22.11.0
- Xcode (iOS) / Android Studio (Android)
- Ruby + Bundler (iOS CocoaPods)

## Setup & Run

```sh
npm install && cd ios && bundle exec pod install && cd ..
```

```sh
npm run ios
# or
npm run android
```

## Project Structure (FSD)

```
src/
├── app/           # store, MMKV persist, navigation, providers
├── pages/         # PostsScreen, DetailsScreen
├── features/      # toggle-favorite
├── entities/      # post (API, selectors, favorites slice)
├── widgets/       # PostCard
└── shared/        # Loader, ErrorView
```

## AI Development

This project was built with Cursor AI using rules from `.cursorrules`.
