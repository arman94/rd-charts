import React, { Component } from 'react'
import * as d3 from 'd3'

const data = [
  {
    name: 'Mycobacterium tuberculosis',
    penicillin: 800,
    streptomycin: 5,
    neomycin: 2,
    gram: 'negative'
  },
  {
    name: 'Salmonella schottmuelleri',
    penicillin: 10,
    streptomycin: 0.8,
    neomycin: 0.09,
    gram: 'negative'
  },
  {
    name: 'Proteus vulgaris',
    penicillin: 3,
    streptomycin: 0.1,
    neomycin: 0.1,
    gram: 'negative'
  },
  {
    name: 'Klebsiella pneumoniae',
    penicillin: 850,
    streptomycin: 1.2,
    neomycin: 1,
    gram: 'negative'
  },
  {
    name: 'Brucella abortus',
    penicillin: 1,
    streptomycin: 2,
    neomycin: 0.02,
    gram: 'negative'
  },
  {
    name: 'Pseudomonas aeruginosa',
    penicillin: 850,
    streptomycin: 2,
    neomycin: 0.4,
    gram: 'negative'
  },
  {
    name: 'Escherichia coli',
    penicillin: 100,
    streptomycin: 0.4,
    neomycin: 0.1,
    gram: 'negative'
  },
  {
    name: 'Salmonella (Eberthella) typhosa',
    penicillin: 1,
    streptomycin: 0.4,
    neomycin: 0.008,
    gram: 'negative'
  },
  {
    name: 'Aerobacter aerogenes',
    penicillin: 870,
    streptomycin: 1,
    neomycin: 1.6,
    gram: 'negative'
  },
  {
    name: 'Brucella antracis',
    penicillin: 0.001,
    streptomycin: 0.01,
    neomycin: 0.007,
    gram: 'positive'
  },
  {
    name: 'Streptococcus fecalis',
    penicillin: 1,
    streptomycin: 1,
    neomycin: 0.1,
    gram: 'positive'
  },
  {
    name: 'Staphylococcus aureus',
    penicillin: 0.03,
    streptomycin: 0.03,
    neomycin: 0.001,
    gram: 'positive'
  },
  {
    name: 'Staphylococcus albus',
    penicillin: 0.007,
    streptomycin: 0.1,
    neomycin: 0.001,
    gram: 'positive'
  },
  {
    name: 'Streptococcus hemolyticus',
    penicillin: 0.001,
    streptomycin: 14,
    neomycin: 10,
    gram: 'positive'
  },
  {
    name: 'Streptococcus viridans',
    penicillin: 0.005,
    streptomycin: 10,
    neomycin: 40,
    gram: 'positive'
  },
  {
    name: 'Diplococcus pneumoniae',
    penicillin: 0.005,
    streptomycin: 11,
    neomycin: 10,
    gram: 'positive'
  }
]

const dataCategory = ['penicillin', 'streptomycin', 'neomycin']

class RadialBarChart extends Component {
  state = {
    barContainers: [],
    bars: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const bigDeg = 360 / (data.length + 1),
      innerRadius = 90,
      outerRadius = 300 - 10,
      min = Math.sqrt(Math.log(0.001 * 1e4)),
      max = Math.sqrt(Math.log(1000 * 1e4)),
      bigAngle = (Math.PI * 2) / (data.length + 1),
      smallAngle = bigAngle / 7

    const radius = mic => {
      let a = (outerRadius - innerRadius) / (min - max),
        b = innerRadius - a * max

      return a * Math.sqrt(Math.log(mic * 1e4)) + b
    }

    const bgWedge = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0)
      .endAngle(bigAngle)

    const barContainers = data.map((d, i) => {
      const path = bgWedge(i)

      return { path }
    })

    const arcGen = d3.arc()

