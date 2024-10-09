// CustomDay.tsx
import React from 'react';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Dayjs } from 'dayjs';

interface CustomDayProps extends PickersDayProps<Dayjs> {
  startDate: Dayjs;
  endDate: Dayjs;
}

const CustomDay: React.FC<CustomDayProps> = (props) => {
  const { day, startDate, endDate, ...other } = props;

  const isInRange = day.isBetween(startDate, endDate, 'day', '[]');
  const isStart = day.isSame(startDate, 'day');
  const isEnd = day.isSame(endDate, 'day');

  return (
    <PickersDay
      {...other}
      day={day}
      sx={{
        ...(isInRange && {
          backgroundColor: 'rgba(25, 118, 210, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.7)',
          },
        }),
        ...(isStart && {
          backgroundColor: '#1976d2',
          color: 'white',
          '&:hover': {
            backgroundColor: '#1976d2',
          },
        }),
        ...(isEnd && {
          backgroundColor: '#1976d2',
          color: 'white',
          '&:hover': {
            backgroundColor: '#1976d2',
          },
        }),
      }}
    />
  );
};

export default CustomDay;