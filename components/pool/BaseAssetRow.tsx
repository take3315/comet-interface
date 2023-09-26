import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Text, useDisclosure, Spinner } from "@chakra-ui/react";
import { Column, Row, useIsMobile, Center } from "utils/chakraUtils";
import { smallUsdFormatter } from "utils/bigUtils";
import useBasePoolData from "hooks/pool/indivisual/useBaseAsset";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";
import PoolModal, { Mode } from "components/PoolModal";
import APYComponent from "components/pool/APYComponent";
import { PoolConfig } from "interfaces/pool";

const BaseAssetRow = ({ poolData }: { poolData: PoolConfig }) => {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const authedOpenModal = (mode: Mode) => {
    setMode(mode);
    openModal();
  };

  const [mode, setMode] = useState(Mode.BASE_SUPPLY);

  const tokenData = poolData.baseToken;
  const symbol = tokenData?.symbol ? tokenData?.symbol : "";

  const { basePoolData } = useBasePoolData(poolData);
  const { tokenRewardData } = useTokenRewardData(poolData);

  const isMobile = useIsMobile();

  const { t } = useTranslation();

  return (
    <>
      <PoolModal
        defaultMode={mode}
        poolData={poolData}
        index={0}
        isBase={true}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        width="100%"
        px={isMobile ? 2 : 4}
        className="hover-row"
      >
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="100%"
          height="72px"
          className="hover-row"
          as="button"
          onClick={() => authedOpenModal(Mode.BASE_SUPPLY)}
        >
          {/* Underlying Token Data */}
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            width="33%"
          >
            <Avatar
              bg="#FFF"
              boxSize="37px"
              name={symbol}
              src={
                tokenData?.logoURL ??
                "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
              }
            />
            <Text fontWeight="bold" fontSize="lg" ml={2} flexShrink={0}>
              {symbol}
            </Text>
          </Row>

          {/* APY */}
          <APYComponent
            rewardToken={poolData.rewardToken}
            baseAPR={basePoolData?.supplyAPR}
            tokenReward={tokenRewardData?.supplyRewardAPR}
            width={isMobile ? "100%" : "33%"}
          />

          {!isMobile && (
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              width={"33%"}
            >
              {basePoolData ? (
                <>
                  <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                    {smallUsdFormatter(basePoolData.yourSupply)}
                  </Text>

                  <Text fontSize="sm">
                    {smallUsdFormatter(basePoolData.yourSupply).replace(
                      "$",
                      "",
                    )}{" "}
                    {symbol}
                  </Text>
                </>
              ) : (
                <Center height="50px">
                  <Spinner />
                </Center>
              )}
            </Column>
          )}
        </Row>
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="100%"
          height="72px"
          className="hover-row"
          as="button"
          onClick={() => authedOpenModal(Mode.BASE_BORROW)}
        >
          {/* APY */}
          <APYComponent
            rewardToken={poolData.rewardToken}
            baseAPR={basePoolData?.borrowAPR}
            tokenReward={tokenRewardData?.borrowRewardAPR}
            width={isMobile ? "100%" : "33%"}
          />

          {!isMobile && (
            <>
              <Column
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                width={"33%"}
              >
                {basePoolData ? (
                  <>
                    <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                      {smallUsdFormatter(basePoolData.yourBorrow)}
                    </Text>

                    <Text fontSize="sm">
                      {smallUsdFormatter(basePoolData.yourBorrow).replace(
                        "$",
                        "",
                      )}{" "}
                      {symbol}
                    </Text>
                  </>
                ) : (
                  <Center height="50px">
                    <Spinner />
                  </Center>
                )}
              </Column>
              <Column
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                width={"33%"}
              >
                {basePoolData ? (
                  <>
                    <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                      {smallUsdFormatter(basePoolData.availableToBorrow)}
                    </Text>

                    <Text fontSize="sm">
                      {smallUsdFormatter(
                        basePoolData.availableToBorrow,
                      ).replace("$", "")}{" "}
                      {symbol}
                    </Text>
                  </>
                ) : (
                  <Center height="50px">
                    <Spinner />
                  </Center>
                )}
              </Column>
            </>
          )}
        </Row>
      </Row>
    </>
  );
};

export default BaseAssetRow;
