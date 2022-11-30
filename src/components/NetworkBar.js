import {Appbar, Avatar, MD2Colors, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {GlobalContext} from '../context/GlobalContext';
import {useContext} from 'react';

const NetworkBar = () => {
  const {isConnected} = useContext(GlobalContext);

  return (
    <>
      {isConnected ? (
        <Appbar style={styles.connectedAppBar}>
          <Text style={{color:MD2Colors.white}}>Network is connected!</Text>
        </Appbar>
      ) : (
        <Appbar style={styles.disConnectedAppBar}>
          <Text>No network signal! Running app on offline mode</Text><Avatar.Icon backgroundColor="lightgrey" color='red' style={{marginLeft: 8}} size={23} icon="access-point-network-off" />
        </Appbar>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  connectedAppBar: {
    backgroundColor: '#00ff00',
    height: 23,
  },
  disConnectedAppBar: {
    backgroundColor: 'lightgrey',
    height: 23,
  },
});

export default NetworkBar;
