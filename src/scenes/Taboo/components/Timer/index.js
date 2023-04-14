import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../../components/Button";
import { setIsPlaying, unsetTabooTurn, setCurrentTabooItem } from "../../../../services/Redux/tabooSlice"
import Modal from "../../../../components/Modal";
import { StyledTimer, StyledModalContent } from "./index.styled"
import { pickRandomTaboo } from "../../../../services/utils/functions"

const initialSeconds = 60
function Timer(){
  const [remainingTime, setRemainingTime] = useState(initialSeconds);
  const [modalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const { correctCount, isPlaying, currentCategoryData } = useSelector((state) => state.taboo)

  useEffect(() => {
    let timer
    if(isPlaying){
      // start the timer
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
  
      // When time is up, show the final score modal
      if (remainingTime < 0) {
        clearInterval(timer);
        setIsModalOpen(true)
      }
    }
  
    // clean up the timer when component unmounts
    return () => {
        if(timer) clearInterval(timer);
    }
  }, [dispatch, remainingTime, isPlaying]);


  const handleOnConfirm = () => {
    setRemainingTime(initialSeconds)
    // Reset the timer and correct counter
    dispatch(unsetTabooTurn())
    // change the card
    dispatch(setCurrentTabooItem(pickRandomTaboo(currentCategoryData)))
    setIsModalOpen(false)
  }

  return (
    <StyledTimer>
        <p>Game Time</p>
        <p data-testid="seconds-conuter">{`${remainingTime < 0 ? 0 : remainingTime} Seconds`}</p>
        <Button disabled={isPlaying} data-testid="play-game-button" onClick={() => {dispatch(setIsPlaying())}} size="small">Play</Button>
        <Modal
          open={modalOpen}
          setClose={() => setIsModalOpen(false)}
          data-testid="counter-modal-open"
        >
          <StyledModalContent>
            <p>Timed Out!!</p>
            <p>{`Your score is ${correctCount}`}</p>
            <Button styletype="bordered" onClick={handleOnConfirm} size="small">Play Again</Button>
          </StyledModalContent>
        </Modal>
    </StyledTimer>
  )
}

export default Timer