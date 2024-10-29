import { create } from "zustand";
import { CryptoCurrency, CryptoPrice, Pair } from "../types";
import { devtools } from "zustand/middleware";
import { fetchCurrentCryptoPrice, getCryptos } from "../services/CryptoService";

type CryptoStore = {
  cryptocurrencies: CryptoCurrency[];
  result: CryptoPrice;
  isLoading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptocurrencies: [],
    result: {} as CryptoPrice,
    isLoading: false,
    fetchCryptos: async () => {
      const cryptocurrencies = await getCryptos();

      set(() => ({
        cryptocurrencies,
      }));
    },
    fetchData: async (pair: Pair) => {
      set(() => ({
        isLoading: true,
      }));
      const result = await fetchCurrentCryptoPrice(pair);

      set(() => ({
        result,
        isLoading: false,
      }));
    },
  }))
);
