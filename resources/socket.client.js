const socket = io("http://localhost:8000/game");

socket.on('scores', (data) => {
    populateTable(data);
})

socket.on('disconnect', () => {
    console.error('Ops, something went wrong');
});

function populateTable(data) {
    document.querySelector('#score-table tbody')
    .insertAdjacentHTML('afterend', createTableRow(data));
}

function createTableRow(score) {
    let tRow = `<tr>
            <th scope="row">${score.id}</th>
            <td>${score.category}</td>
            <td>${score.total_score}</td>
        </tr>`;

    return tRow;
}