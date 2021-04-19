import { WeightValue } from "../components/Weight";

export function groupArray<T>(data: Array<T>, n: number) {
  const group: T[][] = [];
  for (let i = 0, j = 0; i < data.length; i++) {
      if (i >= n && i % n === 0)
          j++;
      group[j] = group[j] || [];
      group[j].push(data[i]);
  }

  return group;
}

export function sum(weights: WeightValue[]) {
  return weights.reduce((result, weight) => {
    result = result + weight.value;
    return result;
  }, 0).toFixed(1)
}

export function replace<T>(
  arr: T[],
  predicate: (elem: T) => boolean,
  props: Partial<T>
) {
  const idx = arr.findIndex(predicate);
  const newOne: T = { ...arr[idx], ...props };

  return Object.assign([...arr], { [idx]: newOne });
}

// console.log(groupArr(Array.from({length: 10}).map(() => Math.round(Math.random()* 1000)), 3));
