import ActivatedSkillBase from './activatedSkillBase';

const defaultConfig = {
    negatedBy: 'nullified'
};

export default class BuffSkill extends ActivatedSkillBase{
    constructor(overrides) {
        let config = Object.assign({}, defaultConfig, overrides);
        super(config.negatedBy);
    }

    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
        filters.push((unit) => unit.state.active);
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.owner].units;
    }
}