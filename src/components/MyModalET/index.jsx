import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

export default class MyModalET extends Component {
  static propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    showFooter: PropTypes.array,
    modalWidth: PropTypes.number,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    destroyOnClose: PropTypes.bool,
    confirmLoading:PropTypes.bool
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  handleOk = () => {
    this.props.onOk();
  };

  render() {
    const { open, title, showFooter, modalWidth = 520, onOk, destroyOnClose ,confirmLoading} = this.props;
    return (
      (<Modal open={open} title={title} footer={showFooter} onCancel={this.handleCancel}
             onOk={onOk && this.handleOk}
             width={modalWidth} destroyOnClose={destroyOnClose} confirmLoading={confirmLoading} >
        {this.props.children}
      </Modal>)
    );
  }
}

