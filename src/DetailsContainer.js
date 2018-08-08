import React from 'react';
import Details from './Details'
import HttpService from './HttpService';

class DetailsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.httpService = new HttpService();
        this.state = {fetching: false, target: {} };
    }

    componentDidMount = () => {
        this.setState({fetching: true});
        return this.httpService.request({ url: 'http://www.omdbapi.com',  params: { i: this.props.targetId, apikey: '4d69050d'} })
                    .then((response) => { this.setState({fetching: false, target: response.data}) })
                    .catch(() => {this.setState({fetching: false})});
    }

    render = () => {
        const { display, onClose } = this.props;
        const { fetching, target } = this.state;
        return <Details display={display} onCloseDetails={onClose} fetching={fetching} target={target}/>
    }
}

export default DetailsContainer;