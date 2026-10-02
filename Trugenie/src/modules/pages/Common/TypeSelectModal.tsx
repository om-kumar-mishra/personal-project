import React, { useState } from "react";
import downloadDocument from "../../../assets/logos/download.svg";
import { Button, Flex, Modal, Select, SelectItem, Space, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectCashflowLoaders } from "../../../lib/services/HDFC/Cashflow/selector";

const TypeSelectModal = ({ open, onClose, typesList }: { open: boolean; onClose: (type?: string) => void; typesList: string[] | SelectItem[] }) => {
  const loaders = useSelector(selectCashflowLoaders);
  const [selectedType, setSelectedType] = useState<string>("");

  return (
    <Modal
      size='md'
      opened={open}
      onClose={() => onClose(undefined)}
      style={{ overflow: "visible" }}
      title={
        <Flex gap={"xs"}>
          <img src={downloadDocument} style={{ width: "20px", height: "20px" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Download Template
          </Text>
        </Flex>
      }>
      <div>
        <Select label='Type' data={typesList} placeholder='-Select Type-' value={selectedType} onChange={value => setSelectedType(value ?? "")} />
        <Space h={selectedType ? "80px" : "100px"} />
        {selectedType && (
          <Flex justify={"flex-end"} gap={"xl"}>
            <Button color='truboard-primary.0' type='button' onClick={() => onClose(selectedType)} loading={loaders.downloadCashflowTemplate}>
              Download
            </Button>
          </Flex>
        )}
      </div>
    </Modal>
  );
};

export default TypeSelectModal;
