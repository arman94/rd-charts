'use client';

// @ts-ignore
const Circles = ({ data, keyAccessor, xAccessor, yAccessor, radius = 5 }) => (
  <>
    {/* @ts-ignore */}
    {data.map((d, i) => (
      <circle
        className="Circles__circle"
        key={keyAccessor(d, i)}
        cx={xAccessor(d, i)}
        cy={yAccessor(d, i)}
        //  @ts-ignore
        r={typeof radius == 'function' ? radius(d) : radius}
      />
    ))}
  </>
);

export default Circles;
