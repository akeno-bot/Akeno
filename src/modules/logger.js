const colors = {
  opening: {
    white: "\x1b[37m",
    orange: "\x1b[33m",
    red: "\x1b[31m",
  },
  closing: "\x1b[0m",
};

class BaseLogger {
  log(color, level, message) {
    console.log(
      `${colors["opening"][color]}[${level}]${colors.closing} ${message}`
    );
  }
}

module.exports.Logger = class extends BaseLogger {
  constructor() {
    super();
  }

  log(message) {
    super.log("white", "LOG", message);
  }

  warning(message) {
    super.log("orange", "WARNING", message);
  }

  error(message) {
    super.log("red", "ERROR", message);
  }
};
