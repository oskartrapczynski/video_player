import { REGISTER_FIELD } from '@/constants';

export default interface IRegisterState {
  [REGISTER_FIELD.USERNAME]: {
    value: string;
    error: string;
  };
  [REGISTER_FIELD.PASSWORD]: {
    value: string;
    error: string;
  };
  [REGISTER_FIELD.CONFIRM_PASSWORD]: {
    value: string;
    error: string;
  };
  [REGISTER_FIELD.FIRSTNAME]: {
    value: string;
    error: string;
  };
  [REGISTER_FIELD.LASTNAME]: {
    value: string;
    error: string;
  };
  [REGISTER_FIELD.ADDRESS]: {
    value: string;
    error: string;
  };
  [REGISTER_FIELD.TEL]: {
    value: string;
    error: string;
  };
}
