import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ContentItem from './ContentItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { loadMoreContentsAsync } from '../store/contentFilterSlice';

const ListContainer = styled.div`
  min-height: 400px;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 18px;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  
  /* Default (Over 1200px): 4 columns */
  grid-template-columns: repeat(4, 1fr);
  
  /* Below 1200px: 3 columns */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  /* Below 768px: 2 columns */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Below 480px: 1 column */
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ContentsList = () => {
  const dispatch = useDispatch();
  const {
    displayedContents,
    isLoading,
    hasMore,
  } = useSelector((state) => state.contentFilter);

  const loadMore = () => {
    dispatch(loadMoreContentsAsync());
  };

  // Skeleton component
  const ContentItemSkeleton = () => (
    <div style={{ width: '100%' }}>
      <Skeleton 
        height={200} 
        baseColor="#333" 
        highlightColor="#555"
        borderRadius="8px 8px 0 0"
      />
      <div style={{ 
        padding: '15px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <Skeleton 
            height={14} 
            width={80} 
            baseColor="#444" 
            highlightColor="#666"
            style={{ marginBottom: '4px' }}
          />
          <Skeleton 
            height={33.6} 
            width="90%" 
            baseColor="#444" 
            highlightColor="#666"
            count={2}
            style={{ lineHeight: 1.4 }}
          />
        </div>
        <div style={{ textAlign: 'right', minWidth: '80px' }}>
          <Skeleton 
            height={18} 
            width={60} 
            baseColor="#444" 
            highlightColor="#666"
          />
        </div>
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <GridContainer>
      {[...Array(4)].map((_, index) => (
        <ContentItemSkeleton key={`loading-${index}`} />
      ))}
    </GridContainer>
  );

  // Show skeleton during initial loading
  if (displayedContents.length === 0 && isLoading) {
    return (
      <ListContainer>
        <GridContainer>
          {[...Array(12)].map((_, index) => (
            <ContentItemSkeleton key={`skeleton-${index}`} />
          ))}
        </GridContainer>
      </ListContainer>
    );
  }

  if (displayedContents.length === 0 && !isLoading) {
    return (
      <ListContainer>
        <NoResults>No results found</NoResults>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <InfiniteScroll
        dataLength={displayedContents.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<LoadingSkeleton />}
        endMessage={
          <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>
            Yay! You have seen it all
          </p >
        }
      >
        <GridContainer>
          {displayedContents.map((content) => (
            <ContentItem key={content.id} content={content} />
          ))}
        </GridContainer>
      </InfiniteScroll>
    </ListContainer>
  );
};

export default ContentsList;