window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

class J {
    SELF:this
    H:any
    getDataSet:any

    constructor(){
        this.H = function(config) {
            // HController START
            if(!this.dataController) {
                this.dataController =  new function():void {
                    var ATTACHMENTS=[],
                        DATABASE = document.createElement('select'),
                        obj:any = {};
                    obj.data = DATABASE.dataset;
                    obj.bind = function(config) {
                        if(!ATTACHMENTS[config.data]) {ATTACHMENTS[config.data] = [];}
                        ATTACHMENTS[config.data].push(config);
                    };

                    function conCamel(input) { 
                        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
                            return group1.toUpperCase();
                        });
                    }
                    function init(db) {
                        var docObserver = new MutationObserver(function(mutations) {       
                            var key,itemFound;
                            mutations.forEach(function(mutation){
                                key = conCamel(mutation.attributeName.substring(5));
                                if(ATTACHMENTS[key]) {
                                    ATTACHMENTS[key].forEach(function(config){
                                        if(config.element) {
                                            if(config.attribute) {
                                                config.element.setAttribute(config.attribute, db[key]);
                                            }
                                            if(config.property){
                                                config.element[config.property] = db[key];
                                            }
                                        }

                                            // debugger;
                                        if(config.find) {
                                            itemFound = document.querySelectorAll(config.find);
                                            itemFound.forEach(function(itemInstance){
                                                if(config.attribute) {
                                                    itemInstance.setAttribute(config.attribute, db[key]);
                                                }
                                                if(config.property){
                                                    itemInstance[config.property] = db[key];
                                                }
                                            });
                                        }
                                        !config.callback ? false : config.callback(db[key])
                                    });
                                }
                            });
                        });
                        docObserver.observe(DATABASE, { attributes: true});
                    }
                    init(DATABASE.dataset);

                    return obj;
                }
            }

            function init(config, db) {
                var literator
                config.tag = !config.tag ? 'div' : config.tag
                config.element = document.createElement(config.tag)
                !config.value ? false : config.element.value = config.value
                !config.html ? false : config.element.innerHTML = config.html
                !config.class ? false : config.element.className = config.class
                if(config.attributes) {
                    literator=""
                    for(literator in config.attributes) {
                        config.element.setAttribute(literator, config.attributes[literator])
                    }
                }
                if(config.properties) {
                    literator=""
                    for(literator in config.properties) {
                        config.element[literator] = config.properties[literator]
                    }
                }
                if(config.children) {
                    config.children.forEach(function(instance){
                        config.element.appendChild(init(instance, db))
                    })
                }
                if(config.callbacks) {
                    config.callbacks.forEach(function(instance){
                        config.element.addEventListener(instance.event, instance.callback)
                    })
                }
                if(config.bind) {
                    config.bind.element = config.element
                    db.bind(config.bind)
                    if(db.data[config.bind.data]) {db.data[config.bind.data] = db.data[config.bind.data] }
                }
                return config.element
            }
            if(config){
                init(config, this.dataController)
            }
            return this.dataController
            // HController END
        }
        return this
    }

    HController (config) {
        

    }
    
} 