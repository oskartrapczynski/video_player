import { VIDEO_FIELD } from '@/constants';

export default interface VideoState {
  [VIDEO_FIELD.ID]?: {
    value: string;
    error: string;
  };
  [VIDEO_FIELD.AVAILABLE]: {
    value: boolean;
    error: string;
  };
  [VIDEO_FIELD.TITLE]: {
    value: string;
    error: string;
  };
  [VIDEO_FIELD.GENRE]: {
    value: string;
    error: string;
  };
  [VIDEO_FIELD.DIRECTOR]: {
    value: string;
    error: string;
  };
  [VIDEO_FIELD.LENGTH]: {
    value: string;
    error: string;
  };
  [VIDEO_FIELD.RATE]: {
    value: number;
    error: string;
  };
  [VIDEO_FIELD.DESCRIPTION]: {
    value: string;
    error: string;
  };
  [VIDEO_FIELD.ACTORS]: {
    value: string;
    error: string;
  };
  [VIDEO_FIELD.RELEASED_AT]: {
    value: string;
    error: string;
  };
  [VIDEO_FIELD.AVAILABLE]: {
    value: boolean;
    error: string;
  };
}
