import { Box, Button, Card, Divider, Flex, Modal, NumberInput, Table, Text } from "@mantine/core";
import { NOCPriceHeader } from "../../../../lib/services/HDFC/ExternalNOC/dataTypes";
import { Currency, numberToCurrencyWordsFormatted } from "../../../Components/UtilityFunctions";
import { useMemo } from "react";

const AddTotalCost = ({
  open,
  nocPriceHeader,
  priceHeaderData,
  onClose,
  handleTotalCostSubmit,
  handleUpdatedPriceHeader,
}: {
  open: boolean;
  nocPriceHeader: NOCPriceHeader[];
  priceHeaderData: { [key: string]: { Amount: number; NOCProjectPriceHeaderID: number; ValueType: string; IsMSP?: number } } | undefined;
  onClose: () => void;
  handleTotalCostSubmit: (total: number, sale: number, mspVal: number) => void;
  handleUpdatedPriceHeader: (key: string, amount: number, nocProjectId: number, valueType: string, isMSP: number) => void;
}) => {
  // grouped-data
  const groupedData: { [key: string]: NOCPriceHeader[] } = useMemo(() => {
    return nocPriceHeader?.reduce((acc, obj) => {
      if (!acc[obj.ValueType]) {
        acc[obj.ValueType] = [];
      }
      acc[obj.ValueType].push(obj);
      return acc;
    }, {});
  }, [nocPriceHeader]);

  // handle-submit
  const handleSubmit = () => {
    const totalVal = priceHeaderData ? Object.values(priceHeaderData)?.reduce((acc, val) => (acc += val?.Amount), 0) : 0;
    const saleVal = priceHeaderData
      ? Object.values(priceHeaderData)
          ?.filter(data => data?.ValueType === "Sale Value")
          ?.reduce((acc, val) => (acc += val?.Amount), 0)
      : 0;
    const mspVal = priceHeaderData
      ? Object.values(priceHeaderData)
          ?.filter(data => data?.IsMSP == 1)
          ?.reduce((acc, val) => (acc += val?.Amount), 0)
      : 0;
    handleTotalCostSubmit(totalVal, saleVal, mspVal);
    onClose();
  };

  const value = priceHeaderData ? Object.values(priceHeaderData)?.reduce((acc, val) => (acc += val?.Amount), 0) : 0;

  return (
    <Modal size={"lg"} opened={open} onClose={onClose} title={""}>
      <Card shadow='sm' p='sm'>
        {groupedData &&
          Object.keys(groupedData)?.length > 0 &&
          Object.entries(groupedData)?.map(([key, value]) => {
            return (
              <div key={key}>
                <Text size='lg' fw='bold' color='truboard-primary.0'>
                  {key}
                </Text>
                <Divider my='xs' />
                <Table>
                  <thead>
                    <tr>
                      <th>Price Header</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {value?.map((item, i) => (
                      <tr key={i}>
                        <td>{item?.HeaderValue}</td>
                        <td>
                          <NumberInput
                            min={0}
                            hideControls
                            precision={2}
                            name={item?.HeaderValue}
                            value={priceHeaderData ? priceHeaderData[item?.HeaderValue]?.Amount : item?.amount}
                            parser={value => value.replace(/\$\s?|(,*)/g, "")}
                            onChange={value => {
                              handleUpdatedPriceHeader(item?.HeaderValue, Number(value), item?.NOCProjectPriceHeaderID, key, item?.ismsp);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            );
          })}
      </Card>
      <Text size={"lg"} fw='bold' color='truboard-primary.0' m='sm'>
        Total Cost:&nbsp;
        <Currency value={value ?? 0} currencyCode='INR' forceShowDecimals />
        <br />
        {value > 0 && numberToCurrencyWordsFormatted({ number: value, indianWordsFormat: true, useComma: true })}
      </Text>

      <Flex justify={"flex-end"} gap={"xl"}>
        <Box w={200}>
          <Button fullWidth color='green' onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Flex>
    </Modal>
  );
};


export default AddTotalCost;
