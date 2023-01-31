import React, { createContext, useState } from 'react';
import axios from 'axios';

const PropDrilling = createContext();

export default PropDrilling;

export const PropDrillingProvider = ({ children }) => {
    const [fighters, setFighters] = useState([])

    let contextData = {
        fighters: fighters,
        setFighters: setFighters
    }

    return(
        <PropDrilling.Provider value={contextData} >
            { children }
        </PropDrilling.Provider>
    )

}