import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';

export const GlobalContext = React.createContext({});

export const GlobalContextProvider = ({children}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [aahkTray, setAAHKTray] = useState('');
  const [aahkBuilding, setAAHKBuilding] = useState('');
  const [aahkWorksOrder, setAAHKWorksOrder] = useState('');
  const [inspectorList, setInspectorList] = useState([]);
  const [inspector, setInspector] = useState([]);
  const [activityGuid, setActivityGuid] = useState('');
  const [floor, setGlobalFloor] = useState('');
  const [aahkDoor, setAAHKDoor] = useState('');
  const [eformResultGuid, setEformResultGuid] = useState('');
  const [aahkTrayName, setAAhkTrayName] = useState('');
  const [contractNo, setContractNo] = useState('T20M102');
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        darkMode, 
        setDarkMode,
        lang,
        setLang,
        contractNo,
        setContractNo,
        aahkTrayName,
        setAAhkTrayName,
        eformResultGuid,
        setEformResultGuid,
        aahkDoor,
        setAAHKDoor,
        activityGuid,
        setActivityGuid,
        floor,
        setGlobalFloor,
        inspector,
        setInspector,
        isConnected,
        aahkTray,
        setAAHKTray,
        aahkBuilding,
        setAAHKBuilding,
        aahkWorksOrder,
        setAAHKWorksOrder,
        inspectorList,
        setInspectorList,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
