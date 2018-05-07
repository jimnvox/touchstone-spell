import TurnSkillBase from "./../turnSkillBase";

export default class Ward extends TurnSkillBase {
  // eslint-disable-next-line no-unused-vars
  doPerformSkill(skill, source, field, baseValue) {
    source.status.warded += baseValue;
  }
}