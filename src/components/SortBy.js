import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSortBy } from '../store/contentFilterSlice';

const SortContainer = styled.div`
  padding: 20px 0px;
  display: flex;
  justify-content: flex-end;
`;

const SortInner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
`;

const SortLabel = styled.span`
  color: #ccc;
  font-size: 16px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const SortSelect = styled.select`
  background-color: transparent;
  color: #ccc;
  border: none;
  border-bottom: 1px solid #666;
  padding: 8px 12px;
  border-radius: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-width: 150px;
  transition: all 0.3s;

  &:hover {
    border-bottom-color: #777;
  }

  &:focus {
    outline: none;
    border-bottom-color: #4CAF50;
  }

  option {
    background-color: #333;
    color: #ccc;
    padding: 8px;
  }
`;

const SortBy = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.contentFilter.sortBy);

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <SortContainer>
      <SortInner>
        <SortLabel>Sort by:</SortLabel>
        <SortSelect value={sortBy} onChange={handleSortChange}>
          <option value="name">Item Name</option>
          <option value="priceHigh">Higher Price</option>
          <option value="priceLow">Lower Price</option>
        </SortSelect>
      </SortInner>
    </SortContainer>
  );
};

export default SortBy;