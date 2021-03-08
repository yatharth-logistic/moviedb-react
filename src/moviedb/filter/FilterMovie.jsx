import React from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

class FilterMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort_by: '',
            range: [{
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }]
        };
    }

    handleSortChange = (event) => {
        this.setState({
            sort_by: event.target.value,
        });
    }

    handleDateRangeChange = (item) => {
        console.log(item);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 p-4">
                        <label htmlFor="sort_by">Sort By</label>
                        <select name="sort_by" className="form-select" id="sort_by" value={this.state.sort_by} onChange={this.handleSortChange}>
                            <option value="popularity.asc">Popularity Asc</option>
                            <option value="popularity.desc">Popularity Desc</option>
                            <option value="release_date.asc">Release Date Asc</option>
                            <option value="release_date.desc">Release Date Desc</option>
                            <option value="revenue.asc">Revenue Asc</option>
                            <option value="revenue.desc">Revenue Desc</option>
                            <option value="primary_release_date.asc">Primary Release Date Asc</option>
                            <option value="primary_release_date.desc">Primary Release Date Desc</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <DateRangePicker
                            ranges={this.state.range}
                            onChange={item => this.handleDateRangeChange(item)}
                            editableDateInputs={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterMovie;