 export interface IRespApi <T> {
  ok: boolean;
  token?: string;
  data: T[] | T;
  message?: string;
}
