/* eslint-disable @typescript-eslint/no-explicit-any */
export const getSrc = (i: any) => (!i ? '' : (i as any).src ?? i);
