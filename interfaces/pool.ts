import { Address } from "abitype";
import { Token } from "interfaces/token";

export interface BaseAsset extends Token {
  priceFeed: Address;
}

export interface CollateralAsset extends Token {
  priceFeed: Address;
  borrowCollateralFactor: number;
  liquidateCollateralFactor: number;
  liquidationFactor: number;
  LiquidationPenalty: number;
  supplyCap: number;
}

export interface RewardAsset extends Token {
  priceFeed: Address;
}

export interface PoolConfig {
  proxy: Address;
  reward: Address;
  baseToken: BaseAsset;
  rewardToken: RewardAsset;
  supplyKink: number;
  supplyPerYearInterestRateSlopeLow: number;
  supplyPerYearInterestRateSlopeHigh: number;
  supplyPerYearInterestRateBase: number;
  borrowKink: number;
  borrowPerYearInterestRateSlopeLow: number;
  borrowPerYearInterestRateSlopeHigh: number;
  borrowPerYearInterestRateBase: number;
  storeFrontPriceFactor: number;
  trackingIndexScale: number;
  baseTrackingRewardSpeed: number;
  rewardKink: number;
  baseMinForRewards: number;
  baseBorrowMin: number;
  targetReserves: number;
  jpyPriceFeed: Address;

  assetConfigs: CollateralAsset[];
}

export interface PoolConfigMap {
  [chainId: number]: { [poolName: string]: PoolConfig };
}
