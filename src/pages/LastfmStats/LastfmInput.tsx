import styled from "styled-components";
import Select from "react-select";
import { Dispatch, SetStateAction } from "react";
import { DateRange, LfParams, LfMethod, LfPeriod } from "types";

import DateRangeInput from "components/DateRangeInput";

export const lfMethodOptions = [
  { label: "Recent Top Tracks", value: LfMethod.topTracks },
  { label: "Specific Time Period", value: LfMethod.weeklyTrackChart },
];

export const lfPeriodOptions = [
  { label: "Overall", value: LfPeriod.overall },
  { label: "Last 7 days", value: LfPeriod.week },
  { label: "Last month", value: LfPeriod.month },
  { label: "Last 3 months", value: LfPeriod.quarter },
  { label: "Last 6 months", value: LfPeriod.half },
  { label: "Last year", value: LfPeriod.year },
];

interface Props {
  lfParams: LfParams;
  setLfParams: Dispatch<SetStateAction<LfParams>>;
}

const LastfmInput = ({ lfParams, setLfParams }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newParams = { ...lfParams };
    if (e.target.id === "user") {
      newParams[e.target.id] = e.target.value as string;
    } else if (e.target.id === "limit" || e.target.id === "page") {
      newParams[e.target.id] = Number(e.target.value);
    }
    setLfParams(newParams);
  };

  const handleMethodChange = ({ value }: any) => {
    let newParams = { ...lfParams };
    newParams["method"] = value;
    setLfParams(newParams);
  };

  const handlePeriodChange = ({ value }: any) => {
    let newParams = { ...lfParams };
    newParams["period"] = value;
    setLfParams(newParams);
  };

  const handleRangeChange = (value: DateRange) => {
    console.log({ value });
    let newParams = { ...lfParams };
    newParams["from"] = value?.startDate
      ? Math.floor(value.startDate.unix())
      : undefined;
    newParams["to"] = value?.endDate
      ? Math.floor(value.endDate.unix())
      : undefined;

    setLfParams(newParams);
  };

  return (
    <LastfmInputContainer>
      <InputGroup>
        <StyledInput
          id="user"
          type="text"
          placeholder="LastFM username"
          onChange={handleInputChange}
          value={lfParams.user}
          autoComplete="off"
        />
        <StyledInput
          id="limit"
          type="number"
          placeholder="Maximum tracks to load (default: 50)"
          onChange={handleInputChange}
          value={lfParams.limit}
          autoComplete="off"
        />
      </InputGroup>
      <SelectGroup>
        <StyledSelect
          isSearchable={false}
          options={lfMethodOptions}
          placeholder="method"
          onChange={handleMethodChange}
          theme={selectTheme}
          value={lfMethodOptions.find((option) => {
            return option.value === lfParams.method;
          })}
        />
        {lfParams.method === LfMethod.topTracks ? (
          <StyledSelect
            isSearchable={false}
            options={lfPeriodOptions}
            placeholder="period"
            onChange={handlePeriodChange}
            theme={selectTheme}
            value={lfPeriodOptions.find((option) => {
              return option.value === lfParams.period;
            })}
          />
        ) : (
          ""
        )}
      </SelectGroup>
      {lfParams.method === LfMethod.weeklyTrackChart ? (
        <>
          <br />
          <DateRangeInput
            handleChange={handleRangeChange}
            dateRangeInitial={{ startDate: null, endDate: null }}
          />
        </>
      ) : (
        ""
      )}
    </LastfmInputContainer>
  );
};

const StyledSelect = styled(Select)``;

const SelectGroup = styled("div")`
  display: flex;
  width: 80%;
  justify-content: space-between;

  ${StyledSelect} {
    width: 48%;
  }
`;

const StyledInput = styled.input`
  width: 48%;
  background: none;
  border: none;
  border-bottom: 1px solid #fff;
  height: 38px;
  outline: none;
  color: #fff;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputGroup = styled("div")`
  display: flex;
  width: 80%;
  margin-bottom: 10px;
  justify-content: space-between;

  ${StyledInput}:focus {
    border-bottom: 2px solid #1db954;
  }
`;

const LastfmInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const selectTheme = (theme: any) => ({
  ...theme,
  borderRadius: 4,
  colors: {
    ...theme.colors,
    neutral0: "black",
    neutral80: "#eee",
    neutral90: "#fff",
    primary: "#1db954",
    primary25: "#1db95466",
    primary50: "#1db95499",
  },
});

export default LastfmInput;
