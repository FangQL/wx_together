// location.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {

        userInfo: {},

        logged: false,

        map: {
            latitude: 23.099994,
            longitude: 113.324520
        },

        markers: [{
            iconPath: "/resources/map-marker.png",
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 30,
            height: 30
        }],
        controls: [{
            id: 1,
            iconPath: '/resources/my-location.png',
            position: {
                left: 0,
                top: 500 - 35,
                width: 35,
                height: 35
            },
            clickable: true
        }]
    },


    onShow: function () {

        var that = this

        wx.getLocation({
            success: function (res) {
                that.data.markers[0].latitude = res.latitude
                that.data.markers[0].longitude = res.longitude
                that.data.map.latitude = res.latitude
                that.data.map.longitude = res.longitude
                that.setData({
                    markers: that.data.markers,
                    map: that.data.map
                })
            },
        })
    },


    controltap: function (e) {
        util.showBusy('正在定位')
        var that = this

        wx.getLocation({
            type: "wgs84",
            success: function (res) {
                that.data.markers[0].latitude = res.latitude
                that.data.markers[0].longitude = res.longitude
                that.data.map.latitude = res.latitude
                that.data.map.longitude = res.longitude
                that.setData({
                    markers: that.data.markers,
                    map: that.data.map
                })
            },
        })
    },

    onButtonClick: function (e) {

        function sleep(numberMillis) {
            var now = new Date();
            var exitTime = now.getTime() + numberMillis;
            while (true) {
                now = new Date();
                if (now.getTime() > exitTime)
                    return;
            }
        }

        String.prototype.format = function (args) {
            var result = this;
            if (arguments.length > 0) {
                if (arguments.length == 1 && typeof (args) == "object") {
                    for (var key in args) {
                        if (args[key] != undefined) {
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                }
                else {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] != undefined) {
                            var reg = new RegExp("({)" + i + "(})", "g");
                            result = result.replace(reg, arguments[i]);
                        }
                    }
                }
            }
            return result;
        }

        wx.showLoading({
            title: '搜寻中...',
            mask: true
        })

        setTimeout(function () {
            wx.hideLoading()
        }, 2000)

        sleep(2000)

        var that = this

        var mockLatitudeDelta = Math.random()/50
        var mockLongitudeDelta = Math.random()/50

        var mockLatitude = this.data.map.latitude + mockLatitudeDelta
        var mockLongitude = this.data.map.longitude + mockLongitudeDelta

        wx.showModal({
            title: '找到了',
            content: 'TA 现在在 ({0}, {1}), 距离我 1415.67 米'.format(mockLatitude, mockLongitude),
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

        var polyline = [{
            points: [{
                longitude: this.data.map.longitude,
                latitude: this.data.map.latitude
            }, {
                longitude: mockLongitude,
                latitude: mockLatitude
            }],
            color: "#FF0000DD",
            width: 2
        }]
        this.polyline = polyline
        this.setData({
            polyline: that.polyline
        })
    }
})