import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSearchKeyword } from '../store/contentFilterSlice';

const SearchContainer = styled.div`
  background-color: #201f25;
  padding: 20px 40px;
  margin-bottom: 15px;
  position: relative;

  @media (max-width: 480px) {
    padding: 20px 15px;  // More space for input
  }

  @media (max-width: 360px) {
    padding: 20px 10px;  // Even more space for very small screens
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  padding: 5px;
`;

const SearchInput = styled.input`
  width: 95%;
  background-color: #201f25;
  border: 0px solid #201f25;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #777;
  }

  &::placeholder {
    color: #999;
    font-weight: 400;
  }

  @media (max-width: 480px) {
    font-size: 14px; /* Smaller font for longer text */
    width: 90%;
  }

  @media (max-width: 360px) {
    font-size: 12px; /* Even smaller for very small screens */
    width: 85%;
  }
`;

const ClearButton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'show',
})`
  position: absolute;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #999;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.2s;
  
  &:hover {
    background-color: #444;
    color: white;
    
    svg {
      stroke: white;
    }
  }
  
  ${props => !props.show && `
    display: none;
  `}
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: auto;
  cursor: pointer;
  color: white;
  
  svg {
    stroke: white !important;
  }
  
  &:hover {
    opacity: 0.8;
  }
`;

const ClearIcon = () => (
  <svg 
    width="12" 
    height="12" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#999" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SearchIcon = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ color: 'white' }}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchKeyword = useSelector((state) => state.contentFilter.searchKeyword);
  const [inputValue, setInputValue] = useState(searchKeyword);

  // Sync Redux state to input
  useEffect(() => {
    setInputValue(searchKeyword);
  }, [searchKeyword]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    dispatch(setSearchKeyword(inputValue));
  };

  const handleClearClick = () => {
    setInputValue('');
    dispatch(setSearchKeyword(''));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Find the items you're looking for"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <ClearButton show={inputValue.length > 0} onClick={handleClearClick}>
          <ClearIcon />
        </ClearButton>
        <SearchIconWrapper onClick={handleSearchClick}>
          <SearchIcon />
        </SearchIconWrapper>
      </SearchWrapper>
    </SearchContainer>
  );
};

export default SearchBar;