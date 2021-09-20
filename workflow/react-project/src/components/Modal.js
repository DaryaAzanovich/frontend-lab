import "./Modal.css";
import "./media.css";
import React from "react";
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { ErrorToast } from "./ErrorToast";
import { connect } from "react-redux";


function Modal( props ) {
    if(props.token) {
        props.modalState(false);
    }

    return (
        <>
            {createPortal(
                <>
                    <div 
                        className="modal-bg"
                        onClick={() => {props.modalState(false)}}
                    >
                        <ErrorToast />

                        <div 
                            className="modal-container"
                            onClick={event => event.stopPropagation()}
                        >
                            <div className="modal-header">
                                <div className="title">{props.title}</div>
                                <FontAwesomeIcon 
                                    icon={faTimes} 
                                    size="2x"
                                    onClick={() => props.modalState(false)}
                                />
                            </div>
                            <div className="body">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </>, document.getElementById('modal-root')
            )}
        </>
    )
}

Modal.propTypes = {
    modalState: PropTypes.func.isRequired
};


// export default Modal;

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
    
};

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Modal);