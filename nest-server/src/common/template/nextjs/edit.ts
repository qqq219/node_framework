import { getPkField, lowercaseFirstLetter, uppercaseFirstLetter } from "../../utils/gen.tool";
import { GenConstants } from "../../model/constant/GenConstants";
import { GenTableColumnEntity } from "src/system/model/entity/GenTableCloumn.entity";

export const reactEditTem = (options) => {
  const { functionName, functionAuthor, moduleName,className,columns } = options;
  const lfclassName = lowercaseFirstLetter(className);
  const upperModuleName = uppercaseFirstLetter(moduleName);
  const pkField:string = getPkField(columns);
  return `

/**
 * @author ${functionAuthor}
 */

import React, { useEffect } from 'react';
import { Modal,Form,Row,Col,FormProps,Radio, Input } from 'antd';
import access from '@/app/common/utils/access';
import { useSelector } from 'react-redux';

export type ${className}FormData = Record<string, unknown> & Partial<API.${upperModuleName}.${className}>;

export type ${className}FormProps = {
  onCancel: (flag?: boolean, formVals?: ${className}FormData) => void;
  onSubmit: (values: ${className}FormData) => Promise<void>;
  open: boolean;
  values: Partial<API.${upperModuleName}.${className}>;
  ${lfclassName}List: API.${upperModuleName}.${className}[];
}

const Edit${className}: React.FC<${className}FormProps> = (props) => {

    const userInfo = useSelector((state:API.CurrentUser) => state.userinfo);
    
    const [edit${className}Form] = Form.useForm();
    
    const handleOk = () => {
        edit${className}Form.submit();
    };
    const handleCancel = () => {
        props.onCancel();
    };
 
    const onFinish: FormProps<API.${upperModuleName}.${className}>['onFinish'] = (values) => {
        console.log('Success:', values);
        props.onSubmit(values as ${className}FormData);
    };

    const onFinishFailed: FormProps<API.${upperModuleName}.${className}>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        edit${className}Form.resetFields();
        if(props.values.${pkField} != undefined){
            edit${className}Form.setFieldsValue({
                ${createFormValueAssign(columns)}
            });
        }
    }, [edit${className}Form, props, props.open]);

    return (
        <div>
            <Modal
                title="添加/编辑${functionName}"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={props.open}
                onOk={handleOk}
                onCancel={handleCancel}
                className='!w-200'
                >
                <Form
                    form={edit${className}Form}
                    name="edit${className}Form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='!p-5'
                >
                    <Form.Item<API.${upperModuleName}.${className}>
                        name="${pkField}"
                        label="${pkField}"
                        hidden={true}
                        >
                    </Form.Item>
                    <Row
                        gutter={24}>
                        ${createFormBody(columns)}
                    </Row>
                </Form>

            </Modal>
        </div>
    );
}

export default Edit${className};

    `;

  function createFormValueAssign(columns:GenTableColumnEntity[]) {
    let str = ``;

    columns.forEach(item=>{
      str+=`
      ${item.javaField}: props.values.${item.javaField},`
    })

    return str;
  }

  function createFormBody(columns:GenTableColumnEntity[]) {

    let str = ``;

    columns.forEach((item,index)=>{

      if((item.isInsert != '1' && item.isEdit !='1') && item.isPk != '1'){
        return
      }
      str += `
        <Col span={12}>
            <Form.Item<API.${upperModuleName}.${className}>
                label="${item.columnComment}"
                name="${item.javaField}"
                rules={[{ required: ${item.isRequired?true:false}, message: '请输入${item.columnComment}' }]}
                labelCol={{span: 6}}
                >
                <Input placeholder="请输入${item.columnComment}" />
            </Form.Item>
        </Col>
      `

    })

    return str;

  }
};

