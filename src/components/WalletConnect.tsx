import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function WalletConnect() {
  const { accountId, isConnected, isInitializing, connectWallet, disconnectWallet } = useWallet();

  if (isConnected && accountId) {
    return (
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Connected Wallet</p>
            <p className="font-mono text-sm font-bold text-green-700">
              {accountId}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnectWallet}
            className="ml-4"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-blue-50 border-blue-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-blue-900">Connect Your Wallet</p>
          <p className="text-sm text-blue-700">
            Pay securely with HashPack
          </p>
        </div>
        <Button
          onClick={connectWallet}
          disabled={isInitializing}
          className="ml-4"
        >
          {isInitializing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
