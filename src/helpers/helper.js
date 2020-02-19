let result = { 
    FORMAT_DATE: function (date) {
          let _date =  new Date(date);
          if(_date == undefined || _date== "" || _date == null){ return "-"}
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
    
      var day = _date.getDate();
      var monthIndex = _date.getMonth();
      var year = _date.getFullYear();
  
      var _day = day.toString().length >1 ?day:"0"+day;
    
      return _day + ' ' + monthNames[monthIndex] + ' ' + year;
    },
    FORMAT_DATE_SHORT: function(date){
      let _date =  new Date(date);
      if(_date == undefined || _date== "" || _date == null){ return "-"}
      var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
      ];
      var day = _date.getDate();
      var monthIndex = _date.getMonth();
     
      var _day = day.toString().length >1 ?day:"0"+day;
      return  monthNames[monthIndex] +' '+_day ;
    },
    FORMAT_TIME_SHORT: function(time){
      if(time == undefined || time == "" || time == null){ return ""}
      var _times =time.split(':')
      var _hour = parseInt(_times[0])
      var _min = parseInt(_times[1])
      if(_min < 10) {
        _min = '0'+_min
      }
      if(_hour > 12) {
        return (_hour - 12) +':' +_min+'pm'
      } else {
        return (_hour) +':' +_min+'am'
      }
    },
    GET_YEAR: function(date){
      let _date =  new Date(date);
      if(_date == undefined || _date== "" || _date == null){ return "-"}
      var year = _date.getFullYear().toString();
  
      return year
    },
    CONCAT_TEXT: function(text,max){
      return text.substring(0, max) + ' ...'
    },
    PRICE_FORMAT:function (value) {
      if(!value) { return ''; }
      
      var suffixes = ["", "k", "m", "b","t"];
      var suffixNum = Math.floor((""+value).length/4);
      if(value.toString().length > 6) {
        suffixNum =2
      }
      var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(3));
      if (shortValue % 1 != 0) {
          var shortNum = shortValue.toFixed(1);
      }
    
      return shortValue+suffixes[suffixNum];
    },
    IsNumber(val) {
      let IsNumber = !isNaN(parseFloat(val)) && isFinite(val);
   
       return IsNumber;
    },
    MAKE_INDEXTSEARCH_TEXT(text) {
      if (!text) { return ''; }

      let result = text.replace(' ', '* ');
      if (!result.endsWith('*')) { result += '*'; }
      return result;
    }
  }
  
  export default result
  