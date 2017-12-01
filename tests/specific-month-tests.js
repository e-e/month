/* global describe it beforeEach */

var Month = require('../month'),
    assert = require('assert');

function testMonthDates (m, result, sufix) {

  assert.strictEqual( m.days.map(function (d) {
    return d.year + '/' + (d.month + 1) + '/' + d.date;
  }).join(', '), result, 'dates');

  var dates = result.split(/ *, */);

  m.days.forEach(function (d, i) {
    assert.strictEqual( dates[i], d.year + '/' + ( d.month + 1 ) + '/' + d.date, 'dates[i]' + ( sufix ? ('-' + sufix) : '' ) );
  });

}

function _dateIn (d) {
  if( d.previous ) return 'previous';
  if( d.next ) return 'next';
  if( d.current ) return 'current';
  return 'whoops';
}

function testMonthCounters (m, result, sufix) {

  var last = null,
      last_num = 0,
      _results = [];

  m.days.forEach(function (d) {
    var value = _dateIn(d);

    if( value === last ) last_num += 1;
    else {
      if(last) _results.push(last_num + '-' + last);
      last = value;
      last_num = 1;
    }
  });
  if(last) _results.push(last_num + '-' + last);

  assert.strictEqual( _results.join(', '), result, 'counters' + ( sufix ? ('-' + sufix) : '' ) );

  // assert.strictEqual( m.days.map(_dateIn).join(', '), result, 'in-month');
}

