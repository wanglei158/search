import { Component } from 'react'
import { Table } from 'element-react'
import {filterEmpty} from '../utils'

export default class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
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

    render() {
        let list = JSON.parse(localStorage.getItem('his')) || [];
        const { columns } = this.state;
        return (
            <div>
                <h3>search history</h3>
                <Table emptyText={'Empty'} data={list} columns={columns} maxHeight={400}>

                </Table>
            </div>
        )
    }
}