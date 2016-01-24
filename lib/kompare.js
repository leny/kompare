"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (oSource, oSchema) {
    var bStrictMode = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    // eslint-disable-line func-style
    var _fValidate = undefined;

    if (fGetTypeOf(oSource) !== "object") {
        throw new Error("source_object must be an object!");
    }

    if (fGetTypeOf(oSchema) !== "object") {
        throw new Error("schema_object must be an object!");
    }

    _fValidate = function fValidate(oSubject, oScheme) {
        var aSubjectProperties = Object.keys(oSubject),
            aSchemeProperties = Object.keys(oScheme);

        for (var mSchemeProperty, i = -1; mSchemeProperty = aSchemeProperties[++i];) {
            var bPropertyIsPresentInSubject = aSubjectProperties.indexOf(mSchemeProperty) > -1,
                mSchemeValue = oScheme[mSchemeProperty],
                mSubjectValue = oSubject[mSchemeProperty];

            switch (fGetTypeOf(mSchemeValue)) {
                case "boolean":
                    if (!mSchemeValue && bPropertyIsPresentInSubject) {
                        return false;
                    }
                    if (mSchemeValue && !bPropertyIsPresentInSubject) {
                        return false;
                    }
                    break;
                case "string":
                    if (aAllowedTypes.indexOf(fGetTypeOf(mSchemeValue)) === -1) {
                        throw new Error("Invalid schema_object!");
                    }
                    if (fGetTypeOf(mSubjectValue) !== mSchemeValue) {
                        return false;
                    }
                    break;
                case "object":
                    if (fGetTypeOf(mSubjectValue) !== "object") {
                        return false;
                    } else if (!_fValidate(mSubjectValue, mSchemeValue)) {
                        return false;
                    }
                    break;
                default:
                    throw new Error("Invalid schema_object!");
            }
        }

        if (bStrictMode) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = aSubjectProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var sSubjectKey = _step.value;

                    if (aSchemeProperties.indexOf(sSubjectKey) === -1) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        return true;
    };

    return _fValidate(oSource, oSchema);
};

/* kompare
 * https://github.com/leny/kompare
 *
 * Copyright (c) 2016 leny
 * Licensed under the MIT license.
 */

var oTypes = {},
    fGetTypeOf = undefined,
    aAllowedTypes = ["object"];

"Number String Boolean Function RegExp Array Date Error".split(" ").forEach(function (sType) {
    aAllowedTypes.push(sType.toLowerCase());
    oTypes["[object " + sType + "]"] = sType.toLowerCase();
});

fGetTypeOf = function fGetTypeOf(mSubject) {
    if (mSubject == null) {
        return String(mSubject);
    }
    return oTypes[oTypes.toString.call(mSubject)] || "object";
};
