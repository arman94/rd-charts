import { ComponentPropsWithoutRef } from 'react';

type GradientProps = {
  id: string;
  colors: string[];
} & ComponentPropsWithoutRef<'linearGradient'>;

export default function Gradient({ id = 'Gradient', colors = [], ...props }: GradientProps) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" spreadMethod="pad" {...props}>
      {colors.map((color, i) => (
        <stop key={color + i} offset={`${(i * 100) / (colors.length - 1)}%`} stopColor={color} />
      ))}
    </linearGradient>
  );
}
