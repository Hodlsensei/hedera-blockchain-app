import { useState, useEffect } from 'react';

interface HbarPrice {
  usd: number;
  lastUpdated: Date;
}

export function useHbarPrice() {
  const [price, setPrice] = useState<HbarPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch HBAR price');
        }

        const data = await response.json();
        const usdPrice = data['hedera-hashgraph']?.usd;

        if (usdPrice && isMounted) {
          setPrice({
            usd: usdPrice,
            lastUpdated: new Date()
          });
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch price');
          setLoading(false);
        }
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const convertToHbar = (usdAmount: number): number => {
    if (!price) return 0;
    return Number((usdAmount / price.usd).toFixed(2));
  };

  const convertToUsd = (hbarAmount: number): number => {
    if (!price) return 0;
    return Number((hbarAmount * price.usd).toFixed(2));
  };

  return {
    price: price?.usd || null,
    loading,
    error,
    convertToHbar,
    convertToUsd,
    lastUpdated: price?.lastUpdated
  };
}