export default interface AxiosClientDto {
  method?: string;
  params?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  token?: string;
  header?: string;
  forceLogout?: () => void;
}
