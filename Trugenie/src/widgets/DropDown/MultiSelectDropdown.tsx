import React, { useCallback, useState } from "react";
import "./MultiSelectDropdown.css";
import OutsideAlerter from "../../modules/Components/OutsideAlerter";

interface Option {
  label: string;
  value: string;
}

interface Group {
  label: string;
  options: Option[];
}

interface Props {
  options: Group[];
  selectedOptions: Option[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

const MultiSelectDropdown: React.FC<Props> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const allOptions = options.flatMap((group) => group.options);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <OutsideAlerter setShowDropdown={setShowDropdown}>
      <div
        className="rmsc select main-body disable-select"
        onClick={toggleDropdown}
      >
        <div tabIndex={0} className="dropdown-container">
          <div className="dropdown-heading">
            <div className="dropdown-heading-value">
              <span>
                {selectedOptions.length === 0
                  ? "Select..."
                  : selectedOptions.length === allOptions.length
                  ? "ALL"
                  : selectedOptions.map((option) => option.label).join(", ")}
              </span>
            </div>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="dropdown-heading-dropdown-arrow gray"
            >
              <path
                d={showDropdown ? "M18 15 12 9 6 15" : "M6 9L12 15 18 9"}
              />
            </svg>
          </div>
        </div>
      </div>
      {showDropdown && (
        <div className="dropdown-container-group">
          <CheckboxList
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            options={options}
            allOptions={allOptions}
          />
        </div>
      )}
    </OutsideAlerter>
  );
};

interface CheckboxListProps {
  options: Group[];
  allOptions: Option[];
  selectedOptions: Option[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  options,
  allOptions,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);

  const containsAll = (value: Option[]) =>
    value.every((valObj) =>
      selectedOptions.some(
        (checkObj) =>
          checkObj.label === valObj.label && checkObj.value === valObj.value
      )
    );

  const handleAllChecked = (catOp: Option[]) => {
    if (containsAll(catOp)) {
      const filteredCheckarr = selectedOptions.filter(
        (checkObj) =>
          !catOp.some(
            (valObj) =>
              valObj.label === checkObj.label && valObj.value === checkObj.value
          )
      );
      setSelectedOptions(filteredCheckarr);
    } else setSelectedOptions([...selectedOptions, ...catOp]);
  };

  const exists = (checkObj: Option) =>
    selectedOptions.some(
      (obj) => obj.label === checkObj.label && obj.value === checkObj.value
    );

  const handleCheckChildElement = (checkObj: Option) => {
    if (exists(checkObj)) {
      setSelectedOptions(
        selectedOptions.filter((v) => v.value !== checkObj.value)
      );
    } else {
      setSelectedOptions([...selectedOptions, checkObj]);
    }
  };

  const handleSearch = useCallback(
    (search: string) => {
      if (!search) {
        setFilteredOptions(options);
        return;
      }
      const filtered = options
        .map((group) => ({
          ...group,
          options: group.options.filter((option) =>
            Object.values(option).some((value) =>
              String(value).toLowerCase().includes(search.toLowerCase())
            )
          ),
        }))
        .filter((group) => group.options.length > 0);

      setFilteredOptions(filtered);
    },
    [options]
  );

  return (
    <div>
      <input
        className="multi-select-dropdown-search main-body"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <div className="CheckboxList">
        <div className="d-flex list-item-padding">
          <input
            type="checkbox"
            onChange={() => {
              selectedOptions.length === allOptions.length
                ? setSelectedOptions([])
                : setSelectedOptions(allOptions);
            }}
            value="ALL"
            checked={selectedOptions.length === allOptions.length}
          />
          <span style={{ paddingLeft: "4px" }}>ALL</span>
        </div>
        {filteredOptions.map((item) => (
          <div key={item.label} style={{ color: "#c22525" }}>
            <span className="d-flex">
              <input
                type="checkbox"
                onChange={() => handleAllChecked(item.options)}
                value={item.label}
                checked={containsAll(item.options)}
              />
              <span style={{ paddingLeft: "4px" }}>{item.label}</span>
            </span>
            <ul className="ul-list">
              {item.options.map((option) => (
                <CheckBox
                  key={`${item.label}-${option.value}`}
                  handleCheckChildElement={() =>
                    handleCheckChildElement(option)
                  }
                  isChecked={exists(option)}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CheckBoxProps {
  key: string;
  handleCheckChildElement: () => void;
  isChecked: boolean;
  value: string;
  label: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  key,
  handleCheckChildElement,
  isChecked,
  value,
  label,
}) => {
  return (
    <li className="d-flex" style={{ listStyleType: "none", padding: "5px" }}>
      <input
        key={key}
        onChange={handleCheckChildElement}
        type="checkbox"
        checked={isChecked}
        value={value}
      />
      <span style={{ paddingLeft: "4px" }}>{label}</span>
    </li>
  );
};

export default MultiSelectDropdown;
