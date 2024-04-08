import React, { PureComponent } from "react";
import { Table, Col, Select, Row, Input, Button, DatePicker, Card, Radio } from "antd";
import { Form } from "@ant-design/compatible";
import { injectIntl } from "umi";
import SelectInput from "../common/SelectInput";
import styles from "../public/css/TableListTwo.less";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;

@Form.create()
class MyTable extends PureComponent {
  constructor(props) {
    super(props);
    this.intl = props.intl;
  }
  getCurrentFormValue = () => {
    const { form } = this.props;
    return form.getFieldsValue();
  };

  myHandleSearch = (e) => {
    const { form, handleSearch } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      handleSearch(fieldsValue, form);
    });
  };

  myHandleFormReset = () => {
    const { form, handleSearch, resetButtonFunc } = this.props;
    if (resetButtonFunc) {
      resetButtonFunc(form);
      return;
    }
    form.resetFields(); // 重置表单
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;
      handleSearch(fieldsValue, "reset");
    });
  };

  renderHeader = (menuData, hidenButton) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const currentStudyYearId = localStorage.getItem("eduTouch_year_id")
      ? Number(localStorage.getItem("eduTouch_year_id"))
      : "";
    if (!menuData) {
      return <div />;
    }
    const childrenData = [];
    menuData.forEach((singleMenu) => {
      switch (singleMenu.type) {
        case "hidden":
          // 隐藏
          break;
        case "studyYear":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem label={singleMenu.labelName}>
                {getFieldDecorator(`${singleMenu.keyName}`, {
                  initialValue: singleMenu.menu.length > 0 ? currentStudyYearId : "",
                })(
                  <Select
                    style={{ width: "100%" }}
                    onChange={singleMenu.onChange && singleMenu.onChange.bind(this, form)}
                  >
                    {singleMenu.menu.map((single) => (
                      <Option value={single.acadYearId} key={single.acadYearId}>
                        {single.acadTitle}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "select":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem label={singleMenu.labelName}>
                {getFieldDecorator(`${singleMenu.keyName}`, {
                  initialValue: singleMenu.menu.length > 0 ? singleMenu.hisDefaultValue || "" : "",
                })(
                  <Select
                    style={{ width: "100%" }}
                    onChange={singleMenu.onChange && singleMenu.onChange.bind(this, form)}
                  >
                    {!singleMenu.hiddenChoose && (
                      <Option value="" key="first">
                        请选择
                      </Option>
                    )}
                    {singleMenu.menu.map((single) => (
                      <Option value={single.childCd} key={single.codeId || single.key}>
                        {single.childCodeNm}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "datePicker":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem label={singleMenu.labelName}>
                {getFieldDecorator(`${singleMenu.keyName}`, {
                  initialValue: singleMenu.hisDefaultValue,
                })(<DatePicker format={singleMenu.dateFormat || "YYYY-MM-DD"} />)}
              </FormItem>
            </Col>
          );
          break;
        case "monthPicker":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem label={singleMenu.labelName}>
                {getFieldDecorator(`${singleMenu.keyName}`, {
                  initialValue: singleMenu.hisDefaultValue,
                })(
                  <MonthPicker
                    disabledDate={singleMenu.disabledDate || (() => false)}
                    format={singleMenu.dateFormat || "YYYY-MM"}
                  />
                )}
              </FormItem>
            </Col>
          );
          break;
        case "doubleDatePicker":
          childrenData.push(
            <Col lg={7} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem label={singleMenu.labelName}>
                {getFieldDecorator(`${singleMenu.keyName}`, {
                  initialValue: singleMenu.defaultValue ? singleMenu.defaultValue : [],
                })(<RangePicker presets={singleMenu.ranges || []} style={{ width: "100%" }} />)}
              </FormItem>
            </Col>
          );
          break;
        case "Button":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <span className={styles.submitButtons}>
                <Button type={singleMenu.buttonType} htmlType={singleMenu.htmlType}>
                  {singleMenu.ButtonName}
                </Button>
              </span>
            </Col>
          );
          break;
        case "radionButtonGroup":
          childrenData.push(
            <Col lg={24} md={24} sm={24} xs={24} key={singleMenu.key}>
              <FormItem label={singleMenu.labelName} style={{ marginBottom: "2px" }}>
                {getFieldDecorator(`${singleMenu.keyName}`, {
                  initialValue: "",
                })(
                  <Radio.Group
                    key={singleMenu.key}
                    size={singleMenu.size || "default"}
                  // onChange={this.handleSizeChange}
                  >
                    <Radio.Button value="" key="allFirst">
                      全部
                    </Radio.Button>
                    {singleMenu.menu.map((item) => (
                      <Radio.Button value={item.key} key={item.key}>
                        {item[singleMenu.titleKey] || item.title}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "selectInput":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key} style={{ display: "flex" }}>
              <FormItem label={singleMenu.labelName}>
                {getFieldDecorator(`${singleMenu.keyName}`, {
                  initialValue: {
                    selectType: "1",
                    inputValue: "",
                  },
                })(<SelectInput placeholderObj={singleMenu.placeholderObj} selectMenu={singleMenu.menu} />)}
              </FormItem>
            </Col>
          );
          break;
        case "multiple":
          childrenData.push(
            <Col lg={singleMenu.widthCol ? singleMenu.widthCol : 6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem label={singleMenu.labelName}>
                {getFieldDecorator(`${singleMenu.keyName}`, {
                  initialValue: [],
                })(
                  <Select
                    mode={singleMenu.modeType ? singleMenu.modeType : "multiple"}
                    placeholder={singleMenu.placeholder}
                    notFoundContent={null}
                    filterOption={!singleMenu.openFilterOption}
                    onChange={singleMenu.onChange}
                    onSearch={singleMenu.onSearch}
                    onBlur={singleMenu.onBlur}
                    style={{ width: "100%" }}
                  >
                    {singleMenu.menu.map((value) => (
                      <Option value={value[singleMenu.childKey]} key={value[singleMenu.childKey]} info={value}>
                        {value[singleMenu.childName]}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        default:
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem label={singleMenu.labelName}>
                {getFieldDecorator(`${singleMenu.keyName}`, {
                  initialValue: "",
                })(<Input placeholder={singleMenu.placeholder} />)}
              </FormItem>
            </Col>
          );
          break;
      }
    });

    childrenData.push(
      !hidenButton ? (
        <Col
          md={3}
          sm={24}
          xs={24}
          key="submiType"
          className={childrenData.length <= 2 ? "twoChildren" : childrenData.length === 4 ? "onlyOneBtn" : "newButton"}
        >
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">
              {this.intl.formatMessage({ id: "app.button.query" })}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.myHandleFormReset}>
              {this.intl.formatMessage({ id: "app.button.reset" })}
            </Button>
          </span>
        </Col>
      ) : (
        <div key="lastBtn" />
      )
    );

    return (
      <div className={styles.tableList}>
        <div className={styles.tableListForm}>
          <Form onSubmit={this.myHandleSearch} className="myForm">
            <Row gutter={24}>{childrenData}</Row>
          </Form>
        </div>
      </div>
    );
  };

  render() {
    const {
      headerMenuData,
      headerOther,
      noTable = false,
      cardStyle,
      bordered,
      hisCardProps = {},
      hisTableProps = {},
      hiddenButton = false,
      onSelect,
    } = this.props;
    return (
      <Card style={{ cardStyle }} bordered={bordered} {...hisCardProps}>
        <Form>{headerMenuData ? this.renderHeader(headerMenuData, hiddenButton) : ""}</Form>
        {headerOther ? <div style={{ margin: "10px 0 20px 0" }}>{headerOther()}</div> : ""}
        {!noTable && [
          <Table key="myTable" {...this.props} {...hisTableProps} style={{ marginTop: headerOther ? "" : "10px" }} />,
        ]}
      </Card>
    );
  }
}

export default injectIntl(MyTable);
