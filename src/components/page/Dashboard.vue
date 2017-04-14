<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> BluChat 应用概况</el-breadcrumb-item>
                <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="info-box">
                <span class="info-box-icon bg-aqua"><i class="ion ion-ios-people-outline"></i></span>

                <div class="info-box-content">
                    <span class="info-box-text">总用户数</span>
                    <span class="info-box-number">{{ userTotal | numFormat }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="info-box">
                <span class="info-box-icon bg-red"><i class="ion ion-android-person-add"></i></span>

                <div class="info-box-content">
                    <span class="info-box-text">昨日新增用户</span>
                    <span class="info-box-number">{{ yesterdayTotal | numFormat }}</span>
                </div>
            </div>
        </div>
        <div class="clearfix visible-sm-block"></div>

        <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="info-box">
                <span class="info-box-icon bg-green"><i class="fa fa-bar-chart"></i></span>

                <div class="info-box-content">
                    <span class="info-box-text">最近7天新增</span>
                    <span class="info-box-number">{{ weekTotal | numFormat }}</span>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="info-box">
                <span class="info-box-icon bg-yellow"><i class="fa fa-area-chart"></i></span>

                <div class="info-box-content">
                    <span class="info-box-text">最近30天新增</span>
                    <span class="info-box-number">{{ monthTotal | numFormat }}</span>
                </div>
            </div>
        </div>

        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="pie"></IEcharts>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="pie_radius"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="22">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="chartBar"></IEcharts>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="bar"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <el-col :xs="45" :sm="45" :md="24" :lg="24">
                <el-card class="box-card">
                    <div class="c-charts">
                        <IEcharts :option="pie_class"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3';
    import {aggregate}  from '../../api';
    import devTypebyDate from '../../../static/requestList/devType.json';
    import phoneModel from '../../../static/requestList/phoneModel.json';
    import sendMsgCountReq from '../../../static/requestList/sendMsgCount.json';
    import channelReq from '../../../static/requestList/channel.json';
    import channelCode from '../../../static/channelCode.json';
    // 时间处理
    import moment from 'moment';

    export default {
        components: {
            IEcharts
        },
        data: () => ({
            total: {
                androidNum: 0,
                iosNum: 0,
                android1Num: 0,
                ios1Num: 0,
                android7Num: 0,
                ios7Num: 0,
                android30Num: 0,
                ios30Num: 0
            },
            pie: {
//                color: ["#20a0ff","#61a0a8"],
                title: {
                    text: 'Android/ios用户占比',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: []
                },
                series: [
                    {
                        name: 'Android、ios用户占比',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            pie_radius: {

                color: ["#20a0ff", "#13CE66", "#F7BA2A", "#FF4949", "#61a0a8"],
                title: {
                    text: '昨日Android/ios用户占比',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: []
                },
                series: [
                    {
                        name: '昨日Android/ios用户占比',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            chartBar: {
                // #20a0ff,"#13CE66", "#F7BA2A", "#FF4949", "#61a0a8"
                color: ["#FF4949"],
                title: {
                    text: '渠道统计',
                    subtext: 'app注册渠道（20170401后的数据）'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['渠道']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                series: [
                    {
                        name: '渠道',
                        type: 'bar',
                        data: []
                    }
                ]
            },
            pie_class: {
                title: {
                    text: '手机型号用户数统计 TOP20',
                    x: 'right'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: []
                },
                series: [
                    {
                        name: '手机型号统计(android/ios)',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [2, '50%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: []
                    },
                    {
                        name: '手机型号',
                        type: 'pie',
                        radius: ['60%', '90%'],
                        data: []
                    }
                ]
            },
            bar: {
                title: {
                    text: '发送消息数 TOP 10',
                    x: 'right'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    left: 'left',
                    data: []
                },
                grid: {
                    x: '10%',
                    y: '10%',
                    width: '85%',
                    show: true,

                },
                xAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    }

                },
                yAxis: {
                    type: 'category',
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd'
                        }
                    }

                },
                series: [
                    {
                        itemStyle: {
                            normal: {
                                color: '#63bbb2',
                                opacity: 0.9
                            }
                        },
                        name: '发送消息数',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: []
                    },

                    {
                        itemStyle: {
                            normal: {
                                color: '#ef8989',
                                opacity: 0.9
                            }
                        },
                        name: '接收消息数',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: []
                    }
                ]
            }
        }),
        filters: {
            // 格式化数字
            numFormat(num)
            {
                var num = (num || 0).toString(), result = '';
                while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                }
                if (num) {
                    result = num + result;
                }
                return result;
            }
        }
        ,
        computed: {
            userTotal()
            {
                // 计算属性: 用户总数
                return this.total.androidNum + this.total.iosNum;
            }
            ,
            yesterdayTotal()
            {
                // 计算属性: 昨天的用户总数
                return this.total.android1Num + this.total.ios1Num;
            }
            ,
            weekTotal()
            {
                // 计算属性: 7天内的用户总数
                return this.total.android7Num + this.total.ios7Num;
            }
            ,
            monthTotal()
            {
                // 计算属性: 30天内的用户总数
                return this.total.android30Num + this.total.ios30Num;
            }
        }
        ,
        methods: {
            /**
             * android / iso 用户数统计 (汇总数据,昨天,7天前,30天前)
             * @param beginTime
             * @param endTime
             * @param type 0 : all,1 : yesterday, 7 : week,30 : month
             */
            devTypeStat: function (beginTime = null, endTime = null, type = 0) {
                let params = devTypebyDate;
                // Object.assign 类似于java的继承
                if (null != beginTime && null != endTime) {
                    params = Object.assign({'starttime': beginTime, 'endtime': endTime}, params)
                }
                aggregate(params)
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            let value = data[i].num;
                            let devType = data[i]._id.deviceType;
                            if (1 == devType) {
                                devType = 'Android';
                                switch (type) {
                                    case 0:
                                        this.total.androidNum = value
                                        break;
                                    case 1:
                                        this.total.android1Num = value
                                        break;
                                    case 7:
                                        this.total.android7Num = value
                                        break;
                                    case 30:
                                        this.total.android30Num = value
                                        break;
                                    default:
                                        this.total.androidNum = value
                                }

                            } else if (2 == devType) {
                                devType = 'ios';
                                switch (type) {
                                    case 0:
                                        this.total.iosNum = value
                                        break;
                                    case 1:
                                        this.total.ios1Num = value
                                        break;
                                    case 7:
                                        this.total.ios7Num = value
                                        break;
                                    case 30:
                                        this.total.ios30Num = value
                                        break;
                                    default:
                                        this.total.iosNum = value
                                }
                            } else {
                                devType = 'unKnow';
                            }
                            if (0 == type) {
                                this.pie.legend.data.push(devType);
                                this.pie.series[0].data.push({'name': devType, 'value': value})
                            } else if (1 == type) {
                                this.pie_radius.legend.data.push(devType);
                                this.pie_radius.series[0].data.push({'name': devType, 'value': value})
                            }


                        }
                    });
            },
            channalStat: function () {
                let params = channelReq;
                aggregate(params)
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            let value = data[i].num;
                            let name = data[i]._id.channel;
                            // 取不到的，则直接展示渠道编码
                            this.chartBar.yAxis.data.push(null == channelCode[name] ? name : channelCode[name]);
                            this.chartBar.series[0].data.push(value)
                        }
                    });

            },
            sendMsgCountRank: function () {
                let params = sendMsgCountReq;
                aggregate(params)
                    .then(data => {
                        this.bar.legend.data = ['发送消息数', '接收消息数']
                        for (let i = data.length - 1; i >= 0; i--) {
                            let nickname = data[i]._id.nickname;
                            let recv = data[i]._id.recv;
                            let send = data[i]._id.send;

                            this.bar.yAxis.data.push(nickname);
                            this.bar.series[0].data.push(send);
                            this.bar.series[1].data.push(recv);
                        }
                    });

            },
            phoneModelStat: function () {
                let params = phoneModel;
                aggregate(params)
                    .then(data => {
                        let androidNum = 0;
                        let iosNum = 0;
                        for (let i = 0; i < data.length; i++) {
                            let value = data[i].num;
                            let deviceModel = data[i]._id.deviceModel;
                            let deviceType = data[i]._id.deviceType;
                            if (1 == deviceType) {
                                deviceType = 'android';
                                androidNum += value;
                            } else if (2 == deviceType) {
                                deviceType = 'ios'
                                iosNum += value;
                            }
                            this.pie_class.legend.data.push(deviceModel);
                            this.pie_class.series[1].data.push({value: value, name: deviceModel})
                        }
                        this.pie_class.series[0].data.push(
                            {
                                value: iosNum,
                                name: 'ios',
                                itemStyle: {
                                    normal: {
                                        color: '#ec7777'
                                    }
                                }
                            },
                            {
                                value: androidNum,
                                name: 'android',
                                selected: true,
                                itemStyle: {normal: {color: '#4cb1a7'}}
                            });
                    });
            }
        },
        mounted: function () {

            // Android和ios的总数占比
            this.devTypeStat(null, null, 0);

            // Android和ios 昨天的占比
            let starttime1 = moment().subtract(1, 'days').format('YYYY-MM-DD 0:0:0');
            let endtime = moment().format('YYYY-MM-DD 0:0:0');
            this.devTypeStat(starttime1, endtime, 1);

            // Android和ios 一周内的占比
            let starttime7 = moment().subtract(7, 'days').format('YYYY-MM-DD 0:0:0');
            this.devTypeStat(starttime7, endtime, 7);

            // Android和ios 一个月的占比
            let starttime30 = moment().subtract(30, 'days').format('YYYY-MM-DD 0:0:0');
            this.devTypeStat(starttime30, endtime, 30);

            // 注册渠道占比统计
            this.channalStat();

            // 手机型号TOP 20
            this.phoneModelStat();

            // 按发送消息数最多的 TOP 10
            this.sendMsgCountRank();

        }
    } ;
</script>

<style scoped>
    .echarts {
        float: left;
        width: 500px;
        height: 400px;
    }

    .info-box {
        cursor: pointer;
    }

    .info-box-content {
        text-align: center;
        vertical-align: middle;
        display: inherit;
    }

    .c-charts {
        height: 500px;
        width: 100%;
    }
</style>
