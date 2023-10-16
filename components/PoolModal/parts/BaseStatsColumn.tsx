import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "@chakra-ui/react";
import { Column, Center } from "utils/chakraUtils";
import { usePoolPrimaryDataContext } from "hooks/usePoolPrimaryDataContext";
import DashboardBox from "components/shared/DashboardBox";
import StatsRow from "components/shared/StatsRow";
import { Mode } from "components/PoolModal";
import { BaseAsset } from "interfaces/pool";
import {
  toNumber,
  toFixed2,
  truncateTo2DecimalPlaces,
} from "utils/numberUtils";

export const BaseStatsColumn = ({
  mode,
  asset,
  amount,
}: {
  mode: Mode;
  asset: BaseAsset;
  amount: number;
}) => {
  const { t } = useTranslation();
  const { baseAssetData } = usePoolPrimaryDataContext();

  const color = asset?.color;
  const symbol = asset?.symbol;
  const decimals = asset?.decimals;

  if (!baseAssetData) {
    return (
      <DashboardBox width="100%" height="190px" mt={4}>
        <Center height="150px">
          <Spinner />
        </Center>
      </DashboardBox>
    );
  }

  const supplyBalance = toNumber(baseAssetData.yourSupply, decimals);
  const borrowBalance = toNumber(baseAssetData.yourBorrow, decimals);

  let primaryValue1 = 0;
  let secondaryValue1 = 0;
  let primaryValue2 = 0;
  let secondaryValue2 = 0;

  if (mode === Mode.BASE_SUPPLY) {
    primaryValue1 = supplyBalance;
    primaryValue2 = borrowBalance;

    if (supplyBalance > 0 || borrowBalance === 0) {
      secondaryValue1 = supplyBalance + amount;
    } else if (borrowBalance > 0) {
      secondaryValue2 = borrowBalance - amount;
    }
  } else if (mode === Mode.BASE_BORROW) {
    primaryValue1 = borrowBalance;
    primaryValue2 = supplyBalance;

    if (borrowBalance > 0 || supplyBalance === 0) {
      secondaryValue1 = borrowBalance + amount;
    } else if (supplyBalance > 0) {
      secondaryValue2 = supplyBalance - amount;
    }
  }

  return (
    <DashboardBox width="100%" height="190px" mt={4}>
      <Column
        mainAxisAlignment="space-between"
        crossAxisAlignment="flex-start"
        expand
        py={3}
        px={4}
        fontSize="lg"
      >
        <StatsRow
          label={
            t(mode === Mode.BASE_SUPPLY ? "Supply Balance" : "Borrow Balance") +
            ":"
          }
          value={`${truncateTo2DecimalPlaces(supplyBalance)} ${symbol}`}
          secondaryValue={
            amount && primaryValue1 !== secondaryValue1
              ? `${secondaryValue1} ${symbol}`
              : 0
          }
          color={color}
        />
        <StatsRow
          label={t(mode === Mode.BASE_SUPPLY ? "Supply APR" : "Borrow APR")}
          value={`${
            mode === Mode.BASE_SUPPLY
              ? baseAssetData.supplyAPR ?? 0
              : baseAssetData.borrowAPR ?? 0
          } %`}
        />
        <StatsRow
          label={
            t(mode === Mode.BASE_SUPPLY ? "Borrow Balance" : "Supply Balance") +
            ":"
          }
          value={`${truncateTo2DecimalPlaces(borrowBalance)} ${symbol}`}
          secondaryValue={
            amount && primaryValue2 !== secondaryValue2
              ? `${secondaryValue2} ${symbol}`
              : 0
          }
          color={color}
        />
        <StatsRow
          label={t("Available to Borrow") + ":"}
          value={`${toFixed2(
            baseAssetData.availableToBorrow,
            decimals,
          )} ${symbol}`}
        />
      </Column>
    </DashboardBox>
  );
};

export default BaseStatsColumn;
