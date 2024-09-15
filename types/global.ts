import { ActiveTabStates } from "./sidebar"

export type GlobalContextProviderType = {
  activeTab: ActiveTabStates
  tokensData: any[]
  NFTsData: any[]
  address: string
  TokenTransferData: any[]
  NFTsTransferData: any[]
  setNFTsTransferData: (TokenTransferData: any[]) => void
  setTokenTransferData: (NFTsTransferData: any[]) => void
  setAddress: (address: string) => void
  setTokensData: (tokensData: any[]) => void
  setNFTsData: (NFTsData: any[]) => void
  setActiveTab: (activeTab: ActiveTabStates) => void
}

export const InitialValue: GlobalContextProviderType = {
  activeTab: "overview",
  tokensData: [],
  NFTsData: [],
  address: "",
  TokenTransferData: [],
  NFTsTransferData: [],
  setNFTsTransferData: () => {},
  setTokenTransferData: () => {},
  setAddress: () => {},
  setTokensData: () => {},
  setNFTsData: () => {},
  setActiveTab: () => {},
}
