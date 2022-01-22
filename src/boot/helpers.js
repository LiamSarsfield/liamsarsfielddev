export default async ({app}) => {
  app.mixin({
    methods: {
      /**
       * Force the application to sleep for a set amount of time
       * @param ms
       * @returns {Promise}
       */
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      /**
       * Function that animates a type of typing animation on a String
       * @param dataKey - The value of the key from the Data you would like to change
       * @param string - What you would like to be typed out
       * @param options
       */
      typing(dataKey, string, options) {
        const _this = this;
        let defaultOptions = {
          // The key at which all the terminal properties are kept
          dataOptionsKey: _this,
          typingSpeed: 100,
        };
        // Merge the options together
        options = {...defaultOptions, ...options};

        return new Promise(async (resolve, reject) => {
          for (let i = 0; i < string.length; i++) {
            // Wait the set amount of time for a "type writer" animation
            options.dataOptionsKey[dataKey] += string.charAt(i);
            await _this.sleep(options.typingSpeed);
          }
          resolve();
        });
      },
    },

  });
}
