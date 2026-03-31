// URL State Management Utilities
import { PRICING_OPTIONS } from '../constants/pricingOptions';

export const saveStateToURL = (pricingOptions, searchKeyword) => {
  const params = new URLSearchParams();
  
  // Save pricing options using friendly names
  Object.entries(pricingOptions).forEach(([key, value]) => {
    if (value) {
      const optionName = Object.keys(PRICING_OPTIONS).find(k => PRICING_OPTIONS[k] === parseInt(key));
      if (optionName) {
        params.append(optionName.toLowerCase(), 'true');
      }
    }
  });
  
  // Save search keyword
  if (searchKeyword) {
    params.append('search', searchKeyword);
  }
  
  // Update URL without page reload
  const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
  window.history.replaceState({}, '', newURL);
};

export const loadStateFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  const urlState = {
    pricingOptions: {
      [PRICING_OPTIONS.PAID]: false,
      [PRICING_OPTIONS.FREE]: false,
      [PRICING_OPTIONS.VIEW_ONLY]: false,
    },
    searchKeyword: '',
  };
  
  // Load pricing options using friendly names
  Object.keys(PRICING_OPTIONS).forEach(optionName => {
    const optionValue = PRICING_OPTIONS[optionName];
    urlState.pricingOptions[optionValue] = params.get(optionName.toLowerCase()) === 'true';
  });
  
  // Load search keyword
  urlState.searchKeyword = params.get('search') || '';
  
  return urlState;
};