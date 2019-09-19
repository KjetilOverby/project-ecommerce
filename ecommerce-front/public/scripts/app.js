'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch


var IndecicionApp = function (_React$Component) {
    _inherits(IndecicionApp, _React$Component);

    function IndecicionApp(props) {
        _classCallCheck(this, IndecicionApp);

        var _this = _possibleConstructorReturn(this, (IndecicionApp.__proto__ || Object.getPrototypeOf(IndecicionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.state = {
            optionsFromArray: []
        };
        return _this;
    }

    _createClass(IndecicionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('optionsFromArray');
                var optionsFromArray = JSON.parse(json);

                if (optionsFromArray) {
                    this.setState(function () {
                        return { optionsFromArray: optionsFromArray };
                    });
                }
            } catch (e) {}
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.optionsFromArray.length !== this.state.optionsFromArray.length) {
                var json = JSON.stringify(this.state.optionsFromArray);
                localStorage.setItem('optionsFromArray', json);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log('Component will unmount!');
        }
    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            this.setState(function () {
                return { optionsFromArray: [] };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var randomNum = Math.floor(Math.random() * this.state.optionsFromArray.length);
            var randomOption = this.state.optionsFromArray[randomNum];
            alert(randomOption);
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    optionsFromArray: prevState.optionsFromArray.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(grabOption) {
            if (!grabOption) {
                return 'Enter valid value to add item';
            } else if (this.state.optionsFromArray.indexOf(grabOption) > -1) {
                return 'This option already exists';
            }

            this.setState(function (prevState) {
                return {
                    optionsFromArray: prevState.optionsFromArray.concat(grabOption)
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var subTitle = 'Put your life in the hands of a computer.';

            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subTitle }),
                React.createElement(Action, {
                    hasOption: this.state.optionsFromArray.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    optionsFromArray: this.state.optionsFromArray,
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOption, {
                    handleAddOption: this.handleAddOption
                })
            );
        }
    }]);

    return IndecicionApp;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: 'Indecicion'

    /* class Header extends React.Component {
        render() {
    
    
            return (
                <div>
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.subtitle}</h2>
                </div>
            )
        }
    } */

};var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.handlePick,
                disabled: !props.hasOption
            },
            'What should I do?'
        )
    );
};

/* class Action extends React.Component {

    render() {
        return (
            <div>
                <button
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOption}
                >
                    What should I do?
                </button>
            </div>
        )
    }
} */

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Option components here'
        ),
        React.createElement(
            'button',
            { onClick: props.handleDeleteOptions },
            'Remove All'
        ),
        props.optionsFromArray.length === 0 && React.createElement(
            'p',
            null,
            'Please add an option to get started!'
        ),
        props.optionsFromArray.map(function (optionMap) {
            return React.createElement(Option, {
                key: optionMap,
                optionList: optionMap,
                handleDeleteOption: props.handleDeleteOption
            });
        })
    );
};

/* class Options extends React.Component {


    render() {
        return (
            <div>
                <h1>Option components here</h1>
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
                {
                    this.props.optionsFromArray.map((optionMap) => <Option key={optionMap} optionList={optionMap} />)
                }

            </div>
        )
    }
} */

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        props.optionList,
        React.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    props.handleDeleteOption(props.optionList);
                }

            },
            'remove'
        )
    );
};

/* class Option extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.optionList
                }
            </div>
        )
    }
} */

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.state = {
            error: undefined
        };

        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();
            var grabOption = e.target.elements.formFromAddOption.value.trim();
            var error = this.props.handleAddOption(grabOption);

            this.setState(function () {
                return { error: error };
            });

            if (!error) {
                e.target.elements.formFromAddOption.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'formFromAddOption' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

/* 
const User = () => {
    return (
        <div>
            <p>Name: </p>
            <p>Age: </p>
           
           
        </div>
        
    )
}; */

ReactDOM.render(React.createElement(IndecicionApp, null), document.getElementById('app'));
