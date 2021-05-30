import { List, Avatar, Button, Skeleton } from 'antd';

import * as React from "react";
import {fetchAllData} from "../actions/DataApi";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class Flights extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
    };

    componentDidMount() {
        this.getData(res => {
            this.setState({
                initLoading: false,
                data: res,
            });
        });
    }

    getData = callback => {
        fetchAllData('flights', (result) => {
            callback(result)
        })
    };


    render() {
        const { initLoading, loading, list } = this.state;


        return (
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            <div>content</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        );
    }
}

export default Flights;
