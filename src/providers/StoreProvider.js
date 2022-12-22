import React, { createContext, useContext } from 'react'
import RootStore from '../store'


const StoreContext = createContext()

const StoreProvider = ({ children }) => {
    const store = RootStore.create({})

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => useContext(StoreContext)

export default StoreProvider