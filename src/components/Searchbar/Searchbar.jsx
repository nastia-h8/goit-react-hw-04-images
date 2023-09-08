import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import { Header, Form, Input, Button } from './SearchBar.styled';
import { BsSearch } from 'react-icons/bs';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onSearchInputChange = e => setQuery(e.target.value);

  const onSearchFormSubmit = e => {
    e.preventDefault();

    if (!query) {
      toast('Please enter something to search...', { icon: '🟡' });
      return;
    }

    const uniqueQuery = `${Date.now()}/${query.toLowerCase().trim()}`;
    onSubmit(uniqueQuery);
  };

  return (
    <Header>
      <Form onSubmit={onSearchFormSubmit}>
        <Button type="submit">
          <BsSearch size={20} />
        </Button>
        <Input
          onChange={onSearchInputChange}
          name="query"
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
