import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import './photoListing.css';

class photoListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoData: null
        }
    }

    componentDidMount() {
        // https://jsonplaceholder.typicode.com/photos?albumId=1&id=2
        this.fetchData(this.props.match.params.userId, this.props.match.params.id);
    }

    fetchData = (userId, id) => {
        let url = '';
        url = url + `https://jsonplaceholder.typicode.com/photos?albumId=${id}`

        Axios.get(url)
            .then((response) => {
                this.setState({ photoData: response.data })
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    render() {
        return (
            <div>
                <h2>Photo Listing</h2>
                <button className="btn-style" onClick={() => this.props.history.push('/albumListing')}
                >Back to AlbumList Page</button><br />
                <div className="parent">
                    {this.state.photoData ?
                        this.state.photoData.map((val) => {
                            return (
                                <div key={val.id} className="card1">
                                    <img src={val.thumbnailUrl} alt="Avatar" style={{ width: '100%' }} />
                                    <div className="container" >
                                        <p>{val.title}</p>
                                    </div>
                                </div>
                            )
                        })
                        : null}
                </div>
            </div>
        )
    }
}

export default withRouter(photoListing);