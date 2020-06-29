import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

export default function TopNavbar() {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();
    return (
        <form onSubmit={e => {
            e.preventDefault()
            history.push(`/search-result/${keyword.toLowerCase()}`)
        }} className="topNav">
            <Input
                onChange={e => setKeyword(e.target.value)}
                placeholder="Search Restaurant"
                className="searchBar"
                prefix={<SearchOutlined />}
            />
        </form>
    );
}
