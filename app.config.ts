import { ConfigContext, ExpoConfig } from 'expo/config'

import { withAndroidEventSourceFixes } from './plugins'

const baseConfig: ExpoConfig = {
  name: 'expo-sse-patch',
  slug: 'expo-sse-patch',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.martinhksf.expossepatch',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          // allow connecting to local http server while in release mode.
          usesCleartextTraffic: true,
        },
      },
    ],
  ],
}

export default function setupConfig({ config }: ConfigContext) {
  const expoConfig = {
    ...config,
    ...baseConfig,
  }

  if (process.env.SSE_NO_FIX === 'true') {
    return expoConfig
  }

  return withAndroidEventSourceFixes(expoConfig)
}
