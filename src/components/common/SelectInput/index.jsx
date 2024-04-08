import React, { PureComponent } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

export default class SelectInput extends PureComponent {
  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      selectType: value.selectType || 0,
      inputValue: value.inputValue || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const { value } = nextProps;
      this.setState(value);
    }
  }

  handleSelectChange = selectType => {
    this.setState({
      selectType,
    });
    this.triggerChange({ selectType });
  };
  handleNumberChange = event => {
    const inputValue = event.target.value;
    this.setState({
      inputValue,
    });
    this.triggerChange({ inputValue });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { size, selectMenu, placeholderObj } = this.props;
    const { selectType, inputValue } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <Select
          onChange={this.handleSelectChange}
          value={selectType}
          size={size}
          style={{ width: '50%' }}
        >
          {selectMenu &&
            selectMenu.map(item => (
              <Option key={item.key} value={item.value}>
                {item.title}
              </Option>
            ))}
        </Select>
        <Input
          placeholder={placeholderObj[selectType]}
          type="text"
          size={size}
          value={inputValue}
          onChange={this.handleNumberChange}
          // style={{ width: '65%', marginRight: '3%' }}
        />
      </div>
    );
  }
}
