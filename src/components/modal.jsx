import React from 'react';
import axios from 'axios';
// import Loader from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import CustomLoader from './CustomLoader';

class BsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieInfo: {},
            loader: false
        };
        this.timeOut = null;
    }
    /* componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isModalOpen !== this.props.isModalOpen && this.props.isModalOpen) {
            const modalEl = document.getElementById('movieInfoModal');
            const modalInstance = new window.bootstrap.Modal(modalEl, {});
            modalInstance.show();

            modalEl.addEventListener('hide.bs.modal', (event) => {
                console.log('modal is now going to hide', this.props.isModalOpen);
                this.props.hideModal();
                this.setState({
                    movieInfo: {}
                });
                modalEl.removeEventListener('hide.bs.modal', event.target);
            });
            this.getMovieInfo();
        }
    } */

    componentDidMount() {
        const modalEl = document.getElementById('movieInfoModal');
        const modalInstance = new window.bootstrap.Modal(modalEl, {});
        modalInstance.show();
        this.getMovieInfo();
        modalEl.addEventListener('hide.bs.modal', (event) => {
            modalEl.removeEventListener('hide.bs.modal', event.target);
            this.setState({
                movieInfo: {}
            });
            clearTimeout(this.timeOut);
            this.props.hideModal();
        });
    }

    componentWillUnmount() {

    }

    getMovieInfo = async () => {
        this.setState({
            loader: true,
        });
        await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=a0acb84bc12a6a187fbf5cf4431ea867`
        }).then(res => {
            this.timeOut = setTimeout(() => {
                this.setState({
                    movieInfo: res.data,
                    // loader: false,
                });
            }, 3000);
        }).catch(error => { });
    }
    render() {
        const ratio = {
            width: '300px',
            height: '450px',
        };
        const fntw = {
            fontWidth: 700,
        };
        const dacoration = {
            textDecoration: 'none',
            color: 'white',
        };
        const mxw = {
            maxWidth: '27%',
        };
        return (
            <div className="modal fade" id="movieInfoModal" tabIndex="-1" aria-labelledby="movieInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="movieInfoModalLabel">movie Info</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {(this.state.movieInfo &&
                                this.state.movieInfo.original_title) ? (
                                    <div className="container-fluid">
                                        <div className="poster_color">
                                            <div className="row m-1">
                                                <div className="col-md-4 py-4 mr-2 pr-0" style={mxw}>
                                                    <img className="poster_image rounded shadow-lg"
                                                        src={'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/' + this.state.movieInfo.poster_path}
                                                        style={ratio} alt="Poster of moive" />
                                                </div>
                                                <div className="col-md-6 mt-5 ml-3" style={{ marginLeft: '2em' }}>
                                                    <h2>
                                                        <span id="original_title" style={fntw}>
                                                            {this.state.movieInfo.original_title}
                                                        </span>
                                                    </h2>
                                                    <b>OverView</b>
                                                    <h6 id="overview">
                                                        {this.state.movieInfo.overview}
                                                    </h6>
                                                    <b>Popularity</b>
                                                    <h6 id="popularity">
                                                        {this.state.movieInfo.popularity}
                                                    </h6>
                                                    <b>Release Date</b>
                                                    <h6 id="release_date">
                                                        {this.state.movieInfo.release_date}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="row justify-content-center">
                                        <CustomLoader />
                                    </div>
                                )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default BsModal;