export interface StrictConfig {
  retries: number;
  timeoutMs: number;
}

export const badConfig: StrictConfig = {
  retries: "THREE" as any, // semantic mismatch
  timeoutMs: 5000
};

export const directTypeError: number = "THIS_IS_A_TYPE_ERROR";
