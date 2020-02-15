function report() {
    const e = document.getElementById('dbfile');
    const file = e.options[e.selectedIndex].text;
    const value = e.options[e.selectedIndex].value;
    let obj;
    if (value == 1) {
        document.getElementById('fileName').textContent = file;
        $.ajax({
            data: {
                file: file,
            },
            url: '/report/GET/file/' + file,
            type: 'get',
            cache: false,
            timeout: 3000,
            dataType: 'json',
            success: (data) => {
                alert('success');
                obj = data;
            }, error: () => {
                alert('failed');
            }, complete: () => {
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
            }
        })
    }
}