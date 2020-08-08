import {Button, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import React from 'react';
import {getCSRF} from 'app/helpers/utils';

const UploadFile: React.FC<UploadFileProps> = (props) => {

  return (
    <Upload
      action={props.action}
      data={props.data}
      headers={{ 'X-XSRF-TOKEN': getCSRF() }}
      showUploadList={{
        showDownloadIcon: true,
        showRemoveIcon: true,
      }}
      beforeUpload={file => {
        props.beforeUpload(file)
        return false;
       }
      }

      // onChange={(info) => {
      //  props.onSuccess(info.file.name);
      // }}
>
      <Button>
        <UploadOutlined /> Click to Upload
      </Button>
    </Upload>
  )
}

interface UploadFileProps {
  action: string;
  data?: object;
  onSuccess?: (fileName) => void;
  beforeUpload?: Function;
}

export default UploadFile;
