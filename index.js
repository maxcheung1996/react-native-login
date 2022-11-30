/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import {AuthContextProvider} from './src/context/AuthContext';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import {GlobalContextProvider} from './src/context/GlobalContext';

export default function Main() {
  return (
    <AuthContextProvider>
      <GlobalContextProvider>
        <PaperProvider>
          <App />
        </PaperProvider>
      </GlobalContextProvider>
    </AuthContextProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
