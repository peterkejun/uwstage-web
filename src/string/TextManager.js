const { default: english } = require("./english");

class TextManager {

    getText(id) {
        return english[id];
    }

}

const textManager = new TextManager();

export default textManager;