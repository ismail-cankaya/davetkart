import { Invitation } from '../../types';

export interface TemplateProps {
  invitation: Invitation;
  bgImage: string;
  onRsvpClick: () => void;
}
