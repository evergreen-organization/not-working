import React, { useState, createContext, useContext } from 'react';

const IAMModalContext = createContext(null);

export const IAMModalProvider = ({ children }) => {
  const [isIAMModalVisible, setIsIAMModalVisible] = useState(false);
  const [IAMModalSlides, setIAMModalSlides] = useState([])

  return <IAMModalContext.Provider value={{ isIAMModalVisible, setIsIAMModalVisible, IAMModalSlides, setIAMModalSlides }}>{children}</IAMModalContext.Provider>;
};

export const useIAMModal = () => useContext(IAMModalContext);
