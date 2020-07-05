import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import './albumListing.css';

class albumListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            userId: 0,
            allAlbumData: null,
        }
    }

    componentDidMount() {
        this.fetchData();
        this.getAlbumData();
    }

    getAlbumData = (id = null) => {
        let url = 'https://jsonplaceholder.typicode.com/albums'
        if (id !== null) {
            url = url + '?userId=' + id
        }
        Axios.get(url)
            .then((response) => {
                this.setState({ allAlbumData: response.data })
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    fetchData = () => {
        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                this.setState({ userData: response.data })
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    selectHandler = (event) => {
        this.setState({ userId: event.target.value }, () => {
            if (parseInt(this.state.userId) !== 0) {
                this.getAlbumData(this.state.userId)
            }
        });
    }

    photoListing = (id) => {
        this.props.history.push(`./photoListing/${this.state.userId}/${id}`)
    }

    render() {
        return (
            <div>
                <button className="btn-style" onClick={() => this.props.history.push('/')}
                >Back to UserList Page</button><br />
                <label className="label-style">Album filter by user</label><br /><br />

                <select className="select-style" onClick={(event) => this.selectHandler(event)}>
                    <option value={0}>Select Name</option>
                    {this.state.userData && this.state.userData ?
                        this.state.userData.map((val) => {
                            return (
                                <option value={val.id} key={val.id}>{val.name}</option>
                            )
                        })
                        : null}
                </select><br />

                <div className="parent">
                    {this.state.allAlbumData ?
                        this.state.allAlbumData.map((val) => {
                            return (
                                <div key={val.id} className="card" onClick={() => this.photoListing(val.id)}>
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

export default withRouter(albumListing);