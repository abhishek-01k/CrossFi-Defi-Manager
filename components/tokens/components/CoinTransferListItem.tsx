import { TableCell, TableRow } from '@/components/ui/table';
import { APP_PATHS } from '@/config/Routes';
import { shortenAddress } from '@/lib/shortenAddress';
import { useRouter } from 'next/navigation';
import React from 'react';

const CoinTransferListItem = ({ tokenTransfer, decimal }: { tokenTransfer: any, decimal: number }) => {
    const action_type = tokenTransfer.activity_type?.split("::")?.slice(2)
    const balance = tokenTransfer.amount / (10 ** decimal)

    const router = useRouter();
    return (
        <TableRow>
            <TableCell>
                {tokenTransfer.transaction_version}
            </TableCell>
            <TableCell>
                {tokenTransfer.is_transaction_success ? "✅" : "❌"}
            </TableCell>
            <TableCell
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => {
                    if (tokenTransfer?.owner_address)
                        router.push(
                            `${APP_PATHS.PROFILE}/${tokenTransfer?.owner_address}`
                        )
                }}
            >{shortenAddress(tokenTransfer?.owner_address, 5)}</TableCell>
            <TableCell>{balance}</TableCell>
            <TableCell>
                {action_type}
            </TableCell>
            <TableCell>{new Date(tokenTransfer.transaction_timestamp).toLocaleDateString()}</TableCell>
        </TableRow>
    );
};

export default CoinTransferListItem;