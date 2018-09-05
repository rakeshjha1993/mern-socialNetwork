import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';




const SelectListGroup = ({
  name,
  options,
  classname,
  isRequired,
  error,
  info,
  onChange,

}) => {
  const selectOptions = options.map(option => (<option key={option.label} value={option.value}>{option.label}</option>)) 
  
  return (
    <div className="form-group">
      <select 
      name = {name}
      className={classnames('form-control form-control-lg' , {'is-invalid' : error})}
      onChange = {onChange}
      >
        {selectOptions}
      </select>
      {info && (<small className="form-text text-muted">{info}</small>)}
      {error && (<div className="invalid-feedback">{error}</div>)}
  </div>
  )
}

SelectListGroup.propTypes = {
  name : PropTypes.string.isRequired,
  value : PropTypes.string,
  info : PropTypes.string,
  error : PropTypes.string,
  onChange : PropTypes.func.isRequired,
  options : PropTypes.array.isRequired
}


export default SelectListGroup;