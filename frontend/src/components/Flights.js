import {List, Avatar, Button, Skeleton, Row, Col, Descriptions} from 'antd';

import * as React from "react";
import {fetchAllData} from "../actions/DataApi";
import SearchFlights from "./SearchFlights";
import FlightModal from "./FlightModal";
import Icon from "@ant-design/icons";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class Flights extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        flightModal: false,
        page: 1
    };

    componentDidMount() {
        this.getData(this.state.page, null, res => {
            this.setState({
                initLoading: false,
                data: res.content,
                total: res.total
            });
        });
    }

    getData = (page = null, ids=null, callback) => {
        fetchAllData('flights', page, ids, (result) => {
            callback(result)
        })
    };

    renderFlightDescription = (flight) => {
        return (
            <Descriptions column={4} bordered size='middle'>
                <Descriptions.Item><h2>{flight.origin} to {flight.destination}</h2></Descriptions.Item>
                <Descriptions.Item label="Take off time:">{flight.take_off_time}</Descriptions.Item>
                <Descriptions.Item label="Arrival time:">{flight.arrival_time}</Descriptions.Item>
                <Descriptions.Item label="Available seats:">{flight.available_seats}</Descriptions.Item>
            </Descriptions>
        )
    }

    renderFlightModalButton = (editMode = false) => {
        return (
            <Button
                onClick={() => this.setState({flightModal: true})}
                type="primary"
                shape="round"
                size={'middle'}
            >
                {editMode ? 'Edit' : 'Add Flight'}
            </Button>)
    }

    renderBookButton = (flightId) => {
        return (
            <Button
                href={`/book_flight/${flightId}`}
                type="link"
                shape="round"
                size={'middle'}
            >
                Book this flight
            </Button>
        )
    }

    render() {
        const {initLoading, loading, data, flightModal, page, total} = this.state;
        const {role} = this.props;

        return (
            <>
                <Row>
                    <Col span={4} offset={10}>
                        <SearchFlights onSelect={(ids) => this.getData(1, ids, (res) => {
                            this.setState({
                                data: res.content,
                                total: res.total
                            });
                        })}/>
                    </Col>
                    {role === 'admin' && <Col span={4} offset={6}>
                        {this.renderFlightModalButton()}
                    </Col>}
                </Row>
                {flightModal && <FlightModal handleAdd={() => this.getData(page, null,(result) => {
                    this.setState({
                        data: result.content,
                    });
                })} show={flightModal} close={() => this.setState({flightModal: false})}/>}
                <List
                    pagination={{
                        onChange: page => {
                            this.getData(page, [], (result) => {
                                this.setState({
                                    page: page,
                                    data: result.content,
                                })
                            })
                        },
                        pageSize: 10,
                        current: page,
                        total: total
                    }}
                    bordered
                    split
                    style={{marginTop: '48px'}}
                    loading={initLoading}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item
                            actions={[role === 'admin' && this.renderFlightModalButton(true), this.renderBookButton(item.id)]}
                        >
                            <List.Item.Meta
                                description={this.renderFlightDescription(item)}
                            />
                        </List.Item>
                    )}
                />
            </>
        );
    }

}

export default Flights;
