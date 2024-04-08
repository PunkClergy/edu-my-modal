import React, { Component } from 'react';
import { Form } from '@ant-design/compatible';

// import '@ant-design/compatible/assets/index.css';


import { Col, DatePicker, Input, Row, Select, TimePicker, TreeSelect, Upload, Button } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import AddressInput from "../common/AddressInput";

const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
export default class MyFormET extends Component {
  static propTypes = {
    fromCardData: PropTypes.array,
    loading: PropTypes.bool,
  };

  formatValueToRulesArr = (value) => [
    {
      required: value.rules ? value.rules[0].required : value.bol,
      message: value.rules ? value.rules[0].message : value.errorMessage,
      ...(value.rules && value.rules[0]),
    },
  ];

  getWrapperCol = (value) => {
    if (!value || !value.labelColNum) {
      return {};
    }
    // {
    //   span: value.wrapperColNum
    //     ? value.wrapperColNum
    //     : value.labelColNum
    //     ? 23 - value.labelColNum
    //     : 24,
    // }
    let span = 24;
    if (value.wrapperColNum) {
      span = value.wrapperColNum;
    } else if (value.labelColNum) {
      span = 23 - value.labelColNum;
    }
    return { span };
  };

  render() {
    const { fromCardData, dispatch, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      (<div>
        <Form>
        <Row gutter={24}>
          {fromCardData &&
            fromCardData.map((value, index) => (
              <Col
                lg={value.lg ? value.lg : 24}
                md={value.md ? value.md : 24}
                sm={24}
                xs={24}
                key={index}
                style={{ minHeight: value.type === 'TextArea' ? '' : '60px' }}
              >
                {value.type === 'Input' && ( // 输入框
                  (<FormItem
                    label={value.title}
                    labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                    wrapperCol={this.getWrapperCol(value)}
                  >
                    {getFieldDecorator(value.name, {
                      rules: this.formatValueToRulesArr(value),
                      initialValue: value.hisDefaultValue,
                    })(
                      <Input
                        placeholder={value.placeholder}
                        style={{ width: '100%' }}
                        {...value.hisProps}
                      />,
                    )}
                  </FormItem>)
                )}

                {value.type === 'DatePicker' && ( // 时间选择
                  (<FormItem
                    label={value.title}
                    labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                    wrapperCol={this.getWrapperCol(value)}
                  >
                    {getFieldDecorator(value.name, {
                      rules: this.formatValueToRulesArr(value),
                      initialValue: value.hisDefaultValue,
                    })(
                      <DatePicker
                        placeholder={value.placeholder}
                        style={{ width: '100%' }}
                        {...value.hisProps}
                      />,
                    )}
                  </FormItem>)
                )}

                {value.type === 'TimePicker' && ( // 时间选择
                  (<FormItem
                    label={value.title}
                    labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                    wrapperCol={this.getWrapperCol(value)}
                  >
                    {getFieldDecorator(value.name, {
                      rules: this.formatValueToRulesArr(value),
                      initialValue: value.hisDefaultValue,
                    })(
                      <TimePicker
                        placeholder={value.placeholder}
                        style={{ width: '100%' }}
                        {...value.hisProps}
                      />,
                    )}
                  </FormItem>)
                )}

                {value.type === 'AddressInput' && (
                  <FormItem
                    label={value.title}
                    labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                    wrapperCol={this.getWrapperCol(value)}
                  >
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
                  </FormItem>
                )}

                {value.type === 'TextArea' && (
                  <FormItem
                    label={value.title}
                    labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                    wrapperCol={this.getWrapperCol(value)}
                  >
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
                  </FormItem>
                )}

                {value.type === 'TreeSelect' && (
                  <FormItem
                    label={value.title}
                    labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                    wrapperCol={this.getWrapperCol(value)}
                  >
                    {getFieldDecorator(value.name, {
                      rules: this.formatValueToRulesArr(value),
                      initialValue: value.hisDefaultValue,
                    })(<TreeSelect style={{ width: '100%' }} {...value.hisProps} />)}
                  </FormItem>
                )}

                {value.type === 'Select' && (
                  <FormItem
                    label={value.title}
                    labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                    wrapperCol={this.getWrapperCol(value)}
                  >
                    {getFieldDecorator(value.name, {
                      rules: this.formatValueToRulesArr(value),
                      initialValue: value.hisDefaultValue || '',
                    })(
                      <Select
                        style={{ width: '100%' }}
                        onChange={(event) => (value.onChange ? value.onChange(event, form) : null)}
                        disabled={!!value.disabled}
                      >
                        <Option value="" key="first">
                          请选择
                        </Option>
                        {value.menu &&
                          value.menu.map((singleData) => (
                            <Option
                              value={singleData.childCd || singleData[value.menuKey]}
                              key={singleData.codeId || singleData[value.menuKey]}
                            >
                              {singleData.childCodeNm || singleData[value.menuLabel]}
                            </Option>
                          ))}
                      </Select>,
                    )}
                  </FormItem>
                )}

                {value.type === 'Upload' && (
                  <FormItem
                    label={value.title}
                    labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                    wrapperCol={this.getWrapperCol(value)}
                  >
                    <Upload
                      listType="picture"
                      fileList={value.fileList ? value.fileList : []}
                      customRequest={(file) =>
                        value.beforeUpload ? value.beforeUpload(file) : null
                      }
                      onRemove={(file) =>
                        value.beforeUploadRemove ? value.beforeUploadRemove(file) : null
                      }
                    >
                      <Button disabled={value.loading}>
                        {value.loading && <LoadingOutlined />}
                        {value.loading && <UploadOutlined />}
                      </Button>
                    </Upload>
                  </FormItem>
                )}
              </Col>
            ))}
        </Row>
        </Form>
        {this.props.children}
      </div>)
    );
  }
}
