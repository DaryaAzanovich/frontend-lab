import "./Modal.css";
import "./media.css";
import React from "react";
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { ErrorToast } from "./ErrorToast";
import { connect } from "react-redux";
import { hideModal } from "../redux/action-creators/modalActions";


function Modal( props ) {
    console.log(props.children);

    return (
        <>
            {createPortal(
                <>
                    <div 
                        className="modal-bg"
                        onClick={props.hideModal}
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
                                    onClick={props.hideModal}
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

const mapStateToProps = state => {
    return {
        showModal: state.modal.showModal
    };
};

const mapDispatchToProps = { hideModal };

export default connect(mapStateToProps, mapDispatchToProps)(Modal);