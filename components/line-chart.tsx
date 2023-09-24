'use client';

import { timeParse } from 'd3';

import { useState } from 'react';
import { useInterval } from './charts/elements/utils';
import { getTimelineData, getScatterData } from './charts/elements/dummy-data';

import { LineChart as Line } from './charts/line';

const parseDate = timeParse('%m/%d/%Y');
const dateAccessor = (d: any) => parseDate(d.date);
const temperatureAccessor = (d: any) => d.temperature;

const getData = () => ({
  timeline: getTimelineData(),
  scatter: getScatterData(),
});

export default function LineChart() {
  const [data, setData] = useState(getData());
  useInterval(() => {
    setData(getData());
  }, 4000);

  return <Line data={data.timeline} xAccessor={dateAccessor} yAccessor={temperatureAccessor} label="Temperature" />;
}
