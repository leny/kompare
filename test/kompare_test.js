"use strict";

var kompare = require( "../lib/kompare.js" ).default;

var schema_one = {
    "name": "string",
    "age": "number",
    "address": "string",
    "skills": "array",
    "experience": "object",
    "birthdate": "date"
};

var schema_two = {
    "ip": "string",
    "location": {
        "lat": "number",
        "lng": "number"
    },
    "online": "boolean"
};

var schema_three = {
    "lastname": true,
    "firstname": "string",
    "age": false,
    "address": {
        "street": "string",
        "number": "number",
        "zip": true,
        "city": true,
        "country": false,
        "location": {
            "lat": "number",
            "lng": "number"
        }
    }
};

exports[ "kompare: exceptions" ] = {
    "kompare throws when source_object isn't an object": function( test ) {
        test.throws( function() {
            kompare( false, schema_one );
            kompare( "kikoo", schema_one );
            kompare( false, schema_one, true );
            kompare( "kikoo", schema_one, true );
        } );
        test.done();
    },
    "kompare throws when schema_object isn't valid": function( test ) {
        test.throws( function() {
            kompare( { "foo": "bar" }, false );
            kompare( { "foo": "bar" }, false, true );
            kompare( { "foo": "bar" }, { "foo": "bar" } );
            kompare( { "foo": "bar" }, { "foo": [ "bar" ] } );
        } );
        test.done();
    }
};

exports[ "kompare: schema_one" ] = {
    "valid_case": function( test ) {
        test.ok( kompare( {
            "name": "Pierre-Antoine Delnatte",
            "age": 30,
            "address": "Liège, Belgium",
            "skills": [ "js", "css", "html" ],
            "experience": {
                "flatland": {
                    "from": 2011
                }
            },
            "birthdate": new Date( 1985, 4, 7 ),
            "hobbies": [ "music", "games", "teaching", "coding" ]
        }, schema_one ) );
        test.done();
    },
    "failing_case": function( test ) {
        test.ok( !kompare( {
            "name": false,
            "age": "uhu?",
            "skills": [ "js", "css", "html" ],
            "experience": [
                {
                    "from": 2011
                }
            ],
            "birthdate": "yesterday",
        }, schema_one ) );
        test.done();
    },
    "strict_mode: valid_case": function( test ) {
        test.ok( kompare( {
            "name": "Leny",
            "age": 25,
            "address": "Liège, Belgium",
            "skills": [ "js", "css", "html" ],
            "experience": {
                "flatland": {
                    "from": 2011
                }
            },
            "birthdate": new Date( 1985, 4, 7 )
        }, schema_one, true ) );
        test.done();
    },
    "strict_mode: failing_case": function( test ) {
        test.ok( !kompare( {
            "name": "Leny",
            "age": 25,
            "address": "Liège, Belgium",
            "skills": [ "js", "css", "html" ],
            "experience": {
                "flatland": {
                    "from": 2011
                }
            },
            "hobbies": [ "music", "games", "teaching", "coding" ]
        }, schema_one, true ) );
        test.done();
    }
};

exports[ "kompare: schema_two" ] = {
    "valid_case": function( test ) {
        test.ok( kompare( {
            "ip": "127.0.0.1",
            "location": {
                "lat": 5.25,
                "lng": 45.67
            },
            "online": true,
            "country": "Belgium"
        }, schema_two ) );
        test.done();
    },
    "failing_case": function( test ) {
        test.ok( !kompare( {
            "ip": [ 127, 0, 0, 1 ],
            "location": [ 5.25, 45.67 ],
            "online": "always"
        }, schema_two ) );
        test.done();
    },
    "strict_mode: valid_case": function( test ) {
        test.ok( kompare( {
            "ip": "127.0.0.1",
            "location": {
                "lat": 5.25,
                "lng": 45.67
            },
            "online": true
        }, schema_two, true ) );
        test.done();
    },
    "strict_mode: failing_case": function( test ) {
        test.ok( !kompare( {
            "ip": "127.0.0.1",
            "location": {
                "lat": 5.25,
                "lng": 45.67
            },
            "online": true,
            "country": "Belgium"
        }, schema_two, true ) );
        test.done();
    }
};

exports[ "kompare: schema_three" ] = {
    "valid_case": function( test ) {
        test.ok( kompare( {
            "lastname": "Delnatte",
            "firstname": "Pierre-Antoine",
            "address": {
                "street": "Place Saint-Lambert",
                "number": 1,
                "zip": 4000,
                "city": "Liège",
                "location": {
                    "lat": 5.25,
                    "lng": 45.67
                }
            },
            "gender": "male"
        }, schema_three ) );
        test.done();
    },
    "failing_case": function( test ) {
        test.ok( !kompare( {
            "lastname": "Delnatte",
            "firstname": "Pierre-Antoine",
            "age": 30,
            "address": {
                "street": "Place Saint-Lambert",
                "number": 1,
                "zip": 4000,
                "city": "Liège",
                "country": "Belgium",
                "location": {
                    "lat": 5.25,
                    "lng": 45.67
                }
            }
        }, schema_three ) );
        test.done();
    },
    "strict_mode: valid_case": function( test ) {
        test.ok( kompare( {
            "lastname": "Delnatte",
            "firstname": "Pierre-Antoine",
            "address": {
                "street": "Place Saint-Lambert",
                "number": 1,
                "zip": 4000,
                "city": "Liège",
                "location": {
                    "lat": 5.25,
                    "lng": 45.67
                }
            }
        }, schema_three, true ) );
        test.done();
    },
    "strict_mode: failing_case": function( test ) {
        test.ok( !kompare( {
            "lastname": "Delnatte",
            "firstname": "Pierre-Antoine",
            "address": {
                "street": "Place Saint-Lambert",
                "number": 1,
                "zip": 4000,
                "city": "Liège",
                "location": {
                    "lat": 5.25,
                    "lng": 45.67
                }
            },
            "gender": "male"
        }, schema_three, true ) );
        test.done();
    }
};
