import { expect } from 'chai';
import sinon from 'sinon';
import * as gameData from './../../data/gameData';
import { skills as mockSkills } from './../../mockData/mockGameData';
import * as skillFactory from './skillFactory';

var sandbox = sinon.createSandbox();

describe('skillFactory', () => {
  before(() => {
    sandbox.replace(gameData, 'skills', mockSkills);
  });

  after(() => {
    sandbox.restore();
  });

  it('should chain skill functions instead of making arrays');

  it('should return an object with "skills" and "passives"', () => {
    let createdSkills = skillFactory.createSkills([]);

    expect(createdSkills, "createdSkills.passives").to.haveOwnProperty('passives');
    expect(createdSkills, "createdSkills.skills").to.haveOwnProperty('skills');

    ['activation', 'earlyActivation', 'onDeath', 'turnStart', 'onAttack', 'onDamaged', 'turnEnd'].forEach((skillType) => {
      expect(createdSkills.skills, `createdSkills.skills.${skillType}`).to.haveOwnProperty(skillType);
    });
  });

  itShouldAdd('upkeep').skills.toSkillArray('upkeep');
  itShouldAdd('turnStart').skills.toSkillArray('turnStart');
  itShouldAdd('activation').skills.toSkillArray('activation');
  itShouldAdd('earlyActivation').skills.toSkillArray('earlyActivation');
  itShouldAdd('onAttack').skills.toSkillArray('onAttack');
  itShouldAdd('onDamaged').skills.toSkillArray('onDamaged');
  itShouldAdd('turnEnd').skills.toSkillArray('turnEnd');
  itShouldAdd('onDeath').skills.toSkillArray('onDeath');

  it('should add passive skills to passives', () => {
    let createdSkills = skillFactory.createSkills([
      {
        "id": "passiveSkill",
        "x": 1
      }
    ]);

    assertSkillCounts(createdSkills, { passive: 1 });

    let value = createdSkills.passives.passiveSkill;
    expect(value, "skill.x").to.equal(1);
  });
});

function itShouldAdd(skillType) {
  return {
    skills: {
      toSkillArray(arrayName) {
        it(`should add ${skillType} skills to ${arrayName} array`, () => {
          let skillID = `${skillType}Skill`;
          let createdSkills = skillFactory.createSkills([
            {
              "id": skillID,
              "x": 1
            }
          ]);

          assertSkillCounts(createdSkills, { [arrayName]: 1 });

          let skill = createdSkills.skills[skillType][0];
          expect(skill.id, "skill.id").to.equal(skillID);
          expect(skill.value, "skill.value").to.equal(1);
          expect(skill.enhanced, "skill.enhanced").to.be.false;
        });
      }
    }
  };
}

function assertSkillCounts(allSkills, skillCounts) {
  Object.entries(allSkills.skills).forEach(([skillType, skills]) => {
    expect(skills.length, `${skillType} skill count`).to.equal(skillCounts[skillType] || 0);
  });

  let passiveCount = Object.values(allSkills.passives)
    .filter(v => v !== 0).length;

  expect(passiveCount, "passive count").to.equal(skillCounts.passive || 0);
}
