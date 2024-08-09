import { Radar } from 'react-chartjs-2';

const data = {
    labels: ['Critical Thinking', 'GTM Thinking', 'Communication', 'Prioritization', 'Domain Knowledge'],
    datasets: [{
        label: 'Skill Proficiency',
        data: [65, 75, 80, 70, 90],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
};

const options = {
    scales: {
        r: {
            angleLines: {
                display: false
            },
            suggestedMin: 50,
            suggestedMax: 100
        }
    },
    elements: {
        line: {
            borderWidth: 3
        }
    }
};

function MyApp() {
    return <Radar data={data} options={options} />;
}