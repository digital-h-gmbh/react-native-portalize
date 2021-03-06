"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const Manager_1 = require("./Manager");
exports.Context = React.createContext(null);
exports.Host = ({ children, style }) => {
    const managerRef = React.useRef(null);
    const queue = [];
    const keys = [];
    React.useEffect(() => {
        var _a, _b, _c;
        while (queue.length && managerRef.current) {
            const action = queue.pop();
            if (action) {
                switch (action.type) {
                    case 'mount':
                        (_a = managerRef.current) === null || _a === void 0 ? void 0 : _a.mount(action.key, action.children);
                        break;
                    case 'update':
                        (_b = managerRef.current) === null || _b === void 0 ? void 0 : _b.update(action.key, action.children);
                        break;
                    case 'unmount':
                        (_c = managerRef.current) === null || _c === void 0 ? void 0 : _c.unmount(action.key);
                        break;
                }
            }
        }
    }, []);
    const getRandomInt = (min, max) => Math.floor(Math.random() * Math.floor(max)) + min;
    const mount = (children) => {
        const key = getRandomInt(0, 1000000000);
        keys.push(key);
        if (managerRef.current) {
            managerRef.current.mount(key, children);
        }
        else {
            queue.push({ type: 'mount', key, children });
        }
        return key;
    };
    const update = (key, children) => {
        if (managerRef.current) {
            managerRef.current.update(key, children);
        }
        else {
            const op = { type: 'mount', key, children };
            const index = queue.findIndex(o => o.type === 'mount' || (o.type === 'update' && o.key === key));
            if (index > -1) {
                queue[index] = op;
            }
            else {
                queue.push(op);
            }
        }
    };
    const unmount = (key) => {
        if (managerRef.current) {
            managerRef.current.unmount(key);
        }
        else {
            queue.push({ type: 'unmount', key });
        }
    };
    return (React.createElement(exports.Context.Provider, { value: { mount, update, unmount } },
        React.createElement(react_native_1.View, { style: [{ flex: 1 }, style], collapsable: false, pointerEvents: "box-none" }, children),
        React.createElement(Manager_1.Manager, { ref: managerRef })));
};
