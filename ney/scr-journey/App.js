import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import React, { useEffect, useState } from 'react';
import { LogBox, Platform } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import theme from './app/navigations/navigationTheme';
import Router from './app/navigations/Router';
import configureStore from './app/store/configureStore';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD } from './app/styles';
import { setCampaignIV, setCampaignKey, versions } from './app/utilities';
import { Config } from './env';
import { CaptureProtectionProvider } from 'react-native-capture-protection';
import { useSecurityChecking } from 'hooks';
import RootDetectionModal from 'components/RootDetectionModal';
import { screenUtils } from 'utilities/screenUtils';
import useAppState from 'hooks/useAppState';

const store = configureStore();
const persist = persistStore(store);

LogBox.ignoreAllLogs();
versions();
setCampaignKey(Config.CAMPAIGN_KEY).then();
setCampaignIV(Config.CAMPAIGN_IV).then();

export default function App() {
  // useSecurityChecking();
  const isAppState = useAppState();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setInitialRender(false);

    // add masking layer when screenshot
    screenUtils.disableScreenShot();
    return () => {
      screenUtils.enableScreenShot();
    };
  }, []);

  useEffect(() => {
    if (!isAppState || initialRender) {
      return;
    }
    if (Platform.OS === 'android') {
      screenUtils.disableScreenShot();
    }
  }, [isAppState, initialRender]);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          <CaptureProtectionProvider>
            <PaperProvider theme={theme}>
              <ActionSheetProvider>
                <Router />
              </ActionSheetProvider>
              <FlashMessage
                style={{ paddingVertical: 10, paddingLeft: 16, paddingRight: 10 }}
                titleStyle={{ fontFamily: FONT_FAMILY_SEMIBOLD, paddingRight: 15 }}
                textStyle={{ fontFamily: FONT_FAMILY_REGULAR, fontSize: 15, paddingRight: 15 }}
                duration={8000}
                position='top'
              />
            </PaperProvider>
          </CaptureProtectionProvider>
        </PersistGate>
      </Provider>
      {/* <RootDetectionModal /> */}
    </>
  );
}
