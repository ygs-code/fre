'use strict';

var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (
                var _i = arr[Symbol.iterator](), _s;
                !(_n = (_s = _i.next()).done);
                _n = true
            ) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i['return']) _i['return']();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    return function (arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError(
                'Invalid attempt to destructure non-iterable instance'
            );
        }
    };
})();

var _fre = fre;
var useState = _fre.useState;
var render = _fre.render;

function App() {
    var _useState = useState(0);

    var _useState2 = _slicedToArray(_useState, 2);

    var count = _useState2[0];
    var setCount = _useState2[1];

    var update = function update() {
        setCount(count + 1);
    };
    return fre.createElement(
        'div',
        null,
        fre.createElement('h1', null, count),
        fre.createElement('button', { onClick: update }, '+')
    );
}

window.onload = function () {
    render(fre.createElement(App, null), document.getElementById('root'));
};
