import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';

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
        // eslint-disable-next-line no-nested-ternary
        borderRadius: startOfRange || (dayValue === 0) ? '50% 0 0 50%' : endOfRange || (dayValue === 6)  ? '0 50% 50% 0' : undefined,
        backgroundColor: !disabled && highlighted ? "#DBEAF8": undefined,
        ...(!disabled && !highlighted  ? {'&:hover': {
          borderRadius: '0 50% 50% 0'
        }}: {}),
        // borderTop: !disabled && highlighted ? "1px dashed black" : undefined,
        // borderBottom: !disabled && highlighted ? "1px dashed black" : undefined,
      }}
    >
      <IconButton
        sx={{
          height: '36px',
          width: '36px',
          padding: 0,
          // borderRadius: "0.4rem",
          border: (theme) => !disabled && outlined ? `1px solid ${theme.palette.primary.dark}` : undefined,
          ...(!disabled && filled ? {
            '&:hover': {
              backgroundColor: "#1565C0",
            },
            backgroundColor:"#1565C0"
          } : {}),
          
        }}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
        // size="large"
      >
        <Typography
          sx={{
            lineHeight: 1.6,
            color: (theme) => !disabled
              ? (filled ? theme.palette.primary.contrastText : theme.palette.text.primary)
              : theme.palette.text.secondary,
          }}
          variant="body2"
        >
          {value}
        </Typography>
      </IconButton>
    </Box>
  );
};

export default Day;
