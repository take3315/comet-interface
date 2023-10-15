import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
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

  const { reloadKey } = useReload();

  const fetchBaseAsset = useCallback(async () => {
    if (!poolData) {
      setBaseAssetData(undefined);
      return;
    }
    try {
      const [supplyAPR, yourSupply, borrowAPR, yourBorrow, availableToBorrow] =
        await Promise.all([
          undefined,
          fetchDataFromComet("balanceOf", poolData),
          undefined,
          fetchDataFromComet("borrowBalanceOf", poolData),
          undefined,
        ]);

      setBaseAssetData({
        supplyAPR,
        yourSupply: yourSupply !== undefined ? Number(formatUnits(yourSupply, poolData.cometDecimals)) : undefined,
        borrowAPR,
        yourBorrow: yourBorrow !== undefined ? Number(formatUnits(yourBorrow, poolData.cometDecimals)) : undefined,
        availableToBorrow,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [poolData]);

  useEffect(() => {
    fetchBaseAsset();
  }, [fetchBaseAsset, reloadKey]);

  return { baseAssetData, error };
};

export default useBaseAsset;
