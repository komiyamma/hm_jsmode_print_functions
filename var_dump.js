function _dumpObjHelper(obj, level) {
    var dumped_text = "";
    if(!level) level = 0;

    var level_padding = "";
    for(var j=0;j<level+1;j++) level_padding += "  ";

    if(typeof(obj) == 'object') {  
        for(var item in obj) {
            var value = obj[item];

            if(typeof(value) == 'object') { 
                dumped_text += level_padding + "\"" + item + "\" :\n";
                dumped_text += level_padding + "{\n" + _dumpObjHelper(value,level+1) + "\n" + level_padding + "},";
            } else if (typeof(value) == "string") {
                dumped_text += level_padding + "\"" + item + "\" : \"" + value + "\",\n";
            } else if (typeof(value) == "function") {
                value = value.toString().replace(/[\n|\r]/g, " ");
                dumped_text += level_padding + "\"" + item + "\" : " + value + ",\n";
            } else {
                dumped_text += level_padding + "\"" + item + "\" : " + value + ",\n";
            }
        }
    } else { 
        dumped_text = ""+obj;
    }
    return dumped_text;
}

function dumpObj(obj) {
    var detail = "";
    if (obj == null || obj == undefined) {
	    if (obj == null) { // nullとundefinedは判定が曖昧になりやすいので...
   	        if (typeof(obj) == "undefined") { // typeofで判定する
	            detail = "(undefined)";
  	        }
            else {
	            detail = "(null)";
            }
        }
    }
    else if (typeof(obj) == "object") {
        detail = _dumpObjHelper(obj);
        if (detail) {
            detail = "{\n" + detail + "\n}"; 
        }
        if (detail.length == 0) {
            detail = "{}";
        }
    }
    else if (typeof(obj) == "function") {
        detail = obj.toString();
	}
    else {
        detail = JSON.stringify(obj);
	}
    if (detail) {
        detail = detail.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
    }

    var type = typeof(obj);


	debuginfo(2);  // 以下の2行はdebuginfo+consoleではなく、debuginfoを操作しないもので実装
	console.log( "[type: " + type + "]\r\n" + detail + "\r\n\r\n" );
}

/* test
obj = {
    a:3,
    b:"abc",
    e : {
        f : 3,
        g : function(a) { /* あ
　いう     */
        }
    }
};

dumpObj(obj);
dumpObj({});
dumpObj(lineno);
dumpObj(lineno());
dumpObj(null);
dumpObj(undefined);
dumpObj("345");
dumpObj(true);

obj3 = {
    f : obj3
}

dumpObj(obj3);

// dumpObj(hidemaruGlobal);

}

JScript版は、JSON.stringifyが不完全なので、これでは対処できない。