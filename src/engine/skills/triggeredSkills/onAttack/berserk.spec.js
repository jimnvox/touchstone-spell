import { theCombatSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { berserk } from './../../skills';

describe('berserk', () => {
  let theBerserkSkill = theCombatSkill(berserk);

  describe('effects', () => {
    theBerserkSkill.givenTheAttacker
      .shouldAffectTheStatus('attackBerserk').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();

    theBerserkSkill.shouldNotAffectTheDefender();
  });
});
