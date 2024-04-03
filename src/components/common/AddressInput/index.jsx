import React, { PureComponent } from 'react';
import { Cascader, message } from 'antd';
import { getData } from '../../utils/common';

/**
 * 本地地址选择的引用
 * https://gist.github.com/afc163/7582f35654fd03d5be7009444345ea17
 */
class AdressInput extends PureComponent {
  // 构造器
  constructor(props) {
    // 获取
    super(props);
    this.state = {
      options: [],
      value: props.value || [],
      allProvinces: [],
    };
    this.getSomeData();
  }

  // 级联菜单的修改
  onChange = (value, selectedOptions) => {
    const { onChange } = this.props;
    this.setState(
      {
        value,
      },
      () => {
        if (onChange) {
          onChange(value, selectedOptions);
        }
      },
    );
  };

  // 获取一些数据
  getSomeData = () => {
    const { value } = this.state;
    let options;
    if (value.length === 0) {
      this.getProvinces()
        .then(response => {
          response.forEach(item => {
            item.value = item.code; // eslint-disable-line
            item.label = item.abbname; // eslint-disable-line
            item.isLeaf = false; // eslint-disable-line
          });
          options = response;
          this.setState({
            options: [...options],
            allProvinces: response,
          });
        })
        .catch(errormsg => {
          message.error(errormsg);
        });
    } else {
      let currentProvinceItem;
      let currentCityItem;
      //  获取省市区
      this.getProvinces()
        .then(provicedData => {
          provicedData.forEach(item => {
            if (item.code === value[0]) {
              currentProvinceItem = item;
            }
            item.value = item.code; // eslint-disable-line
            item.label = item.abbname; // eslint-disable-line
            item.isLeaf = false; // eslint-disable-line
          });
          options = provicedData;
          // 获取城市
          this.getCities(value[0])
            .then(cityData => {
              cityData.forEach(item => {
                if (item.code === value[1]) {
                  currentCityItem = item;
                }
                item.value = item.code; // eslint-disable-line
                item.label = item.abbname; // eslint-disable-line
                item.isLeaf = false; // eslint-disable-line
              });
              currentProvinceItem.children = cityData;
              this.getAreas(value[1])
                .then(areaData => {
                  areaData.forEach(item => {
                    item.value = item.code; // eslint-disable-line
                    item.label = item.abbname; // eslint-disable-line
                    item.isLeaf = true; // eslint-disable-line
                  });
                  currentCityItem.children = areaData;
                  this.setState({
                    options: [...options],
                    allProvinces: provicedData,
                  });
                })
                .catch(errormsg => {
                  message.error(errormsg);
                });
            })
            .catch(errormsg => {
              message.error(errormsg);
            });

          this.setState({
            options: [...options],
          });
        })
        .catch(errormsg => {
          message.error(errormsg);
        });
    }
  };

  // 获取省
  getProvinces = () => {
    const { dispatch } = this.props;
    const { allProvinces } = this.state;
    if (allProvinces.length > 0) {
      return new Promise(resolve => resolve(allProvinces));
    }
    return new Promise((resolve, reject) => {
      getData(dispatch, 'global/getProvinces', {}, resolve, reject);
    });
  };

  // 获取市
  getCities = provinceId => {
    const { dispatch } = this.props;
    return new Promise((resolve, reject) => {
      getData(dispatch, 'global/getCities', { provinceId }, resolve, reject);
    });
  };

  // 获取县
  getAreas = cityId => {
    const { dispatch } = this.props;
    return new Promise((resolve, reject) => {
      getData(dispatch, 'global/getAreas', { cityId }, resolve, reject);
    });
  };

  loadData = selectedOptions => {

    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const { options } = this.state;
    const { toCity } = this.props;
    switch (selectedOptions.length) {
      case 1:
        this.getCities(targetOption.code)
          .then(response => {
            targetOption.loading = false;
            response.forEach(item => {
              item.value = item.code; // eslint-disable-line
              item.label = item.abbname; // eslint-disable-line
              item.isLeaf = toCity ? true : false; // eslint-disable-line
            });
            targetOption.children = response;
            this.setState({
              options: [...options],
            });
          })
          .catch(errormsg => {
            message.error(errormsg);
          });
        break;
      case 2:
        this.getAreas(targetOption.code)
          .then(response => {
            targetOption.loading = false;
            response.forEach(item => {
              item.value = item.code; // eslint-disable-line
              item.label = item.abbname; // eslint-disable-line
              item.isLeaf = true; // eslint-disable-line
            });
            targetOption.children = response;
            this.setState({
              options: [...options],
            });
          })
          .catch(errormsg => {
            message.error(errormsg);
          });
        break;
      default:
        break;
    }
  };

  // 数据渲染
  render() {
    const { addressStyle, value } = this.props;
    const { options } = this.state;
    return (
      <span style={{ display: 'block', addressStyle }}>
        <Cascader
          style={addressStyle}
          options={options}
          loadData={this.loadData}
          onChange={this.onChange}
          defaultValue={value}
          placeholder="请选择地址"
        />
      </span>
    );
  }
}

export default AdressInput;
