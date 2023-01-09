"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validation = (rules) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const allRules = rules.map(rule => rule.run(req));
        yield Promise.all(allRules);
        const errorFormatter = ({ msg, param }) => {
            const arr = {};
            arr[param] = msg;
            return arr;
        };
        const results = (0, express_validator_1.validationResult)(req).formatWith(errorFormatter);
        if (results.isEmpty()) {
            next();
        }
        else {
            const data = results.array();
            const result = {
                success: false,
                msg: 'invalide data ',
                data: data,
            };
            res.json(result);
        }
    });
};
exports.default = validation;
