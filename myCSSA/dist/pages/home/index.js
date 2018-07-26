"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    "__code__": {
      readme: ""
    },

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  methods: {},
  onLoad: function onLoad() {
    // 查看是否授权
    wx.getSetting({
      success: function success(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function success(res) {
              console(res.userInfo);
            }
          });
        }
      }
    });
    wx.sendSocketMessage("Initiate Test");
    wx.onSocketMessage(function (evt) {
      var received_msg = evt.data;
      console.log(received_msg, JSON.prase(received_msg));
    });
  },
  bindGetUserInfo: function bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidXNlckluZm8iLCJoYXNVc2VySW5mbyIsImNhbklVc2UiLCJ3eCIsIm1ldGhvZHMiLCJvbkxvYWQiLCJnZXRTZXR0aW5nIiwic3VjY2VzcyIsInJlcyIsImF1dGhTZXR0aW5nIiwiZ2V0VXNlckluZm8iLCJjb25zb2xlIiwic2VuZFNvY2tldE1lc3NhZ2UiLCJvblNvY2tldE1lc3NhZ2UiLCJldnQiLCJyZWNlaXZlZF9tc2ciLCJsb2ciLCJKU09OIiwicHJhc2UiLCJiaW5kR2V0VXNlckluZm8iLCJlIiwiZGV0YWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsY0FBVSxFQUROO0FBRUpDLGlCQUFhLEtBRlQ7QUFHSkMsYUFBU0MsR0FBR0QsT0FBSCxDQUFXLDhCQUFYO0FBSEwsRztBQUtORSxXQUFTLEU7QUFDVEMsVUFBUSxrQkFBVztBQUNqQjtBQUNBRixPQUFHRyxVQUFILENBQWM7QUFDWkMsZUFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLFlBQUlBLElBQUlDLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckM7QUFDQU4sYUFBR08sV0FBSCxDQUFlO0FBQ2JILHFCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJHLHNCQUFRSCxJQUFJUixRQUFaO0FBQ0Q7QUFIWSxXQUFmO0FBS0Q7QUFDRjtBQVZXLEtBQWQ7QUFZQUcsT0FBR1MsaUJBQUgsQ0FDRSxlQURGO0FBR0FULE9BQUdVLGVBQUgsQ0FBbUIsVUFBU0MsR0FBVCxFQUFhO0FBQzlCLFVBQUlDLGVBQWVELElBQUlmLElBQXZCO0FBQ0FZLGNBQVFLLEdBQVIsQ0FBWUQsWUFBWixFQUF5QkUsS0FBS0MsS0FBTCxDQUFXSCxZQUFYLENBQXpCO0FBQ0QsS0FIRDtBQUlELEc7QUFDREksbUJBQWlCLHlCQUFTQyxDQUFULEVBQVk7QUFDM0JULFlBQVFLLEdBQVIsQ0FBWUksRUFBRUMsTUFBRixDQUFTckIsUUFBckI7QUFDRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiAgZGF0YToge1xuICAgIHVzZXJJbmZvOiB7fSxcbiAgICBoYXNVc2VySW5mbzogZmFsc2UsXG4gICAgY2FuSVVzZTogd3guY2FuSVVzZShcImJ1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm9cIilcbiAgfSxcbiAgbWV0aG9kczoge30sXG4gIG9uTG9hZDogZnVuY3Rpb24oKSB7XG4gICAgLy8g5p+l55yL5piv5ZCm5o6I5p2DXG4gICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1tcInNjb3BlLnVzZXJJbmZvXCJdKSB7XG4gICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensFxuICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICBjb25zb2xlKHJlcy51c2VySW5mbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB3eC5zZW5kU29ja2V0TWVzc2FnZShcbiAgICAgIFwiSW5pdGlhdGUgVGVzdFwiXG4gICAgKTtcbiAgICB3eC5vblNvY2tldE1lc3NhZ2UoZnVuY3Rpb24oZXZ0KXtcbiAgICAgIHZhciByZWNlaXZlZF9tc2cgPSBldnQuZGF0YTtcbiAgICAgIGNvbnNvbGUubG9nKHJlY2VpdmVkX21zZyxKU09OLnByYXNlKHJlY2VpdmVkX21zZykpO1xuICAgIH0pO1xuICB9LFxuICBiaW5kR2V0VXNlckluZm86IGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlLmRldGFpbC51c2VySW5mbyk7XG4gIH1cbn07Il19