class Position {

  static getRandomPoint(min, max, size) {
    let point = Math.floor(Math.random() * (max - min)) + min
    let outfit = point % size
    return point - outfit
  }

}