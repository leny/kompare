/* kompare
 * https://github.com/leny/kompare
 *
 * Copyright (c) 2016 leny
 * Licensed under the MIT license.
 */

let oTypes = {},
    fGetTypeOf,
    aAllowedTypes = [ "object" ];

"Number String Boolean Function RegExp Array Date Error".split( " " ).forEach( ( sType ) => {
    aAllowedTypes.push( sType.toLowerCase() );
    oTypes[ `[object ${ sType }]` ] = sType.toLowerCase();
} );

fGetTypeOf = function( mSubject ) {
    if ( mSubject == null ) {
        return String( mSubject );
    }
    return oTypes[ oTypes.toString.call( mSubject ) ] || "object";
};

export default function( oSource, oSchema, bStrictMode = false ) { // eslint-disable-line func-style
    let fValidate;

    if ( fGetTypeOf( oSource ) !== "object" ) {
        throw new Error( "source_object must be an object!" );
    }

    if ( fGetTypeOf( oSchema ) !== "object" ) {
        throw new Error( "schema_object must be an object!" );
    }

    fValidate = ( oSubject, oScheme ) => {
        let aSubjectProperties = Object.keys( oSubject ),
            aSchemeProperties = Object.keys( oScheme );

        for ( let mSchemeProperty, i = -1; mSchemeProperty = aSchemeProperties[ ++i ]; ) {
            let bPropertyIsPresentInSubject = aSubjectProperties.indexOf( mSchemeProperty ) > -1,
                mSchemeValue = oScheme[ mSchemeProperty ],
                mSubjectValue = oSubject[ mSchemeProperty ];

            switch ( fGetTypeOf( mSchemeValue ) ) {
                case "boolean":
                    if ( !mSchemeValue && bPropertyIsPresentInSubject ) {
                        return false;
                    }
                    if ( mSchemeValue && !bPropertyIsPresentInSubject ) {
                        return false;
                    }
                    break;
                case "string":
                    if ( aAllowedTypes.indexOf( fGetTypeOf( mSchemeValue ) ) === -1 ) {
                        throw new Error( "Invalid schema_object!" );
                    }
                    if ( fGetTypeOf( mSubjectValue ) !== mSchemeValue ) {
                        return false;
                    }
                    break;
                case "object":
                    if ( fGetTypeOf( mSubjectValue ) !== "object" ) {
                        return false;
                    } else if ( !fValidate( mSubjectValue, mSchemeValue ) ) {
                        return false;
                    }
                    break;
                default:
                    throw new Error( "Invalid schema_object!" );
            }
        }

        if ( bStrictMode ) {
            for ( let sSubjectKey of aSubjectProperties ) {
                if ( aSchemeProperties.indexOf( sSubjectKey ) === -1 ) {
                    return false;
                }
            }
        }

        return true;
    };

    return fValidate( oSource, oSchema );
}
