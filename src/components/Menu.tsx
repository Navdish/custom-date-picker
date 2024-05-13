/* eslint-disable object-curly-newline */
import React from "react";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { differenceInCalendarMonths, format } from "date-fns";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Month from "./Month";
import DefinedRanges from "./DefinedRanges";
import {
  DateRange,
  DefinedRange,
  Setter,
  NavigationAction,
} from "../../types/types";
import { MARKERS } from "./Markers";
import './Menu.css'

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    // eslint-disable-next-line no-unused-vars
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    // eslint-disable-next-line no-unused-vars
    onDayClick: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onDayHover: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  locale?: Locale;
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    locale,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };
  return (
    <Paper
      className="calender-wrapper"
    >
      <Grid container direction="row" wrap="nowrap" >
        <Grid className="side-filters">
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
        
        <Grid className="main-calendar">
          <Grid container sx={{ padding: "5px 60px" }} alignItems="center"  >
            <Grid item sx={{ flex: 1, textAlign: "center" }}>
              <Typography variant="subtitle1" className="date-text">
                {startDate
                  ? format(startDate, "dd MMMM yyyy", { locale })
                  : "Start Date"}
              </Typography>
            </Grid>
            <Grid item sx={{ flex: 1, textAlign: "center" }}>
              <ArrowRightAlt sx={{color: '#787878' }} />
            </Grid>
            <Grid item sx={{ flex: 1, textAlign: "center" }}>
              <Typography variant="subtitle1" className="date-text">
                {endDate
                  ? format(endDate, "dd MMMM yyyy", { locale })
                  : "End Date"}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              locale={locale}
            />
            
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              locale={locale}
            />
          </Grid>
          <Grid container justifyContent="flex-end" >
            <Button sx={{color:"#424242"}}>Clean</Button>
            <Button >Select</Button>
          </Grid>
          
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;
