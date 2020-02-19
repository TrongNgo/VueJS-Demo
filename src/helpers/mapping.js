import helper from '../helpers/index'

let result = { 
    CONVERT_KEY_VALUE: function(source,keyName,valueName,IsIndex){
        let result = [];
        for(var i =0 ; i < source.length ;i++) {
           
            result.push({
                value: IsIndex != undefined ?source[i]: source[i][keyName],
                display:IsIndex != undefined ?source[i] : source[i][valueName]
            });
        }

        return result;
    },
    CONVERT_KEY_VALUE_INC_FLOOR: function(source,keyName,valueName) {
        let result = [];
        for(var i =0 ; i < source.length ;i++) {
            if (source[i].listKey === "HighFloor" || source[i].listKey === "LowFloor") {
                result.push({
                  value: source[i][keyName],
                  display:source[i][valueName]
              });
            }
          }
          return result;
    },
    CONVERT_KEY_VALUE_NO_FLOOR: function(source,keyName,valueName) {
        let result = [];
        for(var i =0 ; i < source.length ;i++) {
            if (source[i].listKey !== "HighFloor" && source[i].listKey !== "LowFloor" && source[i].listKey !== "View") {
                result.push({
                  value: source[i][keyName],
                  display:source[i][valueName]
              });
            }
          }
          return result;
    },
    ConvertPrice(value) {
        if (value == null || value == "") {
        return "";
        }
        return helper.PRICE_FORMAT(value);
    },
    ClearParam: function(data,filterCat){
        if(filterCat == "RENT_OR_BUY") {
            data.RENT_OR_BUY = []
        } else if (filterCat == "SEARCH_TEXT" && data != "") {
            data.SEARCH_TEXT = ""
        } else if (filterCat == "PRICE") {
            data.PRICE_START = ""
            data.PRICE_END = ""
           
        } else if (filterCat == "SIZE") {
            data.AREA_START = ""
            data.AREA_END = ""
            
        } else if(filterCat == "BED_BATH"){
            data.BED_ROOM =""
            data.BATH_ROOM = ""
          
        } else if (filterCat == "ORTHER") {
            data.PREFERENCES  = []
            data.NEARBY =[]
            data.FLOOR_LEVEL =[]
            data.UNIT_TYPE = []
            data.VIEW_TYPE =[]
        }
        
        return data;
    },
    ChangeControl: function(data,filterCat){
        console.log('fffff::',data)
        console.log('filterCat::',filterCat)
      
        if(filterCat == "RENT_OR_BUY") {
            if(data.RENT_OR_BUY.length == 1) {
                return data.RENT_OR_BUY[0] + " Only"
            } else if(data.RENT_OR_BUY.length == 2) {
                return "Both"
            }
        } else if (filterCat == "PRICE" && (data.PRICE_START != "" || data.PRICE_END != "")) {
            let _startprice = "0"
            let _endprice = "0"

            if(data.PRICE_START != "0" && data.PRICE_START != "") {
                _startprice = this.ConvertPrice(data.PRICE_START)
            }
            if(data.PRICE_END != "0" && data.PRICE_END != "") {
                _endprice = this.ConvertPrice(data.PRICE_END)
            }
            return  _startprice + " - " + _endprice
           
        } else if (filterCat == "SIZE" && (data.AREA_START != "" || data.AREA_END != "")) {
            let _startarea = "0"
            let _endarea = "0"

            if(data.AREA_START != "0" && data.AREA_START != "") {
                _startarea = this.ConvertPrice(data.AREA_START)
            }
            if(data.AREA_END != "0" && data.AREA_END != "") {
                _endarea = this.ConvertPrice(data.AREA_END)
            }

            return  _startarea + " - " + _endarea + "sqm"
          //  return  data.AREA_START + " - " + data.AREA_END + "sqm"
            
        } else if(filterCat == "BED_BATH"){
            let _text = ""
            if(data.BED_ROOM != ""){
                _text +=  data.BED_ROOM + "bed "
            }
            if(data.BATH_ROOM != ""){
                _text +=  data.BATH_ROOM + "bath"
            }
            return _text
          
        } else if (filterCat == "ORTHER") {
           
            let _count = data.PREFERENCES.length + data.NEARBY.length + data.FLOOR_LEVEL.length  +  data.UNIT_TYPE.length + data.VIEW_TYPE.length
            if(_count > 0) {
                return "Others "+_count
            } else {
                return ""
            }
          
        }
        
        return "";
    },
    
    TO_SEARCH_TEXT: function(data,filterCat,storeFilter){
        let _text_to_search = "i want  "
        if(filterCat == "RENT_OR_BUY") {
            if(data.RENT_OR_BUY.length == 1) {
                _text_to_search = "Search only " + data.RENT_OR_BUY[0]
     
            } else if(data.RENT_OR_BUY.length == 2) {
                _text_to_search = "Search buy or rent "
     
            } else {
                _text_to_search = "remove buy and rent "
            }
        } else if (filterCat == "SEARCH_TEXT" && data != "") {
            _text_to_search = "Search " + data.SEARCH_TEXT
        } else if (filterCat == "PRICE") {

            if ((data.PRICE_START != "" || data.PRICE_END != "") && (data.PRICE_START != "0" || data.PRICE_END != "0")) {
                let _pricestart = data.PRICE_START != ""?parseFloat(data.PRICE_START):0;
                let _priceend = data.PRICE_END != ""?parseFloat(data.PRICE_END):0;
                let _getPrice = _pricestart >= _priceend?_pricestart:_priceend;
    
                _text_to_search = "budget " + _getPrice
            } else {
                _text_to_search = "remove price "
            }
        } else if (filterCat == "SIZE") {
            if ((data.AREA_START != "" || data.AREA_END != "") && (data.AREA_START != "0" || data.AREA_END != "0")) {
                let _sizestart = data.AREA_START != ""?parseFloat(data.AREA_START):0;
                let _sizeend = data.AREA_END != ""?parseFloat(data.AREA_END):0;
                let _getSize = _sizestart < _sizeend?_sizestart:_sizeend;
    
                _text_to_search = "size " + _getSize +"sqm"
            } else {
                _text_to_search = "remove size "
            }
        } else if(filterCat == "BED_BATH"){
            if(data.BED_ROOM != "" && data.BED_ROOM != "0") {
                _text_to_search = data.BED_ROOM + " bedrooms  "
     
            } else {
                _text_to_search = "remove bedroom "
            }

            if(data.BATH_ROOM != "" && data.BATH_ROOM != "0") {
                _text_to_search += data.BATH_ROOM + " bathroom  "
     
            } else {
                _text_to_search += "remove bathroom "
            }
        } else if (filterCat == "ORTHER") {
            if (data.PREFERENCES.length == 0 && data.NEARBY.length == 0 && data.FLOOR_LEVEL.length == 0 
                && data.UNIT_TYPE.length == 0 && data.VIEW_TYPE.length == 0){
                    _text_to_search = " remove Living Space, remove Pet Friendly, remove Furnished, remove Nearby Locations, remove Floor Level, remove Unit Type, remove View Type "
            } else {
                if (data.PREFERENCES.length > 0) {
                    let _detail = ""
                    for(var i =0 ; i < data.PREFERENCES.length ;i++) {
                        _detail += "," + data.PREFERENCES[i]
                    }
                    for(var i =0 ; i < storeFilter.PREFERENCES.length ;i++) {
                        let _oldData = data.PREFERENCES.filter(w => w == storeFilter.PREFERENCES[i]);
                        if(_oldData.length == 0) {
                            _detail += ",remove " + data.PREFERENCES[i]
                        }
                    }
                    _text_to_search =_detail
                } else {
                    _text_to_search = ",remove Living Space "
                }
                

                if (data.NEARBY.length > 0) {
                    let _detail = ""
                    for(var i =0 ; i < data.NEARBY.length ;i++) {
                        _detail += ",Nearby " + data.NEARBY[i]
                    }
                    for(var i =0 ; i < storeFilter.NEARBY.length ;i++) {
                        let _oldData = data.NEARBY.filter(w => w == storeFilter.NEARBY[i]);
                        if(_oldData.length == 0) {
                            _detail += ",remove " + data.NEARBY[i]
                        }
                    }
                    _text_to_search +=_detail 
                } else {
                    _text_to_search += ",remove Nearby Locations"
                }

                if(data.FLOOR_LEVEL.length == 2) {
                    _text_to_search += ",High Floor and Low Floor"
                } else if(data.FLOOR_LEVEL.length == 1) {
                    _text_to_search += ",only " + data.FLOOR_LEVEL[0]
                } else {
                     _text_to_search += ",remove Floor Level"
                }

                if (data.UNIT_TYPE.length > 0) {
                    let _detail = ""
                    for(var i =0 ; i < data.UNIT_TYPE.length ;i++) {
                        _detail += "," + data.UNIT_TYPE[i]
                    }
                    for(var i =0 ; i < storeFilter.UNIT_TYPE.length ;i++) {
                        let _oldData = data.UNIT_TYPE.filter(w => w == storeFilter.UNIT_TYPE[i]);
                        if(_oldData.length == 0) {
                            _detail += ",remove " + data.UNIT_TYPE[i]
                        }
                    }
                    _text_to_search +=_detail 
                } else {
                    _text_to_search += ",remove Unit Type"
                }

                if (data.VIEW_TYPE.length > 0) {
                    let _detail = ""
                    for(var i =0 ; i < data.VIEW_TYPE.length ;i++) {
                        _detail += "," + data.VIEW_TYPE[i]
                    }
                    for(var i =0 ; i < storeFilter.VIEW_TYPE.length ;i++) {
                        let _oldData = data.VIEW_TYPE.filter(w => w == storeFilter.VIEW_TYPE[i]);
                        if(_oldData.length == 0) {
                            _detail += ",remove " + data.VIEW_TYPE[i]
                        }
                    }
                    _text_to_search +=_detail 
                } else {
                    _text_to_search += ",remove View Type"
                }
            }

            _text_to_search = "Search " +_text_to_search.slice(1) 
        }
        return _text_to_search;
    },
    CREATE_BOOKING_PARAM: function(bookingParameter,items,SessionId,notificationId){
        let dateObj = Date();
        var newViewingDate = new Date(bookingParameter.booking_date);
        let viewTime = '';
        if (bookingParameter.booking_time) {
            let newViewTime = new Date(bookingParameter.booking_time);
            let h = newViewTime.getHours();
            let m = newViewTime.getMinutes();
            viewTime =  (h > 9 ? h : '0'+ h) + ':' + (m > 9 ? m : '0' + m);
        }
        let param = {
            BuyerName : bookingParameter.booking_name,
            ViewingDate : newViewingDate.getFullYear() +'-'+ (newViewingDate.getMonth() +1) +'-'+newViewingDate.getDate(),
            ViewingTime : viewTime,
            Phone: bookingParameter.booking_mobile,
            SessionId: SessionId,
            Email : bookingParameter.booking_email,
            LineId : bookingParameter.booking_lineId,
            ListProperties : items.map(({ listingId, listingName }) => ({listingId, listingName})),
            NotificationId: notificationId

        };
        return param;
    },
    MAPPING_EDIT_SEVER_TO_CLIENT: function(source,IsEdit) {
        console.log('source')
        console.log(source)
        console.log('IsEdit:',IsEdit)
        let result ={}
         result.ViewData = {}
         result.ViewData.projectName = IsEdit == false?'':source.listing.listingName2
         result.ViewData.propertiesType= IsEdit == false?'': source.listing.propClassName//   {listKey:source.listing.propClassId,listValue:source.listing.propClassName}
         result.ViewData.ownerName = IsEdit == false?'':  source.listing.listingOwnerName//{listKey:source.listing.listingOwnerId,listValue:source.listing.listingOwnerName} 
         result.ViewData.tranType = IsEdit == false?'':source.listing.listingClassName
         result.ViewData.saleprice = IsEdit == false?'0':source.listing.priceForSale
         result.ViewData.rentprice = IsEdit == false?'0':source.listing.price
         result.ViewData.area = IsEdit == false?'':source.listing.areaSqM
         result.ViewData.DeletedImages = []
         result.ViewData.imageList = []
         result.ViewData.unitFeatures = []
         result.ViewData.floorLevel =''
         result.ViewData.unitType =[]
         result.ViewData.viewType = ''
         result.ViewData.nearBy = []
         result.ViewData.facilities = []
         result.ViewData.IsPublish = IsEdit == false?false:source.listing.makeLive == 1?true:false;
         result.ViewData.ViewAttributeId = '';
         result.ViewData.Location = IsEdit == false?{location: '',city:'', country:''}: source.location.location;
         result.ViewData.BedAttributeId = '';
         result.ViewData.BathAttributeId = '';
         result.ViewData.BathAttributeName = '';
         result.ViewData.BedAttributeName = '';
         result.ViewData.ExpriDateAttributeName = '';
         result.ViewData.NextToBtsAttributeName = '';
         result.ViewData.ViewAttributeName =''
         result.ViewData.FloorAttributeName =''
         result.ViewData.FloorLevelName = '';
         result.ViewData.UnitNumberName = '';
         result.ViewData.ExpriDateAttributeId = '';
         result.ViewData.NextToBtsAttributeId = '';
         result.ViewData.FloorLevelAttributeId = '';
         result.ViewData.availableFrom = '';
         result.ViewData.AvailableFromAttributeId = '';
         result.ViewData.AvailableFromAttributeName = '';
         result.ViewData.ContractActive = '';
         result.ViewData.ContractActiveAttributeId = '';
         result.ViewData.ContractActiveAttributeName = '';
         result.ViewData.PropertiesTypeId = source.listing.propClassId;
         result.ViewData.OwnerId = source.listing.listingOwnerId;
         result.ViewData.tagsId = IsEdit == false?'':  source.listing.tagsId.toString()
         result.ViewData.resaleId = IsEdit == false?'':  source.listing.resaleId.toString()

         result.ViewData.PropertiesTypeOld = source.listing.propClassName;
         result.ViewData.OwnerOId = source.listing.listingOwnerName;
         result.bindingData ={}
         result.bindingData.specifications = []
         result.bindingData.facilities = []
         result.bindingData.projectList = []
         result.bindingData.propertiesTypeList = [],
         result.bindingData.propertiesTagList = [],
         result.bindingData.propertiesResaleList = [],
         result.bindingData.transactionTypeList = []
         result.bindingData.ownerList = []
         result.bindingData.unitType =[]
         result.bindingData.nearBy =[]
         result.bindingData.floorLevel =[]
         result.bindingData.viewType =[]
         result.bindingData.location =[]

         for(var i =0 ; i < source.images.length ;i++) {
            let _image =source.images[i]
            result.ViewData.imageList.push({id: _image.imageid,url:_image.imageURL })
         }
         

        for(var i =0 ; i < source.attributes.length ;i++) {
            let _attribute =source.attributes[i]
            if(_attribute.category == "SPECIFICATIONS") {
                result.bindingData.specifications.push(_attribute)

                if(_attribute.attributeValue == "true"){
                    result.ViewData.unitFeatures.push(_attribute.attributeName)
                }

            } else if(_attribute.category == "FACILITIES") {
                result.bindingData.facilities.push(_attribute)

                if(_attribute.attributeValue == "true"){
                    result.ViewData.facilities.push(_attribute)
                }

            } else if(_attribute.category == "GENERRAL" && _attribute.attributeName == "ContractEndDate") {
                result.ViewData.expriDate = _attribute.attributeValue
                result.ViewData.ExpriDateAttributeId =_attribute.listAttributeId
                result.ViewData.ExpriDateAttributeName   = _attribute.attributeName

            }  else if(_attribute.category == "GENERRAL" && _attribute.attributeName == "AvailableFrom") {
            
               // result.ViewData.availableFrom = _attribute.attributeValue
                if (_attribute.attributeValue != '0' && _attribute.attributeValue != ''){
                   
                    let spDate =_attribute.attributeValue.split('-')
                    let _newDate = spDate[0] +'/'+ spDate[1] +'/'+spDate[2]
                    let newDate = new Date(_newDate);
                    result.ViewData.availableFrom = newDate
                    
                } else {
                    result.ViewData.availableFrom = ''
                }

             
                result.ViewData.AvailableFromAttributeId =_attribute.listAttributeId
                result.ViewData.AvailableFromAttributeName   = _attribute.attributeName

            } else if(_attribute.category == "GENERRAL" && _attribute.attributeName == "ContactActive") {
                result.ViewData.ContractActive = _attribute.attributeValue
                result.ViewData.ContractActiveAttributeId =_attribute.listAttributeId
                result.ViewData.ContractActiveAttributeName   = _attribute.attributeName

            } else if(_attribute.category == "GENERRAL" && _attribute.attributeName == "UnitNumber") {
                result.ViewData.unitnumber = _attribute.attributeValue
                result.ViewData.UnitNumberAttributeId =_attribute.listAttributeId
                result.ViewData.UnitNumberName  = _attribute.attributeName

            }  else if(_attribute.category == "GENERRAL" && _attribute.attributeName == "FloorNumber") {
                result.ViewData.floornumber = _attribute.attributeValue
                result.ViewData.FloorNumberAttributeId =_attribute.listAttributeId
                result.ViewData.FloorLevelName  = _attribute.attributeName

            } else if(_attribute.category == "" && _attribute.attributeName == "Bedrooms") {
                result.ViewData.bedroom = _attribute.attributeValue
                result.ViewData.BedAttributeId = _attribute.listAttributeId
                result.ViewData.BedAttributeName = _attribute.attributeName

            } else if(_attribute.category == "" && _attribute.attributeName == "Bathrooms") {
                result.ViewData.bathroom = _attribute.attributeValue
                result.ViewData.BathAttributeId = _attribute.listAttributeId
                result.ViewData.BathAttributeName = _attribute.attributeName

            }
             else if(_attribute.category == "HIGHTLIGHT" && _attribute.attributeName == "NexttoBTS_MRT") {
                if(_attribute.attributeValue == "true"){
                    result.ViewData.nearBy.push("MRT","BTS")
                }
                result.bindingData.nearBy.push("MRT","BTS")
                result.ViewData.NextToBtsAttributeId = _attribute.listAttributeId
                result.ViewData.NextToBtsAttributeName = _attribute.attributeName

            } else if(_attribute.category == "HIGHTLIGHT" && _attribute.attributeName != "View"&& _attribute.attributeName != "HighFloor"&& _attribute.attributeName != "NexttoBTS_MRT") {
                if(_attribute.attributeValue == "true"){
                    result.ViewData.unitType.push( _attribute.attributeName)
                }
               
                result.bindingData.unitType.push(_attribute)
            } else if(_attribute.category == "HIGHTLIGHT" && _attribute.attributeName == "HighFloor") {
                if(_attribute.attributeValue == "true"){
                    result.ViewData.floorLevel = true
                } else {
                    result.ViewData.floorLevel = false
                }
                result.ViewData.FloorLevelAttributeId = _attribute.listAttributeId
                result.ViewData.FloorAttributeName = _attribute.attributeName
                result.bindingData.floorLevel.push(_attribute.displayName)
                // result.bindingData.floorLevel.push("LowFloor")
            } else if(_attribute.category == "HIGHTLIGHT" && _attribute.attributeName == "View") {
                result.ViewData.viewType =_attribute.attributeValue
                result.ViewData.ViewAttributeId = _attribute.listAttributeId
                result.ViewData.ViewAttributeName = _attribute.attributeName
                result.bindingData.viewType = source.viewType
            }
        }

        result.ViewData.homeOwnerPhone = source.homeOwnerDetails ? source.homeOwnerDetails.phone : '' ;
        result.ViewData.homeOwnerMobile = source.homeOwnerDetails ? source.homeOwnerDetails.mobile : '' ;

        console.log('map to client::')
        console.log(result)

        return result;
    },
    MAPPING_EDIT_CLIENT_TO_SERVER: function(ListingId,source) {
        // result.ViewData.PropertiesTypeId = source.listing.propClassId;
        // result.ViewData.OwnerId
        // result.ViewData.PropertiesTypeOld = source.listing.propClassName;
        // result.ViewData.OwnerOId = source.listing.listingOwnerName;


        let resultModel = {}
        let ListtingDetail = {}
        resultModel.Listing ={}
        resultModel.Attributes = []
        resultModel.ViewType = []
        resultModel.Images = []
        resultModel.DeletedImages = []
        console.log('tranType::0',source)
        ListtingDetail.ListingId = ListingId;
        ListtingDetail.ListingOwnerId = source.OwnerOId == source.ownerName?source.OwnerId:source.ownerName// source.ownerName.listKey == undefined?source.ownerName:source.ownerName.listKey
        ListtingDetail.ListingName2 = source.projectName
        ListtingDetail.PropClassId =  source.propertiesType == source.PropertiesTypeOld?source.PropertiesTypeId: source.propertiesType //source.propertiesType.listKey == undefined?source.propertiesType:source.propertiesType.listKey
        ListtingDetail.AreaSqM = source.area
        ListtingDetail.MakeLive = source.IsPublish == true?1:6
        ListtingDetail.PriceForSale = source.saleprice
        ListtingDetail.Price = source.rentprice
        ListtingDetail.resaleId = source.resaleId
        ListtingDetail.tagsId = source.tagsId
        
        resultModel.Listing = ListtingDetail;
    
        let _ListingClassId = 0
        if(source.tranType == 'Both' ) {
            _ListingClassId = 12
        }
        else if(source.tranType == 'Sale' ) {
            _ListingClassId = 6
        }
        else if(source.tranType == 'Rent' ) {
            _ListingClassId = 2
        } else {
            _ListingClassId = source.tranType
        }

        ListtingDetail.ListingClassId = _ListingClassId

        resultModel.Location = 
        {
            location: source.Location,
            city: "Bangkok", 
            country: "Thailand",
            listingId: ListingId
        };
        /* Attribute */
        for(var i =0 ; i < source.unitFeatures.length ;i++) {
            let _Name = source.unitFeatures[i]
            resultModel.Attributes.push({
                category: 'SPECIFICATIONS',
                attributeValue: 'true',
                AttributeName:_Name
            })
        }

        if(source.unitType.length > 0) {
            for(var i =0 ; i < source.unitType.length ;i++) {
                let _Name = source.unitType[i]
                resultModel.Attributes.push({
                    category: 'HIGHTLIGHT',
                    AttributeName: _Name,
                    attributeValue: 'true'
                })
            }
           
        }
        

        resultModel.Attributes.push({
            category: 'HIGHTLIGHT',
            attributeName: 'View',
            attributeValue: source.viewType
        })
            

        for(var i =0 ; i < source.imageList.length ;i++) {
            let _Image = source.imageList[i]
            if (_Image.url != ''){ 
            
                  resultModel.Images.push({
                    imageid: _Image.id,
                    ListingId:ListingId,
                    ImageURL: _Image.url,
                    Priority: i
                  })
            }
        }
        for(var i =0 ; i < source.DeletedImages.length ;i++) {
            let _Id = source.DeletedImages[i].id
            if (_Id != ''){ 
            
                  resultModel.DeletedImages.push(_Id)
            }
        }

        resultModel.Attributes.push({ category: '', AttributeName:source.BedAttributeName, ListAttributeId: source.BedAttributeId,attributeValue: source.bedroom })
        resultModel.Attributes.push({ category: '', AttributeName:source.BathAttributeName, ListAttributeId: source.BathAttributeId,attributeValue: source.bathroom })

        if (source.expriDate != '0' && source.expriDate != ''){
            let newExpriDate = new Date(source.expriDate);
            let _newExpriDate = newExpriDate.getFullYear() +'-'+ (newExpriDate.getMonth() +1) +'-'+newExpriDate.getDate()
            resultModel.Attributes.push({ category: 'GENERRAL', ListAttributeId: source.ExpriDateAttributeId,AttributeName: source.ExpriDateAttributeName,AttributeValue: _newExpriDate })
        }
     
        if (source.availableFrom != '0' && source.availableFrom != '' && source.availableFrom != null){
            let newExpriDate = new Date(source.availableFrom);
            let _newExpriDate = newExpriDate.getFullYear() +'-'+ (newExpriDate.getMonth() +1) +'-'+newExpriDate.getDate()
            resultModel.Attributes.push({ category: 'GENERRAL', ListAttributeId: source.AvailableFromAttributeId,AttributeName: source.AvailableFromAttributeName,AttributeValue: _newExpriDate })
        }

        resultModel.Attributes.push({ category: 'GENERRAL', ListAttributeId: source.UnitNumberAttributeId ,AttributeName:source.UnitNumberName,AttributeValue: source.unitnumber })
        resultModel.Attributes.push({ category: 'GENERRAL', ListAttributeId: source.FloorNumberAttributeId ,AttributeName:source.FloorLevelName ,AttributeValue: source.floornumber })
        resultModel.Attributes.push({ category: 'GENERRAL', ListAttributeId: source.ContractActiveAttributeId ,AttributeName:source.ContractActiveAttributeName,AttributeValue: source.ContractActive })

        let IsNearBy = 'false'
        if(source.nearBy.length > 0){
            IsNearBy = 'true'
        } 

        let IsHighFloor = 'false'
        if(source.floorLevel == true){
            IsHighFloor = 'true'
        } 
        resultModel.Attributes.push({
            category: 'HIGHTLIGHT',
            attributeName: 'HighFloor',
            attributeValue: IsHighFloor,
            ListAttributeId: source.FloorLevelAttributeId
        })

        resultModel.HomeOwnerDetails = {
            Phone: source.homeOwnerPhone,
            Mobile: source.homeOwnerMobile
        }
        console.log('mapResult::',resultModel)
        return resultModel;
    },
    MAPPING_PROJECT_EDIT_SEVER_TO_CLIENT: function(source,IsEdit) {
        console.log('source')
        console.log(source)
        console.log('IsEdit:',IsEdit)
        let result ={}
         result.ViewData = {}
         result.ViewData.projectName = IsEdit == false?'':source.projectName
         result.ViewData.propClassId= IsEdit == false?'': source.propClassId.toString()
         result.ViewData.developerName = IsEdit == false?'':  source.developerName
         result.ViewData.yearBuilt = IsEdit == false?'':source.yearBuilt
         result.ViewData.totalUnits = IsEdit == false?'0':source.totalUnits
         result.ViewData.totalBuildings = IsEdit == false?'0':source.totalBuildings
         result.ViewData.totalFlrs = IsEdit == false?'0':source.totalFlrs
         result.ViewData.legalStructure = IsEdit == false?'':source.legalStructure;
         result.ViewData.projectDesc = IsEdit == false?'':source.projectDesc;
         result.ViewData.synonyms = IsEdit == false?'':source.synonyms;
         result.ViewData.projectAddress = IsEdit == false?'':source.projectAddress
         result.ViewData.developerEmail = IsEdit == false?'':source.developerEmail
         result.ViewData.phoneNumber = IsEdit == false?'':source.phoneNumber
         result.ViewData.lat = IsEdit == false?'':source.lat
         result.ViewData.lng = IsEdit == false?'':source.lng
         result.ViewData.location = IsEdit == false?'':source.location
         result.ViewData.juristicEmail = IsEdit == false?'':source.juristicEmail
         result.ViewData.juristicPhone = IsEdit == false?'':source.juristicPhone
         result.ViewData.commonFees = IsEdit == false?'':source.commonFees
         result.ViewData.sinkingFunds = IsEdit == false?'':source.sinkingFunds

         result.ViewData.deletedImages = []
         result.ViewData.imageList = []
         result.ViewData.facilityAttributes = []
         result.ViewData.nearByAttributes = []
         result.ViewData.floorPlansImageUrls = []
         result.ViewData.unitLayoutsImageUrls = []
        
         result.bindingData ={}
         result.bindingData.facilityAttributes = []
         result.bindingData.nearByAttributes = []
         result.bindingData.LegalStructureList = []

         for(var i =0 ; i < source.projectImageUrls.length ;i++) {
            let _image =source.projectImageUrls[i]
            result.ViewData.imageList.push({id: _image.id,url:_image.imageURL })
         }
        for(var i =0 ; i < source.floorPlansImageUrls.length ;i++) {
            let _image =source.floorPlansImageUrls[i]
            result.ViewData.floorPlansImageUrls.push({id: _image.id,url:_image.imageURL,caption: _image.caption })
        }
        for(var i =0 ; i < source.unitLayoutsImageUrls.length ;i++) {
            let _image =source.unitLayoutsImageUrls[i]
            result.ViewData.unitLayoutsImageUrls.push({id: _image.id,url:_image.imageURL,caption: _image.caption })
        }

        for(var i =0 ; i < source.facilityAttributes.length ;i++) {
            let _attribute =source.facilityAttributes[i]
            if(_attribute.attributeName != 'MaidRoom'){
               
                result.bindingData.facilityAttributes.push(_attribute)

                if(_attribute.attributeValue == "true"){
                    result.ViewData.facilityAttributes.push(_attribute.attributeName)
                }
            }
        }

        for(var i =0 ; i < source.nearByAttributes.length ;i++) {
            let _attribute =source.nearByAttributes[i]
          
               
                result.bindingData.nearByAttributes.push(_attribute)

                if(_attribute.attributeValue == "true"){
                    result.ViewData.nearByAttributes.push(_attribute.attributeName)
                }
            
        }
        console.log('map to client::')
        console.log(result)

        return result;
    },
    MAPPING_PROJECT_EDIT_CLIENT_TO_SERVER: function(ProjectId,source,oldSource) {
        let newYearBuilt = new Date(source.yearBuilt ? source.yearBuilt : '');
       
        oldSource.projectName = source.projectName
        oldSource.propClassId = source.propClassId
        oldSource.synonyms = source.synonyms
        oldSource.totalBuildings = source.totalBuildings
        oldSource.totalFlrs = source.totalFlrs
        oldSource.totalUnits = source.totalUnits
        oldSource.yearBuilt = newYearBuilt.getFullYear()
        oldSource.developerName = source.developerName
        oldSource.legalStructure = source.legalStructure
        oldSource.projectDesc = source.projectDesc
        oldSource.lat = source.lat
        oldSource.lng = source.lng
        oldSource.location = source.location
        oldSource.juristicEmail = source.juristicEmail
        oldSource.juristicPhone = source.juristicPhone
        oldSource.commonFees = source.commonFees ? source.commonFees : 0
        oldSource.sinkingFunds = source.sinkingFunds ? source.sinkingFunds : 0

        oldSource.developerEmail = source.developerEmail
        oldSource.phoneNumber = source.phoneNumber
        oldSource.projectAddress = source.projectAddress
        oldSource.floorPlansImageUrls = []
        oldSource.deletedImages = source.deletedImages
        oldSource.projectId = ProjectId
        oldSource.projectImageUrls = []
        oldSource.unitLayoutsImageUrls = []
        oldSource.facilityAttributes =[]
        oldSource.nearByAttributes =[]
        console.log('source::',source)
        
        for(var i =0 ; i < source.facilityAttributes.length ;i++) {
            let _fac =source.facilityAttributes[i]
           
                oldSource.facilityAttributes.push({attributeName: _fac })
            
            
         }

         for(var i =0 ; i < source.nearByAttributes.length ;i++) {
            let _fac =source.nearByAttributes[i]
            console.log('123456'+_fac)
           
                oldSource.nearByAttributes.push({attributeName: _fac })
            
            
         }

         for(var i =0 ; i < source.imageList.length ;i++) {
            let _image =source.imageList[i]
            oldSource.projectImageUrls.push({id: _image.id,projectId:ProjectId,imageURL:_image.url,ordering:(i+1) })
         }
        for(var i =0 ; i < source.floorPlansImageUrls.length ;i++) {
            let _image =source.floorPlansImageUrls[i]
            oldSource.floorPlansImageUrls.push({id: _image.id,projectId:ProjectId,imageURL:_image.url,caption: _image.caption,ordering:i })
        }
        for(var i =0 ; i < source.unitLayoutsImageUrls.length ;i++) {
            let _image =source.unitLayoutsImageUrls[i]
            oldSource.unitLayoutsImageUrls.push({id: _image.id,projectId:ProjectId,imageURL:_image.url,caption: _image.caption,ordering:i })
        }

        console.log('mapResult::',oldSource)
       
        return oldSource;
    },
}
export default result