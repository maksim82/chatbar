import {ReducersList} from "../../../lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {loginReducer} from "../../../../features/AuthByUsername/model/slice/loginSlice";
import {DeepPartial} from "@reduxjs/toolkit";
import {StateSchema} from "../../../../app/providers/StoreProvider/config/StateSchema";
import {Story} from "@storybook/react";
import {StoreProvider} from "../../../../app/providers/StoreProvider/ui/StoreProvider";

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer
}

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
)
