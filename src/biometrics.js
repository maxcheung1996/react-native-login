import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const promptBiometrics = () => {
  return rnBiometrics
    .simplePrompt({promptMessage: 'Confirm fingerprint'})
    .then(resultObject => {
      const {success} = resultObject;

      if (success) {
        console.log('successful biometrics provided');
        return true;       
      } else {
        console.log('user cancelled biometric prompt');
        return false; 
      }
      
    })
    .catch(() => {
      console.log('biometrics failed');
      return false; 
    });
};

export default biometricsLogin = () => {
    return rnBiometrics.isSensorAvailable().then(resultObject => {
    const {available, biometryType} = resultObject;

    if (available && biometryType === BiometryTypes.TouchID) {
      console.log('TouchID is supported');
      return promptBiometrics();
    } else if (available && biometryType === BiometryTypes.FaceID) {
      console.log('FaceID is supported');
      return promptBiometrics();
    } else if (available && biometryType === BiometryTypes.Biometrics) {
      console.log('Biometrics is supported');
      return promptBiometrics();
    } else {
      console.log('Biometrics not supported');
      return promptBiometrics();
    }
  });
};
