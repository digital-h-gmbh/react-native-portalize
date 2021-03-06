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
exports.Consumer = ({ children, manager }) => {
    const [key, setKey] = React.useState(undefined);
    const checkManager = () => {
        if (!manager) {
            throw new Error('No portal manager defined');
        }
    };
    const handleInit = () => {
        checkManager();
        setKey(manager === null || manager === void 0 ? void 0 : manager.mount(children));
    };
    React.useEffect(() => {
        checkManager();
        manager === null || manager === void 0 ? void 0 : manager.update(key, children);
    }, [children, manager]);
    React.useEffect(() => {
        handleInit();
        return () => {
            checkManager();
            manager === null || manager === void 0 ? void 0 : manager.unmount(key);
        };
    }, []);
    return null;
};
