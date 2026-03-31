import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setPricingOption, resetPricingOptions } from '../store/contentFilterSlice';
import { PRICING_OPTIONS, PRICING_LABELS } from '../constants/pricingOptions';

const FilterContainer = styled.div`
  background-color: #110e15;
  padding: 20px 40px;

  @media (max-width: 480px) {
    padding: 20px 20px;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;  // Allow wrapping on small screens
`;

const FilterTitle = styled.h3`
  color: #ccc;
  font-size: 14px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  margin-right: 10px;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  color: #ccc;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  input[type="checkbox"] {
    margin-right: 8px;
    width: 18px;
    height: 18px;
    background-color: #333;
    border: 1px solid #555;
    border-radius: 3px;
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    cursor: pointer;
    
    &:checked {
      background-color: #4CAF50;
      border-color: #4CAF50;
      
      &::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 12px;
        font-weight: bold;
      }
    }
    
    &:hover {
      border-color: #666;
    }
  }
`;

const ResetButton = styled.button`
  background-color: transparent;
  color: #ccc;
  border: 1px solid #666;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin-left: auto;
  transition: all 0.3s;
  flex-shrink: 0;  // Prevent button from shrinking

  &:hover {
    background-color: #333;
    color: white;
    border-color: #777;
  }

  // On small screens, don't use margin-left: auto
  @media (max-width: 480px) {
    margin-left: 0;
    margin-top: 15px;
  }
`;

const ContentsFilter = () => {
  const dispatch = useDispatch();
  const pricingOptions = useSelector((state) => state.contentFilter.pricingOptions);

  const handleCheckboxChange = (option) => {
    dispatch(setPricingOption({ option, value: !pricingOptions[option] }));
  };

  const handleReset = () => {
    dispatch(resetPricingOptions());
  };

  return (
    <FilterContainer>
      <FilterRow>
        <FilterTitle>Pricing Option</FilterTitle>
        <CheckboxWrapper>
          <input
            type="checkbox"
            checked={pricingOptions[PRICING_OPTIONS.PAID]}
            onChange={() => handleCheckboxChange(PRICING_OPTIONS.PAID)}
          />
          {PRICING_LABELS[PRICING_OPTIONS.PAID]}
        </CheckboxWrapper>
        <CheckboxWrapper>
          <input
            type="checkbox"
            checked={pricingOptions[PRICING_OPTIONS.FREE]}
            onChange={() => handleCheckboxChange(PRICING_OPTIONS.FREE)}
          />
          {PRICING_LABELS[PRICING_OPTIONS.FREE]}
        </CheckboxWrapper>
        <CheckboxWrapper>
          <input
            type="checkbox"
            checked={pricingOptions[PRICING_OPTIONS.VIEW_ONLY]}
            onChange={() => handleCheckboxChange(PRICING_OPTIONS.VIEW_ONLY)}
          />
          {PRICING_LABELS[PRICING_OPTIONS.VIEW_ONLY]}
        </CheckboxWrapper>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </FilterRow>
    </FilterContainer>
  );
};

export default ContentsFilter;