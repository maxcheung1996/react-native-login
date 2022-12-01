import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';

export const GlobalContext = React.createContext({});

export const GlobalContextProvider = ({children}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [aahkTray, setAAHKTray] = useState("");
  const [aahkBuilding, setAAHKBuilding] = useState("");
  const [aahkWorksOrder, setAAHKWorksOrder] = useState("");

  useEffect(() => {
    NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });
  }, []);

  return (
    <GlobalContext.Provider value={{isConnected, aahkTray, setAAHKTray, aahkBuilding, setAAHKBuilding, aahkWorksOrder, setAAHKWorksOrder}}>
      {children}
    </GlobalContext.Provider>
  );
};
