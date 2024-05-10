import {Button, FormControl, Grid, IconButton, MenuItem, Select, Box, SelectChangeEvent, MenuList} from '@mui/material';
import React from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import {getMonth, getYear, setMonth, setYear} from 'date-fns';
import { Marker, MARKERS } from './Markers';

interface HeaderProps {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  locale?: Locale;
  marker:symbol;
}

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  locale,
  marker
}: HeaderProps) => {
  const MONTHS = typeof locale !== 'undefined'
    ? [...Array(12).keys()].map(d => locale.localize?.month(d, {width: 'abbreviated', context: 'standalone'}))
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const handleMonthChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => {
    setDate(setMonth(date, parseInt(event.target.value as string, 10)));

  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, parseInt(event.target.value as string, 10)));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item sx={{ padding: '5px' }}>
        <IconButton
          sx={{
            padding: '10px',
            '&:hover': {
              background: 'none',
            },
          }}
          disabled={prevDisabled}
          onClick={onClickPrevious}
          // size="large"
        >
          {marker === MARKERS.FIRST_MONTH ?<ChevronLeft color={prevDisabled ? 'disabled' : 'action'} />: null}
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getMonth(date)}
            onChange={handleMonthChange}
            MenuProps={{ slotProps:{ 
              paper:{sx:{width:"300px", height:"175px", padding:"8px 2px 8px 0px",display:"flex", justifyContent:"center", alignItems:"center"}}
              }, 
              MenuListProps: { sx: { bgcolor: "none", display:"flex", flexWrap:"wrap", justifyContent:"center", alignItems:"center" } }, 
              disablePortal: true, 
            }}
          >
            {MONTHS.map((month, idx) => (
              <MenuItem key={month} value={idx} sx={{width:"56px", height:"36px", mx:"6px", p:"0px", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
                {month}
            </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getYear(date)}
            onChange={handleYearChange}
            slotProps={{

            }}
            MenuProps={{ disablePortal: true }}
          >
            {generateYears(date, 30).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
      </Grid>
      <Grid item sx={{ padding: '5px' }}>
        <IconButton
          sx={{
            padding: '10px',
            '&:hover': {
              background: 'none',
            },
          }}
          disabled={nextDisabled}
          onClick={onClickNext}
          // size="large"
        >
         {marker === MARKERS.SECOND_MONTH ? <ChevronRight color={nextDisabled ? 'disabled' : 'action'} />: null}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
