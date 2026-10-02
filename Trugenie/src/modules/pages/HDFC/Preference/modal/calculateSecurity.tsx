import { Button, Card, Flex, Modal, NumberInput, Space, Table, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkIcon from "../../../../../assets/logos/SVG/Check.svg";
import DeleteIcon from "../../../../../assets/logos/SVG/Delete.svg";
import editIcon from "../../../../../assets/logos/SVG/Edit.svg";
import crossIcon from "../../../../../assets/logos/SVG/cross.svg";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { nocProjectPrefrenceRequested, reProjectSecurityUpdateRequested } from "../../../../../lib/services/prefrences/actions";
import { selectNOCProjectPrefrence, selectPrefrenceLoader } from "../../../../../lib/services/prefrences/selectors";
import { NOCProjectPrefrenceResponse, ReProjectExposure, ReProjectSecurity } from "../../../../../lib/services/prefrences/dataTypes";
import { DATE_TIME_FORMAT_WITH_SECONDS } from "../../../../../utils/constants";
import { successNotification } from "../../../../../utils/notifications";
import TBTextInput from "../../../../Components/TBTextInput";
import { TableRow } from "../../../../Components/TableRow";
import { DEFAULT_DATE_FORMAT, createAllowedCharRegex } from "../../../../Components/UtilityFunctions";

type FormData = {
  StipulatedSecurityCover: number;
  isSecurityCoverMet?: boolean;
  securityCover: string;
  asOnDate: string | Date;
  securityType?: string;
  securityAmount?: number;
  exposureType?: string;
  exposureAmount?: number;
  totalamount?: number;
};

const ClaculateSecurityModal = ({
  open,
  onClose,
  securityData,
  exposureData,
  totalExposureTillDate,
}: {
  onClose: () => void;
  open: boolean;
  securityData: ReProjectSecurity[];
  exposureData: ReProjectExposure[];
  totalExposureTillDate: NOCProjectPrefrenceResponse;
}) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  //#region [states]
  const [newField, setNewField] = useState({
    name: "",
    valuationAmount: 0,
    type: "",
  });

  const [editExposureField, setEditExposureField] = useState({
    name: "",
    valuationAmount: 0,
  });

  const nocPrefrenceData = useSelector(selectNOCProjectPrefrence);
  const [securityCoverValue, setSecurityCoverValue] = useState(0);
  const [securityError, setSecurityError] = useState<boolean>(false);
  const [exposureError, setExposureError] = useState<boolean>(false);
  const [isNewFieldAdded, setIsNewFieldAdded] = useState<boolean>(false);

  const [securityPayloadData, setSecurityPayloadData] = useState<{ SecurityType: string; ValuationAmount: number; isEdit?: boolean }[]>(
    securityData.map(sd => ({ SecurityType: sd.SecurityType, ValuationAmount: sd.ValuationAmount })),
  );
  const project = useSelector(selectSetProject) as Project;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const [isSuecurityCoverMetValue, setIsSuecurityCoverMetValue] = useState("");
  const [enableField, setEnableField] = useState({ security: false, exposure: false });
  const loader = useSelector(selectPrefrenceLoader);

  const [exposurePayloadData, setExposurePayloadData] = useState<{ Exposure: string; ValuationAmount: number; isEdit?: boolean }[]>(
    exposureData.map(ed => ({ Exposure: ed.Exposure, ValuationAmount: ed.ValuationAmount })),
  );

  const regaxAllowed = new RegExp(/^(?!.*\s{2,})[a-zA-Z0-9\s]+$/);
  //#endregion [states]
  const form = useForm<FormData>({
    initialValues: {
      StipulatedSecurityCover: nocPrefrenceData?.data[0]?.StipulatedSecurityCover ?? 0,
      isSecurityCoverMet: false,
      securityCover: "",
      asOnDate: new Date(),
      totalamount: 0,
    },
    validateInputOnChange: true,
    // validateInputOnBlur: true,
    validate: {
      asOnDate: value => (value !== "" ? null : "This field cannot be empty."),
      securityType: value => {
        if (
          value?.trim().length === 0
          // .some(char => /\d/.test(char))
        ) {
          return "This Field cananot be empty";
        } else {
          return null;
        }
      },
      exposureType: value => {
        if (
          value?.trim().length === 0
          // .some(char => /\d/.test(char))
        ) {
          return "This Field cananot be empty";
        } else {
          return null;
        }
      },
      // StipulatedSecurityCover: value => (value <= 0 ? "This field cannot be equal to 0." : null),
    },
  });

  const currentDate = new Date();
  const handleSecurityItem = () => {
    form.validateField("securityType");
    if (form.isValid("securityType")) {
      form.values.securityType &&
        form.values.securityAmount &&
        setSecurityPayloadData([...securityPayloadData, { SecurityType: form.values.securityType, ValuationAmount: form.values.securityAmount }]);
      setIsNewFieldAdded(false);
    }
  };

  const handleExposureItem = () => {
    form.validateField("exposureType");
    if (form.isValid("exposureType")) {
      form.values.exposureType &&
        form.values.exposureAmount &&
        setExposurePayloadData([...exposurePayloadData, { Exposure: form.values.exposureType, ValuationAmount: form.values.exposureAmount }]);
      setIsNewFieldAdded(false);
    }
  };

  const handleDeleteSecurityItem = (name: string) => {
    setSecurityPayloadData(p => p.filter(sn => sn.SecurityType !== name));
  };

  const handleDeleteExposureItem = (name: string) => {
    setExposurePayloadData(p => p.filter(sn => sn.Exposure !== name));
  };

  const callback = (success: boolean) => {
    if (success) {
      successNotification("Updated successfully");
      onClose();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    if (form.values.StipulatedSecurityCover <= 0) {
      form.setErrors({
        StipulatedSecurityCover: "This field cannot be empty.",
      });
      return;
    }

    const payload = {
      reAssetId: project?.REAssetId,
      reExposureType: exposurePayloadData.map(ed => ({ exposure: ed.Exposure, valuationAmount: ed.ValuationAmount })),
      reSecuritiesType: securityPayloadData.map(sd => ({ securityType: sd.SecurityType, valuationAmount: sd.ValuationAmount })),
      misDate: dayjs(currentDate).format(DATE_TIME_FORMAT_WITH_SECONDS),
      createdBy: userDetails?.EmailId,
      stipulatedSecurityCover: data.StipulatedSecurityCover,
      asOnDate: dayjs(data.asOnDate).format(DATE_TIME_FORMAT_WITH_SECONDS) ?? "",
    };
    dispatch(reProjectSecurityUpdateRequested(payload, callback));
  };

  useEffect(() => {
    dispatch(nocProjectPrefrenceRequested(project?.REAssetId));
  }, []);

  useEffect(() => {
    setSecurityPayloadData(securityData.map(sd => ({ SecurityType: sd.SecurityType, ValuationAmount: sd.ValuationAmount })));
    setExposurePayloadData(exposureData.map(ed => ({ Exposure: ed.Exposure, ValuationAmount: ed.ValuationAmount })));
  }, [securityData, exposureData]);

  useEffect(() => {
    form.setFieldValue("StipulatedSecurityCover", nocPrefrenceData?.data[0]?.StipulatedSecurityCover ?? 0);
  }, [nocPrefrenceData]);

  const handelCalculate = () => {
    const calculateSecurityCoverValue = securityPayloadData.reduce((acc, item) => {
      return Number(acc) + Number(item.ValuationAmount);
    }, 0);
    const calculateExposureValue = exposurePayloadData.reduce((acc, item) => {
      return Number(acc) + Number(item.ValuationAmount);
    }, 0);
    const totalExposure: number = totalExposureTillDate?.data[0]?.TotalExposureTill ? Number(totalExposureTillDate.data[0].TotalExposureTill.toFixed(2)) : 0;
    const securityCover = totalExposure === 0 ? 0 : ((calculateSecurityCoverValue + calculateExposureValue) / totalExposure).toFixed(2);
    setSecurityCoverValue(Number(securityCover));
    const isSecurityCoverMet = Number(securityCover) >= form.values.StipulatedSecurityCover;
    setIsSuecurityCoverMetValue(isSecurityCoverMet ? "Yes" : "No");
    form.setFieldValue("totalamount", calculateSecurityCoverValue);
  };

  const handelEditExposureTable = (name: string) => {
    setEnableField({ security: false, exposure: true });
    const explosureName = exposurePayloadData?.find(item => item?.Exposure === name);
    if (explosureName !== undefined) {
      setEditExposureField({ ...editExposureField, name: explosureName?.Exposure, valuationAmount: explosureName?.ValuationAmount });
      setExposurePayloadData(p => p.map(item => ({ ...item, isEdit: explosureName?.Exposure === item.Exposure ? true : false })));
      setNewField({ name: "", valuationAmount: 0, type: "exposure" });
    }
  };

  const handelEditSecurityTable = (name: string) => {
    setEnableField({ exposure: false, security: true });
    const securityObj = securityPayloadData?.find(item => item?.SecurityType === name);
    if (securityObj !== undefined) {
      setNewField({ ...newField, name: securityObj?.SecurityType, valuationAmount: securityObj?.ValuationAmount });
      setSecurityPayloadData(p => p.map(item => ({ ...item, isEdit: securityObj?.SecurityType === item.SecurityType ? true : false })));
      setEditExposureField({ name: "", valuationAmount: 0 });
    }
  };

  const handleUpdateItem = (name: string, type: string) => {
    if (!exposureError) {
      if (type === "exposure") {
        const explosureName = exposurePayloadData?.find(item => item?.Exposure === name);
        const newData = exposurePayloadData.filter(v => v.Exposure !== explosureName?.Exposure);
        setExposurePayloadData([...newData, { Exposure: editExposureField.name, ValuationAmount: editExposureField.valuationAmount }]);
        setEnableField({ ...enableField, exposure: false });
      }
    }
    if (!securityError) {
      if (type === "security") {
        const securityData = securityPayloadData?.find(item => item?.SecurityType === name);
        const newData = securityPayloadData.filter(v => v.SecurityType !== securityData?.SecurityType);
        setSecurityPayloadData([...newData, { SecurityType: newField.name, ValuationAmount: newField.valuationAmount }]);
        setEnableField({ ...enableField, security: false });

        setIsNewFieldAdded(false);
      }
    }
  };

  useEffect(() => {
    if (newField.valuationAmount < 0) {
      setNewField({
        ...newField,
        valuationAmount: 0,
      });
    }
    if (editExposureField.valuationAmount < 0) {
      setEditExposureField({
        ...editExposureField,
        valuationAmount: 0,
      });
    }
  }, [newField.valuationAmount, editExposureField.valuationAmount]);

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title={
        <Flex gap={"xs"}>
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Security Cover Calculation
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <TableRow
          title={"Stipulated Security Cover"}
          fullWidth
          value={
            <NumberInput
              hideControls
              label=''
              min={0}
              // type='number'
              precision={2}
              placeholder='Enter Value'
              {...form.getInputProps("StipulatedSecurityCover")}
            />
          }
        />
        <Space h={"sm"} />
        <Card
          shadow='sm'
          radius='md'
          padding='md'
          // m={"md"}
          withBorder
          style={{
            overflow: "revert",
          }}>
          <Flex justify={"space-between"} align={"center"}>
            <Title order={5} mb={"md"} color='#001d56'>
              Security
            </Title>
            <Button
              color='truboard-primary.0'
              mb={"md"}
              onClick={() => {
                setIsNewFieldAdded(true);
                form.setFieldValue("securityType", "");
                form.setFieldValue("securityAmount", undefined);
                setNewField({ ...newField, type: "security" });
              }}>
              + New
            </Button>
          </Flex>
          <Table>
            <thead>
              <tr>
                <th>Security</th>
                <th>Valuation Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {securityPayloadData.map((v, i) => (
                <tr key={`${i}${v.SecurityType}`}>
                  <td>
                    {v?.isEdit && enableField.security ? (
                      <TBTextInput
                        placeholder='Enter Security Type'
                        value={newField.name}
                        onChange={e => {
                          setSecurityError(!newField.name.match(regaxAllowed));
                          setNewField({ ...newField, name: e.target.value, type: "security" });
                        }}
                        error={!newField.name.match(regaxAllowed) ? "Sepecial charater faquir are not allowed" : ""}
                      />
                    ) : (
                      <Text>{v.SecurityType}</Text>
                    )}
                  </td>
                  <td>
                    {v?.isEdit && enableField.security ? (
                      <TextInput
                        placeholder='Enter amount'
                        value={newField.valuationAmount}
                        onChange={e => setNewField({ ...newField, valuationAmount: Number(e.target.value), type: "security" })}
                        type='number'
                        min={0}
                      />
                    ) : (
                      <Text>{v.ValuationAmount}</Text>
                    )}
                  </td>
                  <td>
                    {v?.isEdit && enableField.security ? (
                      <Flex gap='sm'>
                        <img
                          src={crossIcon}
                          style={{ width: "1rem", height: "1rem" }}
                          onClick={() => {
                            setIsNewFieldAdded(false);
                            setEnableField({ ...enableField, security: false });
                          }}
                          color={theme.colors["truboard-primary"][0]}
                        />
                        <img
                          src={checkIcon}
                          style={{ width: "1rem", height: "1rem" }}
                          onClick={() => handleUpdateItem(v.SecurityType, "security")}
                          color={theme.colors["truboard-primary"][0]}
                        />
                      </Flex>
                    ) : (
                      <Flex gap={"sm"}>
                        <img
                          src={editIcon}
                          style={{ width: "1rem", height: "1rem" }}
                          color={theme.colors["truboard-primary"][0]}
                          onClick={() => handelEditSecurityTable(v.SecurityType)}
                        />
                        <img
                          src={DeleteIcon}
                          style={{ width: "1rem", height: "1rem" }}
                          onClick={() => handleDeleteSecurityItem(v.SecurityType)}
                          color={theme.colors["truboard-primary"][0]}
                        />
                      </Flex>
                    )}
                  </td>
                </tr>
              ))}
              {isNewFieldAdded && newField.type === "security" ? (
                <tr>
                  <td>
                    <TBTextInput
                      placeholder='Enter Type'
                      type='text'
                      {...form.getInputProps("securityType")}
                      regex={createAllowedCharRegex([])}
                      warningMessage='Special Charater Not Allowed'
                    />
                  </td>
                  <td>
                    <NumberInput placeholder='Enter amount' type='number' precision={2} hideControls min={0} {...form.getInputProps("securityAmount")} />
                  </td>
                  <td>
                    <Flex gap='sm'>
                      <img
                        src={crossIcon}
                        style={{ width: "1rem", height: "1rem", color: "#001d56" }}
                        onClick={() => setIsNewFieldAdded(false)}
                        color={theme.colors["truboard-primary"][0]}
                      />
                      <img
                        src={checkIcon}
                        style={{ width: "1rem", height: "1rem", color: "#001d56" }}
                        onClick={handleSecurityItem}
                        color={theme.colors["truboard-primary"][0]}
                      />
                    </Flex>
                  </td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </Card>
        <Space h={"sm"} />
        <Card
          shadow='sm'
          radius='md'
          padding='md'
          // m={"md"}
          withBorder
          style={{
            overflow: "revert",
          }}>
          <Flex justify={"space-between"} align={"center"}>
            <Title order={5} mb={"md"} color='#001d56'>
              Collateral
            </Title>
            <Button
              color='truboard-primary.0'
              mb={"md"}
              onClick={() => {
                form.setFieldValue("exposureType", "");
                form.setFieldValue("exposureAmount", undefined);
                setIsNewFieldAdded(true);
                setNewField({ ...newField, type: "exposure" });
              }}>
              + New
            </Button>
          </Flex>
          <Table>
            <thead>
              <tr>
                <th>Collateral</th>
                <th>Valuation Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exposurePayloadData.map((v, i) => (
                <tr key={`${i}${v.Exposure}`}>
                  <td>
                    {v?.isEdit && enableField.exposure ? (
                      <TBTextInput
                        placeholder='Enter collateral'
                        value={editExposureField.name}
                        onChange={e => {
                          setExposureError(!editExposureField.name.match(regaxAllowed));
                          setEditExposureField({ ...editExposureField, name: e.target.value });
                        }}
                        error={!editExposureField.name.match(regaxAllowed) ? "Sepecial charater and numeric numbers are not allowed" : ""}

                        // onChange={e =>
                        //   setEditExposureField({ ...editExposureField, name: e.target.value })
                        // }
                      />
                    ) : (
                      <Text>{v.Exposure}</Text>
                    )}
                  </td>
                  <td>
                    {v?.isEdit && enableField.exposure ? (
                      <TextInput
                        placeholder='Enter amount'
                        value={editExposureField.valuationAmount}
                        onChange={e => setEditExposureField({ ...editExposureField, valuationAmount: Number(e.target.value) })}
                        type='number'
                      />
                    ) : (
                      <Text>{v.ValuationAmount}</Text>
                    )}
                  </td>
                  <td>
                    {v?.isEdit && enableField.exposure ? (
                      <Flex gap='sm'>
                        <img
                          src={crossIcon}
                          style={{ width: "1rem", height: "1rem" }}
                          onClick={() => {
                            setIsNewFieldAdded(false);
                            setEnableField({ ...enableField, exposure: false });
                          }}
                          color={theme.colors["truboard-primary"][0]}
                        />
                        <img
                          src={checkIcon}
                          style={{ width: "1rem", height: "1rem" }}
                          onClick={() => handleUpdateItem(v.Exposure, "exposure")}
                          color={theme.colors["truboard-primary"][0]}
                        />
                      </Flex>
                    ) : (
                      <Flex gap={"sm"}>
                        <img
                          src={editIcon}
                          style={{ width: "1rem", height: "1rem" }}
                          color={theme.colors["truboard-primary"][0]}
                          onClick={() => handelEditExposureTable(v.Exposure)}
                        />
                        <img
                          src={DeleteIcon}
                          style={{ width: "1rem", height: "1rem" }}
                          onClick={() => handleDeleteExposureItem(v.Exposure)}
                          color={theme.colors["truboard-primary"][0]}
                        />
                      </Flex>
                    )}
                  </td>
                </tr>
              ))}
              {isNewFieldAdded && newField.type === "exposure" ? (
                <tr>
                  <td>
                    <TBTextInput
                      placeholder='Enter Exposure'
                      regex={createAllowedCharRegex([])}
                      warningMessage='Special Charater Not Allowed'
                      {...form.getInputProps("exposureType")}
                    />
                  </td>
                  <td>
                    <NumberInput placeholder='Enter amount' type='number' precision={2} hideControls min={0} {...form.getInputProps("exposureAmount")} />
                  </td>
                  <td>
                    <Flex gap='sm'>
                      <img
                        src={crossIcon}
                        style={{ width: "1rem", height: "1rem" }}
                        onClick={() => setIsNewFieldAdded(false)}
                        color={theme.colors["truboard-primary"][0]}
                      />
                      <img src={checkIcon} style={{ width: "1rem", height: "1rem" }} onClick={handleExposureItem} color={theme.colors["truboard-primary"][0]} />
                    </Flex>
                  </td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </Card>
        <Space h={"sm"} />
        <Flex justify={"flex-end"}>
          {/* <TableRow fullWidth title={"Total Amount Verified"} value={<TextInput {...form.getInputProps("totalamount")} disabled />} /> */}
          <Button color='truboard-primary.0' onClick={handelCalculate}>
            Calculate
          </Button>
        </Flex>
        <Space h={"sm"} />
        <TableRow title={"Is Security Cover met?"} value={<TextInput disabled placeholder='' value={isSuecurityCoverMetValue.toString()} />} />
        <TableRow title={"Security Cover"} fullWidth value={<TextInput disabled placeholder='' value={securityCoverValue} />} />
        <TableRow
          title={"As on date"}
          fullWidth
          value={
            <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
              <DatePickerInput label='' valueFormat={DEFAULT_DATE_FORMAT} maxDate={new Date()} {...form.getInputProps("asOnDate")} />
            </DatesProvider>
          }
        />{" "}
        <Space h={"sm"} />
        <Flex justify={"end"}>
          <Button color='truboard-primary.0' type='submit' loading={loader?.updateReProjectSecurity}>
            Update Security Cover
          </Button>
        </Flex>
        <Space h={"sm"} />
      </form>
    </Modal>
  );
};

export default ClaculateSecurityModal;
