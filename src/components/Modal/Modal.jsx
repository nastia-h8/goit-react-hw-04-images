import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContent } from './Modal.styled';

export function Modal({ url, tags, onModalClose }) {
  useEffect(() => {
    const onEscKeyPress = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', onEscKeyPress);

    return () => {
      window.removeEventListener('keydown', onEscKeyPress);
    };
  }, [onModalClose]);

  return (
    <Overlay>
      <ModalContent>
        <img src={url} alt={tags} />
      </ModalContent>
    </Overlay>
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
