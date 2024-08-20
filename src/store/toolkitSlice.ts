import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getInfo from "../server/getInfo.ts";
import getProjects from "../server/getProjects.ts";

interface CounterState {
  searchbarValue: string,
  data: {
    incomplete_result: boolean,
    items: [],
    total_count: number
  };
  info: {
    name: string,
    license: string,
    topics: [],
    language: string,
    stargazers_count: string,
    toggle: boolean
  };
  toggle: boolean;
}

const initialState:CounterState  = {
  searchbarValue: '',
  data: {
    incomplete_result: true,
    items: [],
    total_count: 0
  },
  info: {
    name: '',
    license: '',
    topics: [],
    language: '',
    stargazers_count: '',
    toggle: false
  },
  toggle: false,
}

// thunk, в котором вызывается функция получения данных по запросу в поисковой строке
export const fetchData = createAsyncThunk(
  'toolkit/fetchData',
  async ({value, perPage, page}:{value: string; perPage: number; page: number}) => {
    const result = await getProjects(value, perPage, page);
    return {
      incomplete_result: result.incomplete_result,
      items: result.items,
      total_count: result.total_count
    };
  }
);

// thunk, в котором вызывается функция получения данных o конкретном репозитории
export const fetchInfo = createAsyncThunk(
  'toolkit/fetchInfo',
  async ({ owner, name }: { owner: string; name: string }) => {
    const result = await getInfo(owner, name);
    return {
      name: result.name,
      license: result.license !== null ? result.license.name : '',
      topics: result.topics,
      language: result.language,
      stargazers_count: result.stargazers_count,
      toggle: true,
    };
  }
);




const toolkitSlice = createSlice({
  name: "toolkit",
  initialState: initialState,
  reducers: {
    setSearchbarValue: (state, action) => {
      state.searchbarValue = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(fetchInfo.fulfilled, (state, action) => {
      state.info = action.payload;
    });
  },
})

export const { setSearchbarValue, setData, setToggle, setInfo} = toolkitSlice.actions;
export default toolkitSlice.reducer
