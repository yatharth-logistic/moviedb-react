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
            sortValue: 'popularity.desc',
            dates: {
                releaseDateGte: '',
                releaseDateLte: '',
            }
        }
    };

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, 'errorinfo ', errorInfo);
    }

    componentDidMount() {
        this.getMoviesList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('yes component is updated');
        if (this.props.dates.releaseDateGte !== prevProps.dates.releaseDateGte || this.props.dates.releaseDateLte !== prevProps.dates.releaseDateLte || this.props.sortBy !== prevProps.sortBy) {
            console.log('in true part date change section');
            this.setState({
                dates: this.props.dates,
                movieList: [],
                sortValue: this.props.sortBy
            });
            this.page = 1;
            setTimeout(() => {
                this.getMoviesList();
            }, 300);
        }
    }

    getMoviesList = async () => {
        let movieList = null;
        console.log(this.state.dates);
        await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?api_key=a0acb84bc12a6a187fbf5cf4431ea867&release_date.gte=${this.state.dates.releaseDateGte}&release_date.lte=${this.state.dates.releaseDateLte}&sort_by=${this.state.sortValue}&page=${this.page}`,
        }).then(res => {
            const results = res.data.results;
            movieList = results;
            this.page++;
        }).catch(error => {
            console.log('error in axios:- ', error);
        });

        this.setState({
            movieList: this.state.movieList.concat(movieList)
        })
    }

    openModal = (movieId = null) => (e) => {
        this.setState({
            modal: true,
            movieId: movieId
        });
    }

    hideModal = () => {
        this.setState({
            modal: false,
        });
    }

    /* renderBsModal = () => {
        if (this.state.modal) {
            console.log('rendering BsModal now');
            return (<BsModal isModalOpen={this.state.modal} movieId={this.state.movieId} hideModal={this.hideModal} />);
        }
        else {
            console.log('There is no rendering bs modal now');
            return;
        }
    } */

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
                                        <img src={'https://image.tmdb.org/t/p/original/' + movie.poster_path} style={imgStyle} className="rounded" alt={movie.original_title} onClick={this.openModal(movie.id)} />
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