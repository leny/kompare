# kompare

[![NPM version](http://img.shields.io/npm/v/kompare.svg)](https://www.npmjs.com/package/kompare) [![Build Status](http://img.shields.io/travis/leny/kompare.svg)](https://travis-ci.org/leny/kompare) ![Dependency Status](https://david-dm.org/leny/kompare.svg) ![Downloads counter](http://img.shields.io/npm/dm/kompare.svg)

> Compare an object with a simple schema.

* * *

## Getting Started

### From **browsers** and **node**.

Install the module with: `npm install kompare`.

> **NOTE:** kompare use the ES6 module definition. For now, it uses Babel to transpile to ES5.  
> So, if you use ES5, you should require kompare with `var kompare = require( "kompare" ).default;`, and, if you use ES6, you should import kompare with `import kompare from "kompare";`.

## Documentation

**kompare** returns a `boolean` indicating if the first object conforms to the simple schema given in the second object. Extra properties of the first objects are ignored.

> **NOTE:** kompare is a young lib used for testing in some of my pro-work. It could (and should) change and evolve in the future. For now, its very simple.

### Signature

`is_conform = kompare( source_object, schema_object[, strict_mode ] );`

#### Example

```javascript
var source = {
    "name": "Pierre-Antoine Delnatte",
    "age": 30,
    "address": "Liège, Belgium",
    "skills": [ "js", "css", "html" ],
    "experience": {
        "flatland": {
            "from": 2011
        }
    }
};

var schema = {
    "name": "string",
    "age": "number",
    "address": "string",
    "skills": "array",
    "experience": "object"
};

var conformity = kompare( source, schema );

```

See [tests](./test/kompare_test.js) for other examples.

### Schema object

The **schema object** is a simple javascript object indicating the type (as `string`) of each property in **source object**. The value of a schema property can also be a `boolean`, indicating if the property **must** be present (or not) in the source object, regardless of his type.

### Strict mode

When `strict_mode` is set to `true`, the `source_object` must be conform to the `schema_object` and cannot have extra properties.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* **0.1.0**: Initial release (*24/01/16*)

## License
(Un)licensed under the UNLICENSE, 2016.
