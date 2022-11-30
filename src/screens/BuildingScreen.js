import {useContext} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import { Text } from 'react-native-paper';

const BuildingScreen = () => {
  const {aahkTray} = useContext(GlobalContext);

  return (
    <>
      <Text>{aahkTray}</Text>
    </>
  );
};

export default BuildingScreen;
