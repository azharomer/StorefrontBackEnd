"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotFound = (_req, res) => {
    res.status(404).json({ message: 'Page Not Found Back to Home' });
};
exports.default = NotFound;
