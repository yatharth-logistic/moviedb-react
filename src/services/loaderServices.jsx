import './loaderService.css';
class LoaderService {
    showLoader = (selectorName = null) => {
        if (selectorName) {
            const loaderEl = document.getElementById(`.${selectorName}`);

        } else {

        }
    }
}

export default LoaderService;