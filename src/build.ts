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
                    obj.db = DATABASE.dataset;
                    obj.outputBind = function(config) {
                        if(!ATTACHMENTS[config.bind]) {ATTACHMENTS[config.bind] = [];}
                        ATTACHMENTS[config.bind].push(config.to);
                    };

                    function conCamel(input) { 
                        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
                            return group1.toUpperCase();
                        });
                    }
                    function init(db) {
                        var docObserver = new MutationObserver(function(mutations) {       
                            var key;
                            mutations.forEach(function(mutation){
                                console.log(mutation)
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
                if(!config.tag) {config.tag = 'div'}
                config.element = document.createElement(config.tag)

                if (config.value) {
                    config.element.value = config.value;
                }
                if (config.html) {
                    config.element.innerHTML = config.html;
                }
                if (config.class) {
                    config.element.class = config.class
                }
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
                    config.bind.to.element = config.element
                    db.outputBind(config.bind);
                    if(db.db[config.bind.bind]) {db.db[config.bind.bind] = db.db[config.bind.bind] }
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