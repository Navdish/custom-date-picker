"use client"
import React from "react";
import  DateRangePicker from "../components/DateRangePicker";
import { DateRange } from "../../types/types";

export default function Home() {
  const [open, setOpen] = React.useState(true);
  const [dateRange, setDateRange] = React.useState<DateRange>({});

  const toggle = () => setOpen(!open);

  return (
    <>
    <DateRangePicker
      open={open}
      // toggle={toggle}
      onChange={(range:any) => setDateRange(range)}
    />
    </>
  );
}