describe('specific month (US/UK)', function () {

  beforeEach(function () {
    Month.setFirstWeekDay(0);
  });

  var test_data = {
    '2017-01': {
      dates: '2016/12/25, 2016/12/26, 2016/12/27, 2016/12/28, 2016/12/29, 2016/12/30, 2016/12/31, 2017/1/1, 2017/1/2, 2017/1/3, 2017/1/4, 2017/1/5, 2017/1/6, 2017/1/7, 2017/1/8, 2017/1/9, 2017/1/10, 2017/1/11, 2017/1/12, 2017/1/13, 2017/1/14, 2017/1/15, 2017/1/16, 2017/1/17, 2017/1/18, 2017/1/19, 2017/1/20, 2017/1/21, 2017/1/22, 2017/1/23, 2017/1/24, 2017/1/25, 2017/1/26, 2017/1/27, 2017/1/28, 2017/1/29, 2017/1/30, 2017/1/31, 2017/2/1, 2017/2/2, 2017/2/3, 2017/2/4',
      counters: '7-previous, 31-current, 4-next'
    },
    '2017-06': {
      dates: '2017/5/28, 2017/5/29, 2017/5/30, 2017/5/31, 2017/6/1, 2017/6/2, 2017/6/3, 2017/6/4, 2017/6/5, 2017/6/6, 2017/6/7, 2017/6/8, 2017/6/9, 2017/6/10, 2017/6/11, 2017/6/12, 2017/6/13, 2017/6/14, 2017/6/15, 2017/6/16, 2017/6/17, 2017/6/18, 2017/6/19, 2017/6/20, 2017/6/21, 2017/6/22, 2017/6/23, 2017/6/24, 2017/6/25, 2017/6/26, 2017/6/27, 2017/6/28, 2017/6/29, 2017/6/30, 2017/7/1, 2017/7/2, 2017/7/3, 2017/7/4, 2017/7/5, 2017/7/6, 2017/7/7, 2017/7/8',
      counters: '4-previous, 30-current, 8-next'
    },
    '2017-12': {
      dates: '2017/11/26, 2017/11/27, 2017/11/28, 2017/11/29, 2017/11/30, 2017/12/1, 2017/12/2, 2017/12/3, 2017/12/4, 2017/12/5, 2017/12/6, 2017/12/7, 2017/12/8, 2017/12/9, 2017/12/10, 2017/12/11, 2017/12/12, 2017/12/13, 2017/12/14, 2017/12/15, 2017/12/16, 2017/12/17, 2017/12/18, 2017/12/19, 2017/12/20, 2017/12/21, 2017/12/22, 2017/12/23, 2017/12/24, 2017/12/25, 2017/12/26, 2017/12/27, 2017/12/28, 2017/12/29, 2017/12/30, 2017/12/31, 2018/1/1, 2018/1/2, 2018/1/3, 2018/1/4, 2018/1/5, 2018/1/6',
      counters: '5-previous, 31-current, 6-next'
    },
    '2018-01': {
      dates: '2017/12/31, 2018/1/1, 2018/1/2, 2018/1/3, 2018/1/4, 2018/1/5, 2018/1/6, 2018/1/7, 2018/1/8, 2018/1/9, 2018/1/10, 2018/1/11, 2018/1/12, 2018/1/13, 2018/1/14, 2018/1/15, 2018/1/16, 2018/1/17, 2018/1/18, 2018/1/19, 2018/1/20, 2018/1/21, 2018/1/22, 2018/1/23, 2018/1/24, 2018/1/25, 2018/1/26, 2018/1/27, 2018/1/28, 2018/1/29, 2018/1/30, 2018/1/31, 2018/2/1, 2018/2/2, 2018/2/3, 2018/2/4, 2018/2/5, 2018/2/6, 2018/2/7, 2018/2/8, 2018/2/9, 2018/2/10',
      counters: '1-previous, 31-current, 10-next',
    },
    '2018-06': {
      dates: '2018/5/27, 2018/5/28, 2018/5/29, 2018/5/30, 2018/5/31, 2018/6/1, 2018/6/2, 2018/6/3, 2018/6/4, 2018/6/5, 2018/6/6, 2018/6/7, 2018/6/8, 2018/6/9, 2018/6/10, 2018/6/11, 2018/6/12, 2018/6/13, 2018/6/14, 2018/6/15, 2018/6/16, 2018/6/17, 2018/6/18, 2018/6/19, 2018/6/20, 2018/6/21, 2018/6/22, 2018/6/23, 2018/6/24, 2018/6/25, 2018/6/26, 2018/6/27, 2018/6/28, 2018/6/29, 2018/6/30, 2018/7/1, 2018/7/2, 2018/7/3, 2018/7/4, 2018/7/5, 2018/7/6, 2018/7/7',
      counters: '5-previous, 30-current, 7-next',
    },
    '2018-12': {
      dates: '2018/11/25, 2018/11/26, 2018/11/27, 2018/11/28, 2018/11/29, 2018/11/30, 2018/12/1, 2018/12/2, 2018/12/3, 2018/12/4, 2018/12/5, 2018/12/6, 2018/12/7, 2018/12/8, 2018/12/9, 2018/12/10, 2018/12/11, 2018/12/12, 2018/12/13, 2018/12/14, 2018/12/15, 2018/12/16, 2018/12/17, 2018/12/18, 2018/12/19, 2018/12/20, 2018/12/21, 2018/12/22, 2018/12/23, 2018/12/24, 2018/12/25, 2018/12/26, 2018/12/27, 2018/12/28, 2018/12/29, 2018/12/30, 2018/12/31, 2019/1/1, 2019/1/2, 2019/1/3, 2019/1/4, 2019/1/5',
      counters: '6-previous, 31-current, 5-next',
    },
  };

  it('january 2017', function () {

    var m = new Month(2017, 0);

    testMonthDates(m, test_data['2017-01'].dates );
    testMonthCounters(m, test_data['2017-01'].counters );

  });


  it('june 2017', function () {

    var m = new Month(2017, 5);

    testMonthDates(m, test_data['2017-06'].dates );
    testMonthCounters(m, test_data['2017-06'].counters );

  });

  it('december 2017', function () {

    var m = new Month(2017, 11);

    testMonthDates(m, test_data['2017-12'].dates );
    testMonthCounters(m, test_data['2017-12'].counters );

    m = m.next();

    testMonthDates(m, test_data['2018-01'].dates, 'next' );
    testMonthCounters(m, test_data['2018-01'].counters, 'next');

  });

  it('june 2017 getColumns()', function () {

    var m = new Month(2017, 5);
    m = m.getColumns();
    var expected = {
      '0': [ '2017/4/28', '2017/5/4', '2017/5/11', '2017/5/18', '2017/5/25', '2017/6/2' ],
      '1': [ '2017/4/29', '2017/5/5', '2017/5/12', '2017/5/19', '2017/5/26', '2017/6/3' ],
      '2': [ '2017/4/30', '2017/5/6', '2017/5/13', '2017/5/20', '2017/5/27', '2017/6/4' ],
      '3': [ '2017/4/31', '2017/5/7', '2017/5/14', '2017/5/21', '2017/5/28', '2017/6/5' ],
      '4': [ '2017/5/1', '2017/5/8', '2017/5/15', '2017/5/22', '2017/5/29', '2017/6/6' ],
      '5': [ '2017/5/2', '2017/5/9', '2017/5/16', '2017/5/23', '2017/5/30', '2017/6/7' ],
      '6': [ '2017/5/3', '2017/5/10', '2017/5/17', '2017/5/24', '2017/6/1', '2017/6/8' ]
    };
    var actual = {};
    var days = Object.keys(m);
    days.forEach(function(day) {
      var arr = m[day].map(function(d) {
        return d.year + '/' + d.month + '/' + d.date;
      });
      actual[day] = arr;
    });
    assert.deepStrictEqual( actual, expected );

  it('january 2018', function () {

    var m = new Month(2018, 0);

    testMonthDates(m, test_data['2018-01'].dates );
    testMonthCounters(m, test_data['2018-01'].counters );

    m = m.previous();

    testMonthDates(m, test_data['2017-12'].dates, 'previous' );
    testMonthCounters(m, test_data['2017-12'].counters, 'previous' );
  });

  it('june 2018', function () {

    var m = new Month(2018, 5);

    testMonthDates(m, test_data['2018-06'].dates );
    testMonthCounters(m, test_data['2018-06'].counters );

  });

  it('december 2018', function () {

    var m = new Month(2018, 11);

    testMonthDates(m, test_data['2018-12'].dates );
    testMonthCounters(m, test_data['2018-12'].counters );

  });

});

describe('specific month (ES)', function () {

  beforeEach(function () {
    Month.setFirstWeekDay(1);
  });

  var test_data = {
    '2017-01': {
      dates: '2016/12/26, 2016/12/27, 2016/12/28, 2016/12/29, 2016/12/30, 2016/12/31, 2017/1/1, 2017/1/2, 2017/1/3, 2017/1/4, 2017/1/5, 2017/1/6, 2017/1/7, 2017/1/8, 2017/1/9, 2017/1/10, 2017/1/11, 2017/1/12, 2017/1/13, 2017/1/14, 2017/1/15, 2017/1/16, 2017/1/17, 2017/1/18, 2017/1/19, 2017/1/20, 2017/1/21, 2017/1/22, 2017/1/23, 2017/1/24, 2017/1/25, 2017/1/26, 2017/1/27, 2017/1/28, 2017/1/29, 2017/1/30, 2017/1/31, 2017/2/1, 2017/2/2, 2017/2/3, 2017/2/4, 2017/2/5',
      counters: '6-previous, 31-current, 5-next'
    },
    '2017-06': {
      dates: '2017/5/29, 2017/5/30, 2017/5/31, 2017/6/1, 2017/6/2, 2017/6/3, 2017/6/4, 2017/6/5, 2017/6/6, 2017/6/7, 2017/6/8, 2017/6/9, 2017/6/10, 2017/6/11, 2017/6/12, 2017/6/13, 2017/6/14, 2017/6/15, 2017/6/16, 2017/6/17, 2017/6/18, 2017/6/19, 2017/6/20, 2017/6/21, 2017/6/22, 2017/6/23, 2017/6/24, 2017/6/25, 2017/6/26, 2017/6/27, 2017/6/28, 2017/6/29, 2017/6/30, 2017/7/1, 2017/7/2, 2017/7/3, 2017/7/4, 2017/7/5, 2017/7/6, 2017/7/7, 2017/7/8, 2017/7/9',
      counters: '3-previous, 30-current, 9-next'
    },
    '2017-12': {
      dates: '2017/11/27, 2017/11/28, 2017/11/29, 2017/11/30, 2017/12/1, 2017/12/2, 2017/12/3, 2017/12/4, 2017/12/5, 2017/12/6, 2017/12/7, 2017/12/8, 2017/12/9, 2017/12/10, 2017/12/11, 2017/12/12, 2017/12/13, 2017/12/14, 2017/12/15, 2017/12/16, 2017/12/17, 2017/12/18, 2017/12/19, 2017/12/20, 2017/12/21, 2017/12/22, 2017/12/23, 2017/12/24, 2017/12/25, 2017/12/26, 2017/12/27, 2017/12/28, 2017/12/29, 2017/12/30, 2017/12/31, 2018/1/1, 2018/1/2, 2018/1/3, 2018/1/4, 2018/1/5, 2018/1/6, 2018/1/7',
      counters: '4-previous, 31-current, 7-next'
    },
    '2018-01': {
      dates: '2018/1/1, 2018/1/2, 2018/1/3, 2018/1/4, 2018/1/5, 2018/1/6, 2018/1/7, 2018/1/8, 2018/1/9, 2018/1/10, 2018/1/11, 2018/1/12, 2018/1/13, 2018/1/14, 2018/1/15, 2018/1/16, 2018/1/17, 2018/1/18, 2018/1/19, 2018/1/20, 2018/1/21, 2018/1/22, 2018/1/23, 2018/1/24, 2018/1/25, 2018/1/26, 2018/1/27, 2018/1/28, 2018/1/29, 2018/1/30, 2018/1/31, 2018/2/1, 2018/2/2, 2018/2/3, 2018/2/4, 2018/2/5, 2018/2/6, 2018/2/7, 2018/2/8, 2018/2/9, 2018/2/10, 2018/2/11',
      counters: '31-current, 11-next',
    },
    '2018-06': {
      dates: '2018/5/28, 2018/5/29, 2018/5/30, 2018/5/31, 2018/6/1, 2018/6/2, 2018/6/3, 2018/6/4, 2018/6/5, 2018/6/6, 2018/6/7, 2018/6/8, 2018/6/9, 2018/6/10, 2018/6/11, 2018/6/12, 2018/6/13, 2018/6/14, 2018/6/15, 2018/6/16, 2018/6/17, 2018/6/18, 2018/6/19, 2018/6/20, 2018/6/21, 2018/6/22, 2018/6/23, 2018/6/24, 2018/6/25, 2018/6/26, 2018/6/27, 2018/6/28, 2018/6/29, 2018/6/30, 2018/7/1, 2018/7/2, 2018/7/3, 2018/7/4, 2018/7/5, 2018/7/6, 2018/7/7, 2018/7/8',
      counters: '4-previous, 30-current, 8-next',
    },
    '2018-12': {
      dates: '2018/11/26, 2018/11/27, 2018/11/28, 2018/11/29, 2018/11/30, 2018/12/1, 2018/12/2, 2018/12/3, 2018/12/4, 2018/12/5, 2018/12/6, 2018/12/7, 2018/12/8, 2018/12/9, 2018/12/10, 2018/12/11, 2018/12/12, 2018/12/13, 2018/12/14, 2018/12/15, 2018/12/16, 2018/12/17, 2018/12/18, 2018/12/19, 2018/12/20, 2018/12/21, 2018/12/22, 2018/12/23, 2018/12/24, 2018/12/25, 2018/12/26, 2018/12/27, 2018/12/28, 2018/12/29, 2018/12/30, 2018/12/31, 2019/1/1, 2019/1/2, 2019/1/3, 2019/1/4, 2019/1/5, 2019/1/6',
      counters: '5-previous, 31-current, 6-next',
    },
  };

  it('january 2017', function () {

    var m = new Month(2017, 0);

    testMonthDates(m, test_data['2017-01'].dates );
    testMonthCounters(m, test_data['2017-01'].counters );

  });


  it('june 2017', function () {

    var m = new Month(2017, 5);

    testMonthDates(m, test_data['2017-06'].dates );
    testMonthCounters(m, test_data['2017-06'].counters );

  });

  it('december 2017', function () {

    var m = new Month(2017, 11);

    testMonthDates(m, test_data['2017-12'].dates );
    testMonthCounters(m, test_data['2017-12'].counters );

    m = m.next();

    testMonthDates(m, test_data['2018-01'].dates, 'next' );
    testMonthCounters(m, test_data['2018-01'].counters, 'next');

  });

  it('january 2018', function () {

    var m = new Month(2018, 0);

    testMonthDates(m, test_data['2018-01'].dates );
    testMonthCounters(m, test_data['2018-01'].counters );

    m = m.previous();

    testMonthDates(m, test_data['2017-12'].dates, 'previous' );
    testMonthCounters(m, test_data['2017-12'].counters, 'previous' );
    
  });

  it('june 2017 getColumns()', function () {

    var m = new Month(2017, 5);
    m = m.getColumns();
    var expected = {
      '0': [ '2017/5/4', '2017/5/11', '2017/5/18', '2017/5/25', '2017/6/2', '2017/6/9' ],
      '1': [ '2017/4/29', '2017/5/5', '2017/5/12', '2017/5/19', '2017/5/26', '2017/6/3' ],
      '2': [ '2017/4/30', '2017/5/6', '2017/5/13', '2017/5/20', '2017/5/27', '2017/6/4' ],
      '3': [ '2017/4/31', '2017/5/7', '2017/5/14', '2017/5/21', '2017/5/28', '2017/6/5' ],
      '4': [ '2017/5/1', '2017/5/8', '2017/5/15', '2017/5/22', '2017/5/29', '2017/6/6' ],
      '5': [ '2017/5/2', '2017/5/9', '2017/5/16', '2017/5/23', '2017/5/30', '2017/6/7' ],
      '6': [ '2017/5/3', '2017/5/10', '2017/5/17', '2017/5/24', '2017/6/1', '2017/6/8' ]
    };
    var actual = {};
    var days = Object.keys(m);
    days.forEach(function(day) {
      var arr = m[day].map(function(d) {
        return d.year + '/' + d.month + '/' + d.date;
      });
      actual[day] = arr;
    });
    assert.deepStrictEqual( actual, expected );

  });

  it('june 2018', function () {

    var m = new Month(2018, 5);

    testMonthDates(m, test_data['2018-06'].dates );
    testMonthCounters(m, test_data['2018-06'].counters );

  });

  it('december 2018', function () {

    var m = new Month(2018, 11);

    testMonthDates(m, test_data['2018-12'].dates );
    testMonthCounters(m, test_data['2018-12'].counters );

  });

});
