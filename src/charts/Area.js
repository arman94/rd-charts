import React, { useEffect, useCallback } from 'react';
import * as d3 from 'd3';

export default function Area() {
  const data = [
    {
      date: '2018-03-06',
      value: 11500.1,
    },
    {
      date: '2018-03-07',
      value: 10929.5,
    },
    {
      date: '2018-03-08',
      value: 10147.4,
    },
    {
      date: '2018-03-09',
      value: 9466.35,
    },
    {
      date: '2018-03-10',
      value: 9531.32,
    },
    {
      date: '2018-03-11',
      value: 9711.89,
    },
    {
      date: '2018-03-12',
      value: 9937.5,
    },
    {
      date: '2018-03-13',
      value: 9470.38,
    },
    {
      date: '2018-03-14',
      value: 9355.85,
    },
    {
      date: '2018-03-15',
      value: 8428.35,
    },
    {
      date: '2018-03-16',
      value: 8585.15,
    },
    {
      date: '2018-03-17',
      value: 8346.53,
    },
    {
      date: '2018-03-18',
      value: 8245.51,
    },
    {
      date: '2018-03-19',
      value: 8675.87,
    },
    {
      date: '2018-03-20',
      value: 9051.02,
    },
    {
      date: '2018-03-21',
      value: 9177.37,
    },
    {
      date: '2018-03-22',
      value: 9100.71,
    },
    {
      date: '2018-03-23',
      value: 8879.62,
    },
    {
      date: '2018-03-24',
      value: 8996.18,
    },
    {
      date: '2018-03-25',
      value: 8682.01,
    },
    {
      date: '2018-03-26',
      value: 8530.08,
    },
    {
      date: '2018-03-27',
      value: 8232.78,
    },
    {
      date: '2018-03-28',
      value: 8122.89,
    },
    {
      date: '2018-03-29',
      value: 7994.33,
    },
    {
      date: '2018-03-30',
      value: 7276.66,
    },
    {
      date: '2018-03-31',
      value: 7207.85,
    },
    {
      date: '2018-04-01',
      value: 7060.95,
    },
    {
      date: '2018-04-02',
      value: 7135.47,
    },
    {
      date: '2018-04-03',
      value: 7530.94,
    },
    {
      date: '2018-04-04',
      value: 7469.88,
    },
    {
      date: '2018-04-05',
      value: 6933.82,
    },
    {
      date: '2018-04-06',
      value: 6857.49,
    },
    {
      date: '2018-04-07',
      value: 7050.54,
    },
    {
      date: '2018-04-08',
      value: 7111.56,
    },
    {
      date: '2018-04-09',
      value: 7178.11,
    },
    {
      date: '2018-04-10',
      value: 6872.41,
    },
    {
      date: '2018-04-11',
      value: 6968.32,
    },
    {
      date: '2018-04-12',
      value: 7899.23,
    },
    {
      date: '2018-04-13',
      value: 8183.96,
    },
    {
      date: '2018-04-14',
      value: 8140.71,
    },
    {
      date: '2018-04-15',
      value: 8338.42,
    },
    {
      date: '2018-04-16',
      value: 8371.15,
    },
    {
      date: '2018-04-17',
      value: 8285.96,
    },
    {
      date: '2018-04-18',
      value: 8197.8,
    },
    {
      date: '2018-04-19',
      value: 8298.69,
    },
    {
      date: '2018-04-20',
      value: 8880.23,
    },
    {
      date: '2018-04-21',
      value: 8997.57,
    },
    {
      date: '2018-04-22',
      value: 9001.64,
    },
    {
      date: '2018-04-23',
      value: 8958.55,
    },
  ].map((d) => ({ date: d3.timeParse('%Y-%m-%d')(d.date), value: d.value }));

  const height = 500,
    width = 800;
  const margin = { top: 20, right: 20, bottom: 30, left: 30 };

  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const xAxis = useCallback(
    (g) => {
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );
    },
    [margin.bottom, x]
  );

  const yAxis = useCallback(
    (g) => {
      g.attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .select('.tick:last-of-type text')
            .clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text(data.y)
        );
    },
    [margin.left, y, data.y]
  );

  const area = d3
    .area()
    .curve(d3.curveLinear)
    .x((d) => {
      return x(d.date);
    })
    .y0(y(0))
    .y1((d) => {
      return y(d.value);
    });

  useEffect(() => {
    const svg = d3.select('#htmlSpace');
    svg
      .append('path')
      .datum(data)
      .attr('fill', '#003452')
      .attr('d', (d) => area(d));
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
  }, [area, xAxis, yAxis, data]);

  return <svg id='htmlSpace' viewBox={`0 0 ${width} ${height}`} />;
}
