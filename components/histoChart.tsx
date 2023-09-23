'use client';

import { useState } from 'react';
import { useInterval } from '../components/charts/utils';
import { getTimelineData, getScatterData } from '../components/charts/dummy-data';

import { Histogram } from './histogram';

// @ts-ignore
const humidityAccessor = (d) => d.humidity;

const getData = () => ({
  timeline: getTimelineData(),
  scatter: getScatterData(),
});

export default function HistogramChart() {
  const [data, setData] = useState(getData());
  useInterval(() => {
    setData(getData());
  }, 4000);

  return <Histogram data={data.scatter} xAccessor={humidityAccessor} label="Humidity" />;
}
