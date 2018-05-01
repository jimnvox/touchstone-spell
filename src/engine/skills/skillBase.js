import { random } from './../../helpers/random';
import R from 'ramda';

function checkNegation(negatedBy, doAffectTarget) {
    return function (skill, source, target, baseValue) {
        if (target.status[negatedBy]) {
            target.status[negatedBy]--;
            // TODO: Echo
            return false;
        } else {
            doAffectTarget(skill, source, target, baseValue);
            return true;
        }
    }
}

export default class SkillBase {
    constructor(negatedBy) {
        if (negatedBy) {
            this.affectTarget = checkNegation(negatedBy, this.doAffectTarget.bind(this));
        } else {
            this.affectTarget = this.doAffectTarget;
        }
    }

    getFilters(skill) {
        let filters = [
            (unit) => unit.state.alive
        ];
        if (skill.faction) filters.push((unit) => unit.isInFaction(skill.faction));

        return filters;
    }

    getPotentialTargets(source, field) {
        return field[source.owner].units;
    }

    getTargets(skill, potentialTargets) {
        let filters = this.getFilters(skill);

        let targets = potentialTargets.filter(R.allPass(filters));

        // Check All
        if (targets.length && !skill.all) {
            let i = random(targets.length);
            return targets.slice(i, i + 1);
        } else {
            return targets;
        }
    }

    getSkillValue(skill, source) {
        let value = skill.value;
        let enhanced = source.getEnhancement(skill.id);
        if (enhanced) {
            if (enhanced < 0) {
                enhanced = Math.ceil(value * -enhanced);
            }
            value += enhanced;
        }
    }

    performSkill(skill, source, field) {
        let potentialTargets = this.getPotentialTargets(source, field);

        let targets = this.getTargets(skill, potentialTargets);

        let baseValue = this.getSkillValue(skill, source);

        let affected = 0;
        for (let target of targets) {
            if (this.affectTarget(skill, source, target, baseValue)) {
                affected++;
            }
        }
        return affected;
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        return true;
    }
}