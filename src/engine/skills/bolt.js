import SkillBase from './skillBase';

export default class Bolt extends SkillBase{
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
        var targetStatus = target.status;
        let totalDamage = baseValue + targetStatus.hexed;
        if(targetStatus.warded) {
            var warded = targetStatus.warded;
            targetStatus.warded -= Math.min(totalDamage, warded);
            totalDamage -= warded;
        }
        target.takeDamage(totalDamage);
    }
}