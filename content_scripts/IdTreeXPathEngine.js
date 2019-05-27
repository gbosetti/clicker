// Class taken from https://github.com/gbosetti/web-ancillary-search
class BasicIdEngine {

    getPath (element, parent){
        if (element && element.id){
            return ['.//'+ element.nodeName.toLowerCase() +'[@id="' + element.id + '"]']; 
        }else{
            return; 
        }
    };
};

class IdTreeXPathEngine { 

    getPath (element, parent){

        try{
            if(element == undefined)
                return null;
            var oldElem = element;
            var oldTag = oldElem.nodeName.toLowerCase();
            var paths = [];
            var parentNode = parent || element.ownerDocument;
            var siblingId = false;    
            for (; element && element.nodeType == 1 && element.innerHTML != parentNode.innerHTML; element = element.parentNode) {
                var index = 1;
                if (element.id){
                    siblingId = true;
                }
                else {
                for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
                    if (sibling.nodeType == 10){ 
                        continue;
                    }

                    if (sibling.nodeName == element.nodeName){
                        index++;
                    }
                }
                }
                
                var tagName = element.nodeName.toLowerCase();
                var pathIndex;
                if (!siblingId){
                    pathIndex = (index ? "[" + (index) + "]" : ""); 
                    paths.splice(0, 0, tagName + pathIndex);            
                }else{
                    var result = this.getElementIdXPath(element) + (paths.length ? "/" + paths.join("/") : "");
                    var oldElem2 = (new BasicIdEngine()).getPath(oldElem);
                    if (oldElem2 && oldElem2.length && oldElem2.length > 0 && result == oldElem2[0]){
                        return null;
                    }
                    else return result;
                }        
            }
            var result =  paths.length ? ".//" + paths.join("/") : null;
            var oldElem2 = (new BasicIdEngine()).getPath(oldElem);
            if (oldElem2 && oldElem2.length && oldElem2.length > 0 && result == oldElem2[0]){
                return null;
            }
            else return result;
        }
        catch(err){
            console.log(err);
            return null;
        }
    };
    getElementIdXPath(element){
        if (element && element.id){
            return './/'+ element.nodeName.toLowerCase() +'[@id="' + element.id + '"]'; 
        }else{
            return null; //Siempre que no encontremos el Xpath devolvamos null.
        }
    };
};