export default class Poisoned {
  apply(poisoned, unit) {
    unit.takeDamage(unit.status.poisoned);
  }
}