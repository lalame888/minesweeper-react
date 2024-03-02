import { ClickDirect, SquareData, SquareStatus } from "@/interface";
import { faBomb, faFlag, faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties, useState } from "react";
import { Button } from "react-bootstrap";

interface SquareProps {
    onClick(direct: ClickDirect): void;
    data: SquareData;
    style?: CSSProperties
}
function BaseButton(props: SquareProps & {children?: JSX.Element}) {
    const [isHover, setIsHover] = useState<boolean>(false);
    const style: CSSProperties = {
        border: '1px solid black',
        fontFamily: 'monospace',
        userSelect: 'none',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: '#155c9e',
        display: 'flex',
        width: '35px',
        height: '35px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        margin: 0.5,
        borderColor: '#8e9ba9',
        aspectRatio: 1,
        filter: isHover ? 'brightness(0.92)' : undefined
        
    }
    const children = props.children === undefined ? <></> : props.children;
    return (
        <Button 
            style={{...style, ...props.style}}
            onMouseEnter={()=> setIsHover(true)}
            onMouseLeave={()=> setIsHover(false)}
            onMouseUp={(event)=>{
                // 滑鼠起來才算點擊，且滑鼠需要在方塊上
                if (!isHover) return;
                if (event.button === ClickDirect['左鍵']) {
                    props.onClick(ClickDirect['左鍵'])
                } else {
                    // 其他都視為右鍵
                    props.onClick(ClickDirect['右鍵'])
                }
            }}
            onContextMenu={(e)=> e.preventDefault()} // 禁用瀏覽器預設的右鍵選單
        >
            {children}
        </Button>
    )
}

// 按按鈕的時候，因為物件複製的責任給Redux toolkit了
// 似乎只要有改動一個方格狀態，整個物件都有一起更動，導致按一個按鈕所有按鈕都重新渲染
// 加 React.memo 無效
export function Square(props: SquareProps){
    console.log('Square render');
    const numberStyle: CSSProperties = {
        color: props.data.value === 1 ? 'white' : props.data.value === 2 ? '#65d60d': '#ff82e1',
        backgroundColor: '#155c9e',
        borderColor: '#465565',
        boxShadow: 'rgb(0 0 0 / 10%) 1px -2px 1px 0px inset', // 立體陰影
    }
    const markStyle: CSSProperties = {
        backgroundColor: '#feeaf2',
        fontSize: '15px',
        color: 'red',
        boxShadow: 'rgba(255, 8, 8, 0.29) 0px -1px 3px 1px inset', // 紅色立體陰影
    }
    const blankStyle: CSSProperties = {
        backgroundColor: '#e2ecf7',
        borderColor: '#8e9ba9',
        boxShadow: 'rgb(126 182 247 / 29%) 1px -3px 3px 0px inset', // 灰色立體陰影
    }
    const bombStyle: CSSProperties = {
        ...markStyle,
        color: 'black'
    }
    const errorMarkStyle: CSSProperties = {
        ...markStyle,
        backgroundColor: '#ff8c8cf5'
    }

    switch (props.data.status) {
        case SquareStatus['未開啟']:
            return (
                <BaseButton
                    {...props}
                    style={blankStyle}
                />
            );
        case SquareStatus['標記旗子']:
            return (
                <BaseButton
                    {...props}
                    style={markStyle}
                >
                    <FontAwesomeIcon icon={faFlag}/>
                </BaseButton>
            );
        case SquareStatus['死亡']:
            return (
                <BaseButton
                        {...props}
                        style={bombStyle}
                    >
                    <FontAwesomeIcon icon={faSkull}/>
                </BaseButton>
            );
        case SquareStatus['安全開啟']: 
            return (// 數字或空格
                <BaseButton
                    {...props}
                    style={numberStyle}
                >
                    {props.data.value > 0 ? <span>{props.data.value}</span> : <></>}
                </BaseButton>
            );
        case SquareStatus['未標炸彈']: 
            // 遊戲結束導致方格開啟的炸彈
            return (
                <BaseButton
                    {...props}
                    style={bombStyle}
                >
                    <FontAwesomeIcon icon={faBomb}/>
                </BaseButton>
            );
        case SquareStatus['錯標旗子']:
            // 遊戲結束 標示錯誤的旗子
            return (
                <BaseButton
                    {...props}
                    style={errorMarkStyle}
                >
                    <FontAwesomeIcon icon={faFlag}/>
                </BaseButton>
            );
        
        default: 
            throw new Error(`方格狀態未實作: ${props.data.status}`) 
    }
};
export default  Square;