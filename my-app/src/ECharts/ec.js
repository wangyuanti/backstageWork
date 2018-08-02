import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentWillReceiveProps() {
        let{nameArr,numArr}=this.props;
        console.log(numArr);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: '信息统计' },
            tooltip: {},
            xAxis: {
                data: nameArr
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: numArr
            }]
        });
    }
    render() {
        return (
            <div id="main" style={{ width: 500, height: 390 }}></div>
        );
    }
}

export default EchartsTest;