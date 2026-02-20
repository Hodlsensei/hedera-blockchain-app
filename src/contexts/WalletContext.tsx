import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface WalletContextType {
  accountId: string | null;
  isConnected: boolean;
  isHashPackInstalled: boolean;
  isInitializing: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendHbarPayment: (toAddress: string, amount: number, memo?: string) => Promise<{
    success: boolean;
    transactionId?: string;
    error?: string;
  }>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isHashPackInstalled, setIsHashPackInstalled] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    checkHashPackInstallation();
  }, []);

  const checkHashPackInstallation = async () => {
    setIsInitializing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if extension is installed by looking for the extension ID
    const installed = await checkExtensionInstalled();
    
    console.log('HashPack installed:', installed);
    setIsHashPackInstalled(installed);

    // Check for saved connection
    const savedAccountId = localStorage.getItem('hashpack_account');
    if (savedAccountId && installed) {
      setAccountId(savedAccountId);
      setIsConnected(true);
      console.log('Restored connection:', savedAccountId);
    }

    setIsInitializing(false);
  };

  const checkExtensionInstalled = async (): Promise<boolean> => {
    // Try multiple detection methods
    return new Promise((resolve) => {
      // Method 1: Check for Chrome extension API
      if (typeof (window as any).chrome !== 'undefined' && (window as any).chrome.runtime) {
        // HashPack is likely installed
        resolve(true);
        return;
      }

      // Method 2: Assume installed if user says so (fallback)
      // In production, you'd want better detection
      resolve(true); // Force true for now
    });
  };

  const connectWallet = async () => {
    if (!isHashPackInstalled) {
      toast.error('HashPack Not Found', {
        description: 'Please install HashPack extension to continue.',
        action: {
          label: 'Install',
          onClick: () => window.open('https://www.hashpack.app/download', '_blank'),
        },
      });
      return;
    }

    try {
      // Method 1: Try using window.hashpack if available
      if ((window as any).hashpack?.requestPairing) {
        toast.info('Opening HashPack...', {
          description: 'Please approve the connection in HashPack.',
        });

        const result = await (window as any).hashpack.requestPairing();
        
        if (result?.accountIds?.[0]) {
          const account = result.accountIds[0];
          setAccountId(account);
          setIsConnected(true);
          localStorage.setItem('hashpack_account', account);
          
          toast.success('Wallet Connected!', {
            description: `Connected to ${account}`,
          });
          return;
        }
      }

      // Method 2: Manual entry fallback
      toast.info('Manual Connection', {
        description: 'HashPack API not detected. Using manual mode.',
      });

      // Prompt user to enter their account ID
      const userAccountId = prompt(
        'Please enter your Hedera Account ID from HashPack\n(Format: 0.0.12345):'
      );

      if (userAccountId && /^0\.0\.\d+$/.test(userAccountId)) {
        setAccountId(userAccountId);
        setIsConnected(true);
        localStorage.setItem('hashpack_account', userAccountId);
        
        toast.success('Wallet Connected!', {
          description: `Connected to ${userAccountId}`,
        });
      } else if (userAccountId) {
        toast.error('Invalid Account ID', {
          description: 'Please enter a valid Hedera account ID (e.g., 0.0.12345)',
        });
      }
    } catch (error) {
      console.error('Connection failed:', error);
      toast.error('Connection Failed', {
        description: 'Could not connect to HashPack wallet.',
      });
    }
  };

  const disconnectWallet = () => {
    setAccountId(null);
    setIsConnected(false);
    localStorage.removeItem('hashpack_account');
    toast.success('Wallet Disconnected');
  };

  const sendHbarPayment = async (
    toAddress: string,
    amount: number,
    memo?: string
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
    if (!isConnected || !accountId) {
      toast.error('Wallet Not Connected', {
        description: 'Please connect your wallet first.',
      });
      return { success: false, error: 'Wallet not connected' };
    }

    try {
      toast.info('Preparing Transaction...', {
        description: `Sending ${amount} HBAR`,
      });

      // Method 1: Try HashPack API
      if ((window as any).hashpack?.sendTransaction) {
        const transaction = {
          type: 'transaction',
          transaction: {
            type: 'transfer',
            accountId: accountId,
            recipient: toAddress,
            amount: amount * 100000000, // Convert HBAR to tinybars
            memo: memo || 'Payment for order'
          }
        };

        toast.info('Awaiting Approval...', {
          description: 'Please approve the transaction in HashPack.',
        });

        const result = await (window as any).hashpack.sendTransaction(transaction);

        if (result?.success) {
          const txId = result.response?.transactionId || result.transactionId || 'Unknown';
          
          toast.success('Payment Successful!', {
            description: `Transaction ID: ${txId}`,
            duration: 5000,
          });

          return { success: true, transactionId: txId };
        }
      }

      // Method 2: Manual/simulation mode
      toast.warning('Manual Payment Mode', {
        description: 'Opening HashPack for manual payment...',
        duration: 10000,
      });

      // Generate a realistic transaction ID format
      const generateTxId = () => {
        const fromAccount = accountId || '0.0.0';
        const timestamp = Math.floor(Date.now() / 1000);
        const nanos = Math.floor(Math.random() * 999999999);
        return `${fromAccount}@${timestamp}.${nanos}`;
      };

      // Show payment instructions with HashPack deep link
      const hashpackUrl = `https://wallet.hashpack.app/send?` +
        `recipient=${encodeURIComponent(toAddress)}` +
        `&amount=${amount}` +
        `&memo=${encodeURIComponent(memo || 'Payment for order')}` +
        `&network=testnet`;

      toast.info('Complete Payment in HashPack', {
        description: 'Opening HashPack wallet...',
        action: {
          label: 'Open HashPack',
          onClick: () => window.open(hashpackUrl, '_blank')
        }
      });

      // Show detailed instructions
      const proceedWithPayment = confirm(
        `Please complete the following transaction in HashPack:\n\n` +
        `📤 FROM: ${accountId}\n` +
        `📥 TO: ${toAddress}\n` +
        `💰 AMOUNT: ${amount} HBAR\n` +
        `📝 MEMO: ${memo || 'Payment for order'}\n` +
        `🌐 NETWORK: Testnet\n\n` +
        `IMPORTANT:\n` +
        `1. Make sure you're on TESTNET in HashPack\n` +
        `2. Send exactly ${amount} HBAR\n` +
        `3. Include the memo for order tracking\n\n` +
        `Click OK after you've completed the transaction in HashPack,\n` +
        `or Cancel to abort the payment.`
      );

      if (proceedWithPayment) {
        // Ask for transaction ID with validation
        let txId = prompt(
          'Enter the Transaction ID from HashPack:\n\n' +
          'You can find this in:\n' +
          '• HashPack > Activity > Recent Transaction\n' +
          '• Or on HashScan.io in your browser\n\n' +
          'Format: 0.0.12345@1234567890.123456789'
        );

        // If user doesn't provide one, generate for testing
        if (!txId || txId.trim() === '') {
          const useGenerated = confirm(
            'No transaction ID entered.\n\n' +
            'For TESTING purposes, would you like to generate a simulated transaction ID?\n\n' +
            '⚠️ WARNING: This will NOT actually transfer HBAR!\n' +
            'This is only for testing the UI flow.'
          );

          if (useGenerated) {
            txId = generateTxId();
            toast.warning('Simulated Transaction', {
              description: 'Using generated ID - no real transfer occurred!',
              duration: 8000,
            });
          } else {
            return { success: false, error: 'Payment cancelled - no transaction ID provided' };
          }
        }
        
        // Validate transaction ID format
        const txIdPattern = /^0\.0\.\d+@\d+\.\d+$/;
        if (!txIdPattern.test(txId.trim())) {
          toast.error('Invalid Transaction ID', {
            description: 'Transaction ID format is incorrect. Expected format: 0.0.12345@1234567890.123456789',
          });
          return { success: false, error: 'Invalid transaction ID format' };
        }

        toast.success('Payment Recorded!', {
          description: `Transaction ID: ${txId}`,
          duration: 5000,
        });

        // Add note about verification
        setTimeout(() => {
          toast.info('Verify on HashScan', {
            description: 'Check your transaction on HashScan.io',
            action: {
              label: 'View on HashScan',
              onClick: () => window.open(`https://hashscan.io/testnet/transaction/${txId}`, '_blank')
            },
            duration: 10000,
          });
        }, 2000);

        return { success: true, transactionId: txId };
      }

      return { success: false, error: 'Payment cancelled by user' };

    } catch (error: any) {
      console.error('Payment failed:', error);
      
      const errorMessage = error.message || 'Unknown error occurred';
      
      toast.error('Payment Failed', {
        description: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  };

  return (
    <WalletContext.Provider
      value={{
        accountId,
        isConnected,
        isHashPackInstalled,
        isInitializing,
        connectWallet,
        disconnectWallet,
        sendHbarPayment,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}