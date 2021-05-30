import {Form, Input, Button, Checkbox, Layout} from 'antd';
import {useState} from 'react';
import JoinModal from "./JoinModal";
import {login} from "../actions/SessionApi";

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


const LoginPage = (props) => {

    const {history} = props

    const onFinish = (values) => {
        const user = {...values}
        login(user, () => history.push('/'))
    };


    const [joinModal, setJoinModal] = useState(false)

    return (
        <Layout style={{paddingTop: '50px', height: '100vh'}}>
            {joinModal &&
            <JoinModal
                close={() => setJoinModal(false)}
                show={joinModal}
            />}
            <div className="login-box">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
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
                        <Input.Password/>
                    </Form.Item>
                    <Button onClick={() => setJoinModal(true)} type="link">Don't have an account? Join us!</Button>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout>
    );
};

export default LoginPage;
