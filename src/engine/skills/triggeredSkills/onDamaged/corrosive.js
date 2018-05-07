import CombatSkillBase from "./../combatSkillBase";

export default class Corrosive extends CombatSkillBase {
    // eslint-disable-next-line no-unused-vars
    doPerformSkill(skill, attacker, defender, baseValue) {
        attacker.status.attackCorroded += baseValue;
        attacker.status.corroded += baseValue;
        attacker.status.corrodedTimer = 2;
    }
}