import { useState, useEffect, useLayoutEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { onWindowScroll } from 'helpers/smoothScrollBy';
import * as pixabayAPI from '../services/pixabay-api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader';
import { Message } from './Message/Message';
import { ScrollToTopBtn } from './ScrollToTopBtn/ScrollToTopBtn';

import { GlobalStyle } from './GlobalStyle';
import { Layout } from 'components/Layout';

export function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // http request
  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const queryToSearch = query.split('/').slice(1).join('');
        const response = await pixabayAPI.getImages(queryToSearch, page);

        if (!response.hits.length) {
          toast.error('Sorry, no images found');
          return;
        }

        if (page === 1) toast.success(`We found ${response.total} images`);

        setItems(prevItems => [...prevItems, ...response.hits]);
        setTotal(response.total);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  // scroll after loading more
  useLayoutEffect(() => {
    if (items.length <= 12) return;
    onWindowScroll(520);
  }, [items.length]);

  const onSearchFormSubmit = query => {
    setQuery(query);
    setItems([]);
    setPage(1);
    setError(false);
  };

  const onLoadMoreClick = () => setPage(prevPage => prevPage + 1);

  return (
    <Layout>
      <Searchbar onSubmit={onSearchFormSubmit} />

      {items.length > 0 && (
        <>
          <ImageGallery items={items} />
          {items.length === total ? (
            <Message>The end of results</Message>
          ) : (
            <LoadMoreBtn onLoadMore={onLoadMoreClick} />
          )}
        </>
      )}

      {isLoading && <Loader />}
      {error && (
        <Message>Oops, something went wrong...Try again later!</Message>
      )}

      <ScrollToTopBtn />

      <Toaster />
      <GlobalStyle />
    </Layout>
  );
}
