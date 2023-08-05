const socket = io("http://localhost:8000/game");

socket.on('scores', (data) => {
    populateTable(data);
})

socket.on('disconnect', () => {
    console.error('Ops, something went wrong');
});

function populateTable(data) {
    //TODO according the player's number, 
    // the table is going to be populated
    if(data.user.playerNumber == 1) {
        document.querySelector('#score-table tbody')
        .insertAdjacentHTML('afterend', createTableRow(data));
    }

    if(data.user.playerNumber == 2) {
        document.querySelector('#score-table-2 tbody')
        .insertAdjacentHTML('afterend', createTableRow(data));
    }
  
}

function createTableRow(score) {
    let tRow = `<tr>
            <th scope="row">${score.id}</th>
            <td>${score.category}</td>
            <td>${score.total_score}</td>
        </tr>`;

    return tRow;
}