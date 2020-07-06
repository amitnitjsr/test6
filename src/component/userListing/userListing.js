import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import './userListing.css';
class userListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            searchValue: '',
            filterBy: 'name',
        }
    }

    componentDidMount() {
        this.fetchData();
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

    inputHandler = (event) => {
        this.setState({ searchValue: event.target.value }, () => {
            if (this.state.searchValue === '') {
                this.fetchData();
            }
        });
    }

    searchHandler = () => {
        Axios.get(`https://jsonplaceholder.typicode.com/users?${this.state.filterBy}=${this.state.searchValue}`)
            .then((response) => {
                this.setState({ userData: response.data })
            })
            .catch((error) => {
                console.log('error', error)
            });
    }

    selectHandler = (event) => {

        if (event.target.value === 'City') {
            this.setState({ filterBy: 'address.city' })
        }
        else
            this.setState({ filterBy: 'name' })
    }

    render() {
        return (
            <div>
                <button className="btn-style" onClick={() => this.props.history.push('/albumListing')}>Album List</button><br />
                <label className="label-style">Search by name or city</label><br /><br />

                <select className="select-style1" onClick={(event) => this.selectHandler(event)}>
                    <option>Name</option>
                    <option>City</option>
                </select>&nbsp;
                <input className="input-style" type='search' value={this.state.searchValue} placeholder="search..."
                    onChange={(event) => this.inputHandler(event)} />&nbsp;
                <button className="btn-search" onClick={() => this.searchHandler()} >search</button>

                <div className="table-pos">
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>City</th>
                            </tr>
                            {this.state.userData && this.state.userData ?
                                this.state.userData.map((val) => {
                                    return (
                                        <tr key={val.id}>
                                            <td>
                                                {val.name}
                                            </td>
                                            <td>
                                                {val.address.city}
                                            </td>
                                        </tr>
                                    )
                                })
                                : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(userListing);