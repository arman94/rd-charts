export type Dimensions = {
  boundedHeight: number;
  boundedWidth: number;
  height: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  width: number;
};

export type AxisFunctionProps = {
  dimensions: Dimensions;
  dimension: 'x' | 'y';
  scale: any | null;
  formatTick?: ((n: number | { valueOf(): number }) => string) | ((date: Date) => string);
  label?: string;
};
