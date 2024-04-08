import React, { Component } from 'react';
import { Form } from '@ant-design/compatible';

// import '@ant-design/compatible/assets/index.css';


import { Card, Col, Select, Input, DatePicker, Radio, Checkbox, Switch } from 'antd';
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const CheckGroup = Checkbox.Group;

export default class MyFormCard extends Component {
  getFieldsData = valueData => {
    const { form } = this.props;
    const children = [];
    valueData.forEach(value => {
      const { rules } = value;
      switch (value.type) {
        case 'select':
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(`${value.keyName}`, {
                  rules,
                  initialValue: value.hisDefaultValue
                    ? value.hisDefaultValue
                    : value.menu[0] ? value.menu[0].childCd : '',
                })(
                  <Select onChange={(event) => value.onChange?value.onChange(event, form):(null)} style={{ width: '100%' }}>
                    {value.menu.map(singleData => (
                      <Option value={singleData.childCd} key={singleData[value.menuKey]}>
                        {singleData.childCodeNm}
                      </Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            </Col>,
          );
          break;
        case 'textArea':
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(`${value.keyName}`, {
                  rules,
                  initialValue: value.hisDefaultValue,
                })(<TextArea autosize={{ minRows: 3 }} />)}
              </FormItem>
            </Col>,
          );
          break;
        case 'datePicker':
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(`${value.keyName}`, {
                  rules,
                  initialValue: value.hisDefaultValue,
                })(<DatePicker style={{ width: '100%' }} />)}
              </FormItem>
            </Col>,
          );
          break;
        case 'radioGroup':
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(`${value.keyName}`, {
                  rules,
                  initialValue: value.hisDefaultValue
                    ? value.hisDefaultValue
                    : value.menu[0] ? value.menu[0].childCd : '',
                })(
                  <RadioGroup style={{ width: '100%' }}>
                    {value.menu.map(singleData => (
                      <Radio value={singleData.childCd} key={singleData[value.menuKey]}>
                        {singleData.childCodeNm}
                      </Radio>
                    ))}
                  </RadioGroup>,
                )}
              </FormItem>
            </Col>,
          );
          break;
        case 'checkGroup':
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(`${value.keyName}`, {
                  rules,
                  initialValue: value.hisDefaultValue
                    ? value.hisDefaultValue
                    : value.menu[0] ? value.menu[0].childCd : [],
                })(<CheckGroup style={{ width: '100%' }} options={value.menu} />)}
              </FormItem>
            </Col>,
          );
          break;
        case 'studyYear':
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(`${value.keyName}`, {
                  rules,
                  initialValue:
                  value.hisDefaultValue || (value.menu[0] && value.menu[0].acadYearId),
                })(
                  <Select style={{ width: '100%' }}>
                    {value.menu.map(singleData => (
                      <Option value={singleData.acadYearId} key={singleData.acadYearId}>
                        {singleData.acadTitle}
                      </Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            </Col>,
          );
          break;
        case 'gender':
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(`${value.keyName}`, {
                  rules,
                  initialValue: value.hisDefaultValue ? value.hisDefaultValue : 'F',
                })(
                  <RadioGroup style={{ width: '100%' }}>
                    <Radio value="F" key="1">
                      女
                    </Radio>
                    <Radio value="M" key="2">
                      男
                    </Radio>
                  </RadioGroup>,
                )}
              </FormItem>
            </Col>,
          );
          break;
        case 'switch':
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(`${value.keyName}`, {
                  rules,
                  valuePropName: 'checked',
                  initialValue: typeof value.hisDefaultValue === 'undefined' || true,
                })(
                  <Switch onChange={value.onChange} checkedChildren="开" unCheckedChildren="关" />,
                )}
              </FormItem>
            </Col>,
          );

          break;
        default:
          if (value.hidden) {
            children.push(null);
          }
          else {
            children.push(
              <Col span={24} key={value.key}>
                <FormItem label={value.labelName}>
                  {form.getFieldDecorator(`${value.keyName}`, {
                    rules,
                    initialValue: value.hisDefaultValue,
                  })(<Input disabled={value.disabled} placeholder={value.placeholder} />)}
                </FormItem>
              </Col>,
            );
          }
          break;
      }
    });
    return children;
  };

  render() {
    const { data } = this.props;
    return (
      <Card bordered={false} className={styles.myModal}>
        <Form>
        {this.getFieldsData(data)}
        </Form>
      </Card>
    );
  }
}
