import React from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';

class CreateGameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            position: 0,
        };
    }
    handleNameInputChange = (e) => {
        this.setState({
            name: e.target.value,
        });
    };
    handlePositionInputChange = (e) => {
        this.setState({
            position: e.target.value,
        });
    };
    handleCreateGameFormSubmit = () => {
        this.props.createGame(this.state);
    };
    render() {
        const {locked} = this.props;
        return (
            <div>
                <input name="name" type="text" placeholder="Name" onChange={this.handleNameInputChange} />
                <input name="position" type="number" placeholder="position" onChange={this.handlePositionInputChange} />
                <input type="button" value="create game" onClick={this.handleCreateGameFormSubmit} disabled={locked} />
            </div>
        );
    }
}
CreateGameForm.propTypes = {
    createGame: PropTypes.func.isRequired,
    locked: PropTypes.bool.isRequired,
};
export default CreateGameForm;
