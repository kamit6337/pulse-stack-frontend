type PingBase = {
  _id: string;
  name: string;
  url: string;
  email: string;
  expectCode: number;
};

export type Ping =
  | (PingBase & {
      responseType: "text";
      expectText: string;
      expectJson?: never;
    })
  | (PingBase & {
      responseType: "json";
      expectJson: string;
      expectText?: never;
    });
