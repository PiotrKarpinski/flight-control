import {Layout, Menu, Spin} from 'antd';

import * as React from "react";
import Flights from "./Flights";
import {authenticate, logout} from "../actions/SessionApi";

const {Content, Header} = Layout

class Home extends React.Component {

    state = {
        loggedIn: false,
        user: null,
        loaded: false,
        role: 'visitor'
    }

    componentDidMount() {
        authenticate((result) => {
            this.setState({
                loggedIn: result.logged_in,
                user: result.user,
                loaded: true,
                role: result.role

            })
        })
    }

    render() {

        const {history} = this.props;
        const {loggedIn, user, loaded, role} = this.state

        return (
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal">
                        {!loggedIn && <Menu.Item onClick={() => history.push('/login')} key={"1"}>
                            Log in
                        </Menu.Item>}
                        {loggedIn && <Menu.Item onClick={() => {logout(() => {
                                this.setState({user: null, loggedIn: false})})}} key={"2"}>
                            Log out
                        </Menu.Item>}
                    </Menu>
                </Header>
                {loaded &&
                <Content style={{padding: '20px 50px'}}>
                    <h1>Welcome {user ? user.first_name : 'traveler'}!</h1>

                    <Flights role={role}/>
                </Content>
                }
            </Layout>
        );
    }
}

export default Home;
