import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { isSameDay } from "date-fns";
import { DateRange, DefinedRange } from "../../types/types";

type DefinedRangesProps = {
  // eslint-disable-next-line no-unused-vars
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
};

const isSameRange = (first: DateRange, second: DateRange) => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

const DefinedRanges: React.FunctionComponent<DefinedRangesProps> = ({
  ranges,
  setRange,
  selectedRange,
}: DefinedRangesProps) => (
  <List
    sx={{
      boxSizing: "border-box",
      padding: "16px 0px",
      height: "415px",
      alignSelf: "stretch",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    }}
  >
    {ranges.map((range, idx) => (
      <ListItem
        button
        key={idx}
        onClick={() => setRange(range)}
        sx={{ padding: "0 16px" }}
      >
        <ListItemText
          primaryTypographyProps={{
            sx: {
              color: isSameRange(range, selectedRange) ? "#01579B" : "#424242",
              fontFeatureSettings: "'clig' off, 'liga' off",
              fontFamily: "Open Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "150%" /* 21px */,
              letterSpacing: "0.15px",
            },
          }}
        >
          {range.label}
        </ListItemText>
      </ListItem>
    ))}
  </List>
);

export default DefinedRanges;
