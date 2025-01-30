/**
  This view allows users to boost results that matches original searched term.
  This is designed to work with fuzziness requests. Using it with non-fuzziness will aplly a useless boost to all results.

  The view is implemented using a 'function_score' query, which contains only one 'multi_match' query without any 'function' filters.

  The computed score is the 'boost' value.

  example query:
  {
        "function_score": {
        "query": {
            "multi_match": {
                "type": "phrase",
                "query": "New York",
                "fields": [
                    "name.default",
                    "name.en"
                ],
                "analyzer": "peliasQuery"
            }
        },
        "boost": 1,
        "score_mode": "max",
        "boost_mode": "sum"
    }
  }
**/

module.exports = function() {

  // no valid config to use, fail now, don't render this view.
  if( !config ) { return function(){ return null; }; }

  return function( vs ) {

    // validate required params
    if( !vs.isset('fuzziness:boosting:boost') ||
        !vs.isset('fuzziness:boosting:score_mode') ||
        !vs.isset('fuzziness:boosting:boost_mode') ){
      return null;
    }

    // base 'function_score' view
    let view = {
      'function_score': {
        'query': {
            'multi_match': {
                "type": "phrase",
                "query": vs.var('input:name'),
                "fields": [
                    "name.default",
                    vs.var('admin:add_name_lang_to_multimatch:field')
                ],
                "analyzer": "peliasQuery"
            }
        },// apply to phrase matches only
        'boost':                        vs.var('fuzziness:boosting:boost'),
        'score_mode':                   vs.var('fuzziness:boosting:score_mode'),
        'boost_mode':                   vs.var('fuzziness:boosting:boost_mode')
      },
    };

    return view;
  };
};
