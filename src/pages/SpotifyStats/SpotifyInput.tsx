import styled from "styled-components";
import Select from "react-select";
import queryString from "query-string";
import { SfRange } from "types";

import { useUrlQuery } from "hooks/useUrlQuery";
import { useHistory, useLocation } from "react-router-dom";

export const sfRangeOptions = [
  { label: "Overall", value: SfRange.overall },
  { label: "Last 4 Weeks", value: SfRange.fourWeek },
  { label: "Last 6 Weeks", value: SfRange.sixWeek },
];

export const sfLimitOptions = [
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
];

const SpotifyInput = () => {
  const { limit, time_range } = useUrlQuery();
  const history = useHistory();
  const location = useLocation();

  console.log(location);
  const handleLimitChange = ({ value }: any) => {
    history.push(
      location.pathname +
        "?" +
        queryString.stringify({
          limit: value,
          time_range,
        })
    );
  };

  const handleRangeChange = ({ value }: any) => {
    history.push(
      location.pathname +
        "?" +
        queryString.stringify({
          limit,
          time_range: value,
        })
    );
  };

  return (
    <SpotifyInputContainer>
      <SelectGroup>
        <StyledSelect
          isSearchable={false}
          options={sfRangeOptions}
          placeholder="Time range"
          onChange={handleRangeChange}
          theme={selectTheme}
          value={sfRangeOptions.find((option) => {
            return option.value === time_range;
          })}
        />
        <StyledSelect
          isSearchable={false}
          options={sfLimitOptions}
          placeholder="Number of tracks to load (default: 10)"
          onChange={handleLimitChange}
          theme={selectTheme}
          value={sfRangeOptions.find((option) => {
            return option.value === limit;
          })}
        />
      </SelectGroup>
    </SpotifyInputContainer>
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

const SpotifyInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const selectTheme = (theme: any) => ({
  ...theme,
  borderRadius: 0,
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

export default SpotifyInput;
