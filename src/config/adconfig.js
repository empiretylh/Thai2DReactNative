import { TestIds } from "react-native-google-mobile-ads"

export const ADUNIT  = {
    appopenunit : __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
    bannerunit :__DEV__ ? TestIds.ADAPTIVE_BANNER :  'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
    interstitial : __DEV__ ? TestIds.INTERSTITIAL : TestIds?.INTERSTITIAL
}

export const ADKEYWORD = ['fashion', 'electronic', 'mobile']

