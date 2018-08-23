class MyElement {
  constructor() {
    this.text = '';
  }
}

const documentFunctions = {
  getElementById : function(id) {
    return new MyElement();
  }
};

module.exports = documentFunctions;
