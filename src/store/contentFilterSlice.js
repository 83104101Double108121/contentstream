import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveStateToURL, loadStateFromURL } from '../utils/urlStateManager';
import { fetchContents } from '../backend/api';
import { PRICING_OPTIONS } from '../constants/pricingOptions';

const initialState = {
  pricingOptions: {
    [PRICING_OPTIONS.PAID]: false,
    [PRICING_OPTIONS.FREE]: false,
    [PRICING_OPTIONS.VIEW_ONLY]: false,
  },
  searchKeyword: '',
  sortBy: 'name', // 'name', 'priceHigh', 'priceLow'
  displayedContents: [],
  isLoading: false,
  hasMore: true,
  currentPage: 1,
  allFilteredContents: [], // Store all filtered contents
};

// Load initial state from URL
const urlState = loadStateFromURL();
const initialStateWithURL = {
  ...initialState,
  pricingOptions: {
    [PRICING_OPTIONS.PAID]: urlState.pricingOptions?.[PRICING_OPTIONS.PAID] || false,
    [PRICING_OPTIONS.FREE]: urlState.pricingOptions?.[PRICING_OPTIONS.FREE] || false,
    [PRICING_OPTIONS.VIEW_ONLY]: urlState.pricingOptions?.[PRICING_OPTIONS.VIEW_ONLY] || false,
  },
  searchKeyword: urlState.searchKeyword,
  sortBy: 'name',
};

// Get filtered contents
const getFilteredContents = (allContents, pricingOptions, searchKeyword) => {
  let filtered = allContents;

  // Apply pricing filter
  const activePricingOptions = Object.keys(pricingOptions).filter(
    opt => pricingOptions[opt]
  );

  if (activePricingOptions.length > 0) {
    filtered = filtered.filter(content =>
      activePricingOptions.includes(content.pricingOption.toString())
    );
  }

  // Apply search filter
  if (searchKeyword.trim()) {
    filtered = filtered.filter(content =>
      content.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      content.creator.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }

  return filtered;
};

// Sort function
const sortContents = (contents, sortBy) => {
  const sorted = [...contents];

  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.creator.localeCompare(b.creator));
    case 'priceHigh':
      return sorted.sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceB - priceA;
      });
    case 'priceLow':
      return sorted.sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceA - priceB;
      });
    default:
      return sorted;
  }
};

// Fetch first page data
export const fetchContentsAsync = createAsyncThunk(
  'contentFilter/fetchContents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().contentFilter;

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Fetch all data
      const allContents = await fetchContents();

      // Apply filter
      const filtered = getFilteredContents(allContents, state.pricingOptions, state.searchKeyword);

      // Apply sorting
      const sorted = sortContents(filtered, state.sortBy);

      // Return first page
      const firstPage = sorted.slice(0, 12);

      return {
        contents: firstPage,
        allFilteredContents: sorted,
        hasMore: sorted.length > 12
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Load more data
export const loadMoreContentsAsync = createAsyncThunk(
  'contentFilter/loadMoreContents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().contentFilter;
      const startIndex = state.displayedContents.length;
      const endIndex = startIndex + 12;

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Re-fetch all data and filter/sort (simulate backend pagination request)
      const allContents = await fetchContents();
      const filtered = getFilteredContents(allContents, state.pricingOptions, state.searchKeyword);
      const sorted = sortContents(filtered, state.sortBy);

      // Get next batch
      const nextBatch = sorted.slice(startIndex, endIndex);

      return {
        contents: nextBatch,
        hasMore: endIndex < sorted.length
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contentFilterSlice = createSlice({
  name: 'contentFilter',
  initialState: initialStateWithURL,
  reducers: {
    setPricingOption: (state, action) => {
      const { option, value } = action.payload;
      state.pricingOptions[option] = value;
      saveStateToURL(state.pricingOptions, state.searchKeyword);
    },
    resetPricingOptions: (state) => {
      state.pricingOptions = {
        [PRICING_OPTIONS.PAID]: false,
        [PRICING_OPTIONS.FREE]: false,
        [PRICING_OPTIONS.VIEW_ONLY]: false,
      };
      saveStateToURL(state.pricingOptions, state.searchKeyword);
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
      saveStateToURL(state.pricingOptions, state.searchKeyword);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch first page
      .addCase(fetchContentsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContentsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.displayedContents = action.payload.contents;
        state.allFilteredContents = action.payload.allFilteredContents;
        state.hasMore = action.payload.hasMore;
        state.currentPage = 1;
      })
      .addCase(fetchContentsAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.error('Failed to fetch contents:', action.payload);
      })
      // Load more
      .addCase(loadMoreContentsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadMoreContentsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.displayedContents = [...state.displayedContents, ...action.payload.contents];
        state.hasMore = action.payload.hasMore;
        state.currentPage += 1;
      })
      .addCase(loadMoreContentsAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.error('Failed to load more contents:', action.payload);
      });
  },
});

export const {
  setPricingOption,
  resetPricingOptions,
  setSearchKeyword,
  setSortBy,
} = contentFilterSlice.actions;

export default contentFilterSlice.reducer;