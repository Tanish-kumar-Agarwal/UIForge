import { formatA } from './circular-a';

export function formatB(val: string): string {
  return "B(" + val + ")->" + (val.length > 5 ? "stop" : formatA(val + "!"));
}
