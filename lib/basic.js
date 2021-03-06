/**
 * Created by Juneja on 2015/9/10.
 *
 * Description: common methods such as get local ip, make muti-level directory, string format, and son on;
 *              common data&check methods which need to disclosure from constants.js.
 *
 */
"use strict";

var path   = require('path'),
    os     = require('os'),
    fs     = require('fs'),
    comm   = require('./common'),
    cons   = require('./constants');


module.exports = {
/*
 * iftype: 网卡类型 eth, lo, tunl
 * family: IPv4 or IPv6
 * default return: '127.0.0.1'
 *
 * Description: get ipv4 or ipv6 address of assigned interface
 * eg: getLocalIP(eth, IPv4)
 * */
    "getLocalIP" : function (iftype, family) {
        var ip  = '127.0.0.1';
        var ifs = os.networkInterfaces();

        for (var dev in ifs) {
            if (dev.toLowerCase().match(iftype.toLowerCase())) {
                var devinfo = ifs[dev];
                for (var i=0; i<devinfo.length; i++) {
                    if (devinfo[i].family.toLowerCase() === family.toLowerCase()) {
                        ip = devinfo[i].address;
                        break;
                    }
                }
                break;
            }
        }

        return ip;
    },

/*
 * dirpath: absolute directory path
 *
 * Description: asynchronous make directory
 * */
    "mkdirs" : function mkdirs(dirpath, mode, callback) {
        fs.exists(dirpath, function(exists){
            if (exists) {
                callback(dirpath);

            } else {
                mkdirs(path.dirname(dirpath), mode, function(){
                    fs.mkdir(dirpath, mode, callback);
                });
            }
        });
    },

/*
 * dirpath: absolute directory path
 *
 * Description: synchronous make directory
 * */
    "mkdirsSync" : function mkdirsSync(dirpath, mode) {
        if (fs.existsSync(dirpath))
        {
            return;
        } else {
            mkdirsSync(path.dirname(dirpath), mode);

            fs.mkdirSync(dirpath, mode);
        }
    },

/*
 * s: string
 *
 * Description: string format, change multi spaces to one space
 * eg: tmp = trim(stdout).split(' '), then tmp is an array obj
 * */
    "trimSpaces" : function (s) {
        return s.replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g,' ');
    },

    /*
    * common data&check methods from constants.js
    * */
    "serviceName" : cons.serviceName,
    "mimeType"    : cons.mimeType,
    "bIsValidService" : cons.bIsValidService,
    "setCbMap"    : comm.setCbMap,
    "getCbObj"    : comm.getCbObj,
    "getHostname" : comm.getHostname
};
