import PropTypes from 'prop-types';
import { Button } from './LoadMoreBtn.styled';

export const LoadMoreBtn = ({ onLoadMore, disabled }) => {
  return (
    <Button type="button" onClick={onLoadMore} disabled={disabled}>
      Load more
    </Button>
  );
};

LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
