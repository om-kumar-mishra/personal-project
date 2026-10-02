import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useCallback, useEffect } from "react";
import { convertDateFormatMMM } from "../../utils/commonFunctions";


interface Column {
    key: string;
    type: string;
  }
  
  interface SearchComponentProps {
    data: any[]; 
    columns: Column[];
    setFilterData: React.Dispatch<React.SetStateAction<string[]>>; 
  }

  
const SearchComponent:React.FC<SearchComponentProps> = ({ data, columns, setFilterData }) => {
  const [search, setSearch] = useState("");

  const handleSearch = useCallback(
    (e:any) => {
      e.preventDefault();
      if (!search) {
        setFilterData(data);
        return;
      }
      const lowercaseSearch = search.toLowerCase();
      const filtered = data.filter((obj) => {
        const keysToSearch = columns.map((v) => v.key);
        const dateTypeKeys = columns
          .filter((v) => v.type === "date")
          .map((v) => v.key);

        return keysToSearch.some((key) => {
          const value = String(
            dateTypeKeys.includes(key)
              ? convertDateFormatMMM(obj[key])
              : obj[key]
          ).toLowerCase();
          return value.includes(lowercaseSearch);
        });
      });

      setFilterData(filtered);
    },
    [data, search, columns]
  );

  useEffect(() => {
    if (!search) setFilterData(data);
  }, [search]);

  return (
    <form className="input-group p-0 mb-2" onSubmit={handleSearch}>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button className="p-2 border" style={{ width: "4em" }} type="submit">
        <FontAwesomeIcon color="#000" size="sm" icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchComponent;
