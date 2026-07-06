import React from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { TemplateRenderer } from '../components/templates/TemplateRenderer';
import { RsvpModal } from '../components/preview/RsvpModal';
import { useActivePreset, useInvitationStore } from '../stores/useInvitationStore';
import { useUIStore } from '../stores/useUIStore';

/**
 * Public invitation page guests open from the shared /invite/:id link.
 * Renders chrome-free (no header/footer) and full screen, exactly like the
 * final invitation.
 *
 * TODO(backend): resolve `id` through `api` (GET /invitations/:id) and render
 * that record. Until the service exists, the locally designed invitation is
 * shown for every id.
 */
export default function InvitePage() {
  const { id } = useParams<{ id: string }>();
  void id;

  const invitation = useInvitationStore(s => s.invitation);
  const activePreset = useActivePreset();
  const isRsvpModalOpen = useUIStore(s => s.isRsvpModalOpen);
  const setRsvpModalOpen = useUIStore(s => s.setRsvpModalOpen);

  return (
    <div className="h-dvh w-full relative overflow-hidden bg-emerald-950">
      <TemplateRenderer
        templateId={activePreset.id}
        invitation={invitation}
        onRsvpClick={() => setRsvpModalOpen(true)}
        mode="live"
      />

      <AnimatePresence>
        {isRsvpModalOpen && <RsvpModal />}
      </AnimatePresence>
    </div>
  );
}
