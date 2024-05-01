import { configureStore, DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        // devTools: IS_DEV,
        preloadedState: initialState,
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
