'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _LinkPrevious = require('./icons/base/LinkPrevious');

var _LinkPrevious2 = _interopRequireDefault(_LinkPrevious);

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

var _Add = require('./icons/base/Add');

var _Add2 = _interopRequireDefault(_Add);

var _Subtract = require('./icons/base/Subtract');

var _Subtract2 = _interopRequireDefault(_Subtract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "date-time-drop";
var WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var DATE_REGEXP = new RegExp('[MDY]');
var TIME_REGEXP = new RegExp('[hHmsa]');

var DateTimeDrop = function (_Component) {
  _inherits(DateTimeDrop, _Component);

  function DateTimeDrop(props) {
    _classCallCheck(this, DateTimeDrop);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateTimeDrop).call(this, props));

    _this._onDay = _this._onDay.bind(_this);
    _this._onToday = _this._onToday.bind(_this);
    _this._onPrevious = _this._onPrevious.bind(_this);
    _this._onNext = _this._onNext.bind(_this);

    _this.state = _this._stateFromProps(props);
    return _this;
  }

  _createClass(DateTimeDrop, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var state = this._stateFromProps(nextProps);
      this.setState(state);
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var format = props.format;

      var result = {};
      var value = (0, _moment2.default)(props.value);
      if (value.isValid()) {
        result.value = value;
        result.timeOfDay = {
          hours: value.hours(),
          minutes: value.minutes(),
          seconds: value.seconds()
        };
      } else {
        result.value = (0, _moment2.default)();
      }
      // figure out which scope the step should apply to
      if (format.indexOf('s') !== -1) {
        result.stepScope = 'second';
      } else if (format.indexOf('m') !== -1) {
        result.stepScope = 'minute';
      } else if (format.indexOf('h') !== -1) {
        result.stepScope = 'hour';
      }
      return result;
    }
  }, {
    key: '_onDay',
    value: function _onDay(date) {
      this.props.onChange(date);
    }
  }, {
    key: '_onToday',
    value: function _onToday() {
      var today = (0, _moment2.default)().startOf('day').add(this.state.timeOfDay);
      this.setState({ value: today });
      this.props.onChange(today);
    }
  }, {
    key: '_onPrevious',
    value: function _onPrevious(scope) {
      var delta = scope === this.state.stepScope ? this.props.step : 1;
      var value = (0, _moment2.default)(this.state.value).subtract(delta, scope);
      this.setState({ value: value });
      this.props.onChange(value);
    }
  }, {
    key: '_onNext',
    value: function _onNext(scope) {
      var delta = scope === this.state.stepScope ? this.props.step : 1;
      var value = (0, _moment2.default)(this.state.value).add(delta, scope);
      this.setState({ value: value });
      this.props.onChange(value);
    }
  }, {
    key: '_renderDate',
    value: function _renderDate() {
      var _state = this.state;
      var value = _state.value;
      var timeOfDay = _state.timeOfDay;


      var headerCells = WEEK_DAYS.map(function (day) {
        return _react2.default.createElement(
          'th',
          { key: day },
          day
        );
      });

      var start = (0, _moment2.default)(value).startOf('month').startOf('week').add(timeOfDay);
      var end = (0, _moment2.default)(value).endOf('month').endOf('week').add(timeOfDay);
      var date = (0, _moment2.default)(start);
      var rows = [];

      while (date.valueOf() <= end.valueOf()) {
        var days = [];
        for (var i = 0; i < 7; i += 1) {
          var classes = [CLASS_ROOT + "__day"];
          if (date.isSame(value, 'day')) {
            classes.push(CLASS_ROOT + "__day--active");
          }
          if (!date.isSame(value, 'month')) {
            classes.push(CLASS_ROOT + "__day--other-month");
          }
          days.push(_react2.default.createElement(
            'td',
            { key: date.valueOf() },
            _react2.default.createElement(
              'div',
              { className: classes.join(' '),
                onClick: this._onDay.bind(this, (0, _moment2.default)(date)) },
              date.date()
            )
          ));
          date.add(1, 'days');
        }
        rows.push(_react2.default.createElement(
          'tr',
          { key: date.valueOf() },
          days
        ));
      }

      return [_react2.default.createElement(
        _Header2.default,
        { key: 'header', justify: 'between', colorIndex: 'neutral-1' },
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + "__previous", icon: _react2.default.createElement(_LinkPrevious2.default, null),
          onClick: this._onPrevious.bind(this, 'month') }),
        _react2.default.createElement(
          _Title2.default,
          { className: CLASS_ROOT + "__title", responsive: false },
          value.format('MMMM YYYY')
        ),
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + "__next", icon: _react2.default.createElement(_LinkNext2.default, null),
          onClick: this._onNext.bind(this, 'month') })
      ), _react2.default.createElement(
        'div',
        { key: 'grid', className: CLASS_ROOT + "__grid" },
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              headerCells
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            rows
          )
        )
      ), _react2.default.createElement(
        _Box2.default,
        { key: 'today', pad: { vertical: 'small' } },
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + "__today", label: 'Today',
          onClick: this._onToday })
      )];
    }
  }, {
    key: '_renderTime',
    value: function _renderTime() {
      var format = this.props.format;
      var value = this.state.value;

      var elements = [];
      if (format.indexOf('h') !== -1) {
        elements.push(_react2.default.createElement(
          _Box2.default,
          { key: 'hour', align: 'center' },
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
            onClick: this._onPrevious.bind(this, 'hour') }),
          value.format('h'),
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
            onClick: this._onNext.bind(this, 'hour') })
        ));
      } else if (format.indexOf('H') !== -1) {
        elements.push(_react2.default.createElement(
          _Box2.default,
          { key: 'hour', align: 'center' },
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
            onClick: this._onPrevious.bind(this, 'hour') }),
          value.format('H'),
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
            onClick: this._onNext.bind(this, 'hour') })
        ));
      }
      if (format.indexOf('m') !== -1) {
        elements.push(_react2.default.createElement(
          _Box2.default,
          { key: 'minute', align: 'center' },
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
            onClick: this._onPrevious.bind(this, 'minute') }),
          value.format('mm'),
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
            onClick: this._onNext.bind(this, 'minute') })
        ));
      }
      if (format.indexOf('s') !== -1) {
        elements.push(_react2.default.createElement(
          _Box2.default,
          { key: 'second', align: 'center' },
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
            onClick: this._onPrevious.bind(this, 'second') }),
          value.format('ss'),
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
            onClick: this._onNext.bind(this, 'second') })
        ));
      }
      if (format.indexOf('a') !== -1) {
        elements.push(_react2.default.createElement(
          _Box2.default,
          { key: 'ampm', align: 'center' },
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
            onClick: this._onPrevious.bind(this, 'ampm') }),
          value.format('a'),
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
            onClick: this._onNext.bind(this, 'ampm') })
        ));
      }
      return _react2.default.createElement(
        _Box2.default,
        { direction: 'row', className: CLASS_ROOT + "__time" },
        elements
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var format = this.props.format;


      var date = void 0,
          time = void 0;
      if (DATE_REGEXP.test(format)) {
        date = this._renderDate();
      }

      if (TIME_REGEXP.test(format)) {
        time = this._renderTime();
      }

      return _react2.default.createElement(
        _Box2.default,
        { id: CLASS_ROOT, className: CLASS_ROOT, align: 'center',
          onClick: this._onClose },
        date,
        time
      );
    }
  }]);

  return DateTimeDrop;
}(_react.Component);

exports.default = DateTimeDrop;


DateTimeDrop.propTypes = {
  format: _react.PropTypes.string,
  onChange: _react.PropTypes.func.isRequired,
  step: _react.PropTypes.number.isRequired,
  value: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];