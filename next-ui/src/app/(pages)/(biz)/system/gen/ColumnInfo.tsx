import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Col, Row, Tag } from 'antd';
import type { FormInstance } from 'antd';
import { ActionType, EditableProTable, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { useForm } from 'antd/es/form/Form';

export type ColumnInfoProps = {
  parentType?: string;
  data?: any[];
  dictData?: any[];
  updateColumnData:(columns:any[])=>void;
};

const booleanEnum = [
  {
    label: 'true',
    value: '1',
  },
  {
    label: 'false',
    value: '0',
  },
];
const radioEnum = [
  {
    value:'1',
  }
]

const ColumnInfo: React.FC<ColumnInfoProps> = (props) => {

  const formRef = useRef<ProFormInstance>(undefined);

  const [dataSource, setDataSource] = useState<any[]>();

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const { data, dictData, updateColumnData} = props;

  const columns: ProColumns<API.System.GenCodeType>[] = [
    {
      title: "编号",
      dataIndex: 'columnId',
      editable: false,
      width: 80,
    },
    {
      title: "字段名",
      dataIndex: 'columnName',
      editable: false,
    },
    {
      title: "字段描述",
      dataIndex: 'columnComment',
      hideInForm: true,
      hideInSearch: true,
      width: 200,
    },
    {
      title: "字段类型",
      dataIndex: 'columnType',
      editable: false,
    },
    {
      title: "类型",
      dataIndex: 'javaType',
      valueType: 'select',
      valueEnum: {
        number: {
          text: 'number',
        },
        string: {
          text: 'string',
        },
        Date: {
          text: 'Date',
        },
      },
    },
    {
      title: "属性",
      dataIndex: 'javaField',
      width: "150px"
    },
    {
      title: "插入",
      dataIndex: 'isInsert',
      valueType: 'checkbox',
      fieldProps: {
        options: radioEnum,
      },
    },
    {
      title: "编辑",
      dataIndex: 'isEdit',
      valueType: 'checkbox',
      fieldProps: {
        options: radioEnum,
      },
    },
    {
      title: "列表",
      dataIndex: 'isList',
      valueType: 'checkbox',
      fieldProps: {
        options: radioEnum,
      },
    },
    {
      title: "查询",
      dataIndex: 'isQuery',
      valueType: 'checkbox',
      fieldProps: {
        options: radioEnum,
      },
    },
    {
      title: "查询方式",
      dataIndex: 'queryType',
      valueType: 'select',
      valueEnum: {
        EQ: {
          text: '=',
        },
        NE: {
          text: '!=',
        },
        GT: {
          text: '>',
        },
        GTE: {
          text: '>=',
        },
        LT: {
          text: '<',
        },
        LTE: {
          text: '<=',
        },
        LIKE: {
          text: 'LIKE',
        },
        BETWEEN: {
          text: 'BETWEEN',
        },
      },
    },
    {
      title: "必填",
      dataIndex: 'isRequired',
      valueType: 'checkbox',
      fieldProps: {
        options: radioEnum,
      },
    },
    {
      title:"显示类型",
      dataIndex: 'htmlType',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        input: {
          text: "文本框"
        },
        textarea: {
          text: "文本域"
        },
        select: {
          text: "下拉框"
        },
        radio: {
          text: "单选框"
        },
        checkbox: {
          text: "复选框"
        },
        datetime: {
          text: "日期控件"
        },
      },
    },
    {
      title: "字典类型",
      dataIndex: 'dictType',
      hideInSearch: true,
      valueType: 'select',
      fieldProps: {
        options: dictData,
      },
      render: (text) => {
        return <Tag color="#108ee9">{text}</Tag>;
      },
    },
  ];

  useEffect(() => {
    setDataSource(props.data);
    if (data) {
      setEditableRowKeys(data.map((item) => item.columnId));
    }
  }, [data]);

  const onSubmit = (direction: string) => {

  };

  const onDataChange = (value: readonly API.System.GenCodeType[]) => {
    setDataSource({ ...value } as []);
    updateColumnData({ ...value } as [])
  };

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <EditableProTable<API.System.GenCodeType>
            formRef={formRef}
            rowKey="columnId"
            search={false}
            columns={columns}
            value={dataSource}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
              },
              onValuesChange: (record, recordList) => {
                setDataSource(recordList);
                updateColumnData(recordList)
              },
            }}
            onChange={onDataChange}
            recordCreatorProps={false}
          />
        </Col>
      </Row>

    </Fragment>
  );
};

export default ColumnInfo;
