import dayjs from "dayjs";

declare module "dayjs" {
  interface Dayjs {
    isBetween(
      a: dayjs.ConfigType,
      b: dayjs.ConfigType,
      c?: string,
      d?: string
    ): boolean;
  }
}
