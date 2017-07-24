/**
 * Created by sally on 2017/2/22.
 */
'use strict';
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

var BlogItem = React.createClass({
    render: function () {
        var item;
        item = (
            <div className="blogItem">
                <table>
                    <tbody>
                    <tr>
                        <td className="left">
                            <img src={this.props.thumb}/>
                        </td>
                        <td>
                            <Link to={this.props.action}>{this.props.title}</Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
        return item;
    }
});
module.exports = BlogItem;
