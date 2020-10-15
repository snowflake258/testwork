import React from "react"
import UserComponent from './user-component'
import TransferMoneyComponent from './transfer-money-component'

export default class AppComponentHomeComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount = async () => await this.loadUsers()

    loadUsers = async () => {
        let users = await fetch('api/user/').then(resp => resp.json())
        this.setState({ users: users })
    }

    render = () => (
        <div className="container">
            <div className="row">
                <div className="col">
                    <UserComponent users={this.state.users} loadUsers={this.loadUsers}></UserComponent>
                </div>
                <div className="col">
                    <TransferMoneyComponent users={this.state.users} loadUsers={this.loadUsers}></TransferMoneyComponent>
                </div>
            </div>
        </div>
    )
}
