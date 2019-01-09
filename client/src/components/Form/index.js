/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import './styles.css';

// Form Components
function Group({
  children, fileInput, handleChange, id, inline, property, type, value,
}) {
  const processChildren = (child) => {
    if (child.type === Form.File) {
      return React.cloneElement(child, { fileInput, handleChange, property });
    }

    if (child.type === Form.Checkbox) {
      return React.cloneElement(child, { handleChange, property });
    }

    if (child.type === Form.Label) {
      return React.cloneElement(child, { id, inline, property });
    }

    if (child.type === Form.TextInput) {
      return React.cloneElement(child, {
        handleChange,
        property,
        type,
        value,
      });
    }

    if (
      child.type === Form.RadioButton
      || child.type === Form.Select
      || child.type === Form.TextArea
    ) {
      return React.cloneElement(child, { handleChange, property, value });
    }

    return child;
  };

  return <div className="form-group">{React.Children.map(children, processChildren)}</div>;
}

function Checkbox({ property, handleChange }) {
  return <input id={property} name={property} onChange={handleChange} type="checkbox" />;
}

function File({ property, fileInput, handleChange }) {
  return (
    <input
      className="form-file"
      id={property}
      name={property}
      onChange={handleChange}
      ref={fileInput}
      type="file"
    />
  );
}

function Label({
  property, children, inline, id,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label className={inline ? 'form-label inline' : 'form-label'} htmlFor={id || property}>
      {children}
    </label>
  );
}

function RadioButton({
  id, property, value, handleChange,
}) {
  return (
    <input
      checked={value === id}
      className="form-radio"
      id={id}
      name={property}
      onChange={handleChange}
      type="radio"
      value={id}
    />
  );
}

function Select({
  property, options, value, handleChange,
}) {
  return (
    <select
      className="form-select"
      id={property}
      name={property}
      onChange={handleChange}
      value={value}
    >
      {options.map(option => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

function SubmitButton({ children }) {
  return (
    <button className="form-submit-button" type="submit">
      {children}
    </button>
  );
}

function TextArea({ property, handleChange, value }) {
  return (
    <textarea
      className="form-textarea"
      id={property}
      name={property}
      onChange={handleChange}
      value={value}
    />
  );
}

function TextInput({
  property, value, type = 'text', handleChange,
}) {
  return (
    <input
      className="form-text-input"
      id={property}
      name={property}
      onChange={handleChange}
      type={type}
      value={value}
    />
  );
}

class Form extends Component {
  static Checkbox = Checkbox;

  static File = File;

  static Group = Group;

  static Label = Label;

  static RadioButton = RadioButton;

  static Select = Select;

  static SubmitButton = SubmitButton;

  static TextArea = TextArea;

  static TextInput = TextInput;

  constructor(props) {
    super(props);
    const { initialValues } = this.props;
    this.state = { values: initialValues };
    this.fileInput = React.createRef();
  }

  handleInputChange = (e) => {
    const { values } = this.state;
    const { type, value, name } = e.target;
    if (type !== 'checkbox' && type !== 'radio') {
      e.preventDefault();
    }
    if (type === 'checkbox') {
      this.setState({
        values: { ...values, [e.target.name]: e.target.checked },
      });
    } else if (e.target.type === 'file') {
      this.setState({
        values: {
          ...values,
          [name]: this.fileInput.current.files[0].name,
        },
      });
    } else {
      this.setState({
        values: { ...values, [name]: value },
      });
    }
  };

  handleFormSubmit = (e) => {
    const { onSubmit } = this.props;
    const { values } = this.state;
    e.preventDefault();
    onSubmit(values);
  };

  handleGroups = (child) => {
    const { values } = this.state;
    // injects onChange handler into any Form.Group instance
    if (child.type === Form.Group) {
      const value = values[child.props.property];
      return React.cloneElement(child, {
        fileInput: this.fileInput,
        handleChange: this.handleInputChange,
        value,
      });
    }
    const children = child.props ? child.props.children : undefined;
    // returns child unchanged if it has no children
    if (!children || React.Children.count(children) === 0) {
      return child;
    }
    // otherwise recursively processes children for Groups
    const processedChildren = React.Children.map(child.props.children, this.handleGroups);
    return React.cloneElement(child, { children: processedChildren });
  };

  render() {
    const { heading, children } = this.props;
    return (
      <form className="form" onSubmit={this.handleFormSubmit}>
        <heading.type className="form-title">{heading.title}</heading.type>
        {React.Children.map(children, this.handleGroups)}
      </form>
    );
  }
}

export default Form;
