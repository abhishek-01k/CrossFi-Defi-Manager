"use client"
import { GlobalContextProviderType, InitialValue } from "@/types/global";
import { ActiveTabStates } from "@/types/sidebar";
import { createContext, ReactNode, useState } from "react";


export const GlobalContext = createContext<GlobalContextProviderType>(InitialValue)

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {

    const [activeTab, setActiveTab] = useState<ActiveTabStates>('overview');
    const [tokensData, setTokensData] = useState<any[]>([]);
    const [NFTsData, setNFTsData] = useState<any[]>([]);

    const [TokenTransferData, setTokenTransferData] = useState<any[]>([]);
    const [NFTsTransferData, setNFTsTransferData] = useState<any[]>([]);

    const [address, setAddress] = useState('')

    return (
        <GlobalContext.Provider value={{
            activeTab,
            tokensData,
            NFTsData,
            address,
            TokenTransferData,
            NFTsTransferData,
            setNFTsTransferData,
            setTokenTransferData,
            setAddress,
            setNFTsData,
            setTokensData,
            setActiveTab,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export { GlobalContextProvider };