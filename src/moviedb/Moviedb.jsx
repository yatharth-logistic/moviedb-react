import React from 'react';
import ListMovie from './ListMovie';
import FilterMovie from './filter/FilterMovie';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './Moviedb.css';

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
            <div className="c-container">
                <div className="c-navbar">
                    Movie Db App
                </div>
                <div className="c-main-content">
                    <Router>
                        <div className="c-sidebar">
                            <aside>
                                <ul>
                                    <li>
                                        <Link to="/">root</Link>
                                    </li>
                                    <li>
                                        <Link to="/movie">Movie</Link>
                                    </li>
                                </ul>
                            </aside>
                        </div>
                        <div className="c-content">
                            <Switch>
                                <Route path="/movie">
                                    <FilterMovie setFilter={this.setFilterChange} />
                                    <ListMovie filterData={this.state.filter} />
                                </Route>
                                <Route path="/">
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

export default Moviedb;