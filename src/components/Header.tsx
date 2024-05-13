import {
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Box,
  SelectChangeEvent,
  MenuList,
} from "@mui/material";
import React from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { getMonth, getYear, setMonth, setYear } from "date-fns";
import { Marker, MARKERS } from "./Markers";
import "./Header.css";

interface HeaderProps {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  locale?: Locale;
  marker: symbol;
}

const generateYears = (relativeTo: Date, count: number) => {
  const currentYear = getYear(new Date());
  const startYear = currentYear - count + 1;
  return Array(count)
    .fill(0)
    .map((_y, i) => startYear + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  locale,
  marker,
}: HeaderProps) => {
  const MONTHS =
    typeof locale !== "undefined"
      ? [...Array(12).keys()].map((d) =>
          locale.localize?.month(d, {
            width: "abbreviated",
            context: "standalone",
          })
        )
      : [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUNE",
          "JULY",
          "AUG",
          "SEPT",
          "OCT",
          "NOV",
          "DEC",
        ];

  const FULLMONTH: any = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  const handleMonthChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    setDate(setMonth(date, parseInt(event.target.value as string, 10)));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, parseInt(event.target.value as string, 10)));
  };
  const month = getMonth(date);
  const year = getYear(date);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      padding={"16px 12px 8px 24px"}
    >
      <Grid item sx={{ width: "24px", height: "24px" }}>
        <IconButton
          sx={{
            padding: 0,
            "&:hover": {
              background: "none",
            },
          }}
          disabled={prevDisabled}
          onClick={onClickPrevious}
          // size="large"
        >
          {marker === MARKERS.FIRST_MONTH ? (
            <ChevronLeft color={prevDisabled ? "disabled" : "action"} />
          ) : null}
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl variant="standard" >
          <Select
            className="Month-Select"
            disableUnderline={true}
            IconComponent={React.Fragment}
            value={getMonth(date)}
            renderValue={(selected) => (
              <Box className="selected-month" sx={{  }}>
                {FULLMONTH[selected]}
              </Box>
            )}
            onChange={handleMonthChange}
            MenuProps={
              {
                className: 'MenuProps',
              slotProps: {
                paper: {
                  className: 'MenuList-paper',
                },
              },
              MenuListProps: { className: "MonthSelect-MenuListProps" },
              disablePortal: true,
            }}
          >
            {MONTHS.map((month, idx) => (
              <MenuItem
                key={month}
                value={idx}
                disabled={
                  idx > getMonth(new Date()) &&
                  getYear(date) === getYear(new Date())
                }
                className="MonthSelect-MenuItem"
              >
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" >
          <Select
            disableUnderline={true}
            value={getYear(date)}
            onChange={handleYearChange}
            renderValue={(selected) => (
              <Box className="selected-year">
                {selected}
              </Box>
            )}
            MenuProps={{
              slotProps: {
                paper: {
                  className: 'MenuList-paper',
                },
              },
              MenuListProps: { className: "YearSelect-MenuListProps" },
              disablePortal: true,
            }}
          >
            {generateYears(date, 28).map((year) => (
              <MenuItem
                key={year}
                value={year}
                className="YearSelect-MenuItemProps"
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ width: "24px", height: "24px" }}>
        <IconButton
          sx={{
            padding: 0,
            "&:hover": {
              background: "none",
            },
          }}
          disabled={
            nextDisabled ||
            (month >= getMonth(new Date()) && year >= getYear(new Date()))
          }
          onClick={onClickNext}
        >
          {marker === MARKERS.SECOND_MONTH ? (
            <ChevronRight color={nextDisabled ? "disabled" : "action"} />
          ) : null}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
