import React, { Component } from 'react';
import axios from 'axios';


class InputNotes extends Component {

    state = {
        notes: [],
        noteTitle: '',
        noteUserName: '',
        description: '',
        id: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    componentDidUpdate(prevProps) {
        if (prevProps.noteItem !== this.props.noteItem) {
            this.setState({
                noteTitle: this.props.noteItem.noteTitle,
                description: this.props.noteItem.description,
                id: this.props.noteItem._id,
            })


        }

    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }



    reset = () => {
        this.setState({
            noteTitle: '',
            noteUserName: '',
            description: '',
            id: '',
        })
    }

    submit = (event) => {
        event.preventDefault();

        const payload = {
            noteTitle: this.state.noteTitle,
            noteUserName: this.props.userName,
            description: this.state.description
        }
        this.setState({
            noteTitle: '',
            description: '',
            id: '',
        })

        axios({
            url: 'note/save',
            method: 'POST',
            data: payload,
            headers: { Authorization: localStorage.getItem('jwt') }
        })
            .then(() => {
                this.props.callbackNotes()

            })
            .catch((err) => {
                console.log(err);
            })
    };


    edit = (event) => {
        event.preventDefault();

        const payload = {
            id: this.props.noteItem._id,
            noteTitle: this.state.noteTitle,
            noteUserName: this.props.userName,
            description: this.state.description
        }

        this.setState({
            noteTitle: '',
            description: '',
            id: '',
        })

        axios({
            url: 'note/edit',
            method: 'POST',
            data: payload,
            headers: { Authorization: localStorage.getItem('jwt') }
        })
            .then(() => {

                this.props.callbackNotes()
                // this.props.callbackExpenses();

            })
            .catch((err) => {
                console.log(err);
            })

    };

    displayForm() {
        if (this.state.id === this.props.noteItem._id) {
            return (
                <form onSubmit={this.edit}>
                    <label>Název</label>
                    <input onChange={this.handleInput}
                        value={this.state.noteTitle}
                        className="form-control"
                        name="noteTitle"
                        required
                    />
                    <label>Popis</label>
                    <input
                        onChange={this.handleInput}
                        value={this.state.description}
                        className="form-control"
                        name="description"
                        required
                    />
                    <button type='submit' className="btn btn-dark btn-block mt-3">Uprav</button>
                    <button type='reset' onClick={this.reset} className="btn btn-secondary btn-block mt-3">Reset</button>
                </form>
            )
        }

        return (
            <form onSubmit={this.submit}>
                <label>Název</label>
                <input onChange={this.handleInput}
                    value={this.state.noteTitle}
                    className="form-control"
                    name="noteTitle"
                    required
                />
                <label>Popis</label>
                <textarea
                    onChange={this.handleInput}
                    value={this.state.description}
                    className="form-control"
                    name="description"
                    required
                />
                <button type='submit' className="btn btn-dark btn-block mt-3">Odešli</button>
                <button type='reset' onClick={this.reset} className="btn btn-secondary btn-block mt-3">Reset</button>
            </form>
        )
    }


    render() {



        return (

            <div className="card card-body">
                {this.displayForm()}
            </div>



        )
    }
}

export default InputNotes