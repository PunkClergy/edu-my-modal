/**
 * create by jm on 2018/05/09
 * it's used for upload image and preview upload-image
 * accept fileList
 * return fileList(base64)
 */
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Modal } from 'antd';

class PicturesWall extends React.Component {
  // 初始化状态
  constructor(props) {
    super(props);
    const fileList = props.value || [];
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList,
      pictureLength: props.pictureLength || 3,
    };
  }

  // 关闭图片预览
  handleCancel = () => this.setState({ previewVisible: false });

  // 图片预览
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  beforeUpload = file => {
    this.setState(({ fileList }) => ({
      fileList: [...fileList, file],
    }));
    return false;
  };

  // 上传图片
  handleChange = ({ fileList }) => {
    const { onChange } = this.props;
    const base64Array = [];
    // if (fileList.length === 0 && onChange) {
    //   onChange(base64Array);
    // }
    // else {
    //   fileList.forEach((val) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(val.originFileObj);
    //     reader.onload = () => {
    //       base64Array.push(reader.result);
    //       if (onChange) {
    //         onChange(base64Array);
    //       }
    //     };
    //   });
    // }
    fileList.forEach(val => {
      base64Array.push(val.originFileObj);
    });
    if (onChange) {
      onChange(base64Array);
    }
    this.setState({ fileList });
  };

  // 渲染模板
  render() {
    const { previewVisible, previewImage, fileList, pictureLength } = this.state;
    const { style } = this.props;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      (<div style={style}>
        <Upload
          style={{ width: '100%', height: '100%' }}
          listType="picture-card"
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= pictureLength ? null : uploadButton}
        </Upload>
        <Modal open={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>)
    );
  }
}

export default PicturesWall;
