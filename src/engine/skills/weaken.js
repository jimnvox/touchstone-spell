import SkillBase from './skillBase';

export default class Weaken extends SkillBase{
    constructor() {
        super('invisible');
    }

    getFilters(skill) {
        return super.getFilters(skill);
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.oppopnent].units;
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.attackWeaken += baseValue;
    }
}
