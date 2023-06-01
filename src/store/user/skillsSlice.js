import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSkills } from "../../services/PersonalService";

export const getApiData = createAsyncThunk("skills/getApiData",
    async (data) => {
        const response = await getSkills();
        return response.data;
    });


const initialState = {
    skills: [],
    loading: false
};

export const skillsSlice = createSlice({
    name: "skills",
    initialState,
    reducers: {
        addSkill: (state, action) => {
            state.skills = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getApiData.fulfilled, (state, action) => {
            state.skills = action.payload;
            state.loading = false;
        })
            .addCase(getApiData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getApiData.rejected, (state) => {
                state.loading = false;
            });
    }
});


export const { addSkill } = skillsSlice.actions;

export default skillsSlice.reducer;

export const selectAllSkills = state => state.skills
