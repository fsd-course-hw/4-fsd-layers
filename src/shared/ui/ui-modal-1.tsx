import { ReactNode } from 'react'
import { UiModal } from './ui-modal';
import { UiButton } from './ui-button';

export function UiModal1({
  heading,
  closeButtonText = 'Отмена',
  submitButtonText = 'Обновить',
  onClose,
  onSubmit,
  renderBody,
}: {
  heading: string;
  closeButtonText?: string;
  submitButtonText?: string;
  onClose: () => void;
  onSubmit: () => void;
  renderBody: ReactNode;
}) {
  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>{heading}</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          {renderBody}
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={onClose}>
            {closeButtonText}
          </UiButton>
          <UiButton type="submit" variant="primary">
            {submitButtonText}
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
