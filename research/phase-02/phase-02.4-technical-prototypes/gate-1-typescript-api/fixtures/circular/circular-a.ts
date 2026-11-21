import { formatB } from './circular-b';

export function formatA(val: string): string {
  return "A[" + val + "]->" + (val.length > 5 ? "stop" : formatB(val + "."));
}
