import React from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';

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
        const sortBy = event.target.value;
        if (sortBy) {
            this.setState({
                sort_by: sortBy
            });
            this.props.sortChange(sortBy);
        }
    }

    handleDateRangeChange = (item) => {
        if (item.selection) {
            const stDate = moment(item.selection.startDate).format('YYYY-MM-DD');
            const enDate = moment(item.selection.endDate).format('YYYY-MM-DD');
            console.log('start date', stDate, 'end date', enDate);
            this.props.dateChange(stDate, enDate);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 p-4">
                        <label htmlFor="sort_by">Sort By</label>
                        <select name="sort_by" className="form-select" id="sort_by" value={this.state.sort_by} onChange={this.handleSortChange}>
                            <option value="">--select any sort order--</option>
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