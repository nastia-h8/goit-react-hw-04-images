import { useState, useEffect } from 'react';
import { BsArrowUpShort } from 'react-icons/bs';
import { Button } from './ScrollToTopBtn.styled';
import { onWindowScrollToTop } from 'helpers/smoothScrollToTop';

//  add/remove??

export function ScrollToTopBtn() {
  const [isBtnShow, setIsBtnShow] = useState(false);

  useEffect(() => {
    const onScrollBtnShow = () =>
      window.scrollY > 100 ? setIsBtnShow(true) : setIsBtnShow(false);

    window.addEventListener('scroll', onScrollBtnShow);

    return () => {
      window.removeEventListener('scroll', onScrollBtnShow);
    };
  }, []);

  return (
    isBtnShow && (
      <Button onClick={onWindowScrollToTop}>
        <BsArrowUpShort size={50} />
      </Button>
    )
  );
}
