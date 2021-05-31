import {useEffect, useState} from 'react';
import {fetchData, postData} from "../actions/DataApi";
import {Button, DatePicker, Form, Input, Layout, Menu, Modal, Checkbox, Radio, Spin, TimePicker, Row, Col} from "antd";
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


    const populateSeatLabels = (amount) => {
        const rowsAmount = amount / 4
        const plan = []
        for (let idx = 1; idx <= rowsAmount; idx++) {
            const row = {}
            const seats = []
            for (let i = 0; i < 4; i++) {
                const seatLetter = letterArray[i]
                const seat = {label: `${idx}-${seatLetter}`, value: `${idx}-${seatLetter}`}
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
            const newSeatOptions = populateSeatLabels(result.seats_amount)
            setSeatOptions(newSeatOptions)
        })
    }, [])

    const onFinish = (values) => {
        const book = {...values}
        book.flight_id = flight.id
        postData(book, 'bookings', () => {

        })
    };

    const renderSeats = (seatsAmount) => {

        const plan = populateSeatLabels(seatsAmount)
        return (
            <> {plan.map(row =>
                <Row>
                    {row.seats.map(seat =>
                        <Col span={6}>
                            <Checkbox value={seat.value}>{seat.label}</Checkbox>
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
            <Content style={{padding: '20px 50px'}}>
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
                            {renderSeats(flight.seats_amount)}
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
