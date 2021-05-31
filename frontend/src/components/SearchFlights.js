import React, { useState } from 'react';
import {Input, AutoComplete, Select, Spin} from 'antd';
import {fetchSelectData} from "../actions/DataApi";


const SearchFlights = (props) => {
    const [options, setOptions] = useState([]);
    const [fetching, setFetching] = useState(false)
    const [value, setValue] = React.useState([]);
    const {onSelect} = props
    const handleSearch = (value) => {
        setOptions(value ? searchResult(value) : []);
    };


    const searchResult = (query) => {
        setOptions([]);
        setFetching(true);
        fetchSelectData('flights', query, (results) => {
            setOptions(results.content);
            setFetching(false);
        })
    }


    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={handleSearch}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            options={options}
            mode="multiple"
            value={value}
            placeholder="Search flights"
            onSelect={(newValue) => {
                setValue(newValue);
                const id = newValue.value
                onSelect(id);
            }}
            style={{
                width: '100%',
            }}
        />
    );
};
 export default SearchFlights;
