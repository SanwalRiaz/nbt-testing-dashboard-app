/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { Pagination } from 'react-bootstrap';
import { PagingItems } from '../../react-app-env';

interface PaginationProps {
  config: PagingItems;
  changePage: (page: number) => void;
}

const Paging: React.FC<PaginationProps> = ({ config, changePage }) => {
  if (config.pages.length < 2) {
    return null;
  }

  return (
    <Pagination>
      {config.currentPage !== 1 && (
        <Pagination.First onClick={() => changePage(1)} />
      )}
      {config.previousPage && (
        <Pagination.Prev
          onClick={() => changePage(config?.previousPage as number)}
        />
      )}
      {config.pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === config.currentPage}
          onClick={() => changePage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      {config.previousPage && (
        <Pagination.Next
          onClick={() => changePage(config?.nextPage as number)}
        />
      )}
      {config.currentPage !== config.pages.length && (
        <Pagination.Last onClick={() => changePage(config.pages.length)} />
      )}
    </Pagination>
  );
};

export default Paging;
