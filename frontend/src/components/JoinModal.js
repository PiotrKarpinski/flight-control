import {Form, Input, Button, Checkbox, Modal} from 'antd';
import {useState} from 'react';
import {signup} from "../actions/SessionApi";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const JoinModal = (props) => {
    const onFinish = (values) => {
        const user = {...values}
        setConfirmLoading(true)
        signup(user, () => {
            setConfirmLoading(false)
            close()
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [confirmLoading, setConfirmLoading] = useState(false)


    const handleCancel = () => {
        close()
    }

    const handleChange = (values) => {

    }

    const {close, show} = props

    return (
        <Modal
        visible={show}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        >


        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onValuesChange={(values) => handleChange(values)}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="First name"
                name="first_name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Last name"
                name="last_name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </Modal>
    );
};

export default JoinModal;
