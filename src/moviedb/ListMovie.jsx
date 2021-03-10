import React from 'react';
import axios from 'axios';
import BsModal from '../components/modal';
import './ListMovie.css';

class ListMovie extends React.Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            movieList: [],
            modal: false,
            movieId: null,
        }
    };

    componentDidMount() {
        this.getMoviesList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps.filterData) !== JSON.stringify(this.props.filterData)) {
            this.page = 1;
            this.setState({
                filter: this.props.filterData,
                movieList: [],
            }, this.getMoviesList);
        }
    }

    getMoviesList = async () => {
        let movieList = null;
        await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?api_key=a0acb84bc12a6a187fbf5cf4431ea867&release_date.gte=${this.props.filterData.dates.releaseDateGte}&release_date.lte=${this.props.filterData.dates.releaseDateLte}&sort_by=${this.props.filterData.sortValue}&page=${this.page}`,
        }).then(res => {
            const results = res.data.results;
            movieList = results;
            this.page++;
        });

        this.setState({
            movieList: this.state.movieList.concat(movieList)
        })
    }

    toggleModal = (flag = false, movieId = null) => {
        this.setState({
            modal: flag,
            movieId: movieId
        })
    }

    render() {
        return (
            <div className="movie">
                <div className="c-container">
                    <div id="add_movie" className="c-row c-colum movie-space">
                        {this.state.movieList.map((movie) => (
                            <div key={movie.id} className="c-card">
                                <div className="">
                                    <img src={'https://image.tmdb.org/t/p/original/' + movie.poster_path} className="c-img" alt={movie.original_title} onClick={() => this.toggleModal(true, movie.id)} />
                                </div>
                                <div className="c-text-content">
                                    <div>Title</div>
                                    <div><a rel="noreferrer" href={'movie_page.php?movie_id=' + movie.id} target="_blank">{movie.original_title}</a></div>
                                    <div>Overview</div>
                                    <div>
                                        {movie.overview}
                                    </div>
                                    <div>Popularity</div>
                                    <div>{movie.popularity}</div>
                                    <div>Release Date</div>
                                    <div>{movie.release_date}</div>
                                    <div>Average Vote</div>
                                    <div>{movie.vote_average}</div>
                                    <div>Total Vote</div>
                                    <div>{movie.vote_count}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="">
                        <div className="c-row">
                            <div className="c-col">
                                <button type="button" onClick={this.getMoviesList} className="btn btn-outline-primary btn-block">Load More</button>
                            </div>
                        </div>
                    </div>
                    {this.state.modal && (
                        <BsModal isModalOpen={this.state.modal} movieId={this.state.movieId} hideModal={this.toggleModal} />
                    )}
                </div>
            </div>
        );
    }

}

export default ListMovie;