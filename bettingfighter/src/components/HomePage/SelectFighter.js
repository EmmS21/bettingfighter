import React, { useState, useContext, useEffect, useRef } from 'react';
import { Select, Space, Button } from 'antd';
import axios from 'axios';
import PropDrilling from "contexts/PropDrilling"


const SelectFighter = () => {
  const [sex, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const { setFighters } = useContext(PropDrilling)
  // const [fighters, setFighters] = useState([])
  
  const handleSex = (value) => {
    console.log(`selected ${value}`);
    setAge(value)
  };
  const handleWeight = (value) => {
    console.log("sele", value)
    setWeight(value)
  }
  const generateFight = () => {
    console.log('generate')
    const res = {}
    res['sex'] = sex
    res['weight'] = weight
    if(res['sex'] === 'male' && res['weight'] === 'cruiser'){
      console.log('found')
      axios.get('https://coderace.vercel.app/malecruiser')
        .then(res => {
          console.log('received', res.data.challenge)
          setFighters(res.data.challenge)
        })
    }
  }
  return(
    <> 
    <Space wrap>
      <Select
        name="sex"
        onChange={handleSex}
        defaultValue="male"
          style={{
          width: 120,
        }}
        allowClear
        options={[
          {
            value: 'male',
            label: 'male',
          },
          {
            value: 'female',
            label: 'female',
          },
        ]}
      />
      <Select
        name="weight"
        defaultValue="cruiser"
        onChange={handleWeight}
        style={{
          width: 120,
        }}
        allowClear
        options={[
          {
            value: 'cruiser',
            label: 'cruiser',
          },
          {
            value: 'heavy',
            label: 'heavy',
          },
        ]}
      />
      <Button ghost onClick={()=>generateFight(sex,weight)} disabled={!sex || !weight}>
        Generate Fight
      </Button>
    </Space>
    </>
  )
    };

export default SelectFighter;