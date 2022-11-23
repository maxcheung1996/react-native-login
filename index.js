/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import { name as appName } from './app.json';
import { AuthContextProvider } from './src/context/AuthContext';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

export default function Main() {
    return (
        <AuthContextProvider>
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </AuthContextProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
