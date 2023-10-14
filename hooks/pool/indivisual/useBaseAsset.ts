import { useState, useEffect, useCallback } from "react";
import { PoolConfig } from "interfaces/pool";
import { fetchDataFromComet } from "hooks/util/cometContractUtils";
import { useReload } from "context/ReloadContext";

export interface BaseAssetData {
  supplyAPR: number | undefined;
  yourSupply: number | undefined;
  borrowAPR: number | undefined;
  yourBorrow: number | undefined;
  availableToBorrow: number | undefined;
}

const useBaseAsset = (poolData: PoolConfig | undefined) => {
  const [baseAssetData, setBaseAssetData] = useState<BaseAssetData>();
  const [error, setError] = useState<Error | null>(null);

  const reload = useReload();

  const fetchBaseAsset = useCallback(async () => {
    if (!poolData) {
      setBaseAssetData(undefined);
      return;
    }
    try {
      const [
        supplyAPR,
        yourSupply,
        borrowAPR,
        yourBorrow,
        availableToBorrow,
      ] = await Promise.all([
        undefined,
        fetchDataFromComet("balanceOf", poolData),
        undefined,
        fetchDataFromComet("borrowBalanceOf", poolData),
        undefined,
      ]);

      setBaseAssetData({
        supplyAPR,
        yourSupply,
        borrowAPR,
        yourBorrow,
        availableToBorrow,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [poolData]);

  useEffect(() => {
    fetchBaseAsset();
  }, [fetchBaseAsset, reload]);

  return { baseAssetData, error };
};

export default useBaseAsset;
