import React, { Component } from 'react';
import { Form } from '@ant-design/compatible';

// import '@ant-design/compatible/assets/index.css';


import { Button, Col, DatePicker, Input, Row, Divider, Select } from 'antd';
import PropTypes from 'prop-types';
import AddressInput from "../common/AddressInput";

const { Option } = Select;
const { TextArea } = Input;

const FormItem = Form.Item;

@Form.create()
export default class MyFormCardET extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    fromCardData: PropTypes.array,
    loading: PropTypes.bool,

  };
  formatValueToRulesArr = value => [
    {
      required: value.rules ? value.rules[0].required : value.bol,
      message: value.rules ? value.rules[0].message : value.errorMessage,
      ...(value.rules && value.rules[0]),
    },
  ];
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);

      }
    });
  };

  render() {
    const { fromCardData, dispatch, buttonText, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          {fromCardData.map((value, index) => (
            <Col lg={12} md={12} sm={24} xs={24} key={value.key}
              style={{ height: value.type == 'TextArea' ? '' : '85px' }}>

              {value.type === 'Input' && //输入框
                <FormItem label={value.title}>
                  {getFieldDecorator(value.name, {
                    rules: this.formatValueToRulesArr(value),
                    initialValue: value.hisDefaultValue,
                  })(
                    <Input placeholder={value.placeholder} style={{ width: '100%' }} />,
                  )}
                </FormItem>
              }

              {value.type === 'DatePicker' && //时间选择
                <FormItem label={value.title}>
                  {getFieldDecorator('courseDate', {
                    rules: this.formatValueToRulesArr(value),
                    initialValue: value.hisDefaultValue,
                  })(
                    <DatePicker placeholder={value.placeholder} style={{ width: '100%' }} />,
                  )}
                </FormItem>
              }

              {value.type === 'AddressInput' &&
                <FormItem label={value.title}>
                  {getFieldDecorator(value.name, {
                    rules: this.formatValueToRulesArr(value),
                    initialValue: value.hisDefaultValue || [],
                  })(
                    <AddressInput
                      addressStyle={{ width: '100%' }}
                      disabled={!!value.disabled}
                      dispatch={dispatch}
                    />,
                  )}
                </FormItem>}

              {value.type === 'TextArea' &&
                <FormItem label={value.title}>
                  {getFieldDecorator(value.name, {
                    rules: this.formatValueToRulesArr(value),
                    initialValue: value.hisDefaultValue,
                  })(
                    <TextArea
                      style={{ width: '100%', height: '100px' }}
                      autosize={{ minRows: 3 }}
                      placeholder={value.placeholder}
                      disabled={!!value.disabled}
                      {...value.hisProps}
                    />,
                  )}
                </FormItem>}

              {value.type === 'select' &&
                <FormItem label={value.title}>
                  {getFieldDecorator(value.name, {
                    rules: this.formatValueToRulesArr(value),
                    initialValue: value.hisDefaultValue || '',
                  })(
                    <Select
                      style={{ width: '100%' }}
                      onChange={event => (value.onChange ? value.onChange(event, form) : null)}
                      disabled={!!value.disabled}
                    >
                      <Option value="" key="first">
                        请选择
                    </Option>
                      {value.menu && value.menu.map(singleData => (
                        <Option
                          value={singleData.childCd || singleData[value.menuKey]}
                          key={singleData.codeId || singleData[value.menuKey]}
                        >
                          {singleData.childCodeNm || singleData[value.menuLabel]}
                        </Option>
                      ))}
                    </Select>,
                  )}
                </FormItem>}
            </Col>
          ))}
        </Row>
        {this.props.children}

      </Form>
    );
  }
}
