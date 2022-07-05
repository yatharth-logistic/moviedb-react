import React from 'react';
import ListMovie from './ListMovie';
import FilterMovie from './filter/FilterMovie';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './Moviedb.css';
import ErrorHandleComponent from '../components/ErrorHandleComponent';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';

class Moviedb extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            abcd: false,
            error: false,
            errorInfo: null,
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
                                    <li>
                                        <Link to="/infinite-scroll">Infinite Scroll</Link>
                                    </li>
                                </ul>
                            </aside>
                        </div>
                        <div className="c-content">
                            <Switch>
                                <Route path="/movie">
                                    <ErrorHandleComponent>
                                        <FilterMovie />
                                    </ErrorHandleComponent>
                                    <ListMovie />
                                </Route>
                                <Route path='/infinite-scroll'>
                                    <ErrorHandleComponent>
                                        <InfiniteScroll />
                                    </ErrorHandleComponent>
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