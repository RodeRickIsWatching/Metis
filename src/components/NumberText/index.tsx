import BigNumber from 'bignumber.js';

const NumberText = ({ value, allowZero }: { value: string | number; allowZero?: boolean }) => {
  const ifNaN = BigNumber(value).isNaN();
  const ifZero = allowZero ? false : BigNumber(value).isZero();

  return ifNaN ? '-' : ifZero ? '-' : value;
};

export default NumberText;
