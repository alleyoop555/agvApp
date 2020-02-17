function report() {
    const e = document.getElementById('dbfile');
    const file = e.options[e.selectedIndex].text;
    const value = e.options[e.selectedIndex].value;
    const figures = document.getElementById('figures');
    let obj;
    if (value == 1) {
        const span = document.querySelectorAll('span[id="fileName"]');
        for (let i = 0; i < span.length; i++) {
            span[i].textContent = file;
        }
        $.ajax({
            data: {
                file: file,
            },
            url: '/report/api/report/' + file,
            type: 'get',
            timeout: 3000,
            dataType: 'json',
            success: (data) => {
                obj = data;
                let myChart = echarts.init(document.getElementById('date_report'));
                let option = {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        dimensions: obj.dimensions,
                        source: obj.source,
                    },
                    xAxis: {type: 'category'},
                    yAxis: {},
                    series: obj.dateSeries
                };
                myChart.setOption(option);

                myChart = echarts.init(document.getElementById('agv_report'));
                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {data: obj.allStatus},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: obj.allAgv,
                        }
                    ],
                    yAxis: [{type: 'value'}],
                    series: obj.agvSeries
                };
                myChart.setOption(option);
                figures.removeAttribute('hidden');
            }, error: () => {
                alert('failed');
            },
        })
    }
}