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
  disabled,
  multiple

}) => {
  const Options = options.map(option => (<option>{option}</option>)) 

  return (
    <div className="form-group">
      <select 
      name = {name}
      className={classnames('form-control form-control-lg' , {'is-invalid' : error})}
      multiple = {multiple}
      onChange = {onChange}
      disabled = {disabled}
      value = {value}
      >
       {Options}
      </select>
      {info && (<small className="form-text text-muted">{info}</small>)}
      {error && (<div className="invalid-feedback">{error}</div>)}
  </div>
  )
}

SelectListGroup.propTypes = {
  name : PropTypes.string.isRequired,
  placeholder : PropTypes.string,
  value : PropTypes.string,
  info : PropTypes.string,
  error : PropTypes.string,
  type : PropTypes.string.isRequired,
  onChange : PropTypes.func.isRequired,
  disabled : PropTypes.string
}

SelectListGroup.defaultProps = {
  type : 'text'
}

export default SelectListGroup;