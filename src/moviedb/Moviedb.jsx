import React from 'react';
import ListMovie from './ListMovie';
import FilterMovie from './filter/FilterMovie';
import axios from 'axios';

class Moviedb extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {
                sortValue: 'popularity.desc',
                dates: {
                    releaseDateGte: '',
                    releaseDateLte: '',
                }
            }
        };
    }

    componentDidMount() {
        axios.interceptors.response.use((res) => res, (error) => {
            console.log(error);
        });
    }

    setFilterChange = (change) => {
        this.setState({
            filter: change
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <FilterMovie setFilter={this.setFilterChange} />
                <ListMovie filterData={this.state.filter} />
            </div>
        );
    }
}

export default Moviedb;