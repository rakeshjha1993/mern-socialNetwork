import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
  return (
    <div className="form-group">
        <input type={type}
            placeholder = {placeholder}
            name = {name}
            className = {classnames('form-control form-control-lg' , {'is-invalid' : error})}
            value = {value}
            onChange = {onChange}
            disabled = {disabled} />
            {info && (<small className="form-text text-muted"></small>)}
            {error && (<div className="invalid-feedback"></div>)}
        
      
    </div>
  )
}
