import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    type,
    icon,
    onChange, 
}) => {
  return (  
    <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text">
                <i className={icon} />
            </span>
        </div>
        <input
            type = {type}
            placeholder = {placeholder}
            name = {name}
            className = {classnames('form-control form-control-lg' , {'is-invalid' : error})}
            value = {value}
            onChange = {onChange} />
            {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

InputGroup.propTypes = {
  name : PropTypes.string.isRequired,
  type : PropTypes.string.isRequired,
  placeholder : PropTypes.string,
  value : PropTypes.string,
  info : PropTypes.string,
  error : PropTypes.string,
  onChange : PropTypes.func.isRequired,
  icon : PropTypes.string
}

InputGroup.defaultProps = {
    type:"text"
}

export default InputGroup;