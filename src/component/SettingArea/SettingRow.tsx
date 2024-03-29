import { CSSProperties, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

interface SettingRowProps {
    disabled: boolean
    name: string
    value: number
    setValue(newVale: number): void
    max?: number
}

export function SettingRow(props: SettingRowProps){
    const [tempValue, setTempValue] = useState<string>(props.value.toString());
    useEffect(()=>{
        setTempValue(props.value.toString());
    },[props.value])
    const rowStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    }
    return (
        <Form.Group 
            as={Row} 
            controlId={`row-${props.name}`}
            style={rowStyle}
        >
            <Form.Label column xs={3} sm={3} md={6}lg={4}>
                {props.name}
            </Form.Label>
            <Col xs={9} sm={9} md={6} lg={8}>
                <Form.Control
                    disabled={props.disabled}    
                    size='sm'
                    value={tempValue}
                    onChange={(e)=> {
                        if (e.target.value === '') {
                            // 如果是全空的話，只更新內部的tempValue
                            // 讓輸入可以是空值
                            setTempValue(e.target.value);
                        } else {
                            // 有數值
                            let newValue = parseInt(e.target.value)
                            if (props.max !== undefined) newValue = Math.min(props.max, newValue);
                            if (props.value === newValue) {
                                // 和原本的數值一樣，把內部input填回去就好
                                setTempValue(e.target.value)
                            } else {
                                props.setValue(newValue) // 傳到外面再進來
                            }
                        }
                    }}
                    onBlur={()=> setTempValue(props.value.toString())}
                    placeholder={props.name}
                    type='number'
                    autoComplete='off'
                />
            </Col>
        </Form.Group>
    )

}
export default  SettingRow;