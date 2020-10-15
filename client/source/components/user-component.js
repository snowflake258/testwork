import React from "react"

export default class UserComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            email: undefined,
            password: undefined,
            INT: undefined,
            account: undefined,

            usernameErrors: [],
            emailErrors: [],
            passwordErrors: [],
            INTErrors: [],
            accountErrors: [],
            nonFieldErrors: [],
            respMessage: ""
        }
    }

    handleUsername = (event) => this.setState({username: event.target.value})
    handleEmail = (event) => this.setState({email: event.target.value})
    handlePassword = (event) => this.setState({password: event.target.value})
    handleINT = (event) => this.setState({INT: event.target.value})
    handleAccount = (event) => this.setState({account: event.target.value})

    addUser = async () => {
        let resp = await fetch('api/user/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": this.state.username,
                "email": this.state.email,
                "password": this.state.password,
                "INT": this.state.INT,
                "account": this.state.account
            })
        })

        await this.processAnswer(resp)
    }

    processAnswer = async (resp) => {
        this.setState({
            usernameErrors: [],
            emailErrors: [],
            passwordErrors: [],
            INTErrors: [],
            accountErrors: [],
            nonFieldErrors: [],
            respMessage: ""
        })

        let data = await resp.json()

        if(resp.status == 200) {
            this.setState({respMessage: data.message})
            await this.props.loadUsers()
        }
        else {
            Object.keys(data).forEach(key => {
                if(key == "username")
                    this.setState({usernameErrors: data[key]})
                else if(key == "email")
                    this.setState({emailErrors: data[key]})
                else if(key == "password")
                    this.setState({passwordErrors: data[key]})
                else if(key == "INT")
                    this.setState({INTErrors: data[key]})
                else if(key == "account")
                    this.setState({accountErrors: data[key]})
                else
                    this.setState({nonFieldErrors: data[key]})
            })
        }
    }

    render = () => (
            <div>
                <div className="display-6 py-2">Добавить пользователя</div>
                
                <div className="mb-2">
                    <label>Логин</label>
                    <input className="form-control" type="text" onChange={this.handleUsername}></input>

                    <ul className="text-danger">
                        {this.state.usernameErrors.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-2">
                    <label>Почта</label>
                    <input className="form-control" type="text" onChange={this.handleEmail}></input>

                    <ul className="text-danger">
                        {this.state.emailErrors.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-2">
                    <label>Пароль</label>
                    <input className="form-control" type="password" onChange={this.handlePassword}></input>

                    <ul className="text-danger">
                        {this.state.usernameErrors.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-2">
                    <label>ИНН</label>
                    <input className="form-control" type="text" onChange={this.handleINT}></input>

                    <ul className="text-danger">
                        {this.state.INTErrors.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-2">
                    <label>Стартовая сумма на счёте</label>
                    <input className="form-control" type="number" onChange={this.handleAccount}></input>

                    <ul className="text-danger">
                        {this.state.accountErrors.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                </div>

                <hr></hr>            
                <ul className="text-danger">
                    {this.state.nonFieldErrors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
                <div className="text-success mb-2">{this.state.respMessage}</div>
                <button className="btn btn-success float-right mb-2" onClick={this.addUser}>Добавить</button>
                <br></br>
                <br></br>


                <div className="display-6 py-2">Список пользователей</div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Логин</th>
                            <th>Почта</th>
                            <th>ИНН</th>
                            <th>Сумма на счёте</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.users.map((item) => (
                            <tr key={item.id}>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.INT}</td>
                                <td>{item.account}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
        )
}