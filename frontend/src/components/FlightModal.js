import {Form, Input, Button, Checkbox, Modal, DatePicker, TimePicker, Radio} from 'antd';
import {useState, useEffect} from 'react';
import {signup} from "../actions/SessionApi";
import {postData} from "../actions/DataApi";

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

const FlightModal = (props) => {
    const onFinish = (values) => {
        const flight = {...values}
        setConfirmLoading(true)
        postData(flight, 'flights', () => {
            setConfirmLoading(false)
            close()
            handleAdd()
        })
    };



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [confirmLoading, setConfirmLoading] = useState(false)


    const handleCancel = () => {
        close()
    }


    const {close, show, handleAdd} = props

    return (
        <Modal
            visible={show}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >


            <Form
                style={{padding: '24px'}}
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Origin"
                    name="origin"
                    rules={[
                        {
                            required: true,
                            message: 'Please input origin airport!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Destination"
                    name="destination"
                    rules={[
                        {
                            required: true,
                            message: 'Please input destination airport!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Take off time"
                    name="take_off_time"
                    rules={[
                        {
                            required: true,
                            message: 'Please input take off time!',
                        },
                    ]}
                >
                    <DatePicker
                        showTime={<TimePicker disabledSeconds/>}
                    />
                </Form.Item>
                <Form.Item
                    label="Arrival time"
                    name="arrival_time"
                    rules={[
                        {
                            required: true,
                            message: 'Please input arrival time!',
                        },
                    ]}
                >
                    <DatePicker
                        showTime={<TimePicker disabledSeconds/>}
                    />
                </Form.Item>
                <Form.Item
                    label="Number of seats"
                    name="seats_amount"
                    rules={[
                        {
                            required: true,
                            message: 'Please input number of seats!',
                        },
                    ]}
                >
                    <Radio.Group
                        optionType="button"
                        buttonStyle="solid"
                    >
                        <Radio value={24}>24 Seats</Radio>
                        <Radio value={48}>48 Seats</Radio>
                        <Radio value={64}>64 Seats</Radio>
                    </Radio.Group>
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

export default FlightModal;
