import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScenarioImpact, DEFAULT_LEVERS, PRESET_SCENARIOS } from './scenarioEngine';

test('scenarioEngine: baseline levers produce stable expected baseline output', () => {
  const result = calculateScenarioImpact(DEFAULT_LEVERS);
  assert.equal(result.foodInflationDelta, 0);
  assert.equal(result.goodsAvailabilityDelta, 0);
  assert.equal(result.wheatReserveDaysChange, 0);
  assert.equal(result.industrialOutputDeltaPercent, 0);
  assert.equal(result.cascadingImpacts.length, 4);
  assert.equal(Object.keys(result.countyImpactMap).length, 16);
  assert.ok(result.policyResolutionDraft.includes('محمدصادق معتمدیان'));
  assert.ok(result.policyResolutionDraft.includes('دکتر حشمت‌الله عسگری'));
});

test('scenarioEngine: market injection and working capital improve goods availability and reduce inflation', () => {
  const customLevers = {
    ...DEFAULT_LEVERS,
    marketInjectionTons: 5000,
    workingCapitalCreditHemmat: 50,
    inspectionIntensity: 'intensified_50' as const,
  };
  const result = calculateScenarioImpact(customLevers);
  // Market injection + inspection should decrease foodInflationDelta
  assert.ok(result.foodInflationDelta < 0, 'Inflation delta should be negative with 5000 tons market injection');
  assert.ok(result.goodsAvailabilityDelta > 0, 'Goods availability should increase');
  assert.ok(result.industrialOutputDeltaPercent > 0, 'Industrial output should increase with working capital credit');
});

test('scenarioEngine: preset scenarios exist and compute correctly', () => {
  assert.equal(PRESET_SCENARIOS.length, 4);
  const stress = PRESET_SCENARIOS.find((s) => s.id === 'multi_stress');
  assert.ok(stress, 'multi_stress preset exists');
  if (stress) {
    const stressResult = calculateScenarioImpact(stress.levers);
    assert.ok(stressResult.foodInflationDelta > 0, 'Multi-stress scenario produces inflation shock');
    assert.ok(stressResult.industrialOutputDeltaPercent < 0, 'Multi-stress scenario reduces industrial output');
  }
});
