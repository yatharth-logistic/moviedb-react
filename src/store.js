import { createStore } from 'redux';

const filter = {
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
                sortValue: action.sortValue,
                dates: {
                    ...state.filter.dates,
                    releaseDateGte: action.dates.releaseDateGte,
                    releaseDateLte: action.dates.releaseDateLte
                }
            }
        };
    }
    return state;
}

export const store = createStore(reducer);
