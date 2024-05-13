import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import './Day.css'
interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
  dayValue: Number;
}

const Day: React.FunctionComponent<DayProps> = ({
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  outlined,
  filled,
  onClick,
  onHover,
  value,
  dayValue,
}: DayProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: !disabled && highlighted ? "#DBEAF8": undefined,
        ...(!disabled && !highlighted  ? {'&:hover': {
          borderRadius: '0 50% 50% 0'
        }}: {}),
        borderRadius: startOfRange  ? '50% 0 0 50%' : endOfRange || (dayValue === 6)  ? '0 50% 50% 0' :  (dayValue === 0) ? '50% 0 0 50%' : undefined,
      }}
    >
      <IconButton
        sx={{
          height: '36px',
          width: '36px',
          padding: 0,
          border: (theme) => !disabled && outlined ? `1px solid #E0E0E0` : undefined,
          ...(!disabled && filled ? {
            '&:hover': {
              backgroundColor: "#01579B",
            },
            backgroundColor:"#01579B"
          } : {}),
          
        }}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
      >
        <Typography
          sx={{
            color: (theme) => !disabled
              ? (filled ? theme.palette.primary.contrastText : theme.palette.text.primary)
              : theme.palette.text.secondary,
          }}

          className='date-value'
          
        >
          {value}
        </Typography>
      </IconButton>
    </Box>
  );
};

export default Day;
