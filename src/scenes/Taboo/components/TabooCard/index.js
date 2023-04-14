import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentTabooItem } from "../../../../services/Redux/tabooSlice"
import { pickRandomTaboo } from "../../../../services/utils/functions"
import styled from "styled-components"

const StyledTabooCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.grayscale.gray3};
    padding: 8px;
    box-sizing: boder-box;
    min-width: 200px;
    height: 250px;
    min-width: 50%;
    box-sizing: border-box;

    .taboo-title {
        margin-top: 0;
        margin-bottom: 8px;
        color: ${(props) => props.theme.colors.primary};
        text-align: center;
        font-size: 1em;
    }

    .divider {
        width: 100%;
        border: 1px solid ${(props) => props.theme.colors.grayscale.gray3};
        margin-bottom: 8px;
    }

    & p {
        margin-top: 0;
        color: ${(props) => props.theme.colors.font.dark};
        text-align: center;
        font-size: 1em;
        margin-bottom: 8px;
    }

    .taboo-synonumns-cotainer{
        width: 100%;
    }
    
`

const TabooCard = React.memo(() => {
    const dispatch = useDispatch()
    const { currentCategoryData, currentTabooItem } = useSelector(state => state.taboo)
    
    useEffect(() => { 
        dispatch(setCurrentTabooItem(pickRandomTaboo(currentCategoryData)))
    }, [currentCategoryData, dispatch])

    return (
        <StyledTabooCard>
            <div className="taboo-title">{Object.keys(currentTabooItem)?.[0]}</div>
            <div className="divider"></div>
            <div className="taboo-synonumns-cotainer">
                {Object.values(currentTabooItem)?.[0]?.map((item, index) => {
                    return (
                        <p key={`${item}_${index}`} className="taboo-synonumns">{item}</p>
                    )
                })}
            </div>
        </StyledTabooCard>
    )
})

export default TabooCard