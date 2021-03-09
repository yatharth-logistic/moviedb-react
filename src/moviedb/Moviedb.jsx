import React from 'react';
import ListMovie from './ListMovie';
import FilterMovie from './filter/FilterMovie';

class Moviedb extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sortValue: '',
            dates: {
                releaseDateGte: '',
                releaseDateLte: ''
            }
        };
    }

    setDateChange = (startDate, endDate) => {
        console.log('setDateChange function is called');
        this.setState({
            dates: {
                releaseDateGte: startDate,
                releaseDateLte: endDate,
            }
        });
    }

    setSortChange = (sortBy) => {
        this.setState({
            sortValue: sortBy
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <FilterMovie dateChange={this.setDateChange} sortChange={this.setSortChange} />
                <ListMovie dates={this.state.dates} sortBy={this.state.sortValue} />
            </div>
        );
    }
}

export default Moviedb;