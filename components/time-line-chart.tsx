'use client';

import { timeParse } from 'd3';

import { useState } from 'react';
import { useInterval } from './charts/elements/utils';
import { getTimelineData, getScatterData } from './charts/elements/dummy-data';

import Timeline from './charts/time-line';

const parseDate = timeParse('%m/%d/%Y');
const dateAccessor = (d: any) => parseDate(d.date);
const temperatureAccessor = (d: any) => d.temperature;

const getData = () => ({
  timeline: getTimelineData(),
  scatter: getScatterData(),
});

export function TimeLineChart() {
  const [data, setData] = useState(getData());
  useInterval(() => {
    setData(getData());
  }, 4000);

  return <Timeline data={data.timeline} xAccessor={dateAccessor} yAccessor={temperatureAccessor} label="Temperature" />;
}
