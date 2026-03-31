import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import ContentsFilter from './ContentsFilter';
import SortBy from './SortBy';
import ContentsList from './ContentsList';
import { fetchContentsAsync } from '../store/contentFilterSlice';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #1A1A1F;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const ContentPage = () => {
  const dispatch = useDispatch();
  const { searchKeyword, pricingOptions, sortBy } = useSelector(state => state.contentFilter);

  // Initial load and refetch when filters change
  useEffect(() => {
    dispatch(fetchContentsAsync());
  }, [dispatch, searchKeyword, pricingOptions, sortBy]);

  return (
    <AppContainer>
      <SearchBar />
      <ContentsFilter />
      <SortBy />
      <ContentsList />
    </AppContainer>
  );
};

export default ContentPage;