
// Adds 100 boxes to the gameboard containers
export function createGameBoard(board) {
    for (let y = 0; y < 10; y++){
        for (let x = 0; x < 10; x++){
            let inputBox = document.createElement("button");
            inputBox.className = "square";
            inputBox.addEventListener("mouseover", (e) => {
                e.target.style.backgroundColor = "grey"
            })
            inputBox.addEventListener("mouseout", (e) => {
                e.target.style.backgroundColor = "";
            });
            board.appendChild(inputBox);
    }
    }
}

