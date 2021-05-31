import React, { useState } from 'react';
import {Input, AutoComplete, Select, Spin} from 'antd';
import {fetchSelectData} from "../actions/DataApi";


const SearchFlights = () => {
    const [options, setOptions] = useState([]);
    const [fetching, setFetching] = useState(false)
    const [value, setValue] = React.useState([]);

    const handleSearch = (value) => {
        setOptions(value ? searchResult(value) : []);
    };


    const searchResult = (query) => {
        setOptions([]);
        setFetching(true);
        fetchSelectData('flights', query, (results) => {
            const newOptions = results.map((flight) => ({
                label: `${flight.origin} to ${flight.destination}`,
                value: flight.id,
            }));
            setOptions(newOptions);
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
            onChange={(newValue) => {
                setValue(newValue);
            }}
            style={{
                width: '100%',
            }}
        />
    );
};
 export default SearchFlights;
