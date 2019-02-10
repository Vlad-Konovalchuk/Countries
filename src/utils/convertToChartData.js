export const converToChart = (arr, key) => {
    const dataValues = arr.map(item => item[key]);
    const dataNames = arr.map(item => item['name']);
    return ({
        labels: dataNames,
        datasets: [
            {
                label: key.toUpperCase(),
                data: dataValues,
                backgroundColor: ['#4bc0c0', '#36a2eb', '#ffce56', '#ff6384']
            },
        ]
    })
};
