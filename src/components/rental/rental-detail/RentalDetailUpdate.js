import React, { Component } from 'react';
import { toast } from 'react-toastify';
import RentalAssets from './RentalAssets';
import EditableInput from '../../shared/editable/EditableInput';
import EditableTextArea from '../../shared/editable/EditableTextArea';
import EditableSelect from '../../shared/editable/EditableSelect';

import * as actions from '../../../app/actions';

class RentalDetailUpdate extends Component {
  updateRental = rentalData => {
    const {
      rental: { _id },
      dispatch
    } = this.props;

    dispatch(actions.updateRental(_id, rentalData));
  };

  resetRentalErrors = () => {
    this.props.dispatch(actions.resetRentalErrors());
  };

  render() {
    const { rental, errors } = this.props;

    if (errors && errors.length > 0) {
      toast.info(errors[0].detail, {
        hideProgressBar: true
      });
    }

    return (
      <div className="rental">
        <div className="rental-update-titles">
          <span>Category:</span>{' '}
          <EditableSelect
            entity={rental}
            entityField={'category'}
            className={`rental-type ${rental.category}`}
            containerStyle={{ display: 'inline-block' }}
            updateEntity={this.updateRental}
            options={['Audio', 'Video', 'Lighting']}
            errors={errors}
            resetErrors={this.resetRentalErrors}
          />
        </div>

        <div className="rental-update-titles">
          <span>Brand:</span>{' '}
          <EditableInput
            entity={rental}
            entityField={'brand'}
            className={'rental-title'}
            containerStyle={{ display: 'inline-block' }}
            updateEntity={this.updateRental}
            errors={errors}
            resetErrors={this.resetRentalErrors}
          />
        </div>
        <div className="rental-update-titles">
          <span>Model:</span>{' '}
          <EditableInput
            entity={rental}
            entityField={'model'}
            className={'rental-title'}
            containerStyle={{ display: 'inline-block' }}
            updateEntity={this.updateRental}
            errors={errors}
            resetErrors={this.resetRentalErrors}
          />
        </div>
        <div className="rental-update-titles">
          <span>Type:</span>{' '}
          <EditableInput
            entity={rental}
            entityField={'type'}
            className={'rental-title'}
            containerStyle={{ display: 'inline-block' }}
            updateEntity={this.updateRental}
            errors={errors}
            resetErrors={this.resetRentalErrors}
          />
        </div>
        <div className="rental-update-titles">
          <span>Street:</span>{' '}
          <EditableInput
            entity={rental}
            entityField={'street'}
            className={'rental-city'}
            containerStyle={{ display: 'inline-block' }}
            updateEntity={this.updateRental}
            errors={errors}
            resetErrors={this.resetRentalErrors}
          />
        </div>
        <div className="rental-update-titles">
          <span>City:</span>{' '}
          <EditableInput
            entity={rental}
            entityField={'city'}
            className={'rental-city'}
            containerStyle={{ display: 'inline-block' }}
            updateEntity={this.updateRental}
            errors={errors}
            resetErrors={this.resetRentalErrors}
          />
        </div>
        <div className="rental-update-titles">
          <span>Country:</span>{' '}
          <EditableInput
            entity={rental}
            entityField={'country'}
            className={'rental-city'}
            containerStyle={{ display: 'inline-block' }}
            updateEntity={this.updateRental}
            errors={errors}
            resetErrors={this.resetRentalErrors}
          />
        </div>
        <div className="rental-room-info">
          <span className="bold">
            <i className="fa fa-building" />
            <EditableInput
              entity={rental}
              entityField={'units'}
              type={'number'}
              className={'rental-units'}
              containerStyle={{ display: 'inline-block' }}
              updateEntity={this.updateRental}
              errors={errors}
              resetErrors={this.resetRentalErrors}
            />
            <span>units available at the moment</span>
          </span>
        </div>
        <hr />
        <div className="rental-description">
          <span className="bold">Description:</span>{' '}
          <EditableTextArea
            entity={rental}
            entityField={'description'}
            className={'rental-description'}
            updateEntity={this.updateRental}
            errors={errors}
            resetErrors={this.resetRentalErrors}
            rows={4}
            cols={60}
          />
        </div>
        <div className="rental-description">
          <span className="bold">Condition:</span>{' '}
          <EditableSelect
            entity={rental}
            entityField={'condition'}
            className={'rental-description'}
            containerStyle={{ display: 'inline-block' }}
            updateEntity={this.updateRental}
            errors={errors}
            resetErrors={this.resetRentalErrors}
            options={['Good', 'Poor', 'Near Mint', 'Mint']}
          />
        </div>
        <div className="rental-description">
          <span className="bold">Daily Rate:</span>{' '}
          <EditableInput
            entity={rental}
            entityField={'dailyRate'}
            type={'number'}
            className={'rental-description'}
            containerStyle={{ display: 'inline-block' }}
            updateEntity={this.updateRental}
            errors={errors}
            resetErrors={this.resetRentalErrors}
          />{' '}
          $.
        </div>
        <hr />
        <RentalAssets />
      </div>
    );
  }
}

export default RentalDetailUpdate;
