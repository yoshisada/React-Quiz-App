/**
 * Welcome to the bonus round. 
 * We need our options to be shuffled before
 * we send it to our users. Create a function that
 * will take in an array and shuffle the order of that
 * array.
 */

/**
 * Shuffles an array of options
 * @param {Array} array original options
 * @returns {Array} shuffled options
 */
function shuffleOptions(array) {
  const options = [...array];
  for (var j = 0; j < options.length; j++) {
      var temp = options[j]
      var rand = Math.floor(Math.random() * (j + 1));
      options[j] = options[rand];
      options[rand] = temp;
  }
  return options
}

/**
 * Shuffles an array
 * @param {Array} array original array 
 * @returns {Array} shuffled array
 */
function shuffleArray(array) {
  const newArray = [...array];
  for (var i = 0; i < newArray.length; i++) {
    newArray[i].options = shuffleOptions(newArray[i].options);
    var temp = newArray[i];
    var rand = Math.floor(Math.random() * (i + 1));
    newArray[i] = newArray[rand];
    newArray[rand] = temp;
  }
  return newArray
}

module.exports = shuffleArray
