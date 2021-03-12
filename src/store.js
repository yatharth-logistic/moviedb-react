import { createStore } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { filterChangeAction } from './actions';

/* const filter = {
    filter: {
        sortValue: 'popularity.desc',
        dates: {
            releaseDateGte: '',
            releaseDateLte: '',
        }
    }
};

function reducer(state = filter, action) {

    if (action.type === 'filter/update') {
        console.log('filter/update reducer called');
        console.log('incoming action payload is ', action);
        return {
            ...state,
            filter: {
                ...state.filter,
                sortValue: action.payload.sortValue,
                dates: {
                    ...state.filter.dates,
                    releaseDateGte: action.payload.dates.releaseDateGte,
                    releaseDateLte: action.payload.dates.releaseDateLte
                }
            }
        };
    }
    return state;
} */

const initialFilter = {
    filter: {
        sortValue: 'popularity.desc',
        dates: {
            releaseDateGte: '',
            releaseDateLte: '',
        }
    }
};

const optimizedReducer = createReducer(initialFilter, (builder) => {
    builder.addCase(filterChangeAction, (state, action) => {
        console.log('optimizedReducer called at filterChangeAction');
        state.filter = action.payload;
    });
});

export const store = createStore(optimizedReducer);
