import React from 'react';
import Modal from 'react-responsive-modal';

const ModalForm = (props)=>{
    console.log('from modal',props);
    return(
        <Modal open={props.modalState} onClose={props.onCloseModal} little classNames={{ modal: 'booking-modal' }}>
            <h4 className='modal-title title'>Confirm Booking </h4>
            <p className='dates'>{props.newState.proposedBooking.startAt} - {props.newState.proposedBooking.endAt}</p>
            <div className='modal-body'>
            <em>{props.newState.proposedBooking.days}</em> nights /
            <em>{props.newState.proposedBooking.dailyRate}</em> per Night
            <p>Guests: <em>{props.newState.proposedBooking.guests}</em></p>
            <p>Price: <em>{props.newState.proposedBooking.totalRate}</em></p>
            <p>Do you confirm your booking for selected days?</p>
            </div>
            <div className='modal-footer'>
            <button type='button' className='btn btn-bwm' onClick={props.SubmitBooking}>Confirm</button>
            <button type='button'  className='btn btn-bwm'>Cancel</button>
            </div>
        </Modal>
    )
    
}

export default ModalForm;