import styled from "styled-components";

export const StyledTimer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & p {
        margin-top: 0;
        color: ${(props) => props.theme.colors.primary};
        text-align: center;
        overflow: hidden;
        font-size: 1em;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    & button {
        margin-bottom: 20px;
    }
`

export const StyledModalContent = styled.div`
    width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.colors.font.light};

    & p {
        margin-top: 0;
        color: ${(props) => props.theme.colors.font.dark};
        text-align: center;
        overflow: hidden;
        font-size: 1em;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`