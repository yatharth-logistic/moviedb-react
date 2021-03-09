import React from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
// import $ from 'jquery';

class FilterMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort_by: '',
            range: [{
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }],
            sortOptions: [
                { value: 'popularity.asc', text: 'Popularity Asc' },
                { value: 'popularity.desc', text: 'Popularity Desc' },
                { value: 'release_date.asc', text: 'Release Date Asc' },
                { value: 'release_date.desc', text: 'Release Date Desc' },
                { value: 'revenue.asc', text: 'Revenue Asc' },
                { value: 'revenue.desc', text: 'Revenue Desc' },
                { value: 'primary_release_date.asc', text: 'Primary Release Date Asc' },
                { value: 'primary_release_date.desc', text: 'Primary Release Date Desc' }
            ],
        };
    }

    filterChange = (event) => {
        let change = {
            sortValue: 'popularity.desc',
            dates: {
                releaseDateGte: '',
                releaseDateLte: '',
            }
        };
        if (event.target && event.target.getAttribute('name') === 'sort_by') {
            this.setState({
                sort_by: event.target.value
            });
            change.sortValue = event.target.value;
        }
        if (event.selection) {
            change.dates.releaseDateGte = moment(event.selection.startDate).format('YYYY-MM-DD');
            change.dates.releaseDateLte = moment(event.selection.endDate).format('YYYY-MM-DD');
        }
        this.props.setFilter(change);
    }

    componentDidMount() {
        /* $(function () {
            $('input[name="daterange"]').daterangepicker({
                opens: 'left'
            }, function (start, end, label) {
                console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
            });
        }); */
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 p-4">
                        <label htmlFor="sort_by">Sort By</label>
                        <select name="sort_by" className="form-select" id="sort_by" value={this.state.sort_by} onChange={this.filterChange}>
                            <option value="">--select any sort order--</option>
                            {this.state.sortOptions.map((option, index) => {
                                return (
                                    <option key={index} value={option.value}>{option.text}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-md-3 mt-4 pt-4">
                        <DateRangePicker
                            ranges={this.state.range}
                            onChange={item => this.filterChange(item)}
                            editableDateInputs={true}
                        />
                        {/* <input type="text" name="daterange" onChange={() => { }} value="01/01/2018 - 01/15/2018" className="form-control" /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterMovie;