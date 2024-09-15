"use client"
import React, { ReactNode, useState } from 'react';
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";
import { Network } from "@aptos-labs/ts-sdk";
import { BitgetWallet } from "@bitget-wallet/aptos-wallet-adapter";
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Provider = ({ children }: { children: ReactNode }) => {

    const [queryClient] = useState(() => new QueryClient());

    const wallets = [
        new BitgetWallet(),
        new MartianWallet(),
        new PontemWallet(),
        new OKXWallet(),
    ];


    return (
        <QueryClientProvider client={queryClient}>
            <AptosWalletAdapterProvider
                plugins={wallets}
                autoConnect
                onError={(error) => {
                    console.log("Error >>>", error);

                }}
            >
                {children}
            </AptosWalletAdapterProvider>
            <ReactQueryDevtools initialIsOpen={false} /> {/* Optional: for dev tools */}
        </QueryClientProvider>
    );
};

export default Provider;