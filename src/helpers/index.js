let result = {
  CREATE_SEARCH_REQUEST:function CreateSearchRequest(searchParameter) {
        
    let param = {
        SessionId : searchParameter.SessionId,
        AgentLineId : searchParameter.AgentLineId,
        AgentDisplayName : searchParameter.AgentDisplayName,
        SearchMode: searchParameter.SearchMode,

        ExcludeResult : searchParameter.ExcludeResult,
        PageNo : searchParameter.PageNo,
        PageSize : searchParameter.PageSize
    };
    if(searchParameter && searchParameter.DisplayParameters && searchParameter.DisplayParameters.length > 0) {
        searchParameter.DisplayParameters.forEach(el => {
            if (el.value) {
                if (el.name === 'TRAN_TYPE') {
                    // buy, rent
                    param.TransactionType = el.value;
                } else if (el.name === 'PROP_TYPE') {
                    // condo, apartment,
                    param.PropertyType = el.value;
                } else if (el.name === 'PRO_NAME') {
                    param.PropertyName = el.value;
                } else if (el.name === 'LOCATIONS' || el.name === 'PROJECT' || el.name === 'TRANSPORTATION') {
                    if (param.Location) { param.Location += ', ' + el.value; } 
                    else { param.Location = el.value; }
                } else if (el.name === 'AREASIZE') {
                    param.AreaSqm = el.value;
                } else if (el.name === 'BEDROOMS') {
                    param.Bedrooms = el.value;
                } else if (el.name === 'BATHROOMS') {
                    param.Bathrooms = el.value;
                } else if (el.name === 'FURNISHED') {
                    param.Furniture = el.value == 'Yes';
                } else if (el.name === 'SPECIFICATIONS') {
                    param.Specifications = el.value;
                } else if (el.name === 'PETSALLOWED') {
                    param.PetsAllowed = el.value == 'Yes';
                } else if (el.name === 'PARKING') {
                    param.Parking = el.value == 'Yes';
                } else if (el.name === 'PROPERTY_ID') {
                    param.PropertyId = el.value;
                } else if (el.name === 'USPs') {
                    if(param.USP != '' && param.USP != null) {
                        param.USP = param.USP +','+el.value;
                    } else {
                        param.USP = el.value;
                    }
                   
                } else if (el.name === 'VIEW') {
                    param.View = el.value;
                } else if (el.name === 'AMOUNT') {
                    param.Price = el.value;
                } else if (el.name === 'FACILITIES') {
                    param.Facilities = el.value;
                }
            }
        });
    }
   
    return param;
  },
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
  FORMAT_DATETIME: function (date,format,hastime) {
    let _date =  new Date(date);
    if(_date == undefined || _date== "" || _date == null){ return "-"}
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = _date.getDate();
    var monthIndex = _date.getMonth()+1;
    var year = _date.getFullYear();
    var _day = day.toString().length >1 ?day:"0"+day;
    var _month = monthIndex.toString().length >1 ?monthIndex:"0"+monthIndex;
    if(format != undefined && format == 'dd/mm/yyyy') {
        if(hastime == true) {
            var time = this.FORMAT_TIME_SHORT(_date);
           
            return _day + '/' + _month + '/' + year +' | '+time;
        } else {
          
            return _day + '/' + _month + '/' + year;
        }
     
    } else {
        if(hastime == true) {
            const time = this.FORMAT_TIME_SHORT(_date);
            return _day + ' ' + monthNames[monthIndex] + ' ' + year+' | '+time;
        } else {
            return _day + ' ' + monthNames[monthIndex] + ' ' + year;
        }
        
    }
   
  
   
  },
  FORMAT_TIME_SHORT: function(time){
    if(time == undefined || time == "" || time == null){ return ""}
    let _date =  new Date(time);
 
    var _hour = _date.getHours()
    var _min = _date.getMinutes()
    if(_min < 10) {
      _min = '0'+_min
    }
    if(_hour > 12) {
      return (_hour - 12) +':' +_min+'pm'
    } else {
      return (_hour) +':' +_min+'am'
    }
  },
  PRICE_FORMAT:function (value) {
    if(!value) { return ''; }
    
    var suffixes = ["", "k", "m", "b","t"];
    var suffixNum = Math.floor((""+value).length/4);
    if(value.toString().length > 6) {
      suffixNum =2
    }
    if (suffixNum === 0) { suffixNum = 2; }
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(3));
    if (shortValue % 1 != 0) {
        // var shortNum = shortValue.toFixed(1);
    }
  
    return shortValue+suffixes[suffixNum];
},
    PRICE_NEWFORMAT:function (value) {
        if(!value) { return ''; }
        
        var suffixes = ["", "k", "m", "b","t"];
        var tier = Math.log10(value) / 3 | 0;

        // if zero, we don't need a suffix
        if(tier == 0) return value;

        // get suffix and determine scale
        var suffix = suffixes[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = value / scale;

        // format number and add suffix
        if (value % 1 != 0) {
            return scaled.toFixed(1) + suffix;
        } else {
            return scaled + suffix;
        }
        }
}

export default result
