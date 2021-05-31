import {useEffect, useState} from 'react';
import {fetchData, postData} from "../actions/DataApi";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Layout,
    Menu,
    Modal,
    Checkbox,
    Radio,
    Spin,
    TimePicker,
    Row,
    Col,
    Descriptions
} from "antd";
import {logout} from "../actions/SessionApi";
import Flights from "./Flights";
import * as React from "react";

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
const {Content, Header} = Layout
const letterArray = ['A', 'B', 'C', 'D']


const BookFlight = (props) => {
    const {id} = props.match.params;
    const [flight, setFlight] = useState(null)
    const [seatOptions, setSeatOptions] = useState([])
    const [total, setTotal] = useState(0)


    const populateSeatLabels = (amount, takenSeats) => {
        const rowsAmount = amount / 4
        const plan = []
        for (let idx = 1; idx <= rowsAmount; idx++) {
            const row = {}
            const seats = []
            for (let i = 0; i < 4; i++) {
                const seatLetter = letterArray[i]
                const seatValue= `${idx}-${seatLetter}`
                const seat = {label: `Seat ${seatValue}`, value: seatValue, disabled: takenSeats.includes(seatValue)}
                seats.push(seat)
            }
            row.seats = seats
            plan.push(row)
        }


        return plan
    }

    useEffect(() => {
        fetchData(id, 'flights', (result) => {
            setFlight(result)
        })
    }, [])

    const onFinish = (values) => {
        const book = {...values}
        book.flight_id = flight.id
        postData(book, 'bookings', () => {
            props.history.push('/')
        })
    };

    const renderSeats = (seatsAmount, takenSeats) => {

        const plan = populateSeatLabels(seatsAmount, takenSeats)
        return (
            <> {plan.map(row =>
                <Row>
                    {row.seats.map((seat, index) =>
                        <Col key={index} span={6}>
                            <Checkbox disabled={seat.disabled} value={seat.value}>{seat.label}</Checkbox>
                        </Col>
                    )}
                </Row>
            )}

            </>
        )
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (value) => {
        const price = value.length * 100
        setTotal(price)
    }


    return (
        <Layout className="layout">
            <Header>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item
                        onClick={() => props.history.push('/')}
                        key={"1"}>
                        Back
                    </Menu.Item>
                </Menu>
            </Header>
            {flight &&
            <Content style={{padding: '20px 50px', width: '50%'}}>
                <Row>
                    <Col offset={8}>
                    <h2 >{flight.origin} to {flight.destination}</h2>
                </Col>
                </Row>
                <Row style={{margin: '24px 0'}}>
                    <Col offset={8}>
                        <Descriptions column={2} bordered size='large'>
                            <Descriptions.Item label="Take off time:">{flight.take_off_time}</Descriptions.Item>
                            <Descriptions.Item label="Arrival time:">{flight.arrival_time}</Descriptions.Item>
                        </Descriptions>
                    </Col>

                </Row>

                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
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
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Last name"
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Seats"
                        name="seats"
                        rules={[
                            {
                                required: true,
                                message: 'Please select minimum one seat!',
                            },
                        ]}
                    >
                        <Checkbox.Group style={{display: 'block'}} onChange={onChange}>
                            {renderSeats(flight.seats_amount, flight.seats)}
                        </Checkbox.Group>
                    </Form.Item>
                    <h3>Total price: {total}$</h3>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
            }
        </Layout>
    )
}

export default BookFlight;
