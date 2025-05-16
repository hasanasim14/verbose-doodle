// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tempSessionID: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setTempSessionID = (val: any) => {
  tempSessionID = val;
};

export const getTempSessionID = () => tempSessionID;
