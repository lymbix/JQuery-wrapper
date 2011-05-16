(function($) {
  
  /**
  * @param  {string}  authenticationKey  your Lymbix authentication key
  */
  $.lymbix = function (authenticationKey) {
  
    var API_BASE = 'https://gyrus.lymbix.com/';
    var TONALIZE_MULTIPLE = 'tonalize_multiple';
    var TONALIZE_DETAILED = 'tonalize_detailed';
    var TONALIZE = 'tonalize';
    var FLAG_RESPONSE = 'flag_response';
    
    if (!authenticationKey) {
      $.error('You must include your authentication key');
    }
    
    /* utility functions */
    
    var getHeaders = function () {
      var headers = {
        authentication: authenticationKey,
        accept: 'application/json',
        version: '2.2'
      };
      return headers;
    }
    
    
    var jsonConcat = function (o1, o2) {
      for (var key in o2) {
        o1[key] = o2[key];
      }
      return o1;
    }
    
    /* api methods */
    
    return {
    
      /**
      * tonalize multiple articles
      *
      * @param    {array}     articles  articles to tonalize
      * @param    {function}  callback  the function to call when the method returns
      * @param    {array}     options   additional parameters (reference_ids and return_fields)
      * @return   {object}    see the api documentation for the format of this object
      */
      tonalizeMultiple: function (articles, callback, options) {
        if (!articles) {
          $.error('You must include articles to tonalize');
        }
        
        var url = API_BASE + TONALIZE_MULTIPLE + '?callback=?';
        articles = JSON.stringify(articles);
        var data = {'articles': articles};
        data = jsonConcat(data, options);
        data = jsonConcat(data, getHeaders());
        
        $.getJSON(url, data, callback);
      },
      
      /**
      * tonalize an article
      *
      * @param    {string}    article  article to tonalize
      * @param    {function}  callback  the function to call when the method returns
      * @param    {array}     options  additional parameters (reference_id and return_fields)
      * @return   {object}    see the api documentation for the format of this object
      */
      tonalizeDetailed: function (article, callback, options) {
        if (!article) {
          $.error('You must include an article to tonalize');
        }
        
        var url = API_BASE + TONALIZE_DETAILED + '?callback=?';
        var data = {'article': article};
        data = jsonConcat(data, options);
        data = jsonConcat(data, getHeaders());
        
        $.getJSON(url, data, callback);
      },
      
      /**
      * tonalize an article
      *
      * @param    {string}    article  article to tonalize
      * @param    {function}  callback  the function to call when the method returns
      * @param    {array}     options  additional parameters (reference_id and return_fields)
      * @return   {object}    see the api documentation for the format of this object
      */
      tonalize: function (article, callback, options) {
        if (!article) {
          $.error('You must include an article to tonalize');
        }
        
        var url = API_BASE + TONALIZE + '?callback=?';
        var data = {'article': article};
        data = jsonConcat(data, options);
        data = jsonConcat(data, getHeaders());
        
        $.getJSON(url, data, callback);
      },
      
      /**
      * flag a response as inaccurate 
      *
      * @param    {string}    phrase       the phrase that returns an inaccurate response
      * @param    {function}  callback     the function to call when the method returns
      * @param    {string}    apiMethod    the method that returns an inaccurate response
      * @param    {string}    apiVersion   the version that returns an inaccurate response
      * @param    {string}    callbackUrl  a url to call when the phrase has been re-rated
      * @param    {array}     options      additional parameters (reference_id)
      * @return   {string}    see the api documentation for this method's response
      */
      flagResponse: function (phrase, callback, apiMethod, apiVersion, callbackUrl, options) {
        if (!phrase) {
          $.error('You must include a phrase to flag');
        }
        if (!apiVersion) apiVersion = '2.2';
        
        var url = API_BASE + FLAG_RESPONSE + '?callback=?';
        var data = {'phrase': phrase};
        
        if (apiMethod) data['apiMethod'] = apiMethod;
        if (apiVersion) data['apiVersion'] = apiVersion;
        if (callbackUrl) data['callbackUrl'] = callbackUrl;
        
        data = jsonConcat(data, options);
        data = jsonConcat(data, getHeaders());
        
        $.getJSON(url, data, callback);
      }
    };
  };
})(jQuery);
