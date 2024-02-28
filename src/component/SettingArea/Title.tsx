import { CSSProperties } from "react";

export function Title(){
    const style: CSSProperties = {
        display: 'flex',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        border: '3px solid #1d71c8',
        padding: 20,
        backgroundColor: '#1d71c8',
        justifyContent: 'center',
        color: 'white', // 設置文字顏色為白色
        width: '100%' // 讓標題佔滿父元素的寬度
    };
    const textStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        letterSpacing: '5px',

    };
    return (
        <div style={style}>
            <span style={textStyle}>踩地雷資訊</span>
        </div>
    )

}
export default  Title;