const fs = require('fs');
const csv = require('csv-parser');

class agvReport {

    constructor(file) {
        this.data = [];
        this.file = file;
        this.code = 200;
        this.dateReport = {};
        this.agvReport = {};
        this.figure = {
            allAgv: [],
            allStatus: ['Done', 'Cancel'],
            dimensions: [],
            source: [],
            dateSeries: [],
            agvSeries: [
                {name: 'Done', type: 'bar', stack: 'status', data: []},
                {name: 'Cancel', type: 'bar', stack: 'status', data: []},
            ]
        }
    }

    getAll(callback) {
        let data = []; let code = [];
        fs.createReadStream(this.file)
            .pipe(csv())
            .on('data', (row) => {
                try {
                    data.push(row);
                } catch (e) {
                    console.log(e);
                    code = 400;
                }
            })
            .on('end', () => {
                this.data = data;
                this.code = code;
                console.log('file read');
                this.date_report = this.getReport('start_date', 'agv');
                this.agv_report = this.getReport('agv', 'status');
                console.log('report processed');
                this.getFigure();
                console.log('figure processed');
                callback();
            })
    }

    getReport(col_1, col_2) {
        let obj = {};
        let tmp_1; let tmp_2;
        for (let idx = 0; idx<this.data.length; idx++) {
            tmp_1 = this.data[idx][col_1];
            tmp_2 = this.data[idx][col_2];
            try {
                obj[tmp_1][tmp_2] = (typeof(obj[tmp_1][tmp_2])==='undefined') ? 1 : obj[tmp_1][tmp_2]+1;
            }catch (err) {
                obj[tmp_1] = {[tmp_2] : 1}
            }
        }
        return obj
    }

    getFigure() {
        const dates = Object.keys(this.date_report);
        dates.map((date, index)=> {
            this.figure.source[index] = {date: date};
            let agvs = Object.keys(this.date_report[date]);
            agvs.map((agv)=> {
                if (!(this.figure.allAgv.includes(agv))) {
                    this.figure.allAgv.push(agv);
                }
                let value = this.date_report[date][agv];
                this.figure.source[index][agv] = value;
            })
        })

        this.figure.dimensions = ['date'].concat(this.figure.allAgv);
        this.figure.allAgv.map((agv)=>{
            this.figure.dateSeries.push({type: 'bar'});
            this.figure.agvSeries[0].data.push(this.agv_report[agv]['Done']);
            this.figure.agvSeries[1].data.push(-this.agv_report[agv]['Cancel']);
        })
    }

}


module.exports = agvReport;