import React, { Component } from "react";
import { Form } from "@ant-design/compatible";

// import '@ant-design/compatible/assets/index.css';

import {
  Modal,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Radio,
  Checkbox,
  TimePicker,
  AutoComplete,
  Button,
  Switch,
  InputNumber,
  Spin,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import modalStyle from "./index.less";
import scrollIntoView from "dom-scroll-into-view"; // eslint-disable-line
import { regexp } from "../common/common";
// import AddressInput from "../common/AddressInput";
// import NameInput from "../common/NameInput";
// import PicturesWall from "../common/PicturesWall";

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const CheckGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class MyModal extends Component {
  formatValueToRulesArr = (value) => [
    {
      required: value.rules ? value.rules[0].required : value.bol,
      message: value.rules ? value.rules[0].message : value.errorMessage,
      ...(value.rules && value.rules[0]),
    },
  ];

  getFieldsData = (valueData) => {
    const { form, dispatch } = this.props;
    const children = [];

    valueData.forEach((value) => {
      switch (value.type) {
        case "hidden":
          // 隐藏
          break;
        case "upload":
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue || "",
                })(
                  <Upload className="myUpload" listType="picture-card" {...value.hisProps}>
                    <div>
                      {value.loading && <LoadingOutlined />}
                      {value.loading && <PlusOutlined />}
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  </Upload>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "labelContent":
          // 标签
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>{value.content}</FormItem>
            </Col>
          );
          break;
        case "numberInput":
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue,
                })(<InputNumber style={{ width: "100%" }} {...value.hisProps} />)}
              </FormItem>
            </Col>
          );
          break;
        case "switch":
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue === undefined ? true : value.hisDefaultValue,
                  valuePropName: "checked",
                })(
                  <Switch
                    checkedChildren={value.checkText || "是"}
                    unCheckedChildren={value.unCheckText || "否"}
                    {...value.hisProps}
                  />
                )}
              </FormItem>
            </Col>
          );
          break;
        case "leftRight":
          // 左右文字
          children.push(
            <Col span={12} key={value.key}>
              <FormItem>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue || "",
                })(
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>{value.leftText}</p>
                    <p>{value.rightText}</p>
                  </div>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "autoComplete":
          // 自动补全
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue || "",
                })(
                  <AutoComplete
                    style={{ width: "100%" }}
                    dataSource={value.menu || []}
                    placeholder={value.placeholder}
                    filterOption={value.filterOption}
                    {...value.hisProps}
                  />
                )}
              </FormItem>
            </Col>
          );
          break;
        case "select":
          // 复选框
          children.push(
            <Col span={12} key={value.key} style={{ display: value.hidden ? "none" : "block" }}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue || "",
                })(
                  <Select
                    style={{ width: "100%" }}
                    onChange={(event) => (value.onChange ? value.onChange(event, form) : null)}
                    disabled={!!value.disabled}
                  >
                    <Option value="" key="first">
                      请选择
                    </Option>
                    {value.menu.map((singleData) => (
                      <Option
                        value={singleData.childCd || singleData[value.menuKey]}
                        key={singleData.codeId || singleData[value.menuKey]}
                      >
                        {singleData.childCodeNm || singleData[value.menuLabel]}
                      </Option>
                    ))}
                  </Select>
                )}
                {value.hasButton && <Button onClick={value.buttonClick}>{value.buttonText}</Button>}
              </FormItem>
            </Col>
          );
          break;
        case "textArea":
          // 文本域
          children.push(
            <Col span={12} key={value.key} style={{ display: value.hidden ? "none" : "block" }}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue,
                })(
                  <TextArea
                    autosize={{ minRows: 3 }}
                    placeholder={value.placeholder}
                    disabled={!!value.disabled}
                    {...value.hisProps}
                  />
                )}
              </FormItem>
            </Col>
          );
          break;
        case "datePicker":
          // 日期选择器
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue || null,
                })(
                  <DatePicker
                    style={{ width: "100%" }} // 當value.unDisabledDate为true时候就不做限制
                    disabledDate={(currentDate) => !value.unDisabledDate && currentDate < moment()}
                    disabled={!!value.disabled}
                    {...value.hisProps}
                  />
                )}
              </FormItem>
            </Col>
          );
          break;
        case "radioGroup":
          // 单选按钮组
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue ? value.hisDefaultValue : "",
                })(
                  <RadioGroup
                    style={{ width: "100%" }}
                    onChange={(event) => value.onChange && value.onChange(event, form)}
                    disabled={!!value.disabled}
                    {...value.hisProps}
                  >
                    {value.menu.map((singleData) => (
                      <Radio
                        value={singleData.childCd || singleData[value.menuKey]}
                        key={singleData.codeId || singleData[value.menuKey]}
                      >
                        {singleData.childCodeNm || singleData[value.menuLabel]}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "checkGroup":
          // 复选按钮组
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue,
                })(
                  <CheckGroup
                    style={{ width: "100%" }}
                    options={value.menu}
                    disabled={!!value.disabled}
                    {...value.hisProps}
                  />
                )}
              </FormItem>
            </Col>
          );
          break;
        // case "nameInput":
        //   // 英文名字
        //   children.push(
        //     <Col span={12} key={value.key}>
        //       <FormItem label={value.labelName}>
        //         {form.getFieldDecorator(value.keyName || "englishName", {
        //           rules: this.formatValueToRulesArr(value),
        //           initialValue: {
        //             family: value.englishName ? value.englishName.lastName : "",
        //             name: value.englishName ? value.englishName.firstName : "",
        //           },
        //         })(<NameInput placeholder={value.placeholder} disabled={!!value.disabled} style={{ width: "100%" }} />)}
        //       </FormItem>
        //     </Col>
        //   );
        //   break;
        // case "addressInput":
        //   // 地址复选框
        //   children.push(
        //     <Col span={12} key={value.key}>
        //       <FormItem label={value.labelName}>
        //         {form.getFieldDecorator(value.keyName, {
        //           rules: this.formatValueToRulesArr(value),
        //           initialValue: value.hisDefaultValue || [],
        //         })(<AddressInput addressStyle={{ width: "100%" }} disabled={!!value.disabled} dispatch={dispatch} />)}
        //       </FormItem>
        //     </Col>
        //   );
        //   break;
        case "gender":
          // 性别
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue ? value.hisDefaultValue : "F",
                })(
                  <RadioGroup>
                    <Radio value="F" key="F">
                      女
                    </Radio>
                    <Radio value="M" key="M">
                      男
                    </Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "content":
          // 文本
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>{value.content}</FormItem>
            </Col>
          );
          break;
        case "delete":
          // 删除
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>
                <p>你确定要删除吗？</p>
              </FormItem>
            </Col>
          );
          break;
        case "timeRangePicker":
          // 时间范围选择器
          children.push(
            <Col key={value.key} span={12}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName || "timeRanger", {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue,
                })(<TimePicker style={{ width: "100%" }} disabled={!!value.disabled} {...value.hisProps} />)}
              </FormItem>
            </Col>
          );
          break;
        case "rangePicker":
          // 日期范围选择器
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: this.formatValueToRulesArr(value),
                  initialValue: value.hisDefaultValue,
                })(<RangePicker style={{ width: "100%" }} disabled={!!value.disabled} />)}
              </FormItem>
            </Col>
          );
          break;
        // case "pictureWall":
        //   children.push(
        //     <Col span={12} key={value.key}>
        //       <FormItem label={value.labelName}>
        //         {form.getFieldDecorator(value.keyName, {
        //           rules: this.formatValueToRulesArr(value),
        //           initialValue: value.hisDefaultValue,
        //         })(
        //           <PicturesWall
        //             style={{ width: "100%" }}
        //             pictureLength={value.pictureLength || 1}
        //             disabled={!!value.disabled}
        //           />
        //         )}
        //       </FormItem>
        //     </Col>
        //   );
        //   break;
        default:
          // 默认的input
          children.push(
            <Col span={value.colSpan || 12} key={value.key} style={{ display: value.hidden ? "none" : "block" }}>
              <FormItem label={value.labelName}>
                {form.getFieldDecorator(value.keyName, {
                  rules: [
                    {
                      required: value.rules ? value.rules[0].required : value.bol,
                      message: value.rules ? value.rules[0].message : value.errorMessage,
                      pattern: value.patternType ? regexp[`${value.patternType}`] : "",
                      ...(value.rules && value.rules[0]),
                    },
                  ],
                  initialValue: value.hisDefaultValue,
                })(
                  <Input
                    autoComplete={value.inputType === "password" ? "new-password" : "off"}
                    type={value.inputType || "text"}
                    onBlur={value.onBlur}
                    placeholder={value.placeholder}
                    disabled={!!value.disabled}
                    readOnly={!!value.readOnly}
                    addonAfter={value.addonAfter || ""}
                    {...value.hisProps}
                  />
                )}
              </FormItem>
            </Col>
          );
          break;
      }
    });
    return children;
  };

  findErrPosition = (err) => {
    for (const key in err) {
      if (document.querySelector(`label[for=${key}]`)) {
        // 获取label
        const sourceLabel = document.querySelector(`label[for=${key}]`);
        // 当前的元素
        const sourceInput = document.getElementById(key);

        if (sourceInput && (sourceInput.tagName === "INPUT" || sourceInput.tagName === "TEXTAREA")) {
          sourceInput.focus();
        }

        const containerEle = document.getElementById("dialogmodal");

        // 向上滑动到指定位置
        scrollIntoView(sourceLabel, containerEle, {
          // 是否顶部对齐
          alignWithTop: true,
          // 顶部位移
          offsetTop: 30,
          // 只有当需要滑动才滑动
          onlyScrollIfNeeded: true,
        });
        break;
      }
    }
  };

  handleModalOk = () => {
    const { clickOk, form } = this.props;
    form.validateFieldsAndScroll((err, fieldsValue) => {
      this.findErrPosition(err);
      if (err) return;
      clickOk(fieldsValue, form);
    });
  };

  handleCancel = (e) => {
    const { clickCancel, form, cancelNoResetForm } = this.props;
    // const className = ['ant-modal-wrap ', 'ant-modal-close-x'];
    // if (className.indexOf(e.target.className) > -1) {
    //   form.resetFields();
    //   clickCancel(false, e);
    //   return;
    // }
    if (cancelNoResetForm) {
      form.validateFieldsAndScroll((err, fieldsValue) => {
        clickCancel(err, fieldsValue, form, e);
      });
      return;
    }
    form.resetFields();
    clickCancel(false, e);
  };

  render() {
    const { modalData = [], otherData = (f) => f, zIndex, loading } = this.props;
    console.log(this.props, 'this.props.loading')
    return (
      <Modal
        {...this.props}
        destroyOnClose
        maskClosable={false}
        className={modalStyle.antProbablyStudentModal}
        open={this.props.open}
        onOk={this.handleModalOk}
        onCancel={this.handleCancel}
        zIndex={zIndex || 1000}
      >
        {loading && <Spin className="mySpin" />}
        <div id="dialogmodal" style={{ position: "relatvie" }}>
          {otherData()}
          <Form layout={this.props.layout}>
            <Row gutter={24}>
              {this.getFieldsData(modalData).map((item) => {
                return item;
              })}
            </Row>
          </Form>
        </div>
      </Modal>
    );
  }
}

export default MyModal;
