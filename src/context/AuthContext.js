import axios from 'axios';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, FINGERPRINT_BYPASS} from '../config';
import {realmCreate} from '../database/service/crud';
import {userInfoTable} from '../database/schema/User';
import uuid from 'react-native-uuid';
import {
  getLastLoginUserInfo,
  getLocalTimeStamp,
  validateLogin,
} from '../helper';

export const AuthContext = React.createContext({});

export const AuthContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [splashLoading, setSplashLoading] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [loginMsg, setLoginMsg] = useState('');

  const login = async (email, password) => {
    setIsLoading(true);
    let resp;
    let isLoggedIn = false;
    if (!validateLogin(email, password)) {
      loginReturnMsg(`Email or Password not valid!`, true, false);
      return;
    }
    if (email !== FINGERPRINT_BYPASS && password !== 'SOCAM_BIO') {
      await axios
        .post(`${BASE_URL}Authenticate/login`, {
          Username: email,
          Password: password,
        })
        .then(res => {
          resp = res.data;
          setUserInfo(resp);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          isLoggedIn = !isLoggedIn;
          setIsLoading(false);
        })
        .catch(e => {
          console.log(`login error ${e}`);
          loginReturnMsg(
            `authentication failure ${e.response.status}`,
            true,
            false,
          );
        });
    } else {
      let userInfoReturn = await getLastLoginUserInfo();
      if (userInfoReturn.length > 0) {
        setUserInfo(userInfoReturn[0]);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfoReturn[0]));
        isLoggedIn = !isLoggedIn;
        resp = userInfoReturn[0];
        email = userInfoReturn[0].loginId;
        setIsLoading(false);
      } else {
        loginReturnMsg(
          `Please login once to activate the Biometrics login!`,
          true,
          false,
        );
      }
    }

    if (isLoggedIn) {
      await insertLoggedLog(resp, email);
    }
  };

  const loginReturnMsg = (msg, isAlert, isLoading) => {
    setLoginMsg(msg);
    setLoginVisible(isAlert);
    setIsLoading(isLoading);
  };

  const insertLoggedLog = async (resp, email) => {
    let obj = [
      {
        _id: uuid.v4(),
        loginId: email,
        fullname: resp.fullname,
        email: resp.usermail ? resp.usermail : resp.email,
        team: resp.team,
        role: resp.team,
        token: resp.token,
        userid: resp.userid,
        isenable: 'Y',
        expiration: resp.expiration,
        createdAt: getLocalTimeStamp(),
      },
    ];
    await realmCreate(userInfoTable, 'userInfo', obj);
  };

  const logout = (email = '', password = '', token = '') => {
    setIsLoading(true);
    AsyncStorage.removeItem('userInfo');
    setUserInfo({});
    //console.log("successfully logout")
    setIsLoading(false);
  };

  const register = (email, password) => {
    setIsLoading(true);
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginMsg,
        setLoginVisible,
        loginVisible,
        isLoading,
        userInfo,
        login,
        register,
        logout,
        splashLoading,
        isLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
