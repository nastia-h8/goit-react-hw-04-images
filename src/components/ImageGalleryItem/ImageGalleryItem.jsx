import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ item }) {
  const { tags, webformatURL, largeImageURL } = item;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalToggle = () => setIsModalOpen(prevState => !prevState);

  return (
    <Item onClick={onModalToggle}>
      <Img src={webformatURL} alt={tags} />
      {isModalOpen && (
        <Modal url={largeImageURL} tags={tags} onModalClose={onModalToggle} />
      )}
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
