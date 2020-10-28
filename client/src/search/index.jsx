import { Component } from 'react'
import { Form, Input, Layout, DatePicker, Table, Button } from 'element-react'
import './index.css'
import {filterEmpty} from '../utils'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            condition: {
                author: '',
                title: '',
                date: null,
                pages: '',
                journal: '',
                number: '',
                volume: ''
            },
            list: [],
            columns: [
                {
                    label: 'author',
                    prop: 'author',
                    align: 'center'
                },
                {
                    label: 'title',
                    align: 'center',
                    prop: 'title'
                },
                {
                    label: 'journal',
                    align: 'center',
                    prop: 'journal'
                },
                {
                    label: 'volume',
                    align: 'center',
                    prop: 'volume'
                },
                {
                    label: 'number',
                    align: 'center',
                    prop: 'number'
                },
                {
                    label: 'pages',
                    align: 'center',
                    prop: 'pages'
                },
                {
                    label: 'year',
                    align: 'center',
                    prop: 'year'
                },
                {
                    label: 'month',
                    align: 'center',
                    prop: 'month'
                }
            ]
        }
    }

    get parseDate() {
        const { condition: { date } } = this.state
        if(!date) return {}
        return {
            year: date.getFullYear(),
            month: date.getMonth() +1
        }
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.setState({
            condition: Object.assign({}, this.state.condition, {[key]: value})
        })
    }
    concatParams(obj) {
        const para = filterEmpty(obj)
        let paramsArray = []; 
        Object.keys(para).forEach(key => paramsArray.push(key + '=' + para[key]))
        return paramsArray.join('&')
    }
    getList() {
        const { date, ...rest } = this.state.condition
        const params = Object.assign(this.parseDate, rest)
        let parseParams = this.concatParams(params)

        fetch('http://127.0.0.1:3000/search?' + parseParams).then(r => {
            return r.json()
        }).then(res => {
            this.setState({
                list: res
            })
        })
    }

    componentDidMount() {
        this.getList()
    }

    render() {
        const { condition, list, columns } = this.state;
        return (
            <div>
            <Form className="search" model={condition} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                <Layout.Row>
                    <Layout.Col span="6">
                        <Form.Item label="author">
                            <Input value={condition.author} onChange={this.onChange.bind(this, 'author')}></Input>
                        </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="6">
                        <Form.Item label="title">
                            <Input value={condition.title} onChange={this.onChange.bind(this, 'title')}></Input>
                        </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="6">
                        <Form.Item label="journal">
                            <Input value={condition.journal} onChange={this.onChange.bind(this, 'journal')}></Input>
                        </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="6">
                        <Form.Item label="volume">
                            <Input value={condition.volume} onChange={this.onChange.bind(this, 'volume')}></Input>
                        </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="6">
                        <Form.Item label="pages">
                            <Input value={condition.pages} onChange={this.onChange.bind(this, 'pages')}></Input>
                        </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="6">
                        <Form.Item label="number">
                            <Input value={condition.number} onChange={this.onChange.bind(this, 'number')}></Input>
                        </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="6">
                        <Form.Item label="date">
                            <DatePicker
                                value={condition.date}
                                placeholder="select month"
                                width="100%"
                                onChange={date => this.onChange.call(this, 'date', date)}
                                selectionMode="month"
                            />
                        </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="6">
                        <Form.Item label="">
                            <Button type="primary" onClick={this.getList.bind(this)} icon="search">search</Button>
                        </Form.Item>
                    </Layout.Col>
                </Layout.Row>
                </Form>
                <Table emptyText={'Empty'} data={list} columns={columns} maxHeight={400}>

                </Table>
            </div>
        )
    }
}