    const bars = dataCategory.map((dc, dci) => {
      const bar21 = data.map((d, di) => {
        const bar = {
          path: arcGen({
            innerRadius: innerRadius,
            outerRadius: radius(d[dc]),
            startAngle: smallAngle * (dci * 2 + 1),
            endAngle: smallAngle * (dci * 2 + 2)
          }),
          className: dc
        }

        return bar
      })

      return bar21
    })

    return { barContainers, bars }
  }

  render() {
    const width = 680,
      height = 680,
      margin = { top: 0, right: 0, bottom: 50, left: 0 },
      bigDeg = 360 / (data.length + 1),
      innerRadius = 90,
      outerRadius = 300 - 10,
      min = Math.sqrt(Math.log(0.001 * 1e4)),
      max = Math.sqrt(Math.log(1000 * 1e4))

    const radius = mic => {
      let a = (outerRadius - innerRadius) / (min - max),
        b = innerRadius - a * max

      return a * Math.sqrt(Math.log(mic * 1e4)) + b
    }

    return (
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        fill='#f0e1d2'>
        <g
          transform={`translate(${margin.left + width / 2},${margin.top +
            height / 2})`}>
          {this.state.barContainers.map((d, i) => (
            <g
              key={i}
              className='bacteria'
              transform={`rotate(${bigDeg * (i + 0.5)})`}>
              <path className={data[i].gram} d={d.path} fill='#e6826e' />
              {this.state.bars.map((d, idd) => (
                <path
                  key={idd}
                  d={d[i].path}
                  className={`antibiotic ${d[i].className}`}
                />
              ))}
            </g>
          ))}

          <g></g>

          <g className='axis'>
            {d3.range(-3, 4).map(d => (
              <g key={d} className='tick'>
                <circle r={radius(Math.pow(10, d))}></circle>
                <text
                  dy='.32em'
                  y={-radius(Math.pow(10, d))}
                  textAnchor='middle'>
                  {d < 3 ? Math.pow(10, d).toFixed(d > 0 ? 0 : -d) : ''}
                </text>
              </g>
            ))}
          </g>

          {data.map((d, i) => (
            <line
              key={i}
              className='separator'
              transform={`rotate(${180 + bigDeg * (i + 0.5)})`}
              y1={innerRadius * 0.84}
              y2={outerRadius * 1.1}></line>
          ))}
          <line
            className='separator'
            transform={`rotate(${180 + bigDeg * (data.length + 0.5)})`}
            y1={innerRadius * 0.84}
            y2={outerRadius * 1.1}></line>

          {data.map((d, i) => (
            <text
              key={i}
              className='label'
              dy='.32em'
              x={
                i + 1 > data.length / 2 ? -outerRadius * 1.1 : outerRadius * 1.1
              }
              textAnchor={i + 1 > data.length / 2 ? 'start' : 'end'}
              transform={`rotate(${(i + 1 > data.length / 2 ? 90 : -90) +
                bigDeg * (i + 1)})`}
              y1={innerRadius * 0.84}
              y2={outerRadius * 1.1}>
              {d.name}
            </text>
          ))}

          <g className='antibiotic legend'>
            {['penicillin', 'streptomycin', 'neomycin'].map((d, i) => (
              <g
                key={i}
                className={d}
                transform={`translate(-8,${-18 + i * 18})`}>
                <text className='label' dy='.32em' x='3'>
                  {d[0].toUpperCase() + d.slice(1)}
                </text>
                <rect x='-40' y='-4' width='36' height='8'></rect>
              </g>
            ))}
          </g>

          <g className='gram legend'>
            {['negative', 'positive'].map((d, index) => (
              <g
                key={index}
                className={d}
                transform={`translate(0,${height / 2 + index * 18})`}>
                <text className='label' dy='.32em' x='3'>
                  Gram-{d}
                </text>
                <circle cx='-12' r='5'></circle>
              </g>
            ))}
          </g>
        </g>
      </svg>
    )
  }
}

export { RadialBarChart }
