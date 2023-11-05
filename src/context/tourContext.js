import React, { createContext, useState, useContext } from 'react';

const TourContext = createContext(null);

export const TourProvider = ({ children }) => {
    const [id, setId] = useState(() => {
        const storedTourData = localStorage.getItem('tour');
        return storedTourData ? JSON.parse(storedTourData) : null;
      });

  return (
    <TourContext.Provider value={{ id, setId }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => useContext(TourContext);
