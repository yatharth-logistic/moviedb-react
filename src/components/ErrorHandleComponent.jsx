import React from 'react';


class ErrorHandleComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
        console.log('11111 ErrorHandleComponent');
    }

    static getDerivedStateFromError(error) {
        console.log('error form getDerivedStateFromError function ', error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('error componentDidCatch', error, 'errorInfo ', errorInfo);
    }

    render() {

        if (this.state.hasError) {
            return (
                <div>
                    Something went Wrong please try again later
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorHandleComponent;