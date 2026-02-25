import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    loading: false,
    error: null,
    searchQuery: "",
    selectedCategory: "All",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      filterProducts(state);
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      filterProducts(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const filterProducts = (state) => {
  state.filteredItems = state.items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(state.searchQuery.toLowerCase());

    const matchesCategory =
      state.selectedCategory === "All" ||
      item.category === state.selectedCategory;

    return matchesSearch && matchesCategory;
  });
};

export const { setSearchQuery, setCategory } =
  productSlice.actions;

export default productSlice.reducer;