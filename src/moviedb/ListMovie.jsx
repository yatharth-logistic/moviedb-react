import React from 'react';
import axios from 'axios';
import BsModal from '../components/modal';

class ListMovie extends React.Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            movieList: [],
            modal: false,
            movieId: null,
            filter: {
                sortValue: 'popularity.desc',
                dates: {
                    releaseDateGte: '',
                    releaseDateLte: '',
                }
            }
        }
    };

    componentDidMount() {
        this.getMoviesList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps.getFilter) !== JSON.stringify(this.props.getFilter)) {
            this.page = 1;
            this.setState({
                filter: this.props.getFilter,
                movieList: [],
            }, this.getMoviesList);
        }
    }

    getMoviesList = async () => {
        let movieList = null;
        await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?api_key=a0acb84bc12a6a187fbf5cf4431ea867&release_date.gte=${this.state.filter.dates.releaseDateGte}&release_date.lte=${this.state.filter.dates.releaseDateLte}&sort_by=${this.state.filter.sortValue}&page=${this.page}`,
        }).then(res => {
            const results = res.data.results;
            movieList = results;
            this.page++;
        });

        this.setState({
            movieList: this.state.movieList.concat(movieList)
        })
    }

    hideModal = (movieId = null) => {
        if (movieId !== null && this.state.movieId == null) {
            this.setState({
                modal: true,
                movieId: movieId
            });
        }
        if (movieId == null) {
            this.setState({
                modal: false,
                movieId: null
            });
        }
    }

    render() {
        const mainDiv = {
            textOverFlow: 'ellipsis',
            overflow: 'hidden',
            width: '200px',
            height: '250px',
        };
        const imgStyle = {
            width: '100px',
            height: '250px',
        };
        const pStyle = {
            width: '20px',
            height: '20px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        };
        return (
            <div>
                <div className="container-fluid">
                    <div id="add_movie" className="row">
                        {this.state.movieList.map((movie) => (
                            <div key={movie.id} className="rounded shadow text-break col-md-3 m-5" style={mainDiv}>
                                <div className="row">
                                    <div className="col-md">
                                        <img src={'https://image.tmdb.org/t/p/original/' + movie.poster_path} style={imgStyle} className="rounded" alt={movie.original_title} onClick={() => this.hideModal(movie.id)} />
                                    </div>
                                    <div className="col-md">
                                        <strong>Title</strong>
                                        <p><a rel="noreferrer" href={'movie_page.php?movie_id=' + movie.id} target="_blank">{movie.original_title}</a></p>
                                        <strong>Overview</strong>
                                        <p
                                            style={pStyle}>
                                            {movie.overview}
                                        </p>
                                        <strong>Popularity</strong>
                                        <p>{movie.popularity}</p>
                                        <strong>Release Date</strong>
                                        <p>{movie.release_date}</p>
                                        <strong>Average Vote</strong>
                                        <p>{movie.vote_average}</p>
                                        <strong>Total Vote</strong>
                                        <p>{movie.vote_count}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row m-2 p-2">
                        <div className="col-md">
                            <button type="button" onClick={this.getMoviesList} className="btn btn-outline-primary btn-block">Load More</button>
                        </div>
                    </div>
                </div>
                {this.state.modal && (
                    <BsModal isModalOpen={this.state.modal} movieId={this.state.movieId} hideModal={this.hideModal} />
                )}
            </div >
        );
    }

}

export default ListMovie;