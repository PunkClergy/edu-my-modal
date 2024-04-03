import React, { PureComponent } from 'react';
import { Input } from 'antd';
import { trim } from '../../utils/common';

class NameInput extends PureComponent {
  // 构造器
  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      family: value.family || '',
      name: value.name || '',
    };
  }

  // 组件将要接收Props
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value; // eslint-disable-line
      this.setState(value);
    }
  }

  // 家族名字的修改
  handleFamilyChange = e => {
    const family = trim(e.target.value);
    if (!('value' in this.props)) {
      this.setState({ family });
    }
    this.triggerChange({ family });
  };

  // 名字的修改
  handleNameChange = e => {
    const name = trim(e.target.value);
    if (!('value' in this.props)) {
      this.setState({ name });
    }
    this.triggerChange({ name });
  };

  // 触发父组件的一个方法
  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange; // eslint-disable-line
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  // 数据渲染
  render() {
    const { size, width } = this.props;
    const { ...state } = this.state;
    return (
      <span style={{ display: 'block', width: `${width}px` || 'auto' }}>
        <Input
          type="text"
          size={size}
          value={state.family}
          placeholder="姓"
          onChange={this.handleFamilyChange}
          style={{ width: '47%', marginRight: '3%' }}
        />
        <Input
          type="text"
          size={size}
          value={state.name}
          placeholder="名"
          onChange={this.handleNameChange}
          style={{ width: '50%' }}
        />
      </span>
    );
  }
}

export default NameInput;
