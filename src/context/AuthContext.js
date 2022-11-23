import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

export const AuthContext = React.createContext({})

export const AuthContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [splashLoading, setSplashLoading] = useState(false);

    const login = (email, password) => {
        setIsLoading(true);

        //console.log("userInfo: ", userInfo);

        axios.post(`${BASE_URL}Authenticate/login`, {
            Username: email,
            Password: password
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo)
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setIsLoading(false);
        }).catch(e => {
            console.log(`login error ${e}`)
            setIsLoading(false);
        })
    }

    const logout = (email = "", password = "", token = "") => {
        setIsLoading(true);

        // console.log("userInfo: ", userInfo);

        // axios.post(`${BASE_URL}Authenticate/logout`, {
        //     Username: email,
        //     Password: password
        //   }).then(res => {
        //     let userInfo = res.data;
        //     console.log(userInfo)
        //     setUserInfo(userInfo);
        //     AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        //     setIsLoading(false);
        // }).catch(e => {
        //     console.log(`login error ${e}`)
        //     setIsLoading(false);
        // })

        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        //console.log("successfully logout")
        setIsLoading(false);
    }

    const register = (email, password) => {
        setIsLoading(true);
        
         // console.log("userInfo: ", userInfo);

        // axios.post(`${BASE_URL}Authenticate/register`, {
        //     Username: email,
        //     Password: password
        //   }).then(res => {
        //     let userInfo = res.data;
        //     console.log(userInfo);
        //     setUserInfo(userInfo);
        //     AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        //     setIsLoading(false);
        // }).catch(e => {
        //     console.log(`register error ${e}`)
        //     setIsLoading(false);
        // })
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }

            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`)
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{ isLoading, userInfo, login, register, logout, splashLoading, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}