"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NFTTransferComponent, TokenTransferComponent } from './components';

const TransferComponent = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transfers</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="coins">
                    <TabsList>
                        <TabsTrigger value="coins">Coin Transfers</TabsTrigger>
                        <TabsTrigger value="nfts">NFT Transfers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="coins">
                        <TokenTransferComponent />
                    </TabsContent>
                    <TabsContent value="nfts">
                        <NFTTransferComponent />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export { TransferComponent };