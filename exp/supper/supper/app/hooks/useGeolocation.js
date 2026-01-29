import React, { useEffect, useState } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from "@react-native-community/geolocation";
import useAppState from './useAppState';
import { useNavigation } from '@react-navigation/native';
import { routes } from 'navigations';
const useGeolocation = () => {
  const appState = useAppState();
  const config = Platform.OS === 'ios' ? { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 } : {};
  const [position, setPosition] = useState();
  const navigation=useNavigation();
  const alert=(error)=> Alert.alert(
    "Location Error",
    error,
    [
      {
        text: "Ok",
        onPress: () =>navigation.navigate(routes.HOME),
      },
    ]
  );
  useEffect(() => {
    if (appState) permission();
  }, []);

  const permission = async () => {
    if (Platform.OS === 'ios') Geolocation.requestAuthorization();
    if (Platform.OS === 'android') await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    const coords = await getLocation();
    setPosition(coords);
  };

  const getLocation = async () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition((response) => {
        resolve(response);
      },
        (error) => {
          if (Platform.OS === 'ios' && (error.code === 1)) {
            return alert('Please enable access to location services in phone settings')
          }
          else if (Platform.OS === 'android' && (error.code === 2)) {
            return alert('Please enable access to location services in phone settings')
          }
          else {
            return alert(error.message)

          }
        },
        config);
    });
  };
  return position;
};

export default useGeolocation;
