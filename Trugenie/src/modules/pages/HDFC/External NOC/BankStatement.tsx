import { Card, Center, Table, Text, FileButton, Loader, Group, createStyles } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectExternalNOCLoaders, selectNOCAccountsList } from "../../../../lib/services/HDFC/ExternalNOC/selectors";
import { NOCAccounts } from "../../../../lib/services/HDFC/ExternalNOC/dataTypes";
import deleteIcon from "../../../../assets/logos/SVG/Delete.svg";
import uploadIcon from "../../../../assets/logos/upload.svg";
import { useRef } from "react";
import { mime_types } from "../../../../utils/commonFunctions";
import { errorNotification } from "../../../Components/UtilityFunctions";

export const useStyles = createStyles(() => {
  return {
    header: {
      ["th"]: {
        backgroundColor: "#dedede",
        color: "#001d56 !important",
        fontSize: "1rem !important",
      },
      height: "3.5rem",
    },
    body: {
      fontSize: "0.8rem !important",
      color: "gray !important",
      fontWeight: 500,
      lineBreak: "anywhere",
    },
  };
});

interface BankStatementProps {
  bankFile: { [key: string]: { bankName: string; file: File } } | null;
  setBankFile: React.Dispatch<React.SetStateAction<{ [key: string]: { bankName: string; file: File } } | null>>;
}

const BankStatement: React.FC<BankStatementProps> = ({ bankFile, setBankFile }: BankStatementProps) => {
  const { classes } = useStyles();
  //#region [selector]
  const bankAccounts = useSelector(selectNOCAccountsList) as NOCAccounts[];
  const loaders = useSelector(selectExternalNOCLoaders);
  //#endregion

  const resetBankFileRef = useRef<() => void>(null);
  const clearFile = (key: number) => {
    setBankFile(prevState => {
      const newState = { ...prevState };
      delete newState[key];
      return newState;
    });
    resetBankFileRef.current?.();
  };

  const handleAddBankFile = (bank: string, bankName: string, file: File) => {
    const isAllowedFile = mime_types.pdf === file.type;
    const isWithinSize = file.size / 1000000 < 10 ? true : false;

    if (!isWithinSize) {
      errorNotification("The size of bank statement should be less than 10 mb.");
      return;
    }

    if (!isAllowedFile) {
      errorNotification("The Bank statement should be in pdf format.");
      return;
    }
    setBankFile((prev: { [key: string]: { bankName: string; file: File } } | null) => {
      return {
        ...prev,
        [bank]: { bankName: bankName, file: file },
      };
    });
  };

  return (
    <Card
      shadow='sm'
      radius='md'
      padding='md'
      m={"md"}
      withBorder
      style={{
        overflow: "revert",
      }}>
      <Text fw='bold' fz='lg' mb='sm' color='truboard-primary.0'>
        Bank Statement
      </Text>
      <Table fontSize={"xs"}>
        <thead className={classes.header}>
          <tr>
            <th>Bank Name</th>
            <th>Bank Account No.</th>
            <th>File Name</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody className={classes.body}>
          {bankAccounts?.length > 0 ? (
            bankAccounts.map((bank, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <Text>{bank?.BankName}</Text>
                </td>
                <td>
                  <Text>{bank?.AccountNumber}</Text>
                </td>
                <td>
                  <Text>{bankFile ? bankFile[bank.BankName]?.file?.name : ""}</Text>
                </td>
                <td>
                  <Group position='center'>
                    <FileButton
                      resetRef={resetBankFileRef}
                      onChange={file => handleAddBankFile(bank?.AccountNumber?.toString(), bank?.BankName, file as File)}
                      accept={mime_types.pdf}>
                      {props => <img src={uploadIcon} style={{ width: "20px", height: "20px", color: "#001d56" }} {...props} />}
                    </FileButton>

                    {bankFile && bankFile[bank.AccountNumber] ? (
                      <img src={deleteIcon} style={{ width: "20px", height: "20px", color: "red" }} onClick={() => clearFile(bank.AccountNumber)} />
                    ) : (
                      <></>
                    )}
                  </Group>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                style={{
                  backgroundColor: "white",
                }}>
                <Center mx='auto' fw='bold' fz='md'>
                  {loaders?.nocAccountsList ? <Loader size='md' /> : "No data Found!"}
                </Center>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default BankStatement;
