import React from "react"

export default class TransferMoneyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            INTsource: undefined,
            INTrecipients: [],
            money: undefined,

            INTsourceErrors: [],
            INTrecipientsErrors: [],
            moneyErrors: [],
            nonFieldErrors: [],
            respMessage: ""
        }
    }

    handleINTsource = (event) => this.setState({INTsource: event.target.value})

    handleINTrecipients = (event) => {
        let selected = Array.from(event.target.selectedOptions, (item) => item.value)
        this.setState({INTrecipients: selected})
    }

    handleMoney = (event) => this.setState({money: event.target.value})

    transfer = async () => {
        let resp = await fetch('api/transfer-money/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "INT_source": this.state.INTsource,
                "INT_recipients": this.state.INTrecipients,
                "money": this.state.money
            })
        })

        await this.processAnswer(resp)
    }

    processAnswer = async (resp) => {
        this.setState({
            INTsourceErrors: [],
            INTrecipientsErrors: [],
            moneyErrors: [],
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
                if(key == "INT_source")
                    this.setState({INTsourceErrors: data[key]})
                else if(key == "INT_recipients")
                    this.setState({INTrecipientsErrors: data[key]})
                else if(key == "money")
                    this.setState({moneyErrors: data[key]})
                else
                    this.setState({nonFieldErrors: data[key]})
            })
        }
    }

    render = () => (
        <div>
            <div className="display-6 py-2">Перевод денег</div>

            <div className="mb-2">
                <label>Списать со счёта (ИНН)</label>

                <select className="form-select" onChange={this.handleINTsource}>
                    <option value="undefined">------------</option>
                    {this.props.users.map(item => (
                        <option value={item.INT} key={item.id}>{item.INT}</option>
                    ))}
                </select>

                <ul className="text-danger">
                    {this.state.INTsourceErrors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-2">
                <label>Зачислить на счета (ИНН)</label>
                
                <select className="form-select" multiple onChange={this.handleINTrecipients}>
                    {this.props.users.map(item => (
                        <option value={item.INT} key={item.id}>{item.INT}</option>
                    ))}
                </select>

                <ul className="text-danger">
                    {this.state.INTrecipientsErrors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-2">
                <label>Сумма</label>
                <input className="form-control" type="number" onChange={this.handleMoney}></input>

                <ul className="text-danger">
                    {this.state.moneyErrors.map((err, index) => (
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
            <button className="btn btn-success float-right mb-2" onClick={this.transfer}>Перевести</button>

        </div>
    )
}