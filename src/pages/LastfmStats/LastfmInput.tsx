import Select from "react-select";
import { useState, Dispatch, SetStateAction } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { LfParams, LfMethod, LfPeriod } from "types";

export const lfMethodOptions = [
  { label: "Top Tracks", value: LfMethod.topTracks },
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
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({ startDate: new Date(), endDate: new Date() });

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

  const handleRangeChange = (ranges: any) => {
    setDateRange(ranges.range1);

    let newParams = { ...lfParams };
    newParams["from"] = Math.floor(ranges.range1.startDate / 1000);
    newParams["to"] = Math.floor(ranges.range1.endDate / 1000);
    setLfParams(newParams);
  };

  return (
    <>
      <Select
        options={lfMethodOptions}
        placeholder="method"
        onChange={handleMethodChange}
        value={lfMethodOptions.find((option) => {
          return option.value === lfParams.method;
        })}
      />
      {lfParams.method === LfMethod.topTracks ? (
        <Select
          options={lfPeriodOptions}
          placeholder="period"
          onChange={handlePeriodChange}
          value={lfPeriodOptions.find((option) => {
            return option.value === lfParams.period;
          })}
        />
      ) : (
        ""
      )}
      {lfParams.method === LfMethod.weeklyTrackChart ? (
        <DateRangePicker ranges={[dateRange]} onChange={handleRangeChange} />
      ) : (
        ""
      )}
      <input
        id="user"
        type="text"
        placeholder="lastfm username"
        onChange={handleInputChange}
        value={lfParams.user}
      />
      <input
        id="limit"
        type="number"
        placeholder="limit"
        onChange={handleInputChange}
        value={lfParams.limit}
      />
    </>
  );
};

export default LastfmInput;
