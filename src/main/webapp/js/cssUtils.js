/**
 * Created by Amir on 22/08/2015.
 */


    if (!MyGlobal.cssUtils) {
        MyGlobal.cssUtils = {
            path: "css/",
            setPath: function (path) {
                this.path = path;
            },
            getPath: function () {
                return this.path;
            },
            injectCss: function (fileName) {
                if (!document.getElementById(fileName)) {
                    var head = document.getElementsByTagName('head')[0];
                    var link = document.createElement('link');
                    link.id = fileName;
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = this.getPath() + fileName;
                    link.media = 'all';
                    head.appendChild(link);
                }
            }
        };
    }
