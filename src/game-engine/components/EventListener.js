import React from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../state/actions'
import socket from '../../util/socket-client'

class EventListener extends React.Component {
    constructor(props) {
        super(props); 
        this.startEventListeners()
    }

    startEventListeners = () => {
        const { createGameSuccess } = this.props;
        socket.on('game-updates', data => {
            if( data.type === 'CREATE') {
                if(data.code === 200) {
                    createGameSuccess(data)
                }
            }
        })
    }
};

const mapDispatchToProps = dispatch => ({
    createGameSuccess: (data) => dispatch(gameActions.createGameSuccess(data)),
  });
   
export default connect(null, mapDispatchToProps)(EventListener);