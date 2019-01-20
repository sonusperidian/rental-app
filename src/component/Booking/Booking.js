import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import Modal from './Modal';
import {createBooking} from '../../actions/actions';


class Booking extends React.Component {
    state = {
        proposedBooking:{
            startAt:'',
            endAt:'',
            guests:0,
            days:0,
            totalRate:0,
            dailyRate:0,
            rentalId:''
        },
        modal: {
            open:false
        }
           
    }
    rental={};
    date = [];
    ref = React.createRef();

    onCloseModal=()=>{
        // console.log('close modal',this.state)
        this.setState({modal:{...this.state.modal, open:false}});
    }

    findBookedDates=()=>{
         this.rental = this.props.rental;
         const booking =  this.props.rental.booking;
         const date = [];
          console.log('Props=>', this.props.rental);
        if(booking && booking.length>0){
            booking.forEach(element => {
                // console.log(element);
                let start = moment(element.startAt);
                const end = moment(element.endAt);
                // console.log('inside while',start)
                while(start<=end){
                    this.date.push(start.format('MM/DD/YYYY'));
                    start = start.add(1, 'day')
                    // console.log(start)
                }
                
            });
        }
        // console.log(date)
    }
    handleApply=(event, picker)=>{
        const proposedStartAt = picker.startDate.format('MM/DD/YYYY');
        const proposedEndAt =  picker.endDate.format('MM/DD/YYYY');
        const days = moment(proposedEndAt).diff(moment(proposedStartAt),'days');
      
        // console.log(days)
        this.ref.current.value= proposedStartAt + ' - ' +proposedEndAt;
    
        this.setState({ proposedBooking: {...this.state.proposedBooking,startAt:proposedStartAt, endAt:proposedEndAt,days}});
      console.log('state', this.state)
    }
    handleGuestChange=(event)=>{
        this.setState({ proposedBooking:{...this.state.proposedBooking,guests:event.target.value} });
        // console.log('state', this.state)

    }
    
    reserverBooking = ()=>{
       
        this.setState({modal:{
            ...this.state.modal, 
            open:true 
        },
        proposedBooking:{
            ...this.state.proposedBooking,
            totalRate: (this.state.proposedBooking.days * this.rental.dailyRate),
            dailyRate: this.rental.dailyRate,
            rentalId:this.rental._id
        }
    })
    }
    SubmitBooking=()=>{
        console.log('Submit Booking', this.state.proposedBooking)
        createBooking(this.state.proposedBooking).then(response=>{
            toast.success("Booking Confirmed Enjoy your day !");
            this.setState({modal:{open:false}});
        }).catch(error=>{
            this.setState({modal:{open:false}});
            toast.error("Sorry!! Selected dates are already booked !", {
                position: toast.POSITION.TOP_LEFT
              });
            // toast("Booking Confirmed Enjoy your day !");
            console.log("error=>",error)
        })
        
    }

    invalidDate=(dateS)=>{

        console.log('date',this.date.includes(dateS.format('MM/DD/YYYY')))
         return this.date.includes(dateS.format('MM/DD/YYYY'));
         
        // return true;
    }
  render() {

    console.log('state from booking', this.state.proposedRental)
    this.findBookedDates();
    return (
      <div className='booking'>
        <h3 className='booking-price'>$ {this.rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
        <hr></hr>
        <div >
            <label htmlFor='date'>Dates: </label>
            <DateRangePicker isInvalidDate={this.invalidDate} onApply={this.handleApply} opens='left' >
                <input id='date' type='text' label='select dates' ref={this.ref}></input>
            </DateRangePicker>
        </div>
        <div className='form-group'>
          <label htmlFor='guests'>Guests</label>
          <input type='number' className='form-control' id='guests' aria-describedby='emailHelp' placeholder='' onChange={this.handleGuestChange}></input>
        </div>
        <button className='btn btn-bwm btn-confirm btn-block' onClick={this.reserverBooking}>Reserve place now</button>
        <hr></hr>
        <p className='booking-note-title'>People are interested into this house</p>
        <p className='booking-note-text'>
          More than 500 people checked this rental in last month.
        </p>
        <ToastContainer />
        <Modal onCloseModal={this.onCloseModal} modalState={this.state.modal.open} newState = {this.state} SubmitBooking={this.SubmitBooking}/>
      </div>
    )
  }
}


export default Booking;