import { VariantType } from 'notistack';

export default interface ApiResponse {
  data: any;
  info: string;
  type: VariantType;
}
