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
exports.Manager = React.forwardRef((_, ref) => {
    const [portals, setPortals] = React.useState([]);
    React.useImperativeHandle(ref, () => ({
        mount(key, children) {
            setPortals(prev => [...prev, { key, children }]);
        },
        update(key, children) {
            setPortals(prev => prev.map(item => {
                if (item.key === key) {
                    return Object.assign(Object.assign({}, item), { children });
                }
                return item;
            }));
        },
        unmount(key) {
            setPortals(prev => prev.filter(item => item.key !== key));
        },
    }));
    return portals.map(({ key, children }) => (React.createElement(react_native_1.View, { key: `portalize_portal_${key}`, collapsable: false, pointerEvents: "box-none", style: react_native_1.StyleSheet.absoluteFill }, children)));
});
