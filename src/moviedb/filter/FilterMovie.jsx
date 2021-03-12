import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import './FilterMovie.css';
import { connect } from 'react-redux';
import { filterChangeAction } from '../../actions';
class FilterMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            /* sort_by: '',
            range: [{
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }], */
            sortOptions: [
                { value: 'popularity.asc', text: 'Popularity Asc' },
                { value: 'popularity.desc', text: 'Popularity Desc' },
                { value: 'release_date.asc', text: 'Release Date Asc' },
                { value: 'release_date.desc', text: 'Release Date Desc' },
                { value: 'revenue.asc', text: 'Revenue Asc' },
                { value: 'revenue.desc', text: 'Revenue Desc' },
                { value: 'vote_average.asc', text: 'Vote Average Asc' },
                { value: 'vote_average.desc', text: 'Vote Average Desc' },
                { value: 'vote_count.asc', text: 'Vote Count Asc' },
                { value: 'vote_count.desc', text: 'Vote Count Desc' },
                { value: 'primary_release_date.asc', text: 'Primary Release Date Asc' },
                { value: 'primary_release_date.desc', text: 'Primary Release Date Desc' }
            ],
        };
    }

    createError = () => {
        this.setState({
            error: true
        });
    }
    render() {
        if (this.state.error) {
            throw new Error('You can only use error boundary from the render method');
        }
        return (
            <div className="filter">
                <div className="c-row">
                    <div className="c-col">
                        <label htmlFor="sort_by" onClick={this.createError}>Sort By</label>
                        <select name="sort_by" className="form-select" id="sort_by" value={this.props.sort_by} onChange={this.props.filterChange}>
                            <option value="">--select any sort order--</option>
                            {this.state.sortOptions.map((option, index) => {
                                return (
                                    <option key={index} value={option.value}>{option.text}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="c-col">
                        <DateRangePicker initialSettings={{ startDate: new Date(), endDate: new Date() }} onApply={(event, picker) => this.props.filterChange(picker)} >
                            <button tyep="button" className="btn btn-outline-primary">Select Date Range</button>
                        </DateRangePicker>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        sort_by: state.filter.sortValue,
    };
}

const filterChange = (event) => {
    let change = {
        sortValue: 'popularity.desc',
        dates: {
            releaseDateGte: '',
            releaseDateLte: '',
        }
    };
    if (event.target && event.target.getAttribute('name') === 'sort_by') {
        change.sortValue = event.target.value;
    }
    if (event.endDate || event.startDate) {
        change.dates.releaseDateGte = event.startDate.format('YYYY-MM-DD');
        change.dates.releaseDateLte = event.endDate.format('YYYY-MM-DD');
    }
    return filterChangeAction(change);
}

const mapDispatchToProps = {
    filterChange
}

const filterMovie = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterMovie);

export default filterMovie;