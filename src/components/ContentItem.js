import React from 'react';
import styled from 'styled-components';
import { PRICING_OPTIONS, getPricingLabel } from '../constants/pricingOptions';

const ItemContainer = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #333;
  position: relative;
  overflow: hidden;
`;

const ContentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;

const LeftInfo = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const RightInfo = styled.div`
  text-align: right;
  min-width: 80px;
`;

const UserName = styled.div`
  color: white;
  font-size: 14px;
  margin-bottom: 4px;
  font-weight: 600;
`;

const Title = styled.div`
  color: #ccc;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 33.6px; /* 2 lines * 1.4 * 12px */
  word-wrap: break-word;
  hyphens: auto;
`;

const PricingOption = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

const ContentItem = ({ content }) => {
  const displayText = content.pricingOption === PRICING_OPTIONS.PAID && content.price !== undefined
    ? `$${content.price}` 
    : getPricingLabel(content.pricingOption);

  return (
    <ItemContainer>
      <ImageContainer>
        <ContentImage 
          src={content.imagePath}
          alt={content.title}
        />
      </ImageContainer>
      <InfoContainer>
        <LeftInfo>
          <UserName>{content.creator || 'Unknown User'}</UserName>
          <Title>{content.title}</Title>
        </LeftInfo>
        <RightInfo>
          <PricingOption>
            {displayText}
          </PricingOption>
        </RightInfo>
      </InfoContainer>
    </ItemContainer>
  );
};

export default ContentItem;