import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

import AmountSelect from "./AmountSelect";
import { MODAL_PROPS } from "../../shared/Modal";

import { USDPricedFuseAsset } from "../../../utils/fetchFusePoolData";


interface Props {
  isOpen: boolean;
  onClose: () => any;
  defaultMode: Mode;
  index: number;
  assets: USDPricedFuseAsset[];
  comptrollerAddress: string;
  isBorrowPaused: boolean;
}

export enum Mode {
  SUPPLY,
  WITHDRAW,
  BORROW,
  REPAY,
}

const DepositModal = (props: Props) => {
  const [mode, setMode] = useState(props.defaultMode);

  useEffect(() => {
    setMode(props.defaultMode);
  }, [props.isOpen, props.defaultMode]);

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent {...MODAL_PROPS}>
        <AmountSelect
          comptrollerAddress={props.comptrollerAddress}
          onClose={props.onClose}
          index={props.index}
          assets={props.assets}
          mode={mode}
          setMode={setMode}
          isBorrowPaused={props.isBorrowPaused}
        />
      </ModalContent>
    </Modal>
  );
};

export default DepositModal;
