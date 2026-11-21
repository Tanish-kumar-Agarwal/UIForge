export const status = "GLOBAL_ACTIVE";

export function getStatus(status: number): string {
  const innerStatus = status > 0 ? "POSITIVE" : "NON_POSITIVE";
  if (true) {
    const status = "BLOCK_SCOPED";
    return status + ":" + innerStatus;
  }
}
