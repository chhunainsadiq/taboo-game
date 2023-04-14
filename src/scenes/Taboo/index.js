import React, { useState, useEffect, useMemo } from "react"
import MenuSelect from "../../components/Select"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { fetchAllCategories, fetchcurrentCategoryData, increaseCorrectCount, setCurrentTabooItem } from "../../services/Redux/tabooSlice" 
import { formateCategories } from "../../services/utils/functions"
import { pickRandomTaboo } from "../../services/utils/functions"
import Timer from "./components/Timer"
import TabooCard from "./components/TabooCard"
import Button from "../../components/Button"


const StyledTaboo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    height: 100%;
    box-sizing: border-box;

    .taboo-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: ${(props) => props.theme.colors.font.light};
        flex: 3.5;
        width: 100%;
    }

    .game-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .buttons-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        width: 50%;
        box-sizing: border-box;

        & button {
            margin-right: 16px;
        }
    }
`

function Taboo(){
    const dispatch = useDispatch()
    const [category, setCategory] = useState("")
    const { categories, locale, currentCategoryData, isPlaying } = useSelector(state => state.taboo)

    const categoriesOptions = useMemo(() => {
        return formateCategories(categories, locale)
    }, [categories, locale])

    useEffect(() => {
        dispatch(fetchAllCategories("data/categories.json"))
    }, [dispatch])

    const onCategoryChange = (category) => {
        setCategory(category)
        dispatch(fetchcurrentCategoryData(`data/${locale}/${category?.value}.json`))
    }

    const handleOnCorrect = () => {
        dispatch(increaseCorrectCount())
        // As its guessed right, so also change the card
        dispatch(setCurrentTabooItem(pickRandomTaboo(currentCategoryData)))
    }
    
    return (
        <StyledTaboo>
            <MenuSelect id="category" isDisabled={isPlaying} options={categoriesOptions} label="Select Category" name="category" value={category} setValue={onCategoryChange} />
            <div className="taboo-container">
                {category && (
                    <div className="game-container" data-testid="taboo-game-container">
                        <Timer />
                        <TabooCard />
                        <div className="buttons-container">
                            <Button type="button" disabled={!isPlaying} onClick={handleOnCorrect} size="small">Correct</Button>
                            <Button type="button" disabled={!isPlaying} onClick={() => { dispatch(setCurrentTabooItem(pickRandomTaboo(currentCategoryData)))}} size="small">Skip</Button>
                        </div>
                    </div>
                )}
                {!category && (
                    <div data-testid="start-message"> Please Choose above Category to Start</div>
                )}
            </div>
        </StyledTaboo>
    )
}

export default Taboo