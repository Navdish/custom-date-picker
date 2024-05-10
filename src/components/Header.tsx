import {Button, FormControl, Grid, IconButton, MenuItem, Select, Box, SelectChangeEvent, MenuList} from '@mui/material';
import React from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import {getMonth, getYear, setMonth, setYear} from 'date-fns';
import { Marker, MARKERS } from './Markers';
import './Header.css'

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
  const currentYear = getYear(new Date());
  console.log(currentYear);
  const limitYear = 2015;
  count = currentYear - limitYear;
  // console.log("last", last, typeof(last))
  return Array(count)
    .fill(0)
    .map((_y, i) =>  limitYear +i ); // TODO: make part of the state
    
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

  const FULLMONTH: any = {0: 'January', 1: "February", 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6:'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December'}
    
  const months = ['Jan', "February",'March', 'April',  'May',  'June', 'July',  'August',  'September', 'October','November', 'December']

  const handleMonthChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => {
    setDate(setMonth(date, parseInt(event.target.value as string, 10)));

  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, parseInt(event.target.value as string, 10)));
  };
  console.log("getMonth(date)", getMonth(date), FULLMONTH[0])
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
            disableUnderline={true}
            IconComponent={false}
            value={getMonth(date)}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {FULLMONTH[selected]}
              </Box>
            )}
            onChange={handleMonthChange}
            MenuProps={{ slotProps:{ 
              paper:{  sx:{width:"300px", height:"175px", padding:"8px 2px 8px 0px",display:"flex", justifyContent:"center", alignItems:"center"}}
              }, 
              MenuListProps: { className: "MonthSelect-MenuListProps"}, 
              disablePortal: true, 
            }}
          >
            {MONTHS.map((month, idx) => (
              <MenuItem key={month} value={idx} className='MonthSelect-MenuItem'>
                {month}
            </MenuItem>
            ))}
          </Select>
        </FormControl>
      
        <FormControl variant="standard">
          <Select
          disableUnderline={true}
            value={getYear(date)}
            onChange={handleYearChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected}
              </Box>
            )}
            MenuProps={{ slotProps:{ 
              paper:{  sx:{width:"300px", height:"175px", padding:"8px 2px 8px 0px",display:"flex", justifyContent:"center", alignItems:"center"}}
              }, 
              MenuListProps: { className: "YearSelect-MenuListProps"}, 
              disablePortal: true, 
            }}
          >
            {generateYears(date, 28).map((year) => (
              <MenuItem key={year} value={year} className='YearSelect-MenuItemProps' >
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
