import { VIDEO_FIELD } from '@/constants';

const VIDEO_INPUT = [
  { name: VIDEO_FIELD.AVAILABLE, label: 'Dostępne', type: 'text' },
  {
    name: VIDEO_FIELD.TITLE,
    label: 'Tytuł',
    type: 'text',
  },
  {
    name: VIDEO_FIELD.GENRE,
    label: 'Gatunek',
    type: 'text',
  },
  {
    name: VIDEO_FIELD.DIRECTOR,
    label: 'Reżyser',
    type: 'text',
  },
  { name: VIDEO_FIELD.LENGTH, label: 'Długość', type: 'text' },
  { name: VIDEO_FIELD.RATE, label: 'Ocena', type: 'number' },
  { name: VIDEO_FIELD.DESCRIPTION, label: 'Opis', type: 'text' },
  { name: VIDEO_FIELD.ACTORS, label: 'Aktorzy', type: 'text' },
  { name: VIDEO_FIELD.RELEASED_AT, label: 'Wydano', type: 'text' },
];

export default VIDEO_INPUT;
