import { Invitation } from '../../types';

export interface TemplateProps {
  invitation: Invitation;
  onRsvpClick: () => void;
  mode?: 'preview' | 'live';
}
