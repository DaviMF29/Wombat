import styled from "styled-components";
import { useState } from "react";

const LayoutSideContentContainer = styled.div`
    background-color: var(--color-primary);
    height: 100%;
    width: ${({ width }) => width || "200px"};
    max-width: ${({ maxWidth }) => maxWidth || "300px"};
    min-width: ${({ minWidth }) => minWidth || "100px"};
    position: relative;
    display: flex;
`;

const Resizer = styled.div`
    width: 5px;
    height: 100%;
    cursor: ew-resize;
    background-color: var(--color-tertiary);
    opacity: 0.05;

    &:active{
        background-color: var(--color-accent);
        opacity: 1;
        width: 2px;
    }
`;

const ContentArea = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

function LayoutSideContent() {
    const [width, setWidth] = useState("200px");

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startWidth = parseInt(width, 10);

        const handleMouseMove = (moveEvent) => {
            const newWidth = Math.max(100, Math.min(startWidth + (moveEvent.clientX - startX), 300));
            setWidth(`${newWidth}px`);
        };        

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <LayoutSideContentContainer width={width}>
            <ContentArea>

            </ContentArea>
            <Resizer onMouseDown={handleMouseDown}/>
        </LayoutSideContentContainer>
    );
}

export default LayoutSideContent;