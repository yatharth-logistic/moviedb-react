import React from 'react';
import ListMovie from './ListMovie';
import FilterMovie from './filter/FilterMovie';

class Moviedb extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <FilterMovie />
                <ListMovie />
            </div>
        );
    }
}

export default Moviedb;