jest.mock('react-native-mmkv', () => ({
  createMMKV: () => ({
    set: jest.fn(),
    getString: jest.fn(() => undefined),
    remove: jest.fn(),
  }),
}));

jest.mock('react-native-fast-image', () => 'FastImage');

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: View,
  };
});

jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: () => ({
    isConnected: true,
  }),
}));

jest.mock('@/app/providers', () => ({
  AppProviders: ({ children }) => children,
}));

jest.mock('@/app/navigation', () => {
  const { View } = require('react-native');
  return {
    AppNavigation: () => <View />,
  };
});

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    NavigationContainer: ({ children }) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
