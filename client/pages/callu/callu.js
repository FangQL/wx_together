// pages/sos/sos.js


Page({

    data: {
    },


    onTouchScreen: function () {
        wx.makePhoneCall({
            phoneNumber: '15050288060',
        })
    }
})