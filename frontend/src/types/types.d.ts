export type Msg = {
  text: string;
};

export type Resp = {
  status: 'OK' | 'Error';
  result: string;
};
