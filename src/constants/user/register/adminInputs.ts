import REGISTER_FIELD from './fields';

const ADMIN_REGISTER_INPUT = [
  {
    name: REGISTER_FIELD.USERNAME,
    label: 'Nazwa użytkownika',
    type: 'text',
  },
  {
    name: REGISTER_FIELD.PASSWORD,
    label: 'Hasło',
    type: 'password',
  },
  {
    name: REGISTER_FIELD.CONFIRM_PASSWORD,
    label: 'Powtórz hasło',
    type: 'password',
  },
  { name: REGISTER_FIELD.FIRSTNAME, label: 'Imię', type: 'text' },
  { name: REGISTER_FIELD.LASTNAME, label: 'Nazwisko', type: 'text' },
  { name: REGISTER_FIELD.ADDRESS, label: 'Adres', type: 'text' },
  { name: REGISTER_FIELD.TEL, label: 'Telefon', type: 'tel' },
  { name: REGISTER_FIELD.ROLE, label: 'Rola', type: 'radio' },
];

export default ADMIN_REGISTER_INPUT;
