// Pricing Options enum based on API data
export const PRICING_OPTIONS = {
  PAID: 0,
  FREE: 1,
  VIEW_ONLY: 2
};

export const PRICING_LABELS = {
  [PRICING_OPTIONS.PAID]: 'Paid',
  [PRICING_OPTIONS.FREE]: 'FREE',
  [PRICING_OPTIONS.VIEW_ONLY]: 'View Only'
};

export const getPricingLabel = (pricingOption) => {
  return PRICING_LABELS[pricingOption] || 'Unknown';
};