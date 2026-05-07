import { ROUNDING_OPTION } from '../constants/RoundingConst';

export function roundTo2Decimals(value: number, roundingType: string): number {
  const shifted = parseFloat((value * 100).toFixed(6));
  switch (roundingType) {
  case ROUNDING_OPTION.ROUND_UP:
    return Math.ceil(shifted) / 100;
  case ROUNDING_OPTION.ROUND_DOWN:
    return Math.floor(shifted) / 100;
  case ROUNDING_OPTION.ROUND_NEAREST:
    return Math.round(shifted) / 100;
  default:
    throw new Error(`Unsupported rounding type: "${roundingType}"`);
  }
}
