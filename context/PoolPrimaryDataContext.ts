import { createContext } from "react";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";
import { ClaimReward } from "hooks/pool/indivisual/useClaimReward";

export interface PoolPrimaryDataContextType {
  priceFeedData: PriceFeedData | undefined;
  baseAssetData: BaseAssetData | undefined;
  collateralAssetsData: CollateralAssetsData | undefined;
  totalPoolData: TotalPoolData | undefined;
  claimReward: ClaimReward | undefined;
}

const PoolPrimaryDataContext = createContext<
  PoolPrimaryDataContextType | undefined
>(undefined);

export default PoolPrimaryDataContext;